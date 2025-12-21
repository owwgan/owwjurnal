import { useState } from 'react';
import { Sparkles, Loader2, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Journal } from '@/types/journal';
import { JournalCard } from './JournalCard';

export function ThesisRecommendation() {
  const [thesisTitle, setThesisTitle] = useState('');
  const [researchType, setResearchType] = useState<'kualitatif' | 'kuantitatif' | 'mixed'>('kuantitatif');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Journal[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!thesisTitle.trim()) {
      toast({
        title: 'Judul diperlukan',
        description: 'Masukkan judul skripsi kamu terlebih dahulu',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setRecommendations([]);
    setAiAnalysis('');

    try {
      const { data, error } = await supabase.functions.invoke('recommend-journals', {
        body: { 
          thesisTitle, 
          researchType 
        },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setAiAnalysis(data.analysis || '');
      setRecommendations(data.recommendations || []);
      
      toast({
        title: 'Rekomendasi siap!',
        description: `Ditemukan ${data.recommendations?.length || 0} jurnal yang relevan`,
      });
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        title: 'Gagal mendapatkan rekomendasi',
        description: error instanceof Error ? error.message : 'Terjadi kesalahan, coba lagi nanti',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <CardTitle className="text-2xl text-gradient">
            Rekomendasi Jurnal untuk Skripsimu
          </CardTitle>
          <CardDescription className="text-base">
            Masukkan judul skripsi dan jenis penelitian, AI akan mencarikan jurnal yang mendukung
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2">
              <Label htmlFor="thesis-title">Judul Skripsi</Label>
              <Input
                id="thesis-title"
                placeholder="Contoh: Pengaruh Media Sosial terhadap Minat Baca Mahasiswa"
                value={thesisTitle}
                onChange={(e) => setThesisTitle(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-3">
              <Label>Jenis Penelitian</Label>
              <RadioGroup
                value={researchType}
                onValueChange={(value) => setResearchType(value as typeof researchType)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kualitatif" id="kualitatif" />
                  <Label htmlFor="kualitatif" className="cursor-pointer">Kualitatif</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kuantitatif" id="kuantitatif" />
                  <Label htmlFor="kuantitatif" className="cursor-pointer">Kuantitatif</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed" className="cursor-pointer">Mixed Method</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 gradient-accent text-accent-foreground text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  AI sedang menganalisis...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Cari Jurnal Pendukung
                </>
              )}
            </Button>
          </form>

          {aiAnalysis && (
            <div className="mt-8 p-4 rounded-lg bg-muted border border-border">
              <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Analisis AI
              </h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{aiAnalysis}</p>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="mt-8 space-y-4">
              <h4 className="font-semibold text-lg">
                Jurnal yang Direkomendasikan ({recommendations.length})
              </h4>
              <div className="grid gap-4">
                {recommendations.map((journal) => (
                  <JournalCard key={journal.id} journal={journal} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
