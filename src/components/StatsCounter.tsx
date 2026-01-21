import { useCountUp } from '@/hooks/useCountUp';
import { BookOpen } from 'lucide-react';

export function StatsCounter() {
  const { count, elementRef, hasStarted } = useCountUp({ end: 10000, duration: 2000 });

  return (
    <section id="stats" className="py-20 gradient-hero relative overflow-hidden">
      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/5 to-transparent pointer-events-none" />
      
      {/* Floating shapes */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-background/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-background/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={elementRef}
          className={`flex flex-col md:flex-row items-center justify-center gap-8 opacity-0-initial ${hasStarted ? 'animate-fade-in-up' : ''}`}
        >
          {/* Icon */}
          <div className="w-24 h-24 glass-strong flex items-center justify-center rounded-3xl shadow-soft-lg group hover:scale-105 transition-all duration-300">
            <BookOpen className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          
          {/* Counter */}
          <div className="text-center md:text-left">
            <div className="flex items-baseline gap-2 justify-center md:justify-start">
              <span className="text-6xl md:text-8xl font-black text-primary-foreground leading-none tracking-tighter drop-shadow-lg">
                {count.toLocaleString()}
              </span>
              <span className="text-4xl md:text-6xl font-black text-primary-foreground/80">+</span>
            </div>
            
            <div className="mt-3 flex items-center gap-3 justify-center md:justify-start">
              <div className="w-8 h-1 bg-primary-foreground/50 rounded-full" />
              <p className="text-xl text-primary-foreground font-bold tracking-wide uppercase">
                Jurnal Tersedia
              </p>
            </div>
            
            <p className="mt-2 text-sm text-primary-foreground/60 font-medium tracking-wider">
              ジャーナル検索プラットフォーム
            </p>
          </div>

          {/* Decorative circles */}
          <div className="hidden lg:flex items-center gap-3 ml-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="w-3 h-3 rounded-full bg-primary-foreground/30 animate-bounce-gentle"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}