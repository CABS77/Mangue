import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import SellingPoints from '@/components/home/SellingPoints';
import ProductPreview from '@/components/home/ProductPreview';
import Testimonials from '@/components/home/Testimonials';
import CtaSection from '@/components/home/CtaSection';

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    'Import Mangues Sénégal — Importation directe de mangues de qualité en provenance du Sénégal. Découvrez nos variétés Kent, Keitt, Boucodiékhal et plus.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <SellingPoints />
      <ProductPreview />
      <Testimonials />
      <CtaSection />
    </>
  );
}
