import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { sellingPoints } from '@/data/company';

export default function SellingPoints() {
  return (
    <section className="bg-cream px-6 py-28 lg:px-8" aria-label="Nos engagements">
      <div className="mx-auto max-w-content">
        <ScrollReveal>
          <SectionHeading subtitle="Ce qui fait la différence">
            Pourquoi choisir nos mangues ?
          </SectionHeading>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sellingPoints.map((point, index) => (
            <ScrollReveal key={point.title} delay={index * 150}>
              <article
                className="group rounded-2xl bg-white p-10 text-center shadow-premium card-hover"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-cream transition-all duration-300 group-hover:bg-gold/10 group-hover:scale-110">
                  <span className="text-4xl" role="img" aria-label={point.title}>
                    {point.icon}
                  </span>
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-forest-green">
                  {point.title}
                </h3>
                <p className="text-base leading-relaxed text-charcoal-light font-sans">
                  {point.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
