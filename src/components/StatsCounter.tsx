import { useCountUp } from '@/hooks/useCountUp';
import { BookOpen, Database, Users } from 'lucide-react';

const stats = [
  {
    icon: BookOpen,
    value: 10000,
    suffix: '+',
    label: 'Jurnal Tersedia',
  },
  {
    icon: Database,
    value: 5,
    suffix: '',
    label: 'Sumber Database',
  },
  {
    icon: Users,
    value: 1000,
    suffix: '+',
    label: 'Mahasiswa Terbantu',
  },
];

function StatItem({ icon: Icon, value, suffix, label, delay }: {
  icon: typeof BookOpen;
  value: number;
  suffix: string;
  label: string;
  delay: string;
}) {
  const { count, elementRef, hasStarted } = useCountUp({ end: value, duration: 2000 });

  return (
    <div 
      ref={elementRef}
      className={`text-center opacity-0-initial ${hasStarted ? 'animate-fade-in-up' : ''} ${delay}`}
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-foreground mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

export function StatsCounter() {
  return (
    <section className="py-16 bg-card-yellow">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Dipercaya Mahasiswa Indonesia 📊
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={`delay-${(index + 1) * 200}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
