export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import PricingClient from "./PricingClient";

const fallbackPricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 49,
    annualPrice: 39,
    features: ['Access to gym equipment', 'Locker room access', '1 Group class per week'],
    isPopular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 89,
    annualPrice: 75,
    features: ['Unlimited gym access', 'Unlimited group classes', 'Sauna & Spa access', '1 PT session per month'],
    isPopular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPrice: 149,
    annualPrice: 125,
    features: ['Everything in Pro', '4 PT sessions per month', 'Custom Nutrition plan', 'Priority class booking'],
    isPopular: false,
  },
];

const fallbackFeatureComparison = [
  { feature: 'Open Gym Access', basic: true, pro: true, elite: true },
  { feature: 'Locker & Showers', basic: true, pro: true, elite: true },
  { feature: 'Group Classes', basic: '1/week', pro: 'Unlimited', elite: 'Unlimited' },
  { feature: 'Sauna & Spa', basic: false, pro: true, elite: true },
  { feature: 'Personal Training', basic: false, pro: '1/month', elite: '4/month' },
  { feature: 'Custom Nutrition Plan', basic: false, pro: false, elite: true },
  { feature: 'Priority Booking', basic: false, pro: false, elite: true },
];

const fallbackFaqs = [
  {
    q: 'Are there any hidden initiation fees?',
    a: 'No! We believe in transparent pricing. The price you see is the price you pay. There are zero initiation, maintenance, or hidden fees.'
  },
  {
    q: 'Can I freeze or cancel my membership?',
    a: 'Absolutely. Monthly members can cancel anytime with a 30-day notice. Annual members can freeze their membership for up to 3 months per year for medical or travel reasons.'
  },
  {
    q: 'Do you offer day passes or trials?',
    a: 'Yes, we offer a free 3-day trial for local residents. Single day passes are available for $20 if you are just visiting town.'
  },
  {
    q: 'What is included in the Custom Nutrition Plan?',
    a: 'The Elite tier includes a monthly consultation with our registered dietitians who will build a macros-based meal plan tailored precisely to your goals and dietary restrictions.'
  }
];

export default async function PricingPage() {
  const pageData = await prisma.page.findFirst({ where: { slug: '/pricing' } });
  const content = (pageData?.content as any) || {};

  const pricingPlans = content.pricingPlans || fallbackPricingPlans;
  const featureComparison = content.featureComparison || fallbackFeatureComparison;
  const faqs = content.faqs || fallbackFaqs;

  return (
    <PricingClient 
      pricingPlans={pricingPlans} 
      featureComparison={featureComparison} 
      faqs={faqs} 
    />
  );
}


