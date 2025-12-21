import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // max requests per window
const RATE_WINDOW = 60000; // 1 minute in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  // Reset if window expired
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  
  // Check limit
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   "unknown";

  // Check rate limit
  if (isRateLimited(clientIP)) {
    console.log(`Rate limit exceeded for IP: ${clientIP.substring(0, 10)}...`);
    return new Response(
      JSON.stringify({ error: "Terlalu banyak permintaan. Coba lagi dalam 1 menit." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { thesisTitle, researchType } = await req.json();

    // Input validation - length and type checks
    if (!thesisTitle || typeof thesisTitle !== 'string') {
      return new Response(
        JSON.stringify({ error: "Judul skripsi diperlukan" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Length validation (max 500 characters)
    if (thesisTitle.length > 500) {
      return new Response(
        JSON.stringify({ error: "Judul skripsi maksimal 500 karakter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Research type validation
    const validResearchTypes = ['kualitatif', 'kuantitatif', 'mixed'];
    if (researchType && !validResearchTypes.includes(researchType)) {
      return new Response(
        JSON.stringify({ error: "Jenis penelitian tidak valid" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize thesisTitle - trim and remove potential XSS characters
    const sanitizedTitle = thesisTitle.trim().replace(/[<>]/g, '');
    
    if (sanitizedTitle.length === 0) {
      return new Response(
        JSON.stringify({ error: "Judul skripsi tidak boleh kosong" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Layanan tidak tersedia" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const researchTypeLabel = researchType === 'mixed' ? 'mixed method' : researchType;

    const systemPrompt = `Kamu adalah asisten penelitian akademik yang ahli dalam mencari dan merekomendasikan jurnal ilmiah untuk mahasiswa Indonesia. 

Tugasmu:
1. Analisis judul skripsi yang diberikan
2. Identifikasi kata kunci dan topik utama
3. Berikan rekomendasi 5 jurnal yang relevan dengan format JSON

Gunakan bahasa Indonesia yang mudah dipahami mahasiswa.`;

    const userPrompt = `Judul Skripsi: "${sanitizedTitle}"
Jenis Penelitian: ${researchTypeLabel}

Berikan analisis singkat tentang topik skripsi ini dan rekomendasikan 5 jurnal pendukung yang relevan.

Balas dengan format JSON seperti ini:
{
  "analysis": "Analisis singkat tentang topik skripsi dan kata kunci utama yang bisa digunakan untuk pencarian jurnal...",
  "recommendations": [
    {
      "id": "1",
      "title": "Judul jurnal yang relevan",
      "authors": ["Nama Penulis 1", "Nama Penulis 2"],
      "abstract": "Abstrak singkat jurnal dan relevansinya dengan skripsi...",
      "year": 2024,
      "source": "sinta",
      "sintaAccreditation": "S2",
      "language": "id",
      "researchType": "${researchType || 'kualitatif'}",
      "relevanceScore": 95
    }
  ]
}

Catatan:
- source bisa berupa: google_scholar, sinta, garuda, pubmed, arxiv
- sintaAccreditation hanya untuk source sinta: S1, S2, S3, S4, S5, S6
- language: id atau en
- researchType: kualitatif, kuantitatif, atau mixed
- relevanceScore: 0-100 menunjukkan seberapa relevan jurnal dengan skripsi`;

    console.log("Calling Lovable AI for thesis (sanitized):", sanitizedTitle.substring(0, 50) + "...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Terlalu banyak permintaan, coba lagi nanti" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Kuota AI habis, silakan coba lagi nanti" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Gagal menghubungi AI");
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI tidak memberikan respons");
    }

    console.log("AI response received");

    // Parse JSON from AI response
    let result;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Return a fallback response
      result = {
        analysis: content,
        recommendations: [],
      };
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    // Log detailed error for debugging, return generic message to client
    console.error("Error in recommend-journals:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan, silakan coba lagi" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
