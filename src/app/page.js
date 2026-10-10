import Hero from "@/components/sections/Hero/Hero";
import Services from "@/components/sections/Services/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials/Testimonials";
import HomeAbout  from "@/components/sections/About/Abouts";
import CTA from "@/components/sections/CTA/CTA";

// Home page: Hero, Services, Why Choose Us, Testimonials, then CTA
export default function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  );
}