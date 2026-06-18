import { MessageSquare, Phone } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      <a
        href="tel:8595287664"
        className="flex items-center justify-center w-14 h-14 bg-[#e47200] hover:bg-[#c96200] text-white rounded-full shadow-[0_4px_14px_rgba(228,114,0,0.5)] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Call us"
        data-testid="floating-cta-call"
      >
        <span className="absolute right-16 bg-white text-[#01200e] text-xs font-bold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call us!
        </span>
        <Phone className="w-6 h-6" />
      </a>

      <a
        href="sms:8596295695"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Text us"
        data-testid="floating-cta-text"
      >
        <span className="absolute right-16 bg-white text-[#01200e] text-xs font-bold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Text us!
        </span>
        <MessageSquare className="w-6 h-6" />
      </a>
    </div>
  );
}
