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
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-foreground shadow-brutal-sm">
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
          <div className="hidden md:flex items-center">
            <div className="flex items-center border-l-2 border-r-2 border-foreground">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-2 text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border-r-2 border-foreground"
              >
                BERANDA
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="px-6 py-2 text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border-r-2 border-foreground"
              >
                CARA KERJA
              </button>
              <button 
                onClick={() => scrollToSection('stats')}
                className="px-6 py-2 text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                TENTANG
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onSearchClick}
              className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold border-2 border-foreground shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_hsl(var(--foreground))] transition-all"
            >
              <Search className="h-4 w-4" />
              <span>CARI</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onSearchClick}
              className="sm:hidden border-2 border-foreground"
            >
              <Search className="h-4 w-4" />
            </Button>
            <div className="border-l-2 border-foreground pl-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
