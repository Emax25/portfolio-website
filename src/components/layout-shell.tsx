import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, Mail, Linkedin, Github, FileText } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { profile } from '@/content/profile';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

interface LayoutShellProps {
  children: ReactNode;
}

type NavItem =
  | { label: string; kind: 'hash'; id: string }
  | { label: string; kind: 'route'; to: string };

const navItems: NavItem[] = [
  { label: 'About', kind: 'hash', id: 'about' },
  { label: 'Skills', kind: 'hash', id: 'skills' },
  { label: 'Projects', kind: 'hash', id: 'projects' },
  { label: 'Experience', kind: 'hash', id: 'experience' },
  { label: 'Education', kind: 'hash', id: 'education' },
  { label: 'Journey', kind: 'route', to: '/journey' },
  { label: 'How I Build', kind: 'route', to: '/how-i-build' },
  { label: 'Contact', kind: 'hash', id: 'contact' },
];

export function LayoutShell({ children }: LayoutShellProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (targetId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Scroll to top on route change (unless there is a hash)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Scroll to hash on page load or when hash changes
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between max-w-6xl">
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
          >
            Charlie Carvajal
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 text-[13px] lg:text-sm font-medium">
            {navItems.map((item) =>
              item.kind === 'route' ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    location.pathname === item.to
                      ? 'text-foreground transition-colors'
                      : 'text-muted-foreground hover:text-foreground transition-colors'
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
            <Separator orientation="vertical" className="h-4" />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-9 w-9 rounded-md"
            >
              {theme === 'dark' ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-slate-700" />
              )}
            </Button>
          </nav>

          {/* Mobile Nav */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-9 w-9 rounded-md"
            >
              {theme === 'dark' ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-slate-700" />
              )}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                }
              />
              <SheetContent side="right" className="w-[260px] sm:w-[300px] border-l border-border bg-background">
                <SheetHeader className="text-left pb-4 border-b border-border">
                  <SheetTitle className="text-lg font-semibold">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) =>
                    item.kind === 'route' ? (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className={
                          location.pathname === item.to
                            ? 'text-base font-medium text-foreground transition-colors py-1'
                            : 'text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-1'
                        }
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.id}
                        href={`/#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.id);
                        }}
                        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        {item.label}
                      </a>
                    )
                  )}
                  <Separator className="my-2" />
                  <div className="flex flex-col space-y-3 pt-2">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Resume PDF</span>
                    </a>
                    <a
                      href="mailto:carvajalchar25@uchicago.edu"
                      className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span>carvajalchar25@uchicago.edu</span>
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="flex-1 w-full focus:outline-none">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-muted/30 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-sm font-semibold tracking-tight">Charlie Carvajal</span>
            <p className="text-xs text-muted-foreground text-center md:text-left">
              Quantitative Finance Portfolio. Built with React, Tailwind, and shadcn/ui.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="mailto:carvajalchar25@uchicago.edu"
              className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'h-9 w-9 rounded-md' })}
              title="Email"
            >
              <Mail className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">Email</span>
            </a>
            <a
              href="https://linkedin.com/in/carvajalchar"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'h-9 w-9 rounded-md' })}
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'h-9 w-9 rounded-md' })}
              title="GitHub"
            >
              <Github className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'sm', className: 'ml-2 gap-1.5 text-xs' })}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 max-w-6xl mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Charlie Carvajal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
