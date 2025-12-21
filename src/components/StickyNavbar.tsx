import { useState, useEffect } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

interface StickyNavbarProps {
  onSearchClick?: () => void;
}

export function StickyNavbar({ onSearchClick }: StickyNavbarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past ~400px (hero section height)
      const heroHeight = 400;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                OwwJurnal
              </span>
            </a>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onSearchClick}
                className="hidden sm:flex items-center gap-2"
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
      </div>
    </nav>
  );
}
