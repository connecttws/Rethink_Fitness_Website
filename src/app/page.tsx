import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FacilityTour from "@/components/FacilityTour";
import Schedule from "@/components/Schedule";
import GatewayTeaser from "@/components/GatewayTeaser";
import Trainers from "@/components/Trainers";
import Testimonials from "@/components/Testimonials";
import AppTeaser from "@/components/AppTeaser";
import Pricing from "@/components/Pricing";
import LocationSection from "@/components/LocationSection";
import InstagramFeed from "@/components/InstagramFeed";
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <FacilityTour />
      <Schedule />
      <GatewayTeaser />
      <Trainers />
      <Testimonials />
      <AppTeaser />
      
      <Pricing />
      <LocationSection />

      <InstagramFeed />
    </main>
  );
}
