import { useEffect, useRef } from "react";

const services = [
  { icon: "🛋️", title: "Furniture", desc: "Sofas, chairs, tables, beds and more." },
  { icon: "🧊", title: "Appliances", desc: "Fridges, washers, dryers, stoves, microwaves and more." },
  { icon: "📺", title: "Electronics", desc: "TVs, computers, monitors and other electronics." },
  { icon: "📦", title: "Household Items", desc: "Clothing, toys, boxes, mattresses, decor and miscellaneous items." },
  { icon: "🌿", title: "Yard Waste", desc: "Branches, leaves, bushes, grass clippings and more." },
  { icon: "🧱", title: "Construction Debris", desc: "Drywall, wood, concrete, brick, tile and other construction materials." },
  { icon: "🔩", title: "Fences & Panels", desc: "Wood, vinyl, metal fencing and gates." },
  { icon: "🏢", title: "Office & Commercial", desc: "Office cleanouts, retail spaces, storage units, warehouse cleanouts and more." },
  { icon: "🛁", title: "Hot Tubs", desc: "Hot tub removal and disposal." },
  { icon: "🔧", title: "Tools & Equipment", desc: "Power tools, hand tools, machinery and general equipment." },
  { icon: "🗑️", title: "General Junk", desc: "We handle almost anything you don't need anymore!" },
  { icon: "🏠", title: "Property Cleanouts", desc: "Estate cleanouts, moving cleanouts, foreclosure cleanouts and more." },
];

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".service-card");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const index = parseInt(card.dataset.index ?? "0", 10);
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, index * 80);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-80px" }
    );

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 bg-card relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2
            className="font-heading font-extrabold text-4xl md:text-5xl text-primary inline-block relative"
            data-testid="heading-services"
          >
            WE REMOVE:
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-foreground/20 rounded-full block" />
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-full block" />
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              data-testid={`card-service-${index}`}
              className="service-card bg-secondary/50 rounded-2xl p-6 border-l-4 border-primary shadow-lg hover:shadow-[0_10px_30px_rgba(228,114,0,0.15)] transition-all duration-300 hover:-translate-y-2 group cursor-default"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform origin-bottom-left">
                {service.icon}
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">{service.title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
