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
    <section className="relative bg-background overflow-hidden border-b-4 border-foreground">
      {/* Halftone pattern overlay */}
      <div className="absolute inset-0 halftone-pattern-lg opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-left order-2 lg:order-1">
            {/* Decorative label */}
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
              <div className="w-8 h-1 bg-primary" />
              <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                PLATFORM PENCARIAN
              </span>
            </div>

            {/* Main heading - Large typography */}
            <h1 className="text-display-xl mb-2 text-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="block">Oww</span>
              <span className="block text-primary">Jurnal</span>
            </h1>

            {/* Tagline with pink underline */}
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-lg">
                Platform pencarian jurnal yang memudahkan 
                <span className="relative inline-block mx-1">
                  <span className="font-bold text-foreground">mahasiswa Indonesia</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-primary" />
                </span>
                menemukan referensi terbaik!
              </p>
            </div>

            {/* Search Box - Brutalist style */}
            <div className="bg-card border-4 border-foreground shadow-brutal p-4 max-w-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={typingPlaceholder || 'Cari judul, penulis, atau kata kunci...'}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-12 h-14 text-base bg-background border-2 border-foreground focus-visible:ring-2 focus-visible:ring-primary font-medium"
                  />
                </div>
                <Button
                  onClick={onSearch}
                  size="lg"
                  className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-black border-2 border-foreground shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_hsl(var(--foreground))] transition-all uppercase tracking-wide"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Cari!
                </Button>
              </div>
            </div>

            {/* Source Badges - Brutalist Style */}
            <div className="flex flex-wrap items-center gap-2 mt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase mr-2">
                SUMBER:
              </span>
              {sources.map((source, index) => (
                <span
                  key={source}
                  className="px-3 py-1.5 text-xs font-bold bg-card text-foreground border-2 border-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default uppercase tracking-wide"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  {source}
                </span>
              ))}
            </div>
          </div>

          {/* Right side - Illustration with decorative frame */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-4 border-primary opacity-30" />
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/10" />
              
              {/* Main illustration container */}
              <div className="relative w-full max-w-md lg:max-w-lg border-4 border-foreground bg-card p-4">
                <HeroIllustration />
                
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-3 h-3 bg-primary" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-primary" />
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-primary" />
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-primary" />
              </div>

              {/* Japanese-style decorative text */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-vertical hidden lg:block">
                <span className="text-xs font-bold tracking-[0.3em] text-muted-foreground/50">
                  ジャーナル検索
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative strip */}
      <div className="h-2 bg-primary" />
    </section>
  );
}
