import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { products } from '@/data/products';

export default function ProductPreview() {
  const featured = products.slice(0, 3);

  return (
    <section className="bg-senegal-yellow-50 px-4 py-20" aria-label="Aperçu des produits">
      <div className="mx-auto max-w-6xl">
        <SectionHeading subtitle="Des variétés d'exception cultivées au Sénégal">
          Nos mangues phares
        </SectionHeading>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-100 hover:shadow-xl"
            >
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-senegal-yellow-100 to-senegal-gold-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-senegal-green-800">
                  {product.name}
                </h3>
                <p className="mb-3 text-sm text-senegal-green-600">
                  {product.description}
                </p>
                <p className="text-sm font-medium text-senegal-gold-600">
                  Saison : {product.season}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/produits" variant="secondary">
            Voir toutes nos variétés
          </Button>
        </div>
      </div>
    </section>
  );
}
