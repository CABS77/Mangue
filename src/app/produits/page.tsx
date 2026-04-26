import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Nos Produits',
  description:
    'Découvrez nos variétés de mangues importées directement du Sénégal : Kent, Keitt, Boucodiékhal, Diourou, Palmer. Fruits de qualité, sélectionnés sur place.',
};

export default function ProduitsPage() {
  return (
    <>
      {/* Hero introduction */}
      <section className="relative overflow-hidden bg-forest-green px-6 pt-32 pb-24 lg:px-8" aria-label="Introduction produits">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(212,168,67,0.1),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <SectionHeading
            subtitle="Des mangues d'exception, du verger sénégalais à votre table"
            light
          >
            Nos variétés de mangues
          </SectionHeading>
          <p className="text-base leading-relaxed text-white/70 font-sans">
            Nos mangues sont cultivées dans les vergers de Casamance et de la région de Thiès,
            au Sénégal, où le climat tropical offre des conditions idéales pour produire des
            fruits d&apos;une saveur incomparable. Chaque variété est sélectionnée à la main par
            nos partenaires locaux selon des critères stricts de maturité, de calibre et de
            qualité. Elles sont ensuite acheminées par voie aérienne pour garantir une fraîcheur
            optimale à leur arrivée en France.
          </p>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Products grid */}
      <section className="bg-cream px-6 py-24 lg:px-8" aria-label="Catalogue de mangues">
        <div className="mx-auto max-w-content">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
