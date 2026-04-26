import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-senegal-green-700 via-senegal-green-600 to-senegal-green-800 px-4 py-20 text-center"
      aria-label="Bannière principale"
    >
      {/* Decorative overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,180,0,0.15),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <span className="mb-4 inline-block text-5xl" role="img" aria-label="Mangue">
          🥭
        </span>
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Les meilleures mangues du Sénégal, livrées en France
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-senegal-green-100 sm:text-xl">
          Découvrez nos variétés de mangues sénégalaises sélectionnées à la main
          pour leur goût exceptionnel et leur fraîcheur incomparable.
        </p>
        <div className="mt-10">
          <Button href="/produits" variant="primary" className="text-lg px-8 py-4">
            Découvrir nos mangues
          </Button>
        </div>
      </div>
    </section>
  );
}
