'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, ArrowRight } from 'lucide-react';
import { BusinessInfo } from '@/lib/constants';

interface HeaderProps {
  business: BusinessInfo;
  cartCount: number;
  onOpenCart: () => void;
  onConsultation?: () => void;
  scrollToSection?: (id: string) => void;
}

export function Header({
  business,
  cartCount,
  onOpenCart,
  onConsultation,
  scrollToSection,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (scrollToSection) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (typeof window !== 'undefined') {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
            {business.shortName?.charAt(0) || 'A'}
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {business.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-3.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="px-3.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            About
          </Link>
          <Link
            href="/services"
            className="px-3.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/catalog"
            className="px-3.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            Catalog
          </Link>
          <Link
            href="/contact"
            className="px-3.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* CTA & Cart Action */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="relative hidden sm:inline-flex items-center gap-1.5"
            onClick={onOpenCart}
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </Button>

          <Button
            size="sm"
            onClick={onConsultation || (() => handleNavClick('offerings'))}
            className="font-medium shadow-xs hidden sm:inline-flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Services
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Catalog
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Contact
          </Link>

          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>View Cart</span>
              </span>
              {cartCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  {cartCount}
                </span>
              )}
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onConsultation) onConsultation();
                else handleNavClick('offerings');
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
