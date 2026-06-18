import { ArrowRight, Phone } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex justify-center">
          <div className="text-center flex flex-col items-center max-w-3xl">
            <br></br><br></br><br></br>
            
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-6 text-foreground drop-shadow-lg">
              GET YOUR <br />
              <span className="text-primary relative inline-block">
                SPACE BACK!
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-primary opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl font-sans">
              KY's trusted junk removal team, residential & commercial. Fast, friendly, and fully insured. 
              We do the heavy lifting!
            </p>
            <br></br>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href="#contact" 
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-xl text-lg transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(228,114,0,0.3)]"
                data-testid="button-hero-quote"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="tel:8595287664" 
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-foreground hover:bg-foreground hover:text-background text-foreground font-bold px-8 py-4 rounded-xl text-lg transition-all hover:-translate-y-1 shadow-lg"
                data-testid="button-hero-call"
              >
                <Phone className="w-5 h-5" />
                Call Now: 859-528-7664
              </a>
            </div>
            <br></br><br></br><br></br>
            <div className="mt-10 flex items-center gap-4 text-sm font-semibold text-foreground/70">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="">
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
