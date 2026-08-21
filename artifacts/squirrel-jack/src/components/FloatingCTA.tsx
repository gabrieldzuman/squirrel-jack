import { MessageSquare, Phone } from "lucide-react";

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-[30.45px] h-[30.45px] fill-current"
    >
      <path d="M13.5 21v-8h2.75l.4-3h-3.15V8.08c0-.87.24-1.46 1.5-1.46h1.8V3.94c-.31-.04-1.38-.14-2.63-.14-2.6 0-4.38 1.59-4.38 4.51V10H7v3h2.79v8h3.71Z" />
    </svg>
  );
}

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      <a
        href="https://www.facebook.com/squirreljack"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-full shadow-[0_4px_14px_rgba(24,119,242,0.5)] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Visit us on Facebook"
        data-testid="floating-cta-facebook"
      >
        <span className="absolute right-16 bg-white text-[#01200e] text-xs font-bold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Facebook
        </span>
        <FacebookIcon />
      </a>

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
