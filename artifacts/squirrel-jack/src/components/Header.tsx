import { useState, useEffect } from "react";
import { Menu, X, Phone, ShieldCheck, Leaf, ThumbsUp } from "lucide-react";
import { Link } from "wouter";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg py-2" : "bg-background py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Top bar with trust badges - hidden on mobile */}
        <div className="hidden lg:flex justify-end gap-4 mb-2 text-xs font-semibold text-foreground/80">
          <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><ShieldCheck className="w-3 h-3 text-primary" /> Fast & Reliable</span>
          <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><Leaf className="w-3 h-3 text-primary" /> Eco-Friendly Disposal</span>
          <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><ThumbsUp className="w-3 h-3 text-primary" /> Honest & Dependable</span>
        </div>

        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group" data-testid="link-logo">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-heading font-bold text-foreground leading-tight tracking-tight">SQUIRREL JACK</span>
              <span className="text-xs md:text-sm font-heading font-semibold text-primary leading-tight tracking-wider uppercase">Junk Removal</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-heading font-bold text-sm text-foreground hover:text-primary transition-colors tracking-wide uppercase"
                data-testid={`link-nav-${link.name.toLowerCase().replace(' ', '-')}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-background border-t border-white/10 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 pt-[72px] sm:pt-[72px]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-heading font-bold text-xl text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              data-testid={`link-mobile-nav-${link.name.toLowerCase().replace(' ', '-')}`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 justify-center mt-4">
               <span className="text-xs bg-white/5 px-3 py-1.5 rounded-full">Fast & Reliable</span>
               <span className="text-xs bg-white/5 px-3 py-1.5 rounded-full">Eco-Friendly</span>
               <span className="text-xs bg-white/5 px-3 py-1.5 rounded-full">Honest</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
