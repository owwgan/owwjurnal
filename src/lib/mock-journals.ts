import { Journal } from '@/types/journal';

// Mock data for demonstration - akan diganti dengan real API nanti
export const mockJournals: Journal[] = [
  {
    id: '1',
    title: 'Pengaruh Media Sosial Terhadap Perilaku Konsumen Generasi Z',
    authors: ['Budi Santoso', 'Rina Wijaya'],
    abstract: 'Penelitian ini menganalisis dampak penggunaan media sosial terhadap keputusan pembelian generasi Z. Menggunakan metode kuantitatif dengan 500 responden, ditemukan korelasi signifikan antara intensitas penggunaan media sosial dan impulsive buying behavior.',
    year: 2024,
    source: 'sinta',
    sintaAccreditation: 'S2',
    language: 'id',
    researchType: 'kuantitatif',
    downloadUrl: '#',
    doi: '10.1234/example.2024.001',
    citations: 15,
  },
  {
    id: '2',
    title: 'Studi Fenomenologi Pengalaman Belajar Daring Mahasiswa',
    authors: ['Dewi Anggraini', 'Ahmad Fauzi', 'Maria Lestari'],
    abstract: 'Penelitian kualitatif ini mengeksplorasi pengalaman belajar daring mahasiswa selama pandemi. Melalui wawancara mendalam dengan 20 informan, teridentifikasi tema-tema utama terkait adaptasi, tantangan, dan strategi coping mahasiswa.',
    year: 2023,
    source: 'garuda',
    sintaAccreditation: 'S3',
    language: 'id',
    researchType: 'kualitatif',
    downloadUrl: '#',
    citations: 28,
  },
  {
    id: '3',
    title: 'Machine Learning Approach for Indonesian Text Classification',
    authors: ['John Smith', 'Agus Prasetyo'],
    abstract: 'This study proposes a novel machine learning approach for classifying Indonesian text documents. Using a combination of BERT and traditional ML algorithms, we achieved 94% accuracy on the benchmark dataset.',
    year: 2024,
    source: 'google_scholar',
    language: 'en',
    researchType: 'kuantitatif',
    downloadUrl: '#',
    doi: '10.5678/ml.indo.2024',
    citations: 42,
  },
  {
    id: '4',
    title: 'Analisis Strategi Pemasaran UMKM di Era Digital',
    authors: ['Siti Nurhaliza', 'Bambang Sutrisno'],
    abstract: 'Penelitian mixed method ini menganalisis strategi pemasaran digital yang efektif untuk UMKM. Kombinasi survei kuantitatif dan studi kasus kualitatif menghasilkan framework strategi pemasaran digital yang applicable.',
    year: 2023,
    source: 'sinta',
    sintaAccreditation: 'S1',
    language: 'id',
    researchType: 'mixed',
    downloadUrl: '#',
    citations: 56,
  },
  {
    id: '5',
    title: 'Deep Learning for Medical Image Analysis: A Comprehensive Review',
    authors: ['Emily Chen', 'David Lee', 'Michael Wong'],
    abstract: 'This comprehensive review examines the latest advances in deep learning applications for medical image analysis, covering CNN architectures, transfer learning strategies, and clinical validation approaches.',
    year: 2024,
    source: 'pubmed',
    language: 'en',
    researchType: 'kualitatif',
    downloadUrl: '#',
    doi: '10.9999/pubmed.2024.review',
    citations: 124,
  },
  {
    id: '6',
    title: 'Transformer Models for Low-Resource Languages',
    authors: ['Alex Johnson', 'Putri Handayani'],
    abstract: 'We present novel adaptations of transformer architectures for low-resource languages, with specific focus on Indonesian and regional languages. Our approach reduces training data requirements by 60% while maintaining competitive performance.',
    year: 2024,
    source: 'arxiv',
    language: 'en',
    researchType: 'kuantitatif',
    downloadUrl: '#',
    citations: 18,
  },
];

export function searchJournals(query: string, filters?: Partial<{
  sources: string[];
  sintaAccreditation: string[];
  yearFrom: number;
  yearTo: number;
  researchType: string[];
  language: string[];
}>): Journal[] {
  let results = mockJournals;

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(j => 
      j.title.toLowerCase().includes(lowerQuery) ||
      j.abstract.toLowerCase().includes(lowerQuery) ||
      j.authors.some(a => a.toLowerCase().includes(lowerQuery))
    );
  }

  if (filters?.sources?.length) {
    results = results.filter(j => filters.sources!.includes(j.source));
  }

  if (filters?.sintaAccreditation?.length) {
    results = results.filter(j => 
      j.sintaAccreditation && filters.sintaAccreditation!.includes(j.sintaAccreditation)
    );
  }

  if (filters?.yearFrom) {
    results = results.filter(j => j.year >= filters.yearFrom!);
  }

  if (filters?.yearTo) {
    results = results.filter(j => j.year <= filters.yearTo!);
  }

  if (filters?.researchType?.length) {
    results = results.filter(j => 
      j.researchType && filters.researchType!.includes(j.researchType)
    );
  }

  if (filters?.language?.length) {
    results = results.filter(j => filters.language!.includes(j.language));
  }

  return results;
}
