import SectionHeading from '@/components/ui/SectionHeading';

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
  },
  {
    quote:
      'Un partenaire fiable pour notre restaurant. La fraîcheur et la régularité des livraisons sont au rendez-vous.',
    author: 'Chef Amadou D.',
    role: 'Restaurateur à Paris',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-4 py-20" aria-label="Chiffres clés et témoignages">
      <div className="mx-auto max-w-6xl">
        <SectionHeading subtitle="Ils nous font confiance">
          Chiffres clés &amp; témoignages
        </SectionHeading>

        {/* Key figures */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {keyFigures.map((figure) => (
            <div
              key={figure.label}
              className="rounded-2xl bg-senegal-green-50 p-8 text-center"
            >
              <p className="text-4xl font-bold text-senegal-green-700">
                {figure.value}
              </p>
              <p className="mt-2 text-lg font-semibold text-senegal-green-800">
                {figure.label}
              </p>
              <p className="mt-1 text-sm text-senegal-green-600">
                {figure.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.author}
              className="rounded-2xl border-l-4 border-senegal-yellow-500 bg-senegal-yellow-50 p-8"
            >
              <p className="text-lg italic text-senegal-green-800">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <p className="font-semibold text-senegal-green-700">
                  {testimonial.author}
                </p>
                <p className="text-sm text-senegal-green-600">
                  {testimonial.role}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
