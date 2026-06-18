import { MapPin, Phone, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Left */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-6">
              <img src="/squirrel-jack-logo.png" alt="Squirrel Jack Mascot" className="w-16 h-16 object-contain" />
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-foreground leading-tight">SQUIRREL JACK</span>
                <span className="text-xs font-heading font-semibold text-primary uppercase tracking-wider">Junk Removal</span>
              </div>
            </div>
            <p className="text-foreground/70 font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Lexington, KY
            </p>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center text-center">
            <h4 className="font-heading font-bold text-lg mb-6 text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-3 mb-6">
              <a href="#home" className="text-foreground/80 hover:text-primary transition-colors">Home</a>
              <a href="#services" className="text-foreground/80 hover:text-primary transition-colors">Services</a>
              <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">About Us</a>
              <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors">Contact</a>
            </nav>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-heading font-bold text-lg mb-6 text-foreground">Our Commitment</h4>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h5 className="font-bold text-primary mb-2">Responsible Disposal</h5>
              <p className="text-foreground/80 text-sm leading-relaxed">
                We recycle and donate what we can to reduce landfill waste. Doing our part to keep Kentucky beautiful.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/50">
          <p>© {new Date().getFullYear()} Squirrel Jack. All rights reserved.</p>
          <p>Developed by Gabriel Dzuman</p>
        </div>
      </div>
    </footer>
  );
}
