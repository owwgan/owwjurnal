import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SearchFilters as SearchFiltersType } from '@/types/journal';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  activeFilterCount: number;
}

const sources = [
  { id: 'google_scholar', label: 'Google Scholar' },
  { id: 'sinta', label: 'SINTA' },
  { id: 'garuda', label: 'Garuda' },
  { id: 'pubmed', label: 'PubMed' },
  { id: 'arxiv', label: 'arXiv' },
];

const sintaLevels = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];

const researchTypes = [
  { id: 'kualitatif', label: 'Kualitatif' },
  { id: 'kuantitatif', label: 'Kuantitatif' },
  { id: 'mixed', label: 'Mixed Method' },
];

const languages = [
  { id: 'id', label: 'Indonesia' },
  { id: 'en', label: 'English' },
];

export function SearchFilters({ filters, onFiltersChange, activeFilterCount }: SearchFiltersProps) {
  const toggleArrayFilter = (
    key: 'sources' | 'sintaAccreditation' | 'researchType' | 'language',
    value: string
  ) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    onFiltersChange({ ...filters, [key]: newArray });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: filters.query,
      sources: [],
      sintaAccreditation: [],
      yearFrom: undefined,
      yearTo: undefined,
      researchType: [],
      language: [],
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Filter Pencarian</SheetTitle>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive">
                <X className="h-4 w-4 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Sources */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Sumber Jurnal</Label>
            <div className="grid grid-cols-2 gap-2">
              {sources.map((source) => (
                <label
                  key={source.id}
                  className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer"
                >
                  <Checkbox
                    checked={filters.sources.includes(source.id)}
                    onCheckedChange={() => toggleArrayFilter('sources', source.id)}
                  />
                  <span className="text-sm">{source.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SINTA Accreditation */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Akreditasi SINTA</Label>
            <div className="flex flex-wrap gap-2">
              {sintaLevels.map((level) => (
                <Button
                  key={level}
                  variant={filters.sintaAccreditation.includes(level) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleArrayFilter('sintaAccreditation', level)}
                  className={filters.sintaAccreditation.includes(level) ? 'gradient-primary' : ''}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Year Range */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Tahun Publikasi</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Dari"
                value={filters.yearFrom || ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    yearFrom: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className="w-24"
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="number"
                placeholder="Sampai"
                value={filters.yearTo || ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    yearTo: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className="w-24"
              />
            </div>
          </div>

          {/* Research Type */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Jenis Penelitian</Label>
            <div className="space-y-2">
              {researchTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer"
                >
                  <Checkbox
                    checked={filters.researchType.includes(type.id)}
                    onCheckedChange={() => toggleArrayFilter('researchType', type.id)}
                  />
                  <span className="text-sm">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Bahasa</Label>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.id}
                  variant={filters.language.includes(lang.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleArrayFilter('language', lang.id)}
                  className={filters.language.includes(lang.id) ? 'gradient-primary' : ''}
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
