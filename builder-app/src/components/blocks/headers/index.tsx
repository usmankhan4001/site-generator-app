// Auto-generated Untitled UI Headers Block Registry (25 components)
'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Terminal, 
  Layers, 
  Zap,
  Code,
  ExternalLink,
  Phone
} from 'lucide-react';
import { HeaderNavBlockProps, PuckComponentConfig } from '../types';

export interface HeaderProps extends HeaderNavBlockProps {
  className?: string;
}

// Reusable Base Navigation Bar
export function BaseHeaderRenderer({
  variant = 'sticky-blur',
  logoText = 'Untitled UI',
  logoBadge = 'PRO',
  tagline = 'Next-gen enterprise stack',
  links = [
    { label: 'Products', href: '#products' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Developers', href: '#developers' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' }
  ],
  ctaText = 'Get Started',
  ctaHref = '#signup',
  secondaryCtaText = 'Sign In',
  secondaryCtaHref = '#login',
  badgeText = 'v2.4 Released',
  enableSearch = false,
  enableCart = false,
  cartCount = 2,
  phone = '+1 (800) 555-0199',
  announcementText,
  themeMode = 'auto',
  className = ''
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isStickyBlur = variant.startsWith('sticky-blur');
  const isMegaMenu = variant.startsWith('mega-menu');
  const isEcomCart = variant.startsWith('e-com-cart');
  const isMonogram = variant.startsWith('minimal-monogram');
  const isSplit = variant.startsWith('split-links');
  const isCentered = variant.startsWith('centered');

  return (
    <header className={`w-full transition-all duration-200 z-50 ${
      isStickyBlur ? 'sticky top-0 backdrop-blur-md bg-background/80 border-b border-border/60' : 
      isEcomCart ? 'bg-background border-b border-border shadow-xs' :
      isMonogram ? 'bg-background/95 border-b border-border/40 py-1' :
      isCentered ? 'bg-background/90 border-b border-border' :
      'bg-background border-b border-border'
    } ${className}`}>
      {/* Optional Top Announcement Banner */}
      {announcementText && (
        <div className="bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground flex items-center justify-center gap-2">
          <span>{announcementText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* LEFT: Brand Logo / Monogram */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3 group">
              <div className={`flex items-center justify-center font-bold tracking-tight transition-transform group-hover:scale-105 ${
                isMonogram 
                  ? 'w-10 h-10 rounded-xl bg-primary text-primary-foreground text-lg shadow-sm' 
                  : 'w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 text-base'
              }`}>
                {logoText.charAt(0)}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground tracking-tight text-base sm:text-lg">
                    {logoText}
                  </span>
                  {logoBadge && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/25">
                      {logoBadge}
                    </span>
                  )}
                </div>
                {tagline && !isMonogram && (
                  <span className="text-[11px] text-muted-foreground hidden sm:inline-block leading-none">
                    {tagline}
                  </span>
                )}
              </div>
            </a>

            {/* NAV LINKS (Default & Mega Menu Desktop) */}
            {!isSplit && !isCentered && (
              <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                {links.map((link, idx) => (
                  <div key={idx} className="relative">
                    {isMegaMenu && idx === 0 ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                          onMouseEnter={() => setMegaMenuOpen(true)}
                          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <span>{link.label}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Mega Menu Dropdown */}
                        {megaMenuOpen && (
                          <div 
                            onMouseLeave={() => setMegaMenuOpen(false)}
                            className="absolute top-full left-0 mt-2 w-[540px] p-4 bg-card border border-border rounded-xl shadow-xl z-50 grid grid-cols-2 gap-3"
                          >
                            <div className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-border/40">
                              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
                                <Zap className="w-4 h-4" /> Global Treasury
                              </div>
                              <p className="text-xs text-muted-foreground">Multi-currency accounts and programmatic payouts in 180+ countries.</p>
                            </div>
                            <div className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-border/40">
                              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
                                <ShieldCheck className="w-4 h-4" /> Automated KYC
                              </div>
                              <p className="text-xs text-muted-foreground">Instant compliance verification and automated merchant underwriting.</p>
                            </div>
                            <div className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-border/40">
                              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
                                <Terminal className="w-4 h-4" /> Developer APIs
                              </div>
                              <p className="text-xs text-muted-foreground">REST, GraphQL & Webhook engines with sandbox testing tokens.</p>
                            </div>
                            <div className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-border/40">
                              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
                                <Layers className="w-4 h-4" /> Cloud Dokploy
                              </div>
                              <p className="text-xs text-muted-foreground">Direct PaaS container orchestration with isolated environments.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* SPLIT LINKS: Left Group & Right Group Around Center Logo */}
          {isSplit && (
            <nav className="hidden md:flex items-center gap-6">
              {links.slice(0, Math.ceil(links.length / 2)).map((link, idx) => (
                <a key={idx} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              ))}
              <div className="h-4 w-px bg-border mx-2" />
              {links.slice(Math.ceil(links.length / 2)).map((link, idx) => (
                <a key={idx} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* CENTERED NAV: Links Centered in Middle */}
          {isCentered && (
            <nav className="hidden lg:flex items-center gap-6">
              {links.map((link, idx) => (
                <a key={idx} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* RIGHT: Search, Cart, Contact & CTA Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar / Icon */}
            {enableSearch && (
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 lg:w-48 pl-8 pr-3 py-1.5 text-xs bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            )}

            {/* E-Commerce Cart Trigger Drawer */}
            {enableCart && (
              <button
                type="button"
                onClick={() => setCartDrawerOpen(!cartDrawerOpen)}
                className="relative p-2 text-foreground/80 hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Secondary CTA (Sign In / Contact) */}
            {secondaryCtaText && (
              <a
                href={secondaryCtaHref}
                className="hidden sm:inline-flex items-center px-3.5 py-1.5 text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {secondaryCtaText}
              </a>
            )}

            {/* Primary Action Button */}
            {ctaText && (
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted/60"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-card/95 rounded-b-xl px-4 mt-1 shadow-lg space-y-3">
            <div className="flex flex-col space-y-2">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
                >
                  {link.label}
                </a>
              ))}
            </div>
            {enableSearch && (
              <div className="relative pt-2">
                <input
                  type="text"
                  placeholder="Search platform..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-muted border border-border rounded-md text-foreground"
                />
                <Search className="w-4 h-4 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            )}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref}
                  className="w-full text-center py-2 text-sm font-medium border border-border rounded-lg"
                >
                  {secondaryCtaText}
                </a>
              )}
              {ctaText && (
                <a
                  href={ctaHref}
                  className="w-full text-center py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg"
                >
                  {ctaText}
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Cart Drawer Simulation */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-full max-w-md bg-card p-6 flex flex-col justify-between shadow-2xl h-full border-l border-border animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary" /> Your Cart ({cartCount})
                </h3>
                <button 
                  type="button" 
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="py-6 space-y-4">
                <div className="p-3 rounded-lg border border-border/80 bg-muted/30 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Cloud API License</h4>
                    <p className="text-xs text-muted-foreground">Annual enterprise seat</p>
                  </div>
                  <span className="font-semibold text-sm">$499.00</span>
                </div>
                <div className="p-3 rounded-lg border border-border/80 bg-muted/30 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Dokploy Dedicated Worker</h4>
                    <p className="text-xs text-muted-foreground">High-memory container node</p>
                  </div>
                  <span className="font-semibold text-sm">$120.00</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex justify-between text-sm font-semibold">
                <span>Subtotal</span>
                <span>$619.00</span>
              </div>
              <button
                type="button"
                onClick={() => setCartDrawerOpen(false)}
                className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Puck configuration schema for Header blocks
export const headerPuckConfig: PuckComponentConfig<HeaderProps> = {
  label: 'Navigation Header',
  defaultProps: {
    logoText: 'Untitled UI',
    logoBadge: 'PRO',
    tagline: 'Modern enterprise infrastructure',
    ctaText: 'Get Started',
    ctaHref: '#signup',
    secondaryCtaText: 'Sign In',
    secondaryCtaHref: '#login',
    enableSearch: false,
    enableCart: false,
    cartCount: 2
  },
  fields: {
    logoText: { type: 'text', label: 'Brand Logo Name' },
    logoBadge: { type: 'text', label: 'Brand Badge' },
    tagline: { type: 'text', label: 'Tagline' },
    ctaText: { type: 'text', label: 'Primary CTA Text' },
    ctaHref: { type: 'text', label: 'Primary CTA Link' },
    secondaryCtaText: { type: 'text', label: 'Secondary CTA Text' },
    secondaryCtaHref: { type: 'text', label: 'Secondary CTA Link' },
    badgeText: { type: 'text', label: 'Release Badge' },
    enableSearch: { type: 'boolean', label: 'Show Search Bar' },
    enableCart: { type: 'boolean', label: 'Show Cart Drawer' },
    cartCount: { type: 'number', label: 'Cart Count' }
  },
  render: (props) => <BaseHeaderRenderer {...props} />
};

// Header Sticky Blur Default (sticky-blur)
export function HeaderStickyBlurDefault(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="sticky-blur"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Live System Status: 100%"
      {...props}
    />
  );
}

export const HeaderStickyBlurDefaultConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Sticky Blur Default',
  render: (props) => <HeaderStickyBlurDefault {...props} />
};

// Header Sticky Blur Bordered (sticky-blur)
export function HeaderStickyBlurBordered(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="sticky-blur"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Live System Status: 100%"
      {...props}
    />
  );
}

export const HeaderStickyBlurBorderedConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Sticky Blur Bordered',
  render: (props) => <HeaderStickyBlurBordered {...props} />
};

// Header Sticky Blur Dark (sticky-blur)
export function HeaderStickyBlurDark(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="sticky-blur"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Live System Status: 100%"
      {...props}
    />
  );
}

export const HeaderStickyBlurDarkConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Sticky Blur Dark',
  render: (props) => <HeaderStickyBlurDark {...props} />
};

// Header Sticky Blur Floating (sticky-blur)
export function HeaderStickyBlurFloating(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="sticky-blur"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Live System Status: 100%"
      {...props}
    />
  );
}

export const HeaderStickyBlurFloatingConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Sticky Blur Floating',
  render: (props) => <HeaderStickyBlurFloating {...props} />
};

// Header Sticky Blur Minimal (sticky-blur)
export function HeaderStickyBlurMinimal(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="sticky-blur"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Live System Status: 100%"
      {...props}
    />
  );
}

export const HeaderStickyBlurMinimalConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Sticky Blur Minimal',
  render: (props) => <HeaderStickyBlurMinimal {...props} />
};

// Header Mega Menu Solutions (mega-menu)
export function HeaderMegaMenuSolutions(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="mega-menu"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderMegaMenuSolutionsConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Mega Menu Solutions',
  render: (props) => <HeaderMegaMenuSolutions {...props} />
};

// Header Mega Menu Developer (mega-menu)
export function HeaderMegaMenuDeveloper(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="mega-menu"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderMegaMenuDeveloperConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Mega Menu Developer',
  render: (props) => <HeaderMegaMenuDeveloper {...props} />
};

// Header Mega Menu Fintech (mega-menu)
export function HeaderMegaMenuFintech(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="mega-menu"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderMegaMenuFintechConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Mega Menu Fintech',
  render: (props) => <HeaderMegaMenuFintech {...props} />
};

// Header Mega Menu Enterprise (mega-menu)
export function HeaderMegaMenuEnterprise(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="mega-menu"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderMegaMenuEnterpriseConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Mega Menu Enterprise',
  render: (props) => <HeaderMegaMenuEnterprise {...props} />
};

// Header Mega Menu Two-Column (mega-menu)
export function HeaderMegaMenuTwoColumn(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="mega-menu"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderMegaMenuTwoColumnConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Mega Menu Two-Column',
  render: (props) => <HeaderMegaMenuTwoColumn {...props} />
};

// Header E-Com Cart Default (e-com-cart)
export function HeaderEcomCartDefault(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="e-com-cart"
      announcementText={undefined}
      enableSearch={true}
      enableCart={true}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderEcomCartDefaultConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header E-Com Cart Default',
  render: (props) => <HeaderEcomCartDefault {...props} />
};

// Header E-Com Cart Search (e-com-cart)
export function HeaderEcomCartSearch(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="e-com-cart"
      announcementText={undefined}
      enableSearch={true}
      enableCart={true}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderEcomCartSearchConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header E-Com Cart Search',
  render: (props) => <HeaderEcomCartSearch {...props} />
};

// Header E-Com Cart Promo Bar (e-com-cart)
export function HeaderEcomCartPromoBar(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="e-com-cart"
      announcementText={'Special Launch Offer: Save 25% on annual billing this week'}
      enableSearch={true}
      enableCart={true}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderEcomCartPromoBarConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header E-Com Cart Promo Bar',
  render: (props) => <HeaderEcomCartPromoBar {...props} />
};

// Header E-Com Cart Compact (e-com-cart)
export function HeaderEcomCartCompact(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="e-com-cart"
      announcementText={undefined}
      enableSearch={true}
      enableCart={true}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderEcomCartCompactConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header E-Com Cart Compact',
  render: (props) => <HeaderEcomCartCompact {...props} />
};

// Header E-Com Cart Luxury (e-com-cart)
export function HeaderEcomCartLuxury(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="e-com-cart"
      announcementText={undefined}
      enableSearch={true}
      enableCart={true}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderEcomCartLuxuryConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header E-Com Cart Luxury',
  render: (props) => <HeaderEcomCartLuxury {...props} />
};

// Header Monogram Classic (minimal-monogram)
export function HeaderMonogramClassic(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="minimal-monogram"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderMonogramClassicConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Monogram Classic',
  render: (props) => <HeaderMonogramClassic {...props} />
};

// Header Monogram Modern (minimal-monogram)
export function HeaderMonogramModern(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="minimal-monogram"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderMonogramModernConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Monogram Modern',
  render: (props) => <HeaderMonogramModern {...props} />
};

// Header Monogram Bold (minimal-monogram)
export function HeaderMonogramBold(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="minimal-monogram"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderMonogramBoldConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Monogram Bold',
  render: (props) => <HeaderMonogramBold {...props} />
};

// Header Monogram Agency (minimal-monogram)
export function HeaderMonogramAgency(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="minimal-monogram"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderMonogramAgencyConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Monogram Agency',
  render: (props) => <HeaderMonogramAgency {...props} />
};

// Header Split Links Balanced (split-links)
export function HeaderSplitLinksBalanced(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="split-links"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderSplitLinksBalancedConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Split Links Balanced',
  render: (props) => <HeaderSplitLinksBalanced {...props} />
};

// Header Split Links Wide (split-links)
export function HeaderSplitLinksWide(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="split-links"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderSplitLinksWideConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Split Links Wide',
  render: (props) => <HeaderSplitLinksWide {...props} />
};

// Header Split Links Action (split-links)
export function HeaderSplitLinksAction(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="split-links"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderSplitLinksActionConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Split Links Action',
  render: (props) => <HeaderSplitLinksAction {...props} />
};

// Header Centered Stack (centered)
export function HeaderCenteredStack(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="centered"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderCenteredStackConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Centered Stack',
  render: (props) => <HeaderCenteredStack {...props} />
};

// Header Centered Clean (centered)
export function HeaderCenteredClean(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="centered"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderCenteredCleanConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Centered Clean',
  render: (props) => <HeaderCenteredClean {...props} />
};

// Header Centered Editorial (centered)
export function HeaderCenteredEditorial(props: HeaderProps) {
  return (
    <BaseHeaderRenderer
      variant="centered"
      announcementText={undefined}
      enableSearch={props.enableSearch || false}
      enableCart={props.enableCart || false}
      badgeText="Untitled UI v2.0"
      {...props}
    />
  );
}

export const HeaderCenteredEditorialConfig: PuckComponentConfig<HeaderProps> = {
  ...headerPuckConfig,
  label: 'Header Centered Editorial',
  render: (props) => <HeaderCenteredEditorial {...props} />
};
