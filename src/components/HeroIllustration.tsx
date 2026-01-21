import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroIllustration() {
  const [illustrationUrl, setIllustrationUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const loadIllustration = async () => {
      // Check localStorage cache first
      const cached = localStorage.getItem('hero-illustration-url');
      if (cached) {
        setIllustrationUrl(cached);
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching illustration from edge function...');
        const { data, error: fnError } = await supabase.functions.invoke('generate-illustration');

        if (fnError) {
          console.error('Function error:', fnError);
          throw fnError;
        }

        if (data?.imageUrl) {
          console.log('Illustration loaded:', data.imageUrl);
          setIllustrationUrl(data.imageUrl);
          localStorage.setItem('hero-illustration-url', data.imageUrl);
        } else {
          throw new Error('No image URL in response');
        }
      } catch (err) {
        console.error('Error loading illustration:', err);
        setError('Failed to load illustration');
      } finally {
        setIsLoading(false);
      }
    };

    loadIllustration();
  }, []);

  if (isLoading) {
    return (
      <div className="relative w-full h-full flex items-center justify-center min-h-[300px] bg-muted">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
            Generating...
          </p>
        </div>
      </div>
    );
  }

  if (error || !illustrationUrl) {
    return <FallbackIllustration />;
  }

  return (
    <div className="relative w-full h-full">
      {/* Halftone overlay effect */}
      <div className="absolute inset-0 halftone-pattern opacity-20 pointer-events-none z-10" />
      
      <img 
        src={illustrationUrl} 
        alt="Mahasiswa mencari jurnal akademik"
        className={cn(
          "w-full h-auto transition-all duration-500 ease-out",
          isImageLoaded 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-95"
        )}
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  );
}

function FallbackIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[280px] bg-muted">
      {/* Halftone pattern background */}
      <div className="absolute inset-0 halftone-pattern-lg opacity-30" />
      
      {/* Main SVG Illustration - Brutalist/Geometric style */}
      <svg
        viewBox="0 0 400 350"
        className="w-full max-w-md h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background shapes */}
        <rect x="50" y="50" width="120" height="120" className="fill-primary/20" />
        <rect x="230" y="80" width="100" height="100" className="fill-muted stroke-foreground" strokeWidth="3" />
        
        {/* Desk - geometric */}
        <rect x="60" y="260" width="280" height="8" className="fill-foreground" />
        <rect x="80" y="268" width="12" height="50" className="fill-foreground/80" />
        <rect x="308" y="268" width="12" height="50" className="fill-foreground/80" />
        
        {/* Laptop - brutalist style */}
        <rect x="100" y="200" width="150" height="60" className="fill-card stroke-foreground" strokeWidth="3" />
        <rect x="108" y="208" width="134" height="44" className="fill-primary/30" />
        
        {/* Screen content - code lines */}
        <rect x="116" y="216" width="50" height="4" className="fill-primary" />
        <rect x="116" y="226" width="80" height="4" className="fill-foreground/40" />
        <rect x="116" y="236" width="40" height="4" className="fill-foreground/40" />
        
        {/* Laptop base */}
        <rect x="70" y="260" width="210" height="8" className="fill-muted stroke-foreground" strokeWidth="2" />
        
        {/* Person - geometric/minimal */}
        <rect x="160" y="100" width="80" height="100" rx="4" className="fill-primary" />
        
        {/* Person - Head */}
        <circle cx="200" cy="70" r="35" className="fill-muted stroke-foreground" strokeWidth="3" />
        
        {/* Person - Face features */}
        <rect x="185" y="60" width="6" height="8" className="fill-foreground" />
        <rect x="205" y="60" width="6" height="8" className="fill-foreground" />
        <rect x="190" y="78" width="20" height="3" className="fill-foreground/60" />
        
        {/* Person - Arms */}
        <rect x="130" y="140" width="30" height="60" rx="4" className="fill-muted stroke-foreground" strokeWidth="2" />
        <rect x="240" y="140" width="30" height="60" rx="4" className="fill-muted stroke-foreground" strokeWidth="2" />
        
        {/* Floating book - geometric */}
        <g className="animate-float">
          <rect x="300" y="100" width="50" height="65" className="fill-accent stroke-foreground" strokeWidth="2" />
          <rect x="306" y="110" width="30" height="4" className="fill-background" />
          <rect x="306" y="120" width="38" height="4" className="fill-background/60" />
          <rect x="306" y="130" width="24" height="4" className="fill-background/60" />
        </g>
        
        {/* Floating elements - geometric shapes */}
        <rect x="320" y="50" width="16" height="16" className="fill-primary animate-float" style={{ animationDelay: '0.5s' }} />
        <rect x="60" y="140" width="20" height="20" className="fill-accent/60 rotate-45 animate-float" style={{ animationDelay: '0.3s' }} />
        
        {/* Plus signs - decorative */}
        <g className="fill-foreground/30">
          <rect x="340" y="180" width="16" height="4" />
          <rect x="346" y="174" width="4" height="16" />
        </g>
        <g className="fill-primary/50">
          <rect x="40" y="80" width="12" height="3" />
          <rect x="44.5" y="75.5" width="3" height="12" />
        </g>
        
        {/* Coffee cup - minimal */}
        <rect x="280" y="240" width="20" height="20" className="fill-card stroke-foreground" strokeWidth="2" />
        <rect x="300" y="246" width="8" height="8" rx="4" className="stroke-foreground" strokeWidth="2" fill="none" />
        
        {/* Sparkle/star element */}
        <path 
          d="M350 140 L354 148 L362 152 L354 156 L350 164 L346 156 L338 152 L346 148 Z" 
          className="fill-warning"
        />
      </svg>
    </div>
  );
}
