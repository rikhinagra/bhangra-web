import type { Metadata } from "next";
import { Yatra_One, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const yatra = Yatra_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashke Bhangra Chicago — Bhangra Classes at National India Hub, Schaumburg",
  description:
    "Learn authentic Punjabi Bhangra in Chicago. Weekly classes at National India Hub, Schaumburg. All ages, all levels welcome. Book your first class today.",
  keywords: ["bhangra", "dance classes", "Chicago", "Schaumburg", "Punjabi", "National India Hub"],
  openGraph: {
    title: "Ashke Bhangra Chicago",
    description: "Authentic Bhangra classes in the heart of Chicagoland.",
    images: ["/banner.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${yatra.variable} ${cormorant.variable} ${manrope.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
