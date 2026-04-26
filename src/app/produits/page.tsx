import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
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
      {/* Introduction section */}
      <section className="bg-senegal-green-50 px-4 py-20" aria-label="Introduction produits">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading subtitle="Des mangues d'exception, du verger sénégalais à votre table">
            Nos variétés de mangues
          </SectionHeading>
          <p className="text-base leading-relaxed text-senegal-green-700">
            Nos mangues sont cultivées dans les vergers de Casamance et de la région de Thiès,
            au Sénégal, où le climat tropical offre des conditions idéales pour produire des
            fruits d&apos;une saveur incomparable. Chaque variété est sélectionnée à la main par
            nos partenaires locaux selon des critères stricts de maturité, de calibre et de
            qualité. Elles sont ensuite acheminées par voie aérienne pour garantir une fraîcheur
            optimale à leur arrivée en France.
          </p>
        </div>
      </section>

      {/* Products grid */}
      <section className="px-4 py-20" aria-label="Catalogue de mangues">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
