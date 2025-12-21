import { Search, BookOpen, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

export function HeroSection({ searchQuery, onSearchChange, onSearch }: HeroSectionProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <section className="gradient-hero py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">JurnalKu</span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Cari jurnal ilmiah dari berbagai sumber terpercaya untuk mendukung skripsi dan penelitianmu
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari judul, penulis, atau kata kunci..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-12 h-14 text-lg bg-card border-2 border-border focus:border-primary"
              />
            </div>
            <Button 
              onClick={onSearch}
              size="lg"
              className="h-14 px-8 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Search className="mr-2 h-5 w-5" />
              Cari Jurnal
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="text-sm text-muted-foreground">Sumber:</span>
            {['Google Scholar', 'SINTA', 'Garuda', 'PubMed', 'arXiv'].map((source) => (
              <span
                key={source}
                className="px-3 py-1 text-sm rounded-full bg-card border border-border text-foreground"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
