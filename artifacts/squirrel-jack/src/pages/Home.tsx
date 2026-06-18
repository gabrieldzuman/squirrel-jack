import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

export default function Home() {
  useEffect(() => {
    document.title = "Squirrel Jack Junk Removal | Lexington KY";
    
    // Update meta description if it exists, otherwise create it
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Squirrel Jack Junk Removal — Lexington KY\'s trusted junk removal team. Call 859-528-7664. Furniture, appliances, yard waste, construction debris and more.');
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] w-full selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      <main className="flex-1 w-full flex flex-col">
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
