import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { HeroIllustration } from './HeroIllustration';

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

const sources = ['Google Scholar', 'SINTA', 'Garuda', 'PubMed', 'arXiv'];

export function HeroSection({ searchQuery, onSearchChange, onSearch }: HeroSectionProps) {
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
    <section className="relative bg-background overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pattern-gradient-mesh pointer-events-none" />
      
      {/* Floating decorative shapes */}
      <div className="floating-shape floating-shape-pink w-96 h-96 -top-48 -left-48 animate-float-slow" />
      <div className="floating-shape floating-shape-purple w-64 h-64 top-1/4 right-0 animate-float" style={{ animationDelay: '1s' }} />
      <div className="floating-shape floating-shape-blue w-80 h-80 bottom-0 left-1/3 animate-float-slow" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="text-left order-2 lg:order-1">
            {/* Decorative label */}
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
              <div className="w-8 h-1 gradient-primary rounded-full" />
              <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                PLATFORM PENCARIAN
              </span>
            </div>

            {/* Main heading - Large typography */}
            <h1 className="text-display-xl mb-2 text-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="block">Oww</span>
              <span className="block text-gradient">Jurnal</span>
            </h1>

            {/* Tagline with gradient underline */}
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-lg">
                Platform pencarian jurnal yang memudahkan 
                <span className="relative inline-block mx-1">
                  <span className="font-bold text-foreground">mahasiswa Indonesia</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 gradient-primary rounded-full" />
                </span>
                menemukan referensi terbaik!
              </p>
            </div>

            {/* Search Box - Glass style */}
            <div className="glass-strong rounded-2xl shadow-soft-lg p-5 max-w-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={typingPlaceholder || 'Cari judul, penulis, atau kata kunci...'}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-12 h-14 text-base bg-background/50 border border-border/50 rounded-xl focus-visible:ring-2 focus-visible:ring-primary font-medium"
                  />
                </div>
                <Button
                  onClick={onSearch}
                  size="lg"
                  className="h-14 px-8 gradient-primary text-primary-foreground text-base font-black rounded-full shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300 uppercase tracking-wide"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Cari!
                </Button>
              </div>
            </div>

            {/* Source Badges - Pill Style */}
            <div className="flex flex-wrap items-center gap-2 mt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase mr-2">
                SUMBER:
              </span>
              {sources.map((source, index) => (
                <span
                  key={source}
                  className="px-4 py-1.5 text-xs font-bold bg-card/80 text-foreground border border-border/50 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  {source}
                </span>
              ))}
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Glow effect behind illustration */}
              <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl rounded-full scale-75" />
              
              {/* Main illustration container */}
              <div className="relative w-full max-w-md lg:max-w-lg glass rounded-3xl p-6 shadow-soft-lg hover:shadow-glow transition-all duration-500">
                <HeroIllustration />
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 gradient-primary rounded-full animate-bounce-gentle opacity-80" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full animate-bounce-gentle opacity-60" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-warning rounded-full animate-float opacity-70" style={{ animationDelay: '1s' }} />

              {/* Japanese-style decorative text */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-vertical hidden lg:block">
                <span className="text-jp-accent text-muted-foreground">
                  ジャーナル検索
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}