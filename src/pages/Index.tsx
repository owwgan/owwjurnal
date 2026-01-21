import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { StatsCounter } from '@/components/StatsCounter';
import { SearchFilters } from '@/components/SearchFilters';
import { SearchResults } from '@/components/SearchResults';
import { ThesisRecommendation } from '@/components/ThesisRecommendation';
import { Navbar } from '@/components/Navbar';
import { SearchFilters as SearchFiltersType, Journal } from '@/types/journal';
import { searchJournals } from '@/lib/mock-journals';
import { Heart } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [results, setResults] = useState<Journal[]>([]);
  const [filters, setFilters] = useState<SearchFiltersType>({
    query: '',
    sources: [],
    sintaAccreditation: [],
    yearFrom: undefined,
    yearTo: undefined,
    researchType: [],
    language: [],
  });

  const activeFilterCount = 
    filters.sources.length + 
    filters.sintaAccreditation.length + 
    filters.researchType.length + 
    filters.language.length +
    (filters.yearFrom ? 1 : 0) +
    (filters.yearTo ? 1 : 0);

  const handleSearch = () => {
    const searchResults = searchJournals(searchQuery, {
      sources: filters.sources,
      sintaAccreditation: filters.sintaAccreditation,
      yearFrom: filters.yearFrom,
      yearTo: filters.yearTo,
      researchType: filters.researchType,
      language: filters.language,
    });
    setResults(searchResults);
    setIsSearched(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchClick={scrollToTop} />
      
      <HeroSection 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Search Results Section */}
      {isSearched && (
        <section className="bg-body-mustard py-12 border-b-4 border-foreground">
          <div className="container mx-auto px-4">
            <div className="flex justify-end mb-6">
              <SearchFilters 
                filters={filters}
                onFiltersChange={(newFilters) => {
                  setFilters(newFilters);
                  if (isSearched) handleSearch();
                }}
                activeFilterCount={activeFilterCount}
              />
            </div>

            <SearchResults 
              journals={results}
              isSearched={isSearched}
              query={searchQuery}
            />
          </div>
        </section>
      )}

      {/* How It Works - only show when not searched */}
      {!isSearched && <HowItWorks />}

      {/* Stats Counter */}
      {!isSearched && <StatsCounter />}

      {/* AI Recommendation */}
      <ThesisRecommendation />

      {/* Footer - Brutalist Style */}
      <footer className="bg-foreground py-12 relative overflow-hidden">
        {/* Halftone pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 halftone-pattern-lg" style={{ filter: 'invert(1)' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left - Logo */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-background tracking-tight">
                OwwJurnal
              </h3>
              <p className="text-xs text-background/60 tracking-[0.15em] uppercase mt-1">
                Academic Search Platform
              </p>
            </div>
            
            {/* Center - Made with love */}
            <div className="text-center">
              <p className="text-background font-bold flex items-center justify-center gap-2">
                Dibuat dengan <Heart className="h-5 w-5 fill-primary text-primary" /> untuk
              </p>
              <p className="text-background/80 font-black text-lg mt-1">
                Mahasiswa Indonesia
              </p>
            </div>
            
            {/* Right - Barcode decoration */}
            <div className="flex justify-center md:justify-end items-end gap-[2px]">
              {[8, 16, 4, 12, 8, 4, 16, 12, 4, 8, 16, 4, 12, 8, 16, 4, 8].map((h, i) => (
                <div 
                  key={i} 
                  className="w-[3px] bg-background/30"
                  style={{ height: `${h * 2}px` }}
                />
              ))}
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm font-medium">
              © 2024 OwwJurnal. Platform Pencarian Jurnal Terlengkap
            </p>
            <p className="text-background/30 text-xs tracking-[0.2em] uppercase">
              ジャーナル検索
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
