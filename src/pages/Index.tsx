import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { SearchFilters } from '@/components/SearchFilters';
import { SearchResults } from '@/components/SearchResults';
import { ThesisRecommendation } from '@/components/ThesisRecommendation';
import { SearchFilters as SearchFiltersType, Journal } from '@/types/journal';
import { searchJournals } from '@/lib/mock-journals';

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

  return (
    <div className="min-h-screen bg-background">
      <HeroSection 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <main className="container mx-auto px-4 py-8">
        {isSearched && (
          <div className="flex justify-end mb-4">
            <SearchFilters 
              filters={filters}
              onFiltersChange={(newFilters) => {
                setFilters(newFilters);
                if (isSearched) handleSearch();
              }}
              activeFilterCount={activeFilterCount}
            />
          </div>
        )}

        <SearchResults 
          journals={results}
          isSearched={isSearched}
          query={searchQuery}
        />

        <ThesisRecommendation />
      </main>

      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>JurnalKu - Platform Pencarian Jurnal untuk Mahasiswa Indonesia</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
