import { Search, Sparkles, BookOpen, Star, GraduationCap, Lightbulb, Award, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { WaveDivider } from './WaveDivider';
import { useTypingEffect } from '@/hooks/useTypingEffect';

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

export function HeroSection({
  searchQuery,
  onSearchChange,
  onSearch
}: HeroSectionProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const typingPlaceholder = useTypingEffect({
    phrases: placeholderPhrases,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2500,
  });

  return (
    <section className="relative">
      {/* Hero Background with animated gradient */}
      <div className="bg-gradient-animated py-20 md:py-28 relative overflow-hidden">
        {/* Decorative floating elements - Original */}
        <div className="absolute top-10 left-10 animate-float">
          <Star className="h-8 w-8 text-primary-foreground/30" />
        </div>
        <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-10 w-10 text-primary-foreground/40" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
          <BookOpen className="h-6 w-6 text-primary-foreground/30" />
        </div>
        <div className="absolute top-1/2 right-10 animate-wiggle">
          <div className="w-4 h-4 rounded-full bg-primary-foreground/20" />
        </div>

        {/* Additional floating elements */}
        <div className="absolute top-32 left-[15%] animate-float-slow" style={{ animationDelay: '2s' }}>
          <GraduationCap className="h-7 w-7 text-primary-foreground/25" />
        </div>
        <div className="absolute bottom-20 right-[20%] animate-float" style={{ animationDelay: '1.5s' }}>
          <Lightbulb className="h-6 w-6 text-primary-foreground/35" />
        </div>
        <div className="absolute top-[40%] left-[8%] animate-float-slow" style={{ animationDelay: '0.8s' }}>
          <Award className="h-8 w-8 text-primary-foreground/20" />
        </div>
        <div className="absolute bottom-[35%] right-[8%] animate-pulse-soft">
          <Circle className="h-5 w-5 text-primary-foreground/25 fill-primary-foreground/10" />
        </div>
        <div className="absolute top-16 left-[40%] animate-float" style={{ animationDelay: '2.5s' }}>
          <div className="w-3 h-3 rounded-full bg-primary-foreground/15" />
        </div>
        <div className="absolute bottom-24 left-[60%] animate-float-slow" style={{ animationDelay: '1.2s' }}>
          <div className="w-2 h-2 rounded-full bg-primary-foreground/20" />
        </div>
        
        {/* Spinning slow decorative circle */}
        <div className="absolute top-1/3 right-[25%] animate-spin-slow opacity-20">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary-foreground/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo with gradient text */}
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight text-gradient-hero glow-pulse opacity-0-initial animate-fade-in-up">
              OwwJurnal
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 font-medium text-glow-soft opacity-0-initial animate-fade-in-up delay-200">
              Platform pencarian jurnal yang memudahkan mahasiswa Indonesia!
            </p>

            {/* Search Bar - Playful style */}
            <div className="bg-card rounded-3xl p-3 border-thick box-glow-subtle max-w-2xl mx-auto opacity-0-initial animate-fade-in-up delay-400">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder={typingPlaceholder || 'Cari judul, penulis, atau kata kunci...'} 
                    value={searchQuery} 
                    onChange={e => onSearchChange(e.target.value)} 
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

            {/* Source badges with stagger animation */}
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
      
      {/* Wave Divider */}
      <WaveDivider fromColor="fill-hero-pink" />
    </section>
  );
}
