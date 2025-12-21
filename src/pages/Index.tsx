import { useState, useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { StatsCounter } from '@/components/StatsCounter';
import { SearchFilters } from '@/components/SearchFilters';
import { SearchResults } from '@/components/SearchResults';
import { ThesisRecommendation } from '@/components/ThesisRecommendation';
import { StickyNavbar } from '@/components/StickyNavbar';
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
      <StickyNavbar onSearchClick={scrollToTop} />
      
      <HeroSection 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Search Results Section */}
      {isSearched && (
        <section className="bg-body-mustard py-12">
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

      {/* Footer */}
      <footer className="bg-hero-pink py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground font-semibold flex items-center justify-center gap-2">
            Dibuat dengan <Heart className="h-5 w-5 fill-current" /> untuk Mahasiswa Indonesia
          </p>
          <p className="text-primary-foreground/80 text-sm mt-2">
            OwwJurnal - Platform Pencarian Jurnal Terlengkap
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
