import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/cookies/CookieBanner";
import { companyInfo } from "@/data/company";

export const metadata: Metadata = {
  title: {
    default: "Import Mangues Sénégal — Mangues de qualité du Sénégal",
    template: "%s | Import Mangues Sénégal",
  },
  description:
    "Importation directe de mangues de qualité en provenance du Sénégal. Variétés Kent, Keitt, Boucodiékhal et plus. Livraison en France pour professionnels et particuliers.",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: companyInfo.name,
  description:
    "Importation directe de mangues de qualité en provenance du Sénégal. Variétés Kent, Keitt, Boucodiékhal et plus. Livraison en France pour professionnels et particuliers.",
  address: {
    "@type": "PostalAddress",
    streetAddress: companyInfo.address.street,
    postalCode: companyInfo.address.postalCode,
    addressLocality: companyInfo.address.city,
    addressCountry: companyInfo.address.country,
  },
  telephone: companyInfo.contact.phone,
  email: companyInfo.contact.email,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
