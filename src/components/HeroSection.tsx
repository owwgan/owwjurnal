import { Search, Sparkles, BookOpen, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { WaveDivider } from './WaveDivider';
interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}
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
  return <section className="relative">
      {/* Hero Background */}
      <div className="bg-hero-pink py-20 md:py-28 relative overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-10 left-10 animate-float">
          <Star className="h-8 w-8 text-primary-foreground/30" />
        </div>
        <div className="absolute top-20 right-20 animate-float" style={{
        animationDelay: '1s'
      }}>
          <Sparkles className="h-10 w-10 text-primary-foreground/40" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{
        animationDelay: '0.5s'
      }}>
          <BookOpen className="h-6 w-6 text-primary-foreground/30" />
        </div>
        <div className="absolute top-1/2 right-10 animate-wiggle">
          <div className="w-4 h-4 rounded-full bg-primary-foreground/20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo */}
            <h1 className="text-5xl md:text-7xl font-black mb-4 text-primary-foreground tracking-tight">
              OwwJurnal
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 font-medium">Platform pencarian jurnal yang memudahkan mahasiswa Indonesia!</p>

            {/* Search Bar - Playful style */}
            <div className="bg-card rounded-3xl p-3 border-thick shadow-playful max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="text" placeholder="Cari judul, penulis, atau kata kunci..." value={searchQuery} onChange={e => onSearchChange(e.target.value)} onKeyDown={handleKeyDown} className="pl-12 h-14 text-lg bg-muted/30 border-0 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary" />
                </div>
                <Button onClick={onSearch} size="lg" className="h-14 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl text-lg font-bold shadow-md transition-all hover:scale-105">
                  <Search className="mr-2 h-5 w-5" />
                  Cari!
                </Button>
              </div>
            </div>

            {/* Source badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {['Google Scholar', 'SINTA', 'Garuda', 'PubMed', 'arXiv'].map(source => <span key={source} className="px-4 py-2 text-sm font-semibold rounded-full bg-primary-foreground/20 text-primary-foreground border-2 border-primary-foreground/30 backdrop-blur-sm">
                  {source}
                </span>)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <WaveDivider fromColor="fill-hero-pink" />
    </section>;
}