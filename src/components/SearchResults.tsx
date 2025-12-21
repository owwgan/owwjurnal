import { Journal } from '@/types/journal';
import { JournalCard } from './JournalCard';
import { BookX, Search } from 'lucide-react';

interface SearchResultsProps {
  journals: Journal[];
  isSearched: boolean;
  query: string;
}

export function SearchResults({ journals, isSearched, query }: SearchResultsProps) {
  if (!isSearched) {
    return null;
  }

  if (journals.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center border-thick">
          <BookX className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-foreground">Tidak ada hasil 😢</h3>
        <p className="text-muted-foreground text-lg">
          Tidak ditemukan jurnal untuk "<strong>{query}</strong>". 
        </p>
        <p className="text-muted-foreground">
          Coba kata kunci lain atau ubah filter pencarian.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <Search className="h-5 w-5 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Hasil Pencarian 
          <span className="text-muted-foreground font-normal ml-2">({journals.length} jurnal)</span>
        </h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {journals.map((journal) => (
          <JournalCard key={journal.id} journal={journal} />
        ))}
      </div>
    </div>
  );
}
