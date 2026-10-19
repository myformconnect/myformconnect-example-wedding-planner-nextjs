import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aurelleweddings.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aurelle Weddings | Bespoke Luxury Wedding Atelier",
  description:
    "Bespoke luxury wedding planning for royal Indian palaces, coastal destinations, and intimate celebrations. 100% direct vendor billing, photorealistic 3D previews, and 24/7 guest concierge.",
  applicationName: "Aurelle Weddings",
  keywords: [
    "Luxury Wedding Planner",
    "Royal Indian Weddings",
    "Palace Weddings Rajasthan",
    "Destination Wedding Planner",
    "Heritage Palace Weddings Jaipur Udaipur",
    "Goa Beach Wedding Planner",
    "Intimate Luxury Celebrations",
    "Aurelle Weddings",
  ],
  authors: [{ name: "Aurelle Weddings Atelier", url: siteUrl }],
  creator: "Aurelle Weddings",
  publisher: "Aurelle Weddings",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aurelle Weddings | Bespoke Luxury Wedding Atelier",
    description:
      "Bespoke luxury wedding planning for royal Indian palaces, coastal destinations, and intimate celebrations. 100% direct vendor billing, photorealistic 3D previews, and 24/7 guest concierge.",
    url: siteUrl,
    siteName: "Aurelle Weddings",
    images: [
      {
        url: "/images/hero-palace-wedding.jpg",
        width: 1200,
        height: 630,
        alt: "Aurelle Weddings — Bespoke Royal & Destination Wedding Atelier",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurelle Weddings | Bespoke Luxury Wedding Atelier",
    description:
      "Bespoke luxury wedding planning for royal Indian palaces, coastal destinations, and intimate celebrations. 100% direct vendor billing and 3D previews.",
    images: ["/images/hero-palace-wedding.jpg"],
    creator: "@aurelleweddings",
    site: "@aurelleweddings",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Wedding Planning & Event Design",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#F8F5EF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aurelle Weddings",
  alternateName: "Aurelle Weddings Atelier",
  url: siteUrl,
  logo: `${siteUrl}/images/hero-palace-wedding.jpg`,
  image: `${siteUrl}/images/hero-palace-wedding.jpg`,
  description:
    "Bespoke luxury wedding planning for royal Indian palaces, coastal destinations, and intimate celebrations with direct vendor billing.",
  telephone: "+91-141-289-4500",
  email: "concierge@aurelleweddings.com",
  priceRange: "₹₹₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  areaServed: [
    "Jaipur",
    "Udaipur",
    "Jodhpur",
    "Goa",
    "Thailand",
    "Lake Como",
    "Dubai",
    "Worldwide",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

