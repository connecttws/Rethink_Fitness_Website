import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GatewayTeaser from "@/components/GatewayTeaser";
import Testimonials from "@/components/Testimonials";
import BmiCalculator from "@/components/BmiCalculator";
import AppTeaser from "@/components/AppTeaser";
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <BmiCalculator />
      <GatewayTeaser />
      <Testimonials />
      <AppTeaser />
      
      {/* Simple Pricing Teaser to Gateway to full pricing page */}
      <section style={{ padding: 'var(--section-padding) 0', textAlign: 'center', backgroundColor: 'var(--bg-color)' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
            Ready to <span className="text-accent">Commit?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
            Explore our membership plans and find the perfect fit for your goals.
          </p>
          <Link href="/pricing" className="btn">View Memberships</Link>
        </div>
      </section>
    </main>
  );
}
