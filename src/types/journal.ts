export interface Journal {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  source: 'google_scholar' | 'sinta' | 'garuda' | 'pubmed' | 'arxiv';
  sintaAccreditation?: 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6';
  language: 'id' | 'en' | 'other';
  researchType?: 'kualitatif' | 'kuantitatif' | 'mixed';
  downloadUrl?: string;
  doi?: string;
  citations?: number;
  relevanceScore?: number;
}

export interface SearchFilters {
  query: string;
  sources: string[];
  sintaAccreditation: string[];
  yearFrom?: number;
  yearTo?: number;
  researchType: string[];
  language: string[];
}

export interface ThesisRecommendation {
  title: string;
  researchType: 'kualitatif' | 'kuantitatif' | 'mixed';
}

export type CitationFormat = 'apa' | 'mla' | 'ieee' | 'harvard' | 'chicago';
