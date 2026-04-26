import Button from '@/components/ui/Button';

export default function CtaSection() {
  return (
    <section
      className="bg-gradient-to-r from-senegal-green-700 to-senegal-green-800 px-4 py-20 text-center"
      aria-label="Appel à l'action"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Envie de mangues du Sénégal ?
        </h2>
        <p className="mt-4 text-lg text-senegal-green-100">
          Que vous soyez professionnel ou particulier, contactez-nous pour
          découvrir nos offres et passer commande.
        </p>
        <div className="mt-8">
          <Button href="/contact" variant="primary" className="text-lg px-8 py-4">
            Nous contacter
          </Button>
        </div>
      </div>
    </section>
  );
}
