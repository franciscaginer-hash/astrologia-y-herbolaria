import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Mulish, Geist } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Astrología y Herbolaria · Francisca Giner Mellado",
    template: "%s · Astrología y Herbolaria",
  },
  description:
    "Acompañamiento simbólico y práctica ritual en Santiago, Chile. Astrología, tarot y saberes de herbolaria heredados, abordados con rigor histórico y calidez.",
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Astrología y Herbolaria",
    title: "Astrología y Herbolaria · Francisca Giner Mellado",
    description:
      "Acompañamiento simbólico y práctica ritual en Santiago, Chile. Astrología, tarot y saberes de herbolaria heredados, abordados con rigor histórico y calidez.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F2E6D6",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Astrología y Herbolaria",
  founder: {
    "@type": "Person",
    name: "Francisca Giner Mellado",
  },
  description:
    "Acompañamiento simbólico y práctica ritual: astrología, tarot y saberes de herbolaria heredados, abordados con rigor histórico y calidez.",
  url: siteConfig.url,
  email: siteConfig.email,
  sameAs: [siteConfig.instagram],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn(cormorant.variable, mulish.variable, "font-sans", geist.variable)}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-sm focus:top-sm focus:z-50 focus:rounded-borde focus:bg-ciruela focus:px-md focus:py-sm focus:text-champan"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
