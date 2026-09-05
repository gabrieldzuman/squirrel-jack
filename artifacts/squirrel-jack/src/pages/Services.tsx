import { useEffect } from "react";
import { ArrowRight, Camera, Check, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const cleanups = [
  {
    number: "01",
    title: "Dumpster Area Cleanup",
    description: "Overflowing bags and loose debris cleared from a shared dumpster area.",
    before: "/services/cleanup-1.webp",
    after: "/services/cleanup-1.1.webp",
  },
  {
    number: "02",
    title: "Apartment Community Cleanup",
    description: "Bulky household items loaded up and hauled away from a busy community.",
    before: "/services/cleanup-2.webp",
    after: "/services/cleanup-2.2.webp",
  },
  {
    number: "03",
    title: "Barn Cleanup",
    description: "Old hay, yard waste, and unwanted items removed from an outbuilding.",
    before: "/services/cleanup-3.webp",
    after: "/services/cleanup-3.3.webp",
  },
  {
    number: "04",
    title: "Property Cleanup",
    description: "A full load of unwanted items cleared from a residential property.",
    before: "/services/cleanup-4.webp",
    after: "/services/cleanup-4.4.webp",
  },
  {
    number: "05",
    title: "Removal of Old Furniture",
    description: "Old couches, chairs, tables, and other unwanted furniture removed and hauled away, leaving the space open and ready to use.",
    before: "/services/cleanup-5.webp",
    after: "/services/cleanup-5.5.webp",
  },
  {
    number: "06",
    title: "Full Apartment Cleaning",
    description: "A complete apartment cleanout with unwanted furniture, household items, and debris removed from the property.",
    before: "/services/cleanup-6.webp",
    after: "/services/cleanup-6.6.webp",
  },
  {
    number: "07",
    title: "Garage & Storage Cleanup",
    description: "Unused household items and accumulated clutter hauled away.",
    before: "/services/cleanup-7.webp",
    after: "/services/cleanup-7.7.webp",
  },
];

function PhotoCard({
  src,
  label,
  alt,
}: {
  src: string;
  label: "Before" | "After";
  alt: string;
}) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl bg-[#01200e] aspect-[4/3] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e47200]/50"
      aria-label={`Open ${label.toLowerCase()} photo`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span
        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-heading font-extrabold uppercase tracking-widest shadow-lg ${
          label === "Before"
            ? "bg-[#01200e]/90 text-[#f6e5d7]"
            : "bg-[#e47200] text-white"
        }`}
      >
        {label}
      </span>
    </a>
  );
}

export default function Services() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Services & Cleanups | Squirrel Jack Junk Removal";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-background px-4 pb-16 pt-40 md:px-6 md:pb-24 md:pt-48">
          <div className="container relative z-10 mx-auto max-w-5xl text-center">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Camera className="h-4 w-4" />
              Real cleanups. Real results.
            </div>
            <h1 className="font-heading text-5xl font-extrabold leading-[1.05] text-foreground md:text-7xl">
              SEE THE
              <span className="block text-primary">DIFFERENCE.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75 md:text-xl">
              From overflowing spaces to clean, usable properties, Squirrel Jack
              does the heavy lifting. Browse a few recent before-and-after
              cleanups from around Lexington.
            </p>
          </div>
        </section>

        <section className="bg-[#f6e5d7] px-4 py-16 text-[#01200e] md:px-6 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#e47200]">
                  Our recent work
                </p>
                <h2 className="font-heading text-4xl font-extrabold leading-tight md:text-5xl">
                  From cluttered
                  <br />
                  <span className="text-[#e47200]">to cleared.</span>
                </h2>
              </div>
              <p className="max-w-sm text-base leading-relaxed text-[#01200e]/70">
                Every job gets the same dependable service: careful loading,
                responsible disposal, and a space you can enjoy again.
              </p>
            </div>

            <div className="space-y-10 md:space-y-14">
              {cleanups.map((cleanup) => (
                <article
                  key={cleanup.number}
                  className="overflow-hidden rounded-3xl border border-[#01200e]/10 bg-white/55 p-4 shadow-[0_16px_40px_rgba(1,32,14,0.08)] md:p-6"
                >
                  <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-sm font-extrabold tracking-widest text-[#e47200]">
                        {cleanup.number}
                      </span>
                      <h3 className="font-heading text-2xl font-extrabold md:text-3xl">
                        {cleanup.title}
                      </h3>
                    </div>
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#01200e]/60">
                      <Check className="h-4 w-4 text-[#e47200]" />
                      Job complete
                    </span>
                  </div>
                  <p className="mb-5 max-w-2xl text-sm leading-relaxed text-[#01200e]/70 md:text-base">
                    {cleanup.description}
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <PhotoCard
                      src={cleanup.before}
                      label="Before"
                      alt={`${cleanup.title} before cleanup`}
                    />
                    <PhotoCard
                      src={cleanup.after}
                      label="After"
                      alt={`${cleanup.title} after cleanup`}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services-cta" className="bg-background px-4 py-20 md:px-6 md:py-28">
          <div className="container mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-12 text-center shadow-[0_20px_50px_rgba(228,114,0,0.25)] md:px-12 md:py-16 bg-foreground text-background">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-ring">
              Your space could be next
            </p>
            <h2 className="font-heading text-4xl font-extrabold leading-tight md:text-6xl">
              Ready to get your
              <br />
              space back?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              Send us a photo or give us a call. We’ll make the process simple,
              fast, and completely hassle-free.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#01200e] px-7 py-4 font-bold text-white transition-transform hover:-translate-y-1"
                data-testid="button-services-quote"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:8595287664"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 px-7 py-4 font-bold transition-colors hover:bg-white hover:text-[#e47200] bg-ring text-foreground"
                data-testid="button-services-call"
              >
                <Phone className="h-5 w-5" />
                Call 859-528-7664
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}