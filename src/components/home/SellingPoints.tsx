import SectionHeading from '@/components/ui/SectionHeading';
import { sellingPoints } from '@/data/company';

export default function SellingPoints() {
  return (
    <section className="bg-white px-4 py-20" aria-label="Nos engagements">
      <div className="mx-auto max-w-6xl">
        <SectionHeading subtitle="Ce qui fait la différence">
          Pourquoi choisir nos mangues ?
        </SectionHeading>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sellingPoints.map((point) => (
            <article
              key={point.title}
              className="rounded-2xl border border-senegal-green-100 bg-senegal-green-50 p-8 text-center transition-shadow duration-100 hover:shadow-lg"
            >
              <span className="mb-4 inline-block text-4xl" role="img" aria-label={point.title}>
                {point.icon}
              </span>
              <h3 className="mb-3 text-xl font-bold text-senegal-green-800">
                {point.title}
              </h3>
              <p className="text-senegal-green-700">{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
