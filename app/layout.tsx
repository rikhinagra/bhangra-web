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
