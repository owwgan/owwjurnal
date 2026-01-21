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
    <section id="how-it-works" className="py-20 bg-body-mustard relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pattern-gradient-mesh pointer-events-none opacity-50" />
      
      {/* Floating shapes */}
      <div className="floating-shape floating-shape-pink w-64 h-64 -top-32 right-0 animate-float-slow" />
      <div className="floating-shape floating-shape-purple w-48 h-48 bottom-0 -left-24 animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 gradient-primary rounded-full" />
            <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              HOW IT WORKS
            </span>
            <div className="w-12 h-0.5 gradient-primary rounded-full" />
          </div>
          
          <h2 className="text-display-lg text-foreground mb-2">
            Cara Pakainya
          </h2>
          <h2 className="text-display-lg text-gradient">
            Gampang! 🎯
          </h2>
          
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
            Tiga langkah simpel untuk menemukan jurnal terbaikmu
          </p>
        </div>
        
        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative glass rounded-3xl p-8 shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-2 opacity-0-initial animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Step number - subtle background */}
              <div className="absolute top-6 right-6 text-6xl font-black text-foreground/5 leading-none">
                {step.number}
              </div>
              
              {/* Icon container */}
              <div className="relative mb-6">
                <div className="w-16 h-16 gradient-primary flex items-center justify-center rounded-2xl shadow-glow group-hover:shadow-glow-lg group-hover:scale-110 transition-all duration-300">
                  <step.icon className="h-8 w-8 text-primary-foreground icon-bounce" />
                </div>
                {/* Small step indicator */}
                <div className="absolute -top-2 -left-2 w-7 h-7 bg-foreground text-background flex items-center justify-center text-xs font-black rounded-full">
                  {step.number}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-2xl font-black text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <span className="text-jp-accent text-muted-foreground">
                    {step.titleJp}
                  </span>
                </div>
                
                <p className="text-muted-foreground font-medium">
                  {step.description}
                </p>
              </div>
              
              {/* Bottom accent line - gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 gradient-primary rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        {/* Connecting elements - desktop only */}
        <div className="hidden md:flex justify-center items-center mt-10 gap-4">
          <div className="w-20 h-0.5 gradient-primary opacity-30 rounded-full" />
          <div className="w-4 h-4 rounded-full gradient-primary opacity-60" />
          <div className="w-20 h-0.5 gradient-primary opacity-30 rounded-full" />
          <div className="w-4 h-4 rounded-full gradient-primary opacity-60" />
          <div className="w-20 h-0.5 gradient-primary opacity-30 rounded-full" />
        </div>
      </div>
    </section>
  );
}