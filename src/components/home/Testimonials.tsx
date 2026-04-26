import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const keyFigures = [
  {
    value: '5+',
    label: 'Variétés de mangues',
    description: 'Kent, Keitt, Boucodiékhal et plus',
  },
  {
    value: '100%',
    label: 'Import direct',
    description: 'Du verger sénégalais à votre table',
  },
  {
    value: '🇸🇳',
    label: 'Origine Sénégal',
    description: 'Casamance et région de Thiès',
  },
];

const testimonials = [
  {
    quote:
      'Des mangues d\'une qualité exceptionnelle. Le goût est incomparable avec ce qu\'on trouve habituellement en grande surface.',
    author: 'Marie L.',
    role: 'Cliente particulière',
    stars: 5,
  },
  {
    quote:
      'Un partenaire fiable pour notre restaurant. La fraîcheur et la régularité des livraisons sont au rendez-vous.',
    author: 'Chef Amadou D.',
    role: 'Restaurateur à Paris',
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-cream px-6 py-28 lg:px-8" aria-label="Chiffres clés et témoignages">
      <div className="mx-auto max-w-content">
        <ScrollReveal>
          <SectionHeading subtitle="Ils nous font confiance">
            Chiffres clés &amp; témoignages
          </SectionHeading>
        </ScrollReveal>

        {/* Key figures */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {keyFigures.map((figure, index) => (
            <ScrollReveal key={figure.label} delay={index * 150}>
              <div className="group rounded-2xl bg-white p-10 text-center shadow-premium card-hover">
                <p className="font-serif text-5xl font-bold text-forest-green transition-colors duration-300 group-hover:text-gold">
                  {figure.value}
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-premium text-gold font-sans">
                  {figure.label}
                </p>
                <p className="mt-2 text-sm text-charcoal-light font-sans">
                  {figure.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} delay={index * 200}>
              <blockquote className="relative rounded-2xl bg-white p-10 shadow-premium card-hover">
                {/* Large quote mark */}
                <span className="absolute -top-4 left-8 font-serif text-7xl text-gold/30 leading-none" aria-hidden="true">
                  &ldquo;
                </span>

                <div className="relative">
                  <StarRating count={testimonial.stars} />
                  <p className="mt-6 text-lg leading-relaxed text-charcoal font-sans italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-green text-white font-serif font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-forest-green font-sans">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-charcoal-light font-sans">
                        {testimonial.role}
                      </p>
                    </div>
                  </footer>
                </div>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
