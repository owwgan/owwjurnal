import { useCountUp } from '@/hooks/useCountUp';
import { BookOpen } from 'lucide-react';

export function StatsCounter() {
  const { count, elementRef, hasStarted } = useCountUp({ end: 10000, duration: 2000 });

  return (
    <section id="stats" className="py-16 bg-primary border-b-4 border-foreground relative overflow-hidden">
      {/* Halftone pattern overlay */}
      <div className="absolute inset-0 halftone-pink opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={elementRef}
          className={`flex flex-col md:flex-row items-center justify-center gap-8 opacity-0-initial ${hasStarted ? 'animate-fade-in-up' : ''}`}
        >
          {/* Icon */}
          <div className="w-24 h-24 bg-background flex items-center justify-center border-4 border-foreground shadow-brutal">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          
          {/* Counter */}
          <div className="text-center md:text-left">
            <div className="flex items-baseline gap-2 justify-center md:justify-start">
              <span className="text-6xl md:text-8xl font-black text-primary-foreground leading-none tracking-tighter">
                {count.toLocaleString()}
              </span>
              <span className="text-4xl md:text-6xl font-black text-primary-foreground/80">+</span>
            </div>
            
            <div className="mt-2 flex items-center gap-3 justify-center md:justify-start">
              <div className="w-8 h-1 bg-primary-foreground/50" />
              <p className="text-xl text-primary-foreground font-bold tracking-wide uppercase">
                Jurnal Tersedia
              </p>
            </div>
            
            <p className="mt-2 text-sm text-primary-foreground/70 font-medium">
              ジャーナル検索プラットフォーム
            </p>
          </div>

          {/* Decorative barcode */}
          <div className="hidden lg:flex items-end gap-[2px] h-16 ml-8">
            {[12, 8, 16, 4, 12, 8, 4, 16, 8, 12, 4, 8, 16, 4, 12].map((h, i) => (
              <div 
                key={i} 
                className="w-1 bg-primary-foreground/30"
                style={{ height: `${h * 4}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
