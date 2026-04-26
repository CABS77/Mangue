import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
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
      <section className="bg-senegal-green-50 px-4 py-20" aria-label="Présentation du fondateur">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Founder photo placeholder */}
            <div className="flex justify-center lg:order-2">
              <div
                className="flex h-72 w-72 items-center justify-center rounded-full bg-gradient-to-br from-senegal-green-600 to-senegal-yellow-500 shadow-lg sm:h-80 sm:w-80"
                aria-label="Photo du fondateur Cheikh Ahmadou Bamba Sall"
                role="img"
              >
                <span className="text-6xl font-bold text-white sm:text-7xl" aria-hidden="true">
                  CS
                </span>
              </div>
            </div>

            {/* Founder intro */}
            <div className="lg:order-1">
              <SectionHeading centered={false}>
                Notre histoire
              </SectionHeading>
              <p className="mb-4 text-lg leading-relaxed text-senegal-green-700">
                <strong className="text-senegal-green-800">{companyInfo.name}</strong> a été fondée
                par <strong className="text-senegal-green-800">{companyInfo.founder}</strong>,
                entrepreneur passionné par les richesses agricoles du Sénégal.
              </p>
              <p className="mb-4 text-base leading-relaxed text-senegal-green-700">
                Basée à{' '}
                <strong className="text-senegal-green-800">
                  {companyInfo.address.city} ({companyInfo.address.postalCode})
                </strong>
                , l&apos;entreprise est née de la volonté de faire découvrir aux consommateurs
                français les meilleures mangues du Sénégal, récoltées avec soin et importées en
                circuit court.
              </p>
              <p className="text-base leading-relaxed text-senegal-green-700">
                SIREN : {companyInfo.siren}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="px-4 py-20" aria-label="Notre mission">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading subtitle="Ce qui nous anime au quotidien">
            Notre mission
          </SectionHeading>
          <p className="text-lg leading-relaxed text-senegal-green-700">
            Notre mission est simple et ambitieuse :{' '}
            <strong className="text-senegal-green-800">
              importer des mangues de qualité directement depuis le Sénégal
            </strong>{' '}
            pour les rendre accessibles aux consommateurs et professionnels en France. Nous croyons
            qu&apos;un fruit d&apos;exception mérite un parcours d&apos;exception — de l&apos;arbre
            sénégalais à votre assiette, sans compromis sur la fraîcheur ni la saveur.
          </p>
        </div>
      </section>

      {/* Import process section */}
      <section className="bg-senegal-green-50 px-4 py-20" aria-label="Processus d'importation">
        <div className="mx-auto max-w-6xl">
          <SectionHeading subtitle="Du verger sénégalais à votre table">
            Notre processus d&apos;importation
          </SectionHeading>
          <div className="grid gap-8 md:grid-cols-3">
            {importSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-xl bg-white p-8 shadow-sm transition-shadow duration-100 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-senegal-yellow-100 text-2xl"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wider text-senegal-yellow-600">
                    Étape {step.step}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-senegal-green-800">{step.title}</h3>
                <p className="text-base leading-relaxed text-senegal-green-700">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="px-4 py-20" aria-label="Nos valeurs">
        <div className="mx-auto max-w-6xl">
          <SectionHeading subtitle="Les principes qui guident notre démarche">
            Nos valeurs
          </SectionHeading>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-senegal-green-100 bg-white p-6 text-center transition-shadow duration-100 hover:shadow-md"
              >
                <span
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-senegal-green-50 text-3xl"
                  aria-hidden="true"
                >
                  {value.icon}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-senegal-green-800">{value.title}</h3>
                <p className="text-sm leading-relaxed text-senegal-green-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-senegal-green-800 px-4 py-20" aria-label="Appel à l'action">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Envie de goûter nos mangues ?
          </h2>
          <p className="mb-8 text-lg text-senegal-green-100">
            Que vous soyez particulier ou professionnel, contactez-nous pour découvrir nos variétés
            et passer commande.
          </p>
          <Button href="/contact" variant="primary">
            Nous contacter
          </Button>
        </div>
      </section>
    </>
  );
}
