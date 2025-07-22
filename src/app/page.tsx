import Hero from "@/components/Hero";
import Announcements from "@/components/Announcements";
import ClientEvent from "@/components/ClientEvent";
import Contact from "@/components/Contact";
import ClientNews from "@/components/ClientNews";
import ClientTestimonial from "@/components/ClientTestimonials";
import { Analytics } from "@vercel/analytics/next"
export default function Home() {
  return (
      <div>
        <Analytics/>
        <Hero/>
        <Announcements/>
        <ClientEvent/>
        <ClientNews/>
        <ClientTestimonial/>
        <Contact/>
      </div>
  );
}
