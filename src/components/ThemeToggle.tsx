import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 rounded-full bg-card/80 backdrop-blur-sm border-2 border-foreground/20 shadow-lg"
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed top-4 right-4 z-50 rounded-full bg-card/80 backdrop-blur-sm border-2 border-foreground/20 shadow-lg transition-all hover:scale-110 hover:shadow-xl"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-warning transition-transform rotate-0 scale-100" />
      ) : (
        <Moon className="h-5 w-5 text-primary transition-transform rotate-0 scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
