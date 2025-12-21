import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export function HeroIllustration() {
  const [illustrationUrl, setIllustrationUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="relative w-full h-full flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">Generating illustration...</p>
        </div>
      </div>
    );
  }

  if (error || !illustrationUrl) {
    // Fallback to simple SVG illustration
    return <FallbackIllustration />;
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Floating decorative elements */}
      <div className="absolute top-4 left-8 w-4 h-4 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-16 right-12 w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-4 w-5 h-5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.3s' }} />
      
      <img 
        src={illustrationUrl} 
        alt="Mahasiswa mencari jurnal akademik"
        className="w-full max-w-md h-auto drop-shadow-xl rounded-2xl"
      />
    </div>
  );
}

function FallbackIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Floating decorative elements */}
      <div className="absolute top-4 left-8 w-4 h-4 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-16 right-12 w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-4 w-5 h-5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.3s' }} />
      
      {/* Main SVG Illustration */}
      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-md h-auto drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Desk */}
        <rect x="60" y="280" width="280" height="12" rx="6" className="fill-foreground/20" />
        <rect x="80" y="292" width="20" height="60" rx="4" className="fill-foreground/15" />
        <rect x="300" y="292" width="20" height="60" rx="4" className="fill-foreground/15" />
        
        {/* Laptop */}
        <rect x="100" y="240" width="140" height="90" rx="8" className="fill-card" stroke="hsl(var(--foreground))" strokeWidth="3" />
        <rect x="110" y="250" width="120" height="70" rx="4" className="fill-primary/20" />
        <rect x="70" y="330" width="200" height="12" rx="2" className="fill-muted" stroke="hsl(var(--foreground))" strokeWidth="2" />
        
        {/* Screen content - code lines */}
        <rect x="120" y="260" width="60" height="6" rx="2" className="fill-primary" />
        <rect x="120" y="272" width="80" height="6" rx="2" className="fill-secondary" />
        <rect x="120" y="284" width="50" height="6" rx="2" className="fill-accent" />
        <rect x="120" y="296" width="70" height="6" rx="2" className="fill-primary/60" />
        
        {/* Person - Body */}
        <ellipse cx="200" cy="200" rx="45" ry="60" className="fill-secondary" />
        
        {/* Person - Head */}
        <circle cx="200" cy="120" r="40" className="fill-muted" stroke="hsl(var(--foreground))" strokeWidth="3" />
        
        {/* Person - Hair */}
        <path 
          d="M160 110 Q165 70 200 65 Q235 70 240 110 Q235 95 200 90 Q165 95 160 110" 
          className="fill-foreground/80" 
        />
        
        {/* Person - Face */}
        <circle cx="185" cy="115" r="4" className="fill-foreground" />
        <circle cx="215" cy="115" r="4" className="fill-foreground" />
        <path d="M190 135 Q200 145 210 135" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Person - Arms */}
        <path 
          d="M155 200 Q130 220 120 260" 
          stroke="hsl(var(--muted))" 
          strokeWidth="20" 
          strokeLinecap="round" 
          fill="none"
        />
        <path 
          d="M245 200 Q270 220 280 260" 
          stroke="hsl(var(--muted))" 
          strokeWidth="20" 
          strokeLinecap="round" 
          fill="none"
        />
        
        {/* Person - Hands */}
        <circle cx="120" cy="265" r="12" className="fill-muted" />
        <circle cx="280" cy="265" r="12" className="fill-muted" />
        
        {/* Floating Books */}
        <g className="animate-pulse" style={{ animationDuration: '3s' }}>
          <rect x="300" y="120" width="50" height="60" rx="4" className="fill-primary" stroke="hsl(var(--foreground))" strokeWidth="2" transform="rotate(-10 325 150)" />
          <rect x="305" y="130" width="35" height="4" rx="1" className="fill-primary-foreground/80" transform="rotate(-10 325 150)" />
          <rect x="305" y="140" width="25" height="4" rx="1" className="fill-primary-foreground/60" transform="rotate(-10 325 150)" />
        </g>
        
        {/* Floating Lightbulb */}
        <g className="animate-bounce" style={{ animationDelay: '0.7s' }}>
          <circle cx="320" cy="60" r="20" className="fill-warning/80" />
          <rect x="315" y="80" width="10" height="12" rx="2" className="fill-muted-foreground/30" />
          <path d="M310 60 L330 60 M320 50 L320 70" stroke="hsl(var(--warning-foreground))" strokeWidth="2" />
        </g>
        
        {/* Coffee Cup */}
        <rect x="270" y="265" width="25" height="30" rx="4" className="fill-card" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <path d="M295 275 Q310 275 310 285 Q310 295 295 295" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" />
        <path d="M275 270 Q282 265 290 270" stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none" className="animate-pulse" />
        
        {/* Floating Document/Paper */}
        <g className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <rect x="40" y="140" width="45" height="55" rx="3" className="fill-card" stroke="hsl(var(--foreground))" strokeWidth="2" transform="rotate(15 62 167)" />
          <rect x="48" y="150" width="25" height="3" rx="1" className="fill-primary/60" transform="rotate(15 62 167)" />
          <rect x="48" y="158" width="30" height="3" rx="1" className="fill-muted-foreground/40" transform="rotate(15 62 167)" />
          <rect x="48" y="166" width="20" height="3" rx="1" className="fill-muted-foreground/40" transform="rotate(15 62 167)" />
        </g>
        
        {/* Sparkles */}
        <g className="animate-ping" style={{ animationDuration: '2s' }}>
          <path d="M350 180 L355 190 L365 185 L355 195 L360 205 L350 195 L340 200 L345 190 Z" className="fill-warning" />
        </g>
        <g className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
          <path d="M60 80 L63 87 L70 85 L65 92 L68 99 L60 94 L52 97 L55 90 L50 83 L58 86 Z" className="fill-primary" transform="scale(0.7)" />
        </g>
      </svg>
    </div>
  );
}
