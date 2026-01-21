import { useState } from 'react';
import { Sparkles, Loader2, GraduationCap, Lightbulb } from 'lucide-react';
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
    <section className="py-16 bg-body-mustard">
      <div className="container mx-auto px-4">
        <Card className="bg-card rounded-3xl border-thick shadow-playful max-w-3xl mx-auto">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
              <Sparkles className="h-8 w-8 text-secondary animate-wiggle" />
            </div>
            <CardTitle className="text-3xl font-black text-foreground">
              Rekomendasi Jurnal mu✨
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Masukkan judul skripsi dan jenis penelitian, AI akan mencarikan jurnal yang mendukung
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="thesis-title" className="text-base font-bold">Judul Skripsi</Label>
                <Input
                  id="thesis-title"
                  placeholder="Contoh: Pengaruh Media Sosial terhadap Minat Baca Mahasiswa"
                  value={thesisTitle}
                  onChange={(e) => setThesisTitle(e.target.value)}
                  className="h-14 text-base rounded-2xl border-2 focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-bold">Jenis Penelitian</Label>
                <RadioGroup
                  value={researchType}
                  onValueChange={(value) => setResearchType(value as typeof researchType)}
                  className="flex flex-wrap gap-4"
                >
                  {[
                    { value: 'kualitatif', label: 'Kualitatif' },
                    { value: 'kuantitatif', label: 'Kuantitatif' },
                    { value: 'mixed', label: 'Mixed Method' },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} className="border-2" />
                      <Label htmlFor={option.value} className="cursor-pointer font-medium">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg font-bold rounded-2xl shadow-md transition-all hover:scale-[1.02]"
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
              <div className="mt-8 p-6 rounded-2xl bg-muted border-2 border-border">
                <h4 className="font-bold text-primary mb-3 flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5" />
                  Analisis AI
                </h4>
                <p className="text-muted-foreground whitespace-pre-wrap">{aiAnalysis}</p>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="mt-8 space-y-4">
                <h4 className="font-bold text-xl text-foreground">
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
      </div>
    </section>
  );
}
