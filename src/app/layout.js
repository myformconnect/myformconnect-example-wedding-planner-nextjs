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

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aurelleweddings.com"
  ),
  title: "Aurelle Weddings | Luxury Wedding Planning & Destination Celebrations",
  description:
    "Discover thoughtfully curated Indian, Western, destination, and intimate weddings with Aurelle Weddings. Share your vision and begin planning your celebration.",
  keywords: [
    "Luxury Wedding Planner",
    "Royal Indian Weddings",
    "Destination Wedding Planner",
    "Heritage Palace Weddings",
    "Intimate Celebrations",
    "Aurelle Weddings",
  ],
  authors: [{ name: "Aurelle Weddings" }],
  creator: "Aurelle Weddings",
  openGraph: {
    title: "Aurelle Weddings | Luxury Wedding Planning & Destination Celebrations",
    description:
      "Discover thoughtfully curated Indian, Western, destination, and intimate weddings with Aurelle Weddings. Share your vision and begin planning your celebration.",
    url: "https://aurelleweddings.com",
    siteName: "Aurelle Weddings",
    images: [
      {
        url: "/images/hero-palace-wedding.jpg",
        width: 1200,
        height: 630,
        alt: "Aurelle Weddings - Royal Indian Luxury Wedding Planner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurelle Weddings | Luxury Wedding Planning & Destination Celebrations",
    description:
      "Discover thoughtfully curated Indian, Western, destination, and intimate weddings with Aurelle Weddings.",
    images: ["/images/hero-palace-wedding.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
