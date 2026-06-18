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
              Lexington, KY's trusted junk removal team — residential & commercial. Fast, friendly, and fully insured. We do the heavy lifting.
            </p>
            
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
      
      {/* Decorative Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 transform translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.3,191.7,101.44Z" fill="var(--color-background)" opacity="0.5"></path>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.15,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#01200e" opacity="0.3"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="var(--color-card)"></path>
        </svg>
      </div>
    </section>
  );
}
