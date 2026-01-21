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
      <div className="relative w-full h-full flex items-center justify-center min-h-[300px] rounded-2xl bg-muted/30">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-30 animate-pulse-glow" />
            <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
          </div>
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
      <img 
        src={illustrationUrl} 
        alt="Mahasiswa mencari jurnal akademik"
        className={cn(
          "w-full h-auto rounded-xl transition-all duration-500 ease-out",
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
    <div className="relative w-full h-full flex items-center justify-center min-h-[280px] rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Subtle pattern */}
      <div className="absolute inset-0 pattern-dots opacity-50 rounded-2xl" />
      
      {/* Main SVG Illustration - Soft/Playful style */}
      <svg
        viewBox="0 0 400 350"
        className="w-full max-w-md h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background shapes - soft circles */}
        <circle cx="100" cy="100" r="60" className="fill-primary/10" />
        <circle cx="300" cy="120" r="80" className="fill-accent/10" />
        <circle cx="200" cy="280" r="70" className="fill-warning/10" />
        
        {/* Desk - rounded */}
        <rect x="60" y="260" width="280" height="12" rx="6" className="fill-muted" />
        <rect x="80" y="272" width="16" height="45" rx="8" className="fill-muted-foreground/20" />
        <rect x="304" y="272" width="16" height="45" rx="8" className="fill-muted-foreground/20" />
        
        {/* Laptop - rounded */}
        <rect x="100" y="195" width="150" height="65" rx="12" className="fill-card" />
        <rect x="108" y="203" width="134" height="49" rx="8" className="fill-primary/20" />
        
        {/* Screen content - soft lines */}
        <rect x="120" y="215" width="50" height="5" rx="2.5" className="fill-primary/60" />
        <rect x="120" y="228" width="80" height="5" rx="2.5" className="fill-foreground/20" />
        <rect x="120" y="241" width="40" height="5" rx="2.5" className="fill-foreground/20" />
        
        {/* Laptop base */}
        <rect x="70" y="260" width="210" height="8" rx="4" className="fill-muted-foreground/30" />
        
        {/* Person - Body */}
        <rect x="155" y="95" width="90" height="105" rx="20" className="fill-primary" />
        
        {/* Person - Head */}
        <circle cx="200" cy="60" r="40" className="fill-muted" />
        
        {/* Person - Face features - cute */}
        <circle cx="185" cy="55" r="4" className="fill-foreground" />
        <circle cx="215" cy="55" r="4" className="fill-foreground" />
        <path d="M190 72 Q200 80 210 72" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="stroke-foreground/60" fill="none" />
        
        {/* Person - Arms */}
        <rect x="125" y="130" width="30" height="70" rx="15" className="fill-muted" />
        <rect x="245" y="130" width="30" height="70" rx="15" className="fill-muted" />
        
        {/* Floating book - soft */}
        <g className="animate-float">
          <rect x="295" y="90" width="55" height="70" rx="8" className="fill-accent" />
          <rect x="303" y="102" width="32" height="5" rx="2.5" className="fill-background/80" />
          <rect x="303" y="114" width="40" height="5" rx="2.5" className="fill-background/50" />
          <rect x="303" y="126" width="28" height="5" rx="2.5" className="fill-background/50" />
        </g>
        
        {/* Floating elements - circles */}
        <circle cx="330" cy="55" r="10" className="fill-primary animate-float" style={{ animationDelay: '0.5s' }} />
        <circle cx="65" cy="150" r="12" className="fill-accent/60 animate-float" style={{ animationDelay: '0.3s' }} />
        <circle cx="350" cy="200" r="8" className="fill-warning animate-bounce-gentle" />
        
        {/* Sparkles */}
        <g className="fill-warning">
          <path d="M45 90 L48 98 L56 101 L48 104 L45 112 L42 104 L34 101 L42 98 Z" />
        </g>
        <g className="fill-primary/60">
          <path d="M340 150 L342 155 L347 157 L342 159 L340 164 L338 159 L333 157 L338 155 Z" />
        </g>
        
        {/* Coffee cup - cute */}
        <rect x="278" y="235" width="24" height="25" rx="6" className="fill-card" />
        <circle cx="302" cy="248" r="6" className="stroke-muted-foreground/40" strokeWidth="2" fill="none" />
        <path d="M282 232 Q286 226 290 232" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="stroke-muted-foreground/30" fill="none" />
      </svg>
    </div>
  );
}