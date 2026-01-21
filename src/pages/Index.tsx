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
        <section className="bg-body-mustard py-12 relative overflow-hidden">
          {/* Gradient mesh background */}
          <div className="absolute inset-0 pattern-gradient-mesh pointer-events-none opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
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

      {/* Footer - Glassmorphism Style */}
      <footer className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 gradient-hero opacity-90" />
        
        {/* Floating shapes */}
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-background/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-background/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 pt-16 pb-8">
          {/* Top rounded edge */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-body-mustard rounded-b-[3rem]" />
          
          <div className="container mx-auto px-4 mt-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Left - Logo */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black text-primary-foreground tracking-tight">
                  OwwJurnal
                </h3>
                <p className="text-xs text-primary-foreground/60 tracking-[0.15em] uppercase mt-1">
                  Academic Search Platform
                </p>
              </div>
              
              {/* Center - Made with love */}
              <div className="text-center">
                <p className="text-primary-foreground font-bold flex items-center justify-center gap-2">
                  Dibuat dengan <Heart className="h-5 w-5 fill-primary-foreground text-primary-foreground animate-bounce-gentle" /> untuk
                </p>
                <p className="text-primary-foreground/90 font-black text-lg mt-1">
                  Mahasiswa Indonesia
                </p>
              </div>
              
              {/* Right - Decorative circles */}
              <div className="flex justify-center md:justify-end items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div 
                    key={i} 
                    className="w-3 h-3 rounded-full bg-primary-foreground/30"
                    style={{ opacity: 1 - (i * 0.1) }}
                  />
                ))}
              </div>
            </div>
            
            {/* Bottom bar */}
            <div className="mt-12 pt-6 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-primary-foreground/60 text-sm font-medium">
                © 2024 OwwJurnal. Platform Pencarian Jurnal Terlengkap
              </p>
              <p className="text-primary-foreground/30 text-xs tracking-[0.2em] uppercase">
                ジャーナル検索
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;