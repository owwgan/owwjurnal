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

    // Check if illustration already exists
    const { data: existingFiles } = await supabase.storage
      .from('illustrations')
      .list('', { search: 'hero-illustration' });

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

    const prompt = `Create an isometric 3D illustration of a young college student (wearing casual clothes like hoodie) 
searching for academic journals on a laptop. The scene should include:
- A modern desk with an open laptop showing a search interface with journal results
- Stacks of colorful academic books and journal papers scattered around
- A warm coffee cup with steam and some stationery items
- Floating icons representing research: lightbulb, magnifying glass, graduation cap, stars
- Color palette: warm pink (#F97316), coral orange (#FB923C), soft yellow (#FBBF24), cream white background
- Style: Clean isometric 3D vector illustration, modern, friendly and welcoming
- The student should look happy and engaged
- Add subtle shadows for depth
- No text, pure illustration
- High quality, clean vector-style rendering with smooth gradients
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

    const fileName = `hero-illustration-${Date.now()}.png`;

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
