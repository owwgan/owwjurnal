import { Journal, CitationFormat } from '@/types/journal';

export function generateCitation(journal: Journal, format: CitationFormat): string {
  const authors = journal.authors.join(', ');
  const year = journal.year;
  const title = journal.title;

  switch (format) {
    case 'apa':
      return `${authors} (${year}). ${title}. ${getSourceName(journal.source)}. ${journal.doi ? `https://doi.org/${journal.doi}` : ''}`.trim();
    
    case 'mla':
      return `${authors}. "${title}." ${getSourceName(journal.source)}, ${year}.`;
    
    case 'ieee':
      return `${authors}, "${title}," ${getSourceName(journal.source)}, ${year}.`;
    
    case 'harvard':
      return `${authors} ${year}, '${title}', ${getSourceName(journal.source)}.`;
    
    case 'chicago':
      return `${authors}. "${title}." ${getSourceName(journal.source)} (${year}).`;
    
    default:
      return `${authors} (${year}). ${title}.`;
  }
}

function getSourceName(source: Journal['source']): string {
  const names: Record<Journal['source'], string> = {
    google_scholar: 'Google Scholar',
    sinta: 'SINTA',
    garuda: 'Garuda',
    pubmed: 'PubMed',
    arxiv: 'arXiv',
  };
  return names[source];
}

export function copyCitation(citation: string): Promise<void> {
  return navigator.clipboard.writeText(citation);
}
