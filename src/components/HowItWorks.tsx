import { Search, Filter, Download } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'CARI',
    titleJp: '検索',
    description: 'Masukkan kata kunci atau judul skripsimu',
    number: '01',
  },
  {
    icon: Filter,
    title: 'FILTER',
    titleJp: 'フィルター',
    description: 'Pilih sumber, akreditasi, dan tahun terbit',
    number: '02',
  },
  {
    icon: Download,
    title: 'UNDUH',
    titleJp: 'ダウンロード',
    description: 'Download jurnal dan salin sitasi langsung',
    number: '03',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-body-mustard border-b-4 border-foreground relative overflow-hidden">
      {/* Halftone pattern */}
      <div className="absolute inset-0 halftone-pattern opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-foreground" />
            <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              HOW IT WORKS
            </span>
            <div className="w-12 h-1 bg-foreground" />
          </div>
          
          <h2 className="text-display-lg text-foreground mb-2">
            Cara Pakainya
          </h2>
          <h2 className="text-display-lg text-primary">
            Gampang! 🎯
          </h2>
          
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
            Tiga langkah simpel untuk menemukan jurnal terbaikmu
          </p>
        </div>
        
        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative bg-card border-4 border-foreground shadow-brutal card-hover-brutal p-6 opacity-0-initial animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Step number - large background */}
              <div className="absolute top-4 right-4 text-6xl font-black text-foreground/5 leading-none">
                {step.number}
              </div>
              
              {/* Icon container */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary flex items-center justify-center border-2 border-foreground shadow-brutal-sm">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                {/* Small step indicator */}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-foreground text-background flex items-center justify-center text-xs font-black">
                  {step.number}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-2xl font-black text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <span className="text-xs text-muted-foreground/50 font-medium">
                    {step.titleJp}
                  </span>
                </div>
                
                <p className="text-muted-foreground font-medium">
                  {step.description}
                </p>
              </div>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>

        {/* Connecting lines between cards - desktop only */}
        <div className="hidden md:flex justify-center items-center mt-8 gap-4">
          <div className="w-20 h-0.5 bg-foreground/20" />
          <div className="w-3 h-3 rotate-45 border-2 border-primary bg-background" />
          <div className="w-20 h-0.5 bg-foreground/20" />
          <div className="w-3 h-3 rotate-45 border-2 border-primary bg-background" />
          <div className="w-20 h-0.5 bg-foreground/20" />
        </div>
      </div>
    </section>
  );
}
