import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import { products } from '@/data/products';

export default function ProductPreview() {
  const featured = products.slice(0, 3);

  return (
    <section className="bg-white px-6 py-28 lg:px-8" aria-label="Aperçu des produits">
      <div className="mx-auto max-w-content">
        <ScrollReveal>
          <SectionHeading subtitle="Des variétés d'exception cultivées au Sénégal">
            Nos mangues phares
          </SectionHeading>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 150}>
              <article
                className="group overflow-hidden rounded-2xl bg-white shadow-premium card-hover border border-cream-dark"
              >
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover img-zoom"
                    loading="lazy"
                  />
                  {/* Season badge */}
                  <div className="absolute top-4 left-4 rounded-full bg-forest-green/90 backdrop-blur-sm px-4 py-1.5">
                    <span className="text-xs font-semibold text-gold tracking-wide font-sans">
                      {product.season}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="mb-3 font-serif text-2xl font-bold text-forest-green">
                    {product.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-charcoal-light font-sans line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-gold-dark font-sans">
                    <span className="inline-block h-1 w-1 rounded-full bg-gold" />
                    {product.caliber}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="mt-16 text-center">
            <Button href="/produits" variant="secondary">
              Voir toutes nos variétés
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
