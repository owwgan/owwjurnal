import { Search, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onSearchClick?: () => void;
}

export function Navbar({ onSearchClick }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="glass-strong rounded-2xl shadow-soft">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 gradient-primary flex items-center justify-center rounded-xl shadow-glow transition-all duration-300 group-hover:shadow-glow-lg group-hover:scale-105">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-foreground tracking-tight leading-none">
                    OwwJurnal
                  </span>
                  <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                    ACADEMIC SEARCH
                  </span>
                </div>
              </a>

              {/* Navigation Links - Desktop */}
              <div className="hidden md:flex items-center gap-1">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-4 py-2 text-sm font-bold text-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-all duration-300"
                >
                  BERANDA
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-4 py-2 text-sm font-bold text-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-all duration-300"
                >
                  CARA KERJA
                </button>
                <button 
                  onClick={() => scrollToSection('stats')}
                  className="px-4 py-2 text-sm font-bold text-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-all duration-300"
                >
                  TENTANG
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={onSearchClick}
                  className="hidden sm:flex items-center gap-2 gradient-primary text-primary-foreground font-bold rounded-full shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
                >
                  <Search className="h-4 w-4" />
                  <span>CARI</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onSearchClick}
                  className="sm:hidden rounded-full hover:bg-primary/10"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}