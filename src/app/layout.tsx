import type { Metadata } from "next";
import "./globals.css";
import "@/components/visual-editor/editor-chrome.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Rethink Fitness | Train Different. Think Different. Become Different.",
  description: "Train Different. Think Different. Become Different. Premium Personal Training Specialty Facility & High-End Gym Floor located in Mayur Vihar Phase 1, New Delhi.",
};

import { loadVisualContent } from "@/lib/visual-data/loadContent";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await loadVisualContent();

  return (
    <html lang="en">
      <body>
        <Navbar data={data.navbar} />
        {children}
        <Footer data={data.footer} />
      </body>
    </html>
  );
}
