import { Phone, MessageSquare, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#e47200] relative overflow-hidden">
      {/* Background texture/pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#01200e 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-[#f6e5d7] rounded-3xl p-8 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(1,32,14,0.3)] border-4 border-[#01200e]">
          
          <div className="inline-block bg-[#01200e] text-[#f6e5d7] font-bold text-xs md:text-sm tracking-wider uppercase px-4 py-1.5 rounded-full mb-8">
            Residential & Commercial Services
          </div>

          <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#01200e] mb-12">
            Ready to Reclaim Your Space?
          </h2>

          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <a 
              href="tel:8595287664"
              className="flex flex-col items-center justify-center gap-3 bg-[#01200e] hover:bg-[#01200e]/90 text-[#f6e5d7] p-8 rounded-2xl transition-transform hover:-translate-y-2 group flex-1"
              data-testid="link-contact-call"
            >
              <div className="bg-[#e47200] p-4 rounded-full text-[#01200e] group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-semibold opacity-80 uppercase tracking-widest mb-1">Call Us</p>
                <p className="font-heading font-extrabold text-2xl md:text-3xl">859-528-7664</p>
              </div>
            </a>

            <a 
              href="sms:8596295695"
              className="flex flex-col items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#01200e] border-2 border-[#01200e] p-8 rounded-2xl transition-transform hover:-translate-y-2 group flex-1 shadow-lg"
              data-testid="link-contact-text"
            >
              <div className="bg-[#25D366] p-4 rounded-full text-white group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-semibold opacity-60 uppercase tracking-widest mb-1">Text Us</p>
                <p className="font-heading font-extrabold text-2xl md:text-3xl">859-629-5695</p>
              </div>
            </a>
          </div>

          <div className="bg-[#e47200]/10 border border-[#e47200]/20 rounded-xl p-6 text-left">
            <div className="flex items-start gap-4">
              <div className="bg-[#e47200] p-2 rounded-lg text-white mt-1 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#01200e] text-lg mb-1">Serving Lexington & Surrounding Areas</h4>
                <p className="text-[#01200e]/80 text-sm md:text-base leading-relaxed">
                  Lexington, Nicholasville, Georgetown, Winchester, Richmond, Versailles and surrounding communities.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
