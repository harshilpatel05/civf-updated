import Hero from "@/components/Hero";
import Announcements from "@/components/Announcements";
import ClientEvent from "@/components/ClientEvent";
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact";
import ClientNews from "@/components/ClientNews";

export default function Home() {
  return (
      <div>
        <Hero/>
        <Announcements/>
        <ClientEvent/>
        <ClientNews/>
        <Testimonials/>
        <Contact/>
      </div>
  );
}
