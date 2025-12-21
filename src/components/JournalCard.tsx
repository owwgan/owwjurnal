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
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge className={sourceColors[journal.source]}>
            {sourceLabels[journal.source]}
          </Badge>
          {journal.sintaAccreditation && (
            <Badge variant="outline" className="border-primary text-primary">
              {journal.sintaAccreditation}
            </Badge>
          )}
          {journal.researchType && (
            <Badge variant="secondary">
              {journal.researchType === 'mixed' ? 'Mixed Method' : 
               journal.researchType.charAt(0).toUpperCase() + journal.researchType.slice(1)}
            </Badge>
          )}
          <span className="ml-auto text-sm text-muted-foreground">{journal.year}</span>
        </div>
        
        <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
          {journal.title}
        </h3>
        
        <p className="text-sm text-muted-foreground">
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
            className="mt-2 text-primary hover:text-primary/80"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Sembunyikan
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Lihat selengkapnya
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
          {journal.citations !== undefined && (
            <span className="text-xs text-muted-foreground">
              📚 {journal.citations} sitasi
            </span>
          )}
          {journal.doi && (
            <a
              href={`https://doi.org/${journal.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-secondary hover:underline flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              DOI
            </a>
          )}
          
          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Quote className="h-4 w-4" />
                  Sitasi
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {citationFormats.map((format) => (
                  <DropdownMenuItem
                    key={format.id}
                    onClick={() => handleCopyCitation(format.id)}
                    className="gap-2"
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
              className="gradient-primary text-primary-foreground gap-1"
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
