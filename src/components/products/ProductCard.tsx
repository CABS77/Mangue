import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-100 hover:shadow-xl">
      <div className="flex h-56 items-center justify-center bg-gradient-to-br from-senegal-yellow-100 to-senegal-gold-100">
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
        <p className="mb-4 text-sm leading-relaxed text-senegal-green-600">
          {product.description}
        </p>
        <div className="flex flex-col gap-1 text-sm font-medium">
          <p className="text-senegal-gold-600">
            <span className="font-semibold">Saison :</span> {product.season}
          </p>
          <p className="text-senegal-gold-600">
            <span className="font-semibold">Calibre :</span> {product.caliber}
          </p>
        </div>
      </div>
    </article>
  );
}
