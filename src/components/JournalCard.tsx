import { useState } from 'react';
import { Download, Copy, Check, ChevronDown, ChevronUp, ExternalLink, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Journal, CitationFormat } from '@/types/journal';
import { generateCitation, copyCitation } from '@/lib/citation';
import { useToast } from '@/hooks/use-toast';

interface JournalCardProps {
  journal: Journal;
}

const sourceColors: Record<Journal['source'], string> = {
  google_scholar: 'bg-secondary text-secondary-foreground',
  sinta: 'bg-primary text-primary-foreground',
  garuda: 'bg-accent text-accent-foreground',
  pubmed: 'bg-success text-success-foreground',
  arxiv: 'bg-warning text-warning-foreground',
};

const sourceLabels: Record<Journal['source'], string> = {
  google_scholar: 'Google Scholar',
  sinta: 'SINTA',
  garuda: 'Garuda',
  pubmed: 'PubMed',
  arxiv: 'arXiv',
};

const citationFormats: { id: CitationFormat; label: string }[] = [
  { id: 'apa', label: 'APA' },
  { id: 'mla', label: 'MLA' },
  { id: 'ieee', label: 'IEEE' },
  { id: 'harvard', label: 'Harvard' },
  { id: 'chicago', label: 'Chicago' },
];

export function JournalCard({ journal }: JournalCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyCitation = async (format: CitationFormat) => {
    const citation = generateCitation(journal, format);
    await copyCitation(citation);
    setCopiedFormat(format);
    toast({
      title: 'Sitasi disalin!',
      description: `Format ${format.toUpperCase()} berhasil disalin ke clipboard`,
    });
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownload = () => {
    if (journal.downloadUrl) {
      window.open(journal.downloadUrl, '_blank');
    }
    toast({
      title: 'Mengunduh jurnal...',
      description: 'File akan segera diunduh',
    });
  };

  return (
    <Card className="group bg-card border-2 border-foreground shadow-brutal-sm transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge className={`${sourceColors[journal.source]} border-2 border-foreground font-bold uppercase text-xs tracking-wide`}>
            {sourceLabels[journal.source]}
          </Badge>
          {journal.sintaAccreditation && (
            <Badge variant="outline" className="border-2 border-primary text-primary font-bold uppercase text-xs">
              {journal.sintaAccreditation}
            </Badge>
          )}
          {journal.researchType && (
            <Badge variant="secondary" className="border-2 border-foreground font-bold uppercase text-xs">
              {journal.researchType === 'mixed' ? 'Mixed' : journal.researchType}
            </Badge>
          )}
          <span className="ml-auto text-xs font-black text-muted-foreground bg-muted px-3 py-1 border border-foreground">
            {journal.year}
          </span>
        </div>
        
        <h3 className="text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
          {journal.title}
        </h3>
        
        <p className="text-sm text-muted-foreground font-medium">
          {journal.authors.join(', ')}
        </p>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="relative">
          <p className={`text-sm text-muted-foreground ${!expanded ? 'line-clamp-3' : ''}`}>
            {journal.abstract}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-primary hover:text-primary/80 font-bold uppercase text-xs tracking-wide"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Sembunyikan
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Lihat Selengkapnya
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-3 border-t-2 border-foreground">
          {journal.citations !== undefined && (
            <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 border border-foreground">
              📚 {journal.citations} SITASI
            </span>
          )}
          {journal.doi && (
            <a
              href={`https://doi.org/${journal.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 bg-primary/10 px-2 py-1 border border-primary"
            >
              <ExternalLink className="h-3 w-3" />
              DOI
            </a>
          )}
          
          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1 border-2 border-foreground font-bold uppercase text-xs tracking-wide hover:bg-muted"
                >
                  <Quote className="h-4 w-4" />
                  Sitasi
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-2 border-foreground">
                {citationFormats.map((format) => (
                  <DropdownMenuItem
                    key={format.id}
                    onClick={() => handleCopyCitation(format.id)}
                    className="gap-2 font-bold"
                  >
                    {copiedFormat === format.id ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {format.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              size="sm" 
              onClick={handleDownload}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1 border-2 border-foreground font-bold uppercase text-xs tracking-wide shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_hsl(var(--foreground))] transition-all"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
