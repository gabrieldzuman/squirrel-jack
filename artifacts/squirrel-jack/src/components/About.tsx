import { ShieldCheck, Clock, CircleDollarSign } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function About() {
  return (
    <section id="about" className="py-24 bg-[#f6e5d7] text-[#01200e] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 flex justify-center relative">
            <div className="absolute inset-0 bg-[#e47200]/10 rounded-full blur-[80px] transform scale-75"></div>
            <img 
              src="/squirrel-jack-logo.png" 
              alt="Squirrel Jack Mascot" 
              className="w-full max-w-lg object-contain relative z-10 drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 30px 40px rgba(1,32,14,0.3))' }}
            />
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-[#e47200] font-bold tracking-widest uppercase text-sm mb-4">About Us</span>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1] text-[#01200e]">
              Your Junk.<br />
              Our Mission.<br />
              <span className="text-[#e47200]">A Cleaner Tomorrow.</span>
            </h2>
            
            <p className="text-lg text-[#01200e]/80 font-sans mb-10 leading-relaxed max-w-2xl">
              Squirrel Jack Junk Removal is a locally owned and operated business serving Lexington and the surrounding communities. We're committed to responsible disposal — recycling and donating what we can to keep junk out of landfills.
            </p>

            {/* Founders */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl shadow-sm border border-[#01200e]/10 backdrop-blur-sm">
                <Avatar className="h-14 w-14 border-2 border-[#e47200]">
                  <AvatarFallback className="bg-[#e47200] text-white font-bold text-xl">M</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-heading font-bold text-[#01200e]">Marcos Stein</p>
                  <p className="text-xs text-[#01200e]/60 uppercase font-semibold tracking-wider">Co-founder</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl shadow-sm border border-[#01200e]/10 backdrop-blur-sm">
                <Avatar className="h-14 w-14 border-2 border-[#e47200]">
                  <AvatarFallback className="bg-[#e47200] text-white font-bold text-xl">L</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-heading font-bold text-[#01200e]">Landon Levenson</p>
                  <p className="text-xs text-[#01200e]/60 uppercase font-semibold tracking-wider">Co-founder</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-8 border-t border-[#01200e]/10">
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="bg-[#01200e] text-[#f6e5d7] p-3 rounded-full mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#01200e]">Licensed & Insured</h4>
                <p className="text-sm text-[#01200e]/70">Fully protected for your peace of mind.</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="bg-[#01200e] text-[#f6e5d7] p-3 rounded-full mb-2">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#01200e]">Same-Day Service</h4>
                <p className="text-sm text-[#01200e]/70">Available when you need us most.</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="bg-[#01200e] text-[#f6e5d7] p-3 rounded-full mb-2">
                  <CircleDollarSign className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#01200e]">Upfront Pricing</h4>
                <p className="text-sm text-[#01200e]/70">No hidden fees or surprise charges.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
