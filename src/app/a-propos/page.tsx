import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import { companyInfo } from '@/data/company';

export const metadata: Metadata = {
  title: 'À Propos',
  description:
    'Découvrez Import Mangues Sénégal, fondée par Cheikh Ahmadou Bamba Sall à Chevilly-Larue. Notre mission : importer des mangues de qualité directement depuis le Sénégal.',
};

const importSteps = [
  {
    icon: '🌳',
    step: '01',
    title: 'Sélection sur place',
    description:
      'Nos mangues sont sélectionnées à la main dans les vergers du Sénégal, en Casamance et dans la région de Thiès. Nous travaillons directement avec les producteurs locaux pour garantir des fruits à maturité optimale.',
  },
  {
    icon: '✈️',
    step: '02',
    title: 'Transport soigné',
    description:
      'Les mangues sont conditionnées avec soin et transportées par voie aérienne dans le respect de la chaîne du froid, afin de préserver leur fraîcheur et leurs qualités gustatives.',
  },
  {
    icon: '🚚',
    step: '03',
    title: 'Livraison en France',
    description:
      'À leur arrivée en France, les mangues sont contrôlées puis livrées rapidement à nos clients — particuliers comme professionnels — dans toute la France.',
  },
];

const values = [
  {
    icon: '✅',
    title: 'Qualité',
    description:
      'Nous sélectionnons uniquement les meilleures variétés de mangues, récoltées à maturité pour un goût et une texture incomparables.',
  },
  {
    icon: '🔍',
    title: 'Traçabilité',
    description:
      'Chaque lot de mangues est traçable, du verger sénégalais jusqu\'à votre table. Nous connaissons l\'origine exacte de chaque fruit.',
  },
  {
    icon: '🤝',
    title: 'Commerce équitable',
    description:
      'Nous rémunérons justement nos producteurs partenaires au Sénégal et contribuons au développement économique des communautés locales.',
  },
  {
    icon: '🇸🇳',
    title: 'Lien avec le Sénégal',
    description:
      'Notre entreprise est un pont entre le Sénégal et la France, valorisant le savoir-faire agricole sénégalais et partageant les saveurs de l\'Afrique de l\'Ouest.',
  },
];

export default function AProposPage() {
  return (
    <>
      {/* Hero / Founder section */}
      <section className="relative overflow-hidden bg-forest-green px-6 pt-32 pb-32 lg:px-8" aria-label="Présentation du fondateur">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(212,168,67,0.1),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-content">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Founder photo placeholder */}
            <div className="flex justify-center lg:order-2">
              <div
                className="relative flex h-72 w-72 items-center justify-center rounded-full sm:h-80 sm:w-80"
                aria-label="Photo du fondateur Cheikh Ahmadou Bamba Sall"
                role="img"
              >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-gold/30" />
                <div className="absolute -inset-3 rounded-full border border-gold/10" />
                {/* Inner circle */}
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-forest-green-light to-forest-green">
                  <span className="text-6xl font-bold text-gold font-serif sm:text-7xl" aria-hidden="true">
                    CS
                  </span>
                </div>
              </div>
            </div>

            {/* Founder intro */}
            <div className="lg:order-1">
              <p className="mb-4 text-sm font-medium uppercase tracking-premium text-gold font-sans">
                Notre histoire
              </p>
              <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
                Une passion pour les mangues du Sénégal
              </h1>
              <div className="mt-2 h-[2px] w-20 rounded-full bg-gradient-to-r from-gold to-transparent" />
              <p className="mt-8 text-lg leading-relaxed text-white/80 font-sans">
                <strong className="text-gold">{companyInfo.name}</strong> a été fondée
                par <strong className="text-gold">{companyInfo.founder}</strong>,
                entrepreneur passionné par les richesses agricoles du Sénégal.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70 font-sans">
                Basée à{' '}
                <strong className="text-white/90">
                  {companyInfo.address.city} ({companyInfo.address.postalCode})
                </strong>
                , l&apos;entreprise est née de la volonté de faire découvrir aux consommateurs
                français les meilleures mangues du Sénégal, récoltées avec soin et importées en
                circuit court.
              </p>
              <p className="mt-4 text-sm text-white/50 font-sans">
                SIREN : {companyInfo.siren}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Mission section */}
      <section className="bg-cream px-6 py-28 lg:px-8" aria-label="Notre mission">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <SectionHeading subtitle="Ce qui nous anime au quotidien">
              Notre mission
            </SectionHeading>
            {/* Pull quote style */}
            <blockquote className="relative">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-serif text-8xl text-gold/20 leading-none" aria-hidden="true">
                &ldquo;
              </span>
              <p className="relative text-xl leading-relaxed text-charcoal font-sans italic">
                Notre mission est simple et ambitieuse :{' '}
                <strong className="text-forest-green not-italic">
                  importer des mangues de qualité directement depuis le Sénégal
                </strong>{' '}
                pour les rendre accessibles aux consommateurs et professionnels en France. Nous croyons
                qu&apos;un fruit d&apos;exception mérite un parcours d&apos;exception — de l&apos;arbre
                sénégalais à votre assiette, sans compromis sur la fraîcheur ni la saveur.
              </p>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* Import process — Timeline style */}
      <section className="bg-white px-6 py-28 lg:px-8" aria-label="Processus d'importation">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionHeading subtitle="Du verger sénégalais à votre table">
              Notre processus d&apos;importation
            </SectionHeading>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative mt-16">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 hidden w-px bg-gradient-to-b from-gold via-gold/50 to-transparent lg:block" aria-hidden="true" />

            <div className="space-y-12 lg:space-y-0">
              {importSteps.map((step, index) => (
                <ScrollReveal key={step.step} delay={index * 200}>
                  <div className={`relative lg:flex lg:items-center lg:gap-16 ${index > 0 ? 'lg:mt-16' : ''}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-white lg:block" aria-hidden="true" />

                    {/* Content — alternating sides */}
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-20 lg:text-right' : 'lg:pl-20 lg:ml-auto'}`}>
                      <div className="rounded-2xl bg-cream p-10 shadow-premium card-hover">
                        <div className={`mb-6 flex items-center gap-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                          <span
                            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm"
                            aria-hidden="true"
                          >
                            {step.icon}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-premium text-gold font-sans">
                            Étape {step.step}
                          </span>
                        </div>
                        <h3 className="mb-4 font-serif text-2xl font-bold text-forest-green">{step.title}</h3>
                        <p className="text-base leading-relaxed text-charcoal-light font-sans">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-cream px-6 py-28 lg:px-8" aria-label="Nos valeurs">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionHeading subtitle="Les principes qui guident notre démarche">
              Nos valeurs
            </SectionHeading>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 100}>
                <div className="group rounded-2xl bg-white p-8 text-center shadow-premium card-hover">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cream transition-all duration-300 group-hover:bg-gold/10 group-hover:scale-110">
                    <span className="text-3xl" aria-hidden="true">
                      {value.icon}
                    </span>
                  </div>
                  <h3 className="mb-3 font-serif text-lg font-bold text-forest-green">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal-light font-sans">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative overflow-hidden bg-forest-green px-6 py-28 lg:px-8" aria-label="Appel à l'action">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,168,67,0.08),transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-premium text-gold font-sans">
              Prêt à commander ?
            </p>
            <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              Envie de goûter nos mangues ?
            </h2>
            <p className="mt-6 text-lg text-white/70 font-sans">
              Que vous soyez particulier ou professionnel, contactez-nous pour découvrir nos variétés
              et passer commande.
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="primary" className="text-lg px-10 py-4">
                Nous contacter
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
