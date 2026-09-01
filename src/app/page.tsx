export const revalidate = 60;
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

import { loadVisualContent, getCachedPageContent } from "@/lib/visual-data/loadContent";
import prisma from "@/lib/prisma";
import { isAdminSession } from "@/lib/auth/session";
import { EditModeProvider } from "@/components/visual-editor/EditModeContext";
import { EditorToolbar } from "@/components/visual-editor/EditorToolbar";

export default async function Home() {
  const localData = await loadVisualContent();
  const dbData = await getCachedPageContent("/");

  // Use the CMS DB data if available, otherwise gracefully fallback to the local JSON
  const data = (dbData && Object.keys(dbData).length > 0) ? dbData : localData;
  const isEditMode = await isAdminSession();

  return (
    <EditModeProvider isEditMode={isEditMode} visualContent={data}>
      <EditorToolbar />
      <main>
        <Hero data={data.hero} />
        <Features data={data.features} />
        <FacilityTour data={data.facilityTour} />
        <Schedule data={data.schedule} />
        <GatewayTeaser data={data.gatewayTeaser} />
        <Trainers data={data.trainers} />
        <Testimonials data={data.testimonials} />
        {/* <AppTeaser data={data.appTeaser} /> */}
        
        <Pricing data={data.pricing} />
        <LocationSection data={data.locationSection} />

        <InstagramFeed data={data.instagramFeed} />
      </main>
    </EditModeProvider>
  );
}

