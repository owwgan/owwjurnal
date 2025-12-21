import { Search, Sparkles, BookOpen, Star, GraduationCap, Lightbulb, Award, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { WaveDivider } from './WaveDivider';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { useParallax } from '@/hooks/useParallax';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

const placeholderPhrases = [
  'Cari jurnal machine learning...',
  'Metodologi penelitian kualitatif...',
  'Dampak media sosial terhadap...',
  'Analisis sentimen dengan NLP...',
  'Pengaruh e-commerce pada UMKM...',
];

export function HeroSection({ searchQuery, onSearchChange, onSearch }: HeroSectionProps) {
  const scrollY = useParallax();
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch();
  };

  const typingPlaceholder = useTypingEffect({
    phrases: placeholderPhrases,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2500,
  });

  return (
    <section className="relative">
      <div className="bg-gradient-animated py-20 md:py-28 relative overflow-hidden">
        {/* Decorative floating elements with parallax */}
        <div 
          className="absolute top-10 left-10 animate-float transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <Star className="h-8 w-8 text-primary-foreground/30" />
        </div>
        <div 
          className="absolute top-20 right-20 animate-float transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.25}px)`, animationDelay: '1s' }}
        >
          <Sparkles className="h-10 w-10 text-primary-foreground/40" />
        </div>
        <div 
          className="absolute bottom-32 left-1/4 animate-float transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.1}px)`, animationDelay: '0.5s' }}
        >
          <BookOpen className="h-6 w-6 text-primary-foreground/30" />
        </div>
        <div 
          className="absolute top-1/2 right-10 animate-wiggle transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="w-4 h-4 rounded-full bg-primary-foreground/20" />
        </div>

        {/* Additional floating elements with parallax */}
        <div 
          className="absolute top-32 left-[15%] animate-float-slow transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.2}px)`, animationDelay: '2s' }}
        >
          <GraduationCap className="h-7 w-7 text-primary-foreground/25" />
        </div>
        <div 
          className="absolute bottom-20 right-[20%] animate-float transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.35}px)`, animationDelay: '1.5s' }}
        >
          <Lightbulb className="h-6 w-6 text-primary-foreground/35" />
        </div>
        <div 
          className="absolute top-[40%] left-[8%] animate-float-slow transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.18}px)`, animationDelay: '0.8s' }}
        >
          <Award className="h-8 w-8 text-primary-foreground/20" />
        </div>
        <div 
          className="absolute bottom-[35%] right-[8%] animate-pulse-soft transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <Circle className="h-5 w-5 text-primary-foreground/25 fill-primary-foreground/10" />
        </div>
        <div 
          className="absolute top-16 left-[40%] animate-float transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.12}px)`, animationDelay: '2.5s' }}
        >
          <div className="w-3 h-3 rounded-full bg-primary-foreground/15" />
        </div>
        <div 
          className="absolute bottom-24 left-[60%] animate-float-slow transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.28}px)`, animationDelay: '1.2s' }}
        >
          <div className="w-2 h-2 rounded-full bg-primary-foreground/20" />
        </div>
        <div 
          className="absolute top-1/3 right-[25%] animate-spin-slow opacity-20 transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.22}px)` }}
        >
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary-foreground/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* IMPORTANT: remove opacity-0 initial from H1 so brand is always visible */}
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight text-primary-foreground text-glow-subtle glow-pulse">
              OwwJurnal
            </h1>

            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 font-medium text-glow-soft opacity-0-initial animate-fade-in-up delay-200">
              Platform pencarian jurnal yang memudahkan mahasiswa Indonesia!
            </p>

            <div className="bg-card rounded-3xl p-3 border-thick box-glow-subtle max-w-2xl mx-auto opacity-0-initial animate-fade-in-up delay-400">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={typingPlaceholder || 'Cari judul, penulis, atau kata kunci...'}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-12 h-14 text-lg bg-muted/30 border-0 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
                <Button
                  onClick={onSearch}
                  size="lg"
                  className="h-14 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl text-lg font-bold shadow-md transition-all hover:scale-105 hover:shadow-[0_0_25px_hsl(var(--button-orange)/0.5)]"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Cari!
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {['Google Scholar', 'SINTA', 'Garuda', 'PubMed', 'arXiv'].map((source, index) => (
                <span
                  key={source}
                  className={`px-4 py-2 text-sm font-semibold rounded-full bg-primary-foreground/20 text-primary-foreground border-2 border-primary-foreground/30 backdrop-blur-sm box-glow-hover opacity-0-initial animate-fade-in-up delay-${500 + index * 100}`}
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <WaveDivider fromColor="fill-hero-pink" />
    </section>
  );
}
