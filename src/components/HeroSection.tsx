import { Search, BookOpen, FileText, GraduationCap, Globe, Microscope } from 'lucide-react';
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

const sourceIcons: Record<string, React.ReactNode> = {
  'Google Scholar': <BookOpen className="h-4 w-4" />,
  'SINTA': <GraduationCap className="h-4 w-4" />,
  'Garuda': <FileText className="h-4 w-4" />,
  'PubMed': <Microscope className="h-4 w-4" />,
  'arXiv': <Globe className="h-4 w-4" />,
};

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
    <section className="relative bg-hero-clean overflow-hidden">
      {/* Decorative blob shapes */}
      <div className="blob-decoration blob-1" />
      <div className="blob-decoration blob-2" />
      <div className="blob-decoration blob-3" />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight text-foreground animate-fade-in">
              <span className="text-gradient">OwwJurnal</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 font-medium max-w-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Platform pencarian jurnal yang memudahkan mahasiswa Indonesia menemukan referensi terbaik!
            </p>

            {/* Search Box */}
            <div className="bg-card rounded-2xl p-3 border-2 border-border shadow-lg max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={typingPlaceholder || 'Cari judul, penulis, atau kata kunci...'}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-12 h-12 text-base bg-muted/30 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
                <Button
                  onClick={onSearch}
                  size="lg"
                  className="h-12 px-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl text-base font-bold shadow-md transition-all hover:scale-105 hover:shadow-lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Cari!
                </Button>
              </div>
            </div>

            {/* Source Badges - 3D Style */}
            <div className="flex flex-wrap items-center gap-2 mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <span className="text-sm text-muted-foreground font-medium mr-2">Sumber:</span>
              {Object.entries(sourceIcons).map(([source, icon], index) => (
                <span
                  key={source}
                  className="badge-3d flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full bg-card text-foreground border-2 border-border shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-default"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  {icon}
                  {source}
                </span>
              ))}
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-full max-w-md lg:max-w-lg">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
