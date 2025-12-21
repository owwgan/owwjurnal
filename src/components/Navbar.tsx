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
    <nav className="sticky top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
              OwwJurnal
            </span>
          </a>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Beranda
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cara Kerja
            </button>
            <button 
              onClick={() => scrollToSection('stats')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Tentang
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="default"
              size="sm"
              onClick={onSearchClick}
              className="hidden sm:flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md"
            >
              <Search className="h-4 w-4" />
              <span>Cari Jurnal</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onSearchClick}
              className="sm:hidden"
            >
              <Search className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
