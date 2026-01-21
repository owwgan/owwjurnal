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
    <section className="py-20 bg-body-mustard relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pattern-gradient-mesh pointer-events-none opacity-50" />
      
      {/* Floating shapes */}
      <div className="floating-shape floating-shape-purple w-72 h-72 -top-36 -right-36 animate-float-slow" />
      <div className="floating-shape floating-shape-pink w-56 h-56 bottom-0 -left-28 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <Card className="glass-strong rounded-3xl shadow-soft-lg max-w-3xl mx-auto border-0 overflow-hidden">
          <CardHeader className="text-center pb-6 border-b border-border/30">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 gradient-primary flex items-center justify-center rounded-2xl shadow-glow">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
              <Sparkles className="h-8 w-8 text-primary animate-wiggle" />
            </div>
            
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 gradient-primary rounded-full" />
              <span className="text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase">
                AI POWERED
              </span>
              <div className="w-6 h-0.5 gradient-primary rounded-full" />
            </div>
            
            <CardTitle className="text-3xl font-black text-foreground tracking-tight">
              Rekomendasi Jurnal mu ✨
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Masukkan judul skripsi dan jenis penelitian, AI akan mencarikan jurnal yang mendukung
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8 pb-8 px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="thesis-title" className="text-base font-bold uppercase tracking-wide">
                  Judul Skripsi
                </Label>
                <Input
                  id="thesis-title"
                  placeholder="Contoh: Pengaruh Media Sosial terhadap Minat Baca Mahasiswa"
                  value={thesisTitle}
                  onChange={(e) => setThesisTitle(e.target.value)}
                  className="h-14 text-base bg-background/50 border border-border/50 rounded-xl focus-visible:ring-2 focus-visible:ring-primary font-medium"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-bold uppercase tracking-wide">
                  Jenis Penelitian
                </Label>
                <RadioGroup
                  value={researchType}
                  onValueChange={(value) => setResearchType(value as typeof researchType)}
                  className="flex flex-wrap gap-4"
                >
                  {[
                    { value: 'kualitatif', label: 'KUALITATIF' },
                    { value: 'kuantitatif', label: 'KUANTITATIF' },
                    { value: 'mixed', label: 'MIXED METHOD' },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option.value} 
                        id={option.value} 
                        className="border-2 border-border" 
                      />
                      <Label 
                        htmlFor={option.value} 
                        className="cursor-pointer font-bold text-sm tracking-wide"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 gradient-primary text-primary-foreground text-lg font-black rounded-full shadow-glow hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300 uppercase tracking-wide"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    AI SEDANG MENGANALISIS...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    CARI JURNAL PENDUKUNG
                  </>
                )}
              </Button>
            </form>

            {aiAnalysis && (
              <div className="mt-8 p-6 glass rounded-2xl">
                <h4 className="font-black text-primary mb-3 flex items-center gap-2 text-lg uppercase tracking-wide">
                  <Lightbulb className="h-5 w-5" />
                  Analisis AI
                </h4>
                <p className="text-muted-foreground whitespace-pre-wrap font-medium">{aiAnalysis}</p>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="mt-8 space-y-4">
                <h4 className="font-black text-xl text-foreground uppercase tracking-wide">
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