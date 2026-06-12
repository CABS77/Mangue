import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CtaSection() {
  return (
    <section
      className="relative overflow-hidden bg-forest-green px-6 py-32 text-center lg:px-8"
      aria-label="Appel à l'action"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,168,67,0.08),transparent_70%)]" />
      <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-mango-orange/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-premium text-gold font-sans">
            Prêt à commander ?
          </p>
          <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Envie de mangues du Sénégal ?
          </h2>
          <p className="mt-6 text-lg text-white/70 font-sans">
            Que vous soyez professionnel ou particulier, contactez-nous pour
            découvrir nos offres et passer commande.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/commande" variant="primary" className="text-lg px-10 py-4">
              Commander maintenant
            </Button>
            <Button href="/produits" variant="outline" className="text-lg px-10 py-4">
              Voir nos produits
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
