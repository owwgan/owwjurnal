import { Journal } from '@/types/journal';
import { JournalCard } from './JournalCard';
import { BookX } from 'lucide-react';

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
      <div className="text-center py-12">
        <BookX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Tidak ada hasil</h3>
        <p className="text-muted-foreground">
          Tidak ditemukan jurnal untuk "{query}". Coba kata kunci lain atau ubah filter pencarian.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Hasil Pencarian 
          <span className="text-muted-foreground font-normal ml-2">({journals.length} jurnal)</span>
        </h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {journals.map((journal) => (
          <JournalCard key={journal.id} journal={journal} />
        ))}
      </div>
    </div>
  );
}
