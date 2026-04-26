import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import { companyInfo } from '@/data/company';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description:
    'Mentions légales du site Import Mangues Sénégal : identification de l\'entreprise, hébergeur, politique de protection des données (RGPD) et conditions d\'utilisation.',
};

export default function MentionsLegalesPage() {
  const fullAddress = `${companyInfo.address.street}, ${companyInfo.address.postalCode} ${companyInfo.address.city}`;

  return (
    <>
      {/* Page header */}
      <section className="bg-senegal-green-50 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading subtitle="Informations juridiques conformément à la loi française">
            Mentions Légales
          </SectionHeading>
        </div>
      </section>

      {/* Company identification */}
      <section className="px-4 py-16" aria-label="Identification de l'entreprise">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-senegal-green-800">
            1. Identification de l&apos;entreprise
          </h2>
          <div className="rounded-xl border border-senegal-green-100 bg-white p-6 shadow-sm">
            <dl className="space-y-3 text-base leading-relaxed text-senegal-green-700">
              <div>
                <dt className="font-semibold text-senegal-green-800">Raison sociale</dt>
                <dd>{companyInfo.name}</dd>
              </div>
              <div>
                <dt className="font-semibold text-senegal-green-800">Responsable de la publication</dt>
                <dd>{companyInfo.founder}</dd>
              </div>
              <div>
                <dt className="font-semibold text-senegal-green-800">Siège social</dt>
                <dd>{fullAddress}</dd>
              </div>
              <div>
                <dt className="font-semibold text-senegal-green-800">SIREN</dt>
                <dd>{companyInfo.siren}</dd>
              </div>
              <div>
                <dt className="font-semibold text-senegal-green-800">Date d&apos;immatriculation</dt>
                <dd>2023</dd>
              </div>
              <div>
                <dt className="font-semibold text-senegal-green-800">E-mail</dt>
                <dd>
                  <a
                    href={`mailto:${companyInfo.contact.email}`}
                    className="text-senegal-green-600 underline transition-colors duration-100 hover:text-senegal-green-800"
                  >
                    {companyInfo.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-senegal-green-800">Téléphone</dt>
                <dd>{companyInfo.contact.phone}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Hosting provider */}
      <section className="bg-senegal-green-50 px-4 py-16" aria-label="Hébergeur">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-senegal-green-800">
            2. Hébergeur du site
          </h2>
          <div className="rounded-xl border border-senegal-green-100 bg-white p-6 shadow-sm">
            <dl className="space-y-3 text-base leading-relaxed text-senegal-green-700">
              <div>
                <dt className="font-semibold text-senegal-green-800">Nom</dt>
                <dd>Vercel Inc.</dd>
              </div>
              <div>
                <dt className="font-semibold text-senegal-green-800">Adresse</dt>
                <dd>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</dd>
              </div>
              <div>
                <dt className="font-semibold text-senegal-green-800">Site web</dt>
                <dd>
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-senegal-green-600 underline transition-colors duration-100 hover:text-senegal-green-800"
                  >
                    https://vercel.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* RGPD / Data protection */}
      <section className="px-4 py-16" aria-label="Protection des données personnelles">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-senegal-green-800">
            3. Protection des données personnelles (RGPD)
          </h2>

          <div className="space-y-8">
            {/* Data types collected */}
            <div className="rounded-xl border border-senegal-green-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-senegal-green-800">
                3.1 Données collectées
              </h3>
              <p className="mb-3 text-base leading-relaxed text-senegal-green-700">
                Dans le cadre de l&apos;utilisation du formulaire de contact, nous collectons les
                données personnelles suivantes :
              </p>
              <ul className="list-inside list-disc space-y-1 text-base text-senegal-green-700">
                <li>Nom complet</li>
                <li>Adresse e-mail</li>
                <li>Numéro de téléphone (facultatif)</li>
              </ul>
            </div>

            {/* Purpose of processing */}
            <div className="rounded-xl border border-senegal-green-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-senegal-green-800">
                3.2 Finalité du traitement
              </h3>
              <p className="text-base leading-relaxed text-senegal-green-700">
                Les données collectées via le formulaire de contact sont utilisées uniquement dans
                le but de répondre à vos demandes d&apos;information, devis ou toute autre
                sollicitation relative à nos produits et services. Elles ne sont ni vendues, ni
                cédées à des tiers.
              </p>
            </div>

            {/* User rights */}
            <div className="rounded-xl border border-senegal-green-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-senegal-green-800">
                3.3 Vos droits
              </h3>
              <p className="mb-3 text-base leading-relaxed text-senegal-green-700">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous
                disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-inside list-disc space-y-1 text-base text-senegal-green-700">
                <li>
                  <strong className="text-senegal-green-800">Droit d&apos;accès</strong> : obtenir
                  la confirmation que vos données sont traitées et en recevoir une copie
                </li>
                <li>
                  <strong className="text-senegal-green-800">Droit de rectification</strong> :
                  demander la correction de données inexactes ou incomplètes
                </li>
                <li>
                  <strong className="text-senegal-green-800">Droit de suppression</strong> :
                  demander l&apos;effacement de vos données personnelles
                </li>
                <li>
                  <strong className="text-senegal-green-800">Droit à la portabilité</strong> :
                  recevoir vos données dans un format structuré et couramment utilisé
                </li>
              </ul>
            </div>

            {/* Contact for exercising rights */}
            <div className="rounded-xl border border-senegal-green-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-senegal-green-800">
                3.4 Exercer vos droits
              </h3>
              <p className="text-base leading-relaxed text-senegal-green-700">
                Pour exercer vos droits ou pour toute question relative à la protection de vos
                données personnelles, vous pouvez nous contacter :
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-base text-senegal-green-700">
                <li>
                  Par e-mail :{' '}
                  <a
                    href={`mailto:${companyInfo.contact.email}`}
                    className="text-senegal-green-600 underline transition-colors duration-100 hover:text-senegal-green-800"
                  >
                    {companyInfo.contact.email}
                  </a>
                </li>
                <li>Par courrier : {fullAddress}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Terms of use */}
      <section className="bg-senegal-green-50 px-4 py-16" aria-label="Conditions d'utilisation">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-senegal-green-800">
            4. Conditions d&apos;utilisation
          </h2>

          <div className="space-y-8">
            <div className="rounded-xl border border-senegal-green-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-senegal-green-800">
                4.1 Propriété intellectuelle
              </h3>
              <p className="text-base leading-relaxed text-senegal-green-700">
                L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes) est la
                propriété exclusive de {companyInfo.name} ou de ses partenaires. Toute reproduction,
                représentation ou diffusion, en tout ou partie, du contenu de ce site sans
                autorisation préalable est interdite.
              </p>
            </div>

            <div className="rounded-xl border border-senegal-green-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-senegal-green-800">
                4.2 Limitation de responsabilité
              </h3>
              <p className="text-base leading-relaxed text-senegal-green-700">
                {companyInfo.name} s&apos;efforce de fournir des informations aussi précises que
                possible sur ce site. Toutefois, l&apos;entreprise ne pourra être tenue responsable
                des omissions, inexactitudes ou carences dans la mise à jour des informations, que
                celles-ci soient de son fait ou du fait de tiers partenaires.
              </p>
            </div>

            <div className="rounded-xl border border-senegal-green-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-senegal-green-800">
                4.3 Cookies
              </h3>
              <p className="text-base leading-relaxed text-senegal-green-700">
                Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur.
                Conformément à la réglementation CNIL, un bandeau de consentement vous est présenté
                lors de votre première visite. Vous pouvez accepter ou refuser l&apos;utilisation
                des cookies non essentiels. Votre choix est conservé pendant 13 mois.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
