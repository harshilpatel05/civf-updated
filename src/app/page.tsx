import Hero from "@/components/Hero";
import Announcements from "@/components/Announcements";
import ClientEvent from "@/components/ClientEvent";
import Contact from "@/components/Contact";
import ClientNews from "@/components/ClientNews";
import ClientTestimonial from "@/components/ClientTestimonials";

export default function Home() {
  return (
      <div>
        <Hero/>
        <Announcements/>
        <ClientEvent/>
        <ClientNews/>
        <ClientTestimonial/>
        <Contact/>
      </div>
  );
}
