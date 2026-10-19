import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedHomes } from "@/components/home/FeaturedHomes";
import { Neighbourhoods } from "@/components/home/Neighbourhoods";
import { About } from "@/components/home/About";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedHomes />
      <Neighbourhoods />
      <About />
      <Testimonials />
      <ContactSection />
    </>
  );
}
