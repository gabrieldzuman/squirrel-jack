import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone, ShieldCheck, Leaf, ThumbsUp } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#01200e] shadow-lg py-2" : "bg-[#01200e] py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
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
              <a
                href="tel:8595287664"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md"
                data-testid="button-nav-call"
              >
                <Phone className="w-4 h-4" />
                <span>859-528-7664</span>
              </a>
            </nav>

            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer rendered in a portal directly on <body> */}
      {createPortal(
        <div
          className={`lg:hidden fixed inset-0 z-[9999] transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "#01200e" }}
        >
          <div className="flex flex-col h-full px-6 pt-6 pb-10 overflow-y-auto">
            {/* Header row inside drawer */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-foreground leading-tight">SQUIRREL JACK</span>
                <span className="text-xs font-heading font-semibold text-primary leading-tight tracking-wider uppercase">Junk Removal</span>
              </div>
              <button
                className="p-2 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-heading font-bold text-2xl text-foreground hover:text-primary transition-colors py-3 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.name.toLowerCase().replace(' ', '-')}`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="mt-auto pt-8 flex flex-col gap-4">
              <a
                href="tel:8595287664"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-4 rounded-xl text-lg"
                data-testid="button-mobile-call"
              >
                <Phone className="w-5 h-5" />
                <span>Call: 859-528-7664</span>
              </a>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-foreground/80">Fast & Reliable</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-foreground/80">Eco-Friendly</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-foreground/80">Honest</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
