import { Search, Filter, Download } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Cari',
    description: 'Masukkan kata kunci atau judul skripsimu',
    color: 'bg-card border-thick shadow-playful',
  },
  {
    icon: Filter,
    title: 'Filter',
    description: 'Pilih sumber, akreditasi, dan tahun terbit',
    color: 'bg-card border-thick shadow-playful',
  },
  {
    icon: Download,
    title: 'Unduh',
    description: 'Download jurnal dan salin sitasi langsung',
    color: 'bg-card border-thick shadow-playful',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-body-mustard">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground opacity-0-initial animate-fade-in-up">
          Cara Pakainya Gampang! 🎯
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg opacity-0-initial animate-fade-in-up delay-100">
          Tiga langkah simpel untuk menemukan jurnal terbaikmu
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`${step.color} rounded-3xl p-8 text-center card-hover-glow group opacity-0-initial animate-fade-in-up delay-${(index + 2) * 100}`}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                <step.icon className="h-10 w-10 text-primary-foreground icon-hover-rotate" />
              </div>
              <div className="inline-block bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1 rounded-full mb-3">
                Langkah {index + 1}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
