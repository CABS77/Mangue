import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-premium card-hover border border-cream-dark">
      {/* Image */}
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
        <p className="mb-5 text-sm leading-relaxed text-charcoal-light font-sans">
          {product.description}
        </p>
        <div className="flex flex-col gap-2 border-t border-cream-dark pt-5">
          <div className="flex items-center gap-3 text-sm font-sans">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream text-xs" aria-hidden="true">📅</span>
            <div>
              <span className="text-xs uppercase tracking-wider text-charcoal-light">Saison</span>
              <p className="font-medium text-forest-green">{product.season}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm font-sans">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream text-xs" aria-hidden="true">📦</span>
            <div>
              <span className="text-xs uppercase tracking-wider text-charcoal-light">Calibre</span>
              <p className="font-medium text-forest-green">{product.caliber}</p>
            </div>
          </div>
        </div>
        <Link
          href={`/commande?produit=${encodeURIComponent(product.name)}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-forest-green transition-all duration-300 hover:bg-gold-light hover:shadow-gold font-sans"
        >
          Commander
        </Link>
      </div>
    </article>
  );
}
