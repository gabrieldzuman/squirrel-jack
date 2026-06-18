import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

export default function Home() {
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
