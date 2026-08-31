import type { Metadata } from "next";
import "./globals.css";
import "@/components/visual-editor/editor-chrome.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Rethink Fitness | Premium Personal Training",
  description: "Premium Personal Training Specialty Facility & High-End Gym Floor located in Mayur Vihar Phase 1, New Delhi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
