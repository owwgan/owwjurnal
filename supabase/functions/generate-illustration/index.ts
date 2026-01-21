import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase environment variables not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check if illustration already exists (anime/pastel v2)
    const { data: existingFiles } = await supabase.storage
      .from('illustrations')
      .list('', { search: 'hero-illustration-anime' });

    if (existingFiles && existingFiles.length > 0) {
      const { data: publicUrl } = supabase.storage
        .from('illustrations')
        .getPublicUrl(existingFiles[0].name);
      
      console.log('Returning existing illustration:', publicUrl.publicUrl);
      return new Response(JSON.stringify({ imageUrl: publicUrl.publicUrl }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating new illustration with Lovable AI...');

    const prompt = `Create a soft pastel anime-style illustration (kawaii, clean, modern) of a young college student
using a laptop to search for academic journals.

Scene details:
- A cozy modern desk with an open laptop showing a generic search UI (no readable text)
- Stacks of books and papers, tidy but lively
- A warm coffee cup with gentle steam, and small stationery items
- Floating cute research icons: lightbulb, magnifying glass, graduation cap, sparkles

Style & mood:
- Soft pastel anime illustration with smooth shading (not photorealistic)
- Friendly, playful, and editorial-clean composition (magazine-like spacing)
- Subtle glow highlights and soft shadows for depth
- Glassmorphism-friendly look: clean shapes, airy lighting

Color palette:
- Pastel pinks, lilac, peach, soft cream, and a hint of deep navy accents

Output requirements:
- Transparent background (PNG with alpha)
- No text
- High quality
- Aspect ratio 1:1 square format`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI Response received');

    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageData) {
      console.error('No image in response:', JSON.stringify(data));
      throw new Error('No image generated from AI');
    }

    // Extract base64 data
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    const fileName = `hero-illustration-anime-${Date.now()}.png`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('illustrations')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    console.log('Image uploaded successfully:', uploadData.path);

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from('illustrations')
      .getPublicUrl(fileName);

    console.log('Public URL:', publicUrl.publicUrl);

    return new Response(JSON.stringify({ imageUrl: publicUrl.publicUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-illustration:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
