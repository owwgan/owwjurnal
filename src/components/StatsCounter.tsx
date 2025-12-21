import { useCountUp } from '@/hooks/useCountUp';
import { BookOpen } from 'lucide-react';


export function StatsCounter() {
  const { count, elementRef, hasStarted } = useCountUp({ end: 10000, duration: 2000 });

  return (
    <section className="py-16 bg-card-yellow">
      <div className="container mx-auto px-4">
        <div 
          ref={elementRef}
          className={`text-center opacity-0-initial ${hasStarted ? 'animate-fade-in-up' : ''}`}
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <div className="text-5xl md:text-6xl font-black text-foreground mb-2">
            {count.toLocaleString()}+
          </div>
          <p className="text-xl text-muted-foreground font-medium">Jurnal Tersedia</p>
        </div>
      </div>
    </section>
  );
}
