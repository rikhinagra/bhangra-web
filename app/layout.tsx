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
  title: "Ashke Bhangra Chicago | Punjabi Bhangra Classes in Schaumburg, IL",
  description:
    "Authentic Punjabi Bhangra classes in Schaumburg, IL for kids, teens, and adults. Weekly sessions at National India Hub. Book your first class today.",
  keywords: ["bhangra", "dance classes", "Chicago", "Schaumburg", "Punjabi", "National India Hub"],
  metadataBase: new URL("https://www.ashkebhangra.com"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ashke Bhangra",
  },
  openGraph: {
    title: "Ashke Bhangra Chicago",
    description: "Authentic Bhangra classes in the heart of Chicagoland.",
    url: "https://www.ashkebhangra.com",
    siteName: "Ashke Bhangra Chicago",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ashke Bhangra Chicago — Bhangra Classes at National India Hub, Schaumburg",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashke Bhangra Chicago",
    description: "Authentic Bhangra classes in the heart of Chicagoland.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${yatra.variable} ${cormorant.variable} ${manrope.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5N9MNM4C');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "DanceGroup"],
          "name": "Ashke Bhangra Chicago",
          "description": "Weekly Punjabi Bhangra classes for all ages at the National India Hub in Schaumburg, IL.",
          "url": "https://www.ashkebhangra.com",
          "image": "https://www.ashkebhangra.com/og-image.jpg",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "930 National Parkway",
            "addressLocality": "Schaumburg",
            "addressRegion": "IL",
            "postalCode": "60173",
            "addressCountry": "US"
          },
          "areaServed": "Chicagoland",
          "sameAs": [
            "https://instagram.com/ashkebhangra",
            "https://youtube.com/@ashkebhangra",
            "https://facebook.com/ashkebhangra"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Bhangra Classes",
            "itemListElement": [
              { "@type": "Course", "name": "Little Sher", "description": "Bhangra fundamentals for ages 5-9 through games and stories." },
              { "@type": "Course", "name": "Youth Crew", "description": "Performance-ready choreography and prop work for ages 10-16." },
              { "@type": "Course", "name": "Beginner", "description": "Foundational footwork and Punjabi music theory for adults 17+." },
              { "@type": "Course", "name": "Advanced", "description": "Performance training and Gidda/Bhangra fusion for adults 17+." },
              { "@type": "Course", "name": "Wedding Choreography", "description": "Custom sangeet, baraat, and reception routines for all ages." }
            ]
          }
        }) }} />
      </head>
      <body>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5N9MNM4C" height="0" width="0" style={{ display:"none", visibility:"hidden" }} />
        </noscript>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
