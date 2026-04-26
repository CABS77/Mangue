import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
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
      <section className="relative overflow-hidden bg-forest-green px-6 pt-32 pb-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,168,67,0.06),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <SectionHeading subtitle="Informations juridiques conformément à la loi française" light>
            Mentions Légales
          </SectionHeading>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Company identification */}
      <section className="bg-cream px-6 py-20 lg:px-8" aria-label="Identification de l'entreprise">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 font-serif text-2xl font-bold text-forest-green">
              1. Identification de l&apos;entreprise
            </h2>
            <div className="rounded-2xl bg-white p-8 shadow-premium">
              <dl className="space-y-4 text-base leading-relaxed text-charcoal font-sans">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="font-semibold text-forest-green sm:w-56 shrink-0">Raison sociale</dt>
                  <dd>{companyInfo.name}</dd>
                </div>
                <div className="h-px bg-cream-dark" />
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="font-semibold text-forest-green sm:w-56 shrink-0">Responsable de la publication</dt>
                  <dd>{companyInfo.founder}</dd>
                </div>
                <div className="h-px bg-cream-dark" />
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="font-semibold text-forest-green sm:w-56 shrink-0">Siège social</dt>
                  <dd>{fullAddress}</dd>
                </div>
                <div className="h-px bg-cream-dark" />
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="font-semibold text-forest-green sm:w-56 shrink-0">SIREN</dt>
                  <dd>{companyInfo.siren}</dd>
                </div>
                <div className="h-px bg-cream-dark" />
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="font-semibold text-forest-green sm:w-56 shrink-0">Date d&apos;immatriculation</dt>
                  <dd>2023</dd>
                </div>
                <div className="h-px bg-cream-dark" />
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="font-semibold text-forest-green sm:w-56 shrink-0">E-mail</dt>
                  <dd>
                    <a
                      href={`mailto:${companyInfo.contact.email}`}
                      className="text-forest-green underline decoration-gold/50 underline-offset-4 transition-colors duration-300 hover:text-gold"
                    >
                      {companyInfo.contact.email}
                    </a>
                  </dd>
                </div>
                <div className="h-px bg-cream-dark" />
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="font-semibold text-forest-green sm:w-56 shrink-0">Téléphone</dt>
                  <dd>{companyInfo.contact.phone}</dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Hosting provider */}
      <section className="bg-white px-6 py-20 lg:px-8" aria-label="Hébergeur">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 font-serif text-2xl font-bold text-forest-green">
              2. Hébergeur du site
            </h2>
            <div className="rounded-2xl bg-cream p-8 shadow-premium">
              <dl className="space-y-4 text-base leading-relaxed text-charcoal font-sans">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="font-semibold text-forest-green sm:w-56 shrink-0">Nom</dt>
                  <dd>Vercel Inc.</dd>
                </div>
                <div className="h-px bg-cream-dark" />
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="font-semibold text-forest-green sm:w-56 shrink-0">Adresse</dt>
                  <dd>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</dd>
                </div>
                <div className="h-px bg-cream-dark" />
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="font-semibold text-forest-green sm:w-56 shrink-0">Site web</dt>
                  <dd>
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest-green underline decoration-gold/50 underline-offset-4 transition-colors duration-300 hover:text-gold"
                    >
                      https://vercel.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* RGPD / Data protection */}
      <section className="bg-cream px-6 py-20 lg:px-8" aria-label="Protection des données personnelles">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 font-serif text-2xl font-bold text-forest-green">
              3. Protection des données personnelles (RGPD)
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal delay={100}>
              <div className="rounded-2xl bg-white p-8 shadow-premium">
                <h3 className="mb-4 font-serif text-xl font-semibold text-forest-green">
                  3.1 Données collectées
                </h3>
                <p className="mb-4 text-base leading-relaxed text-charcoal font-sans">
                  Dans le cadre de l&apos;utilisation du formulaire de contact, nous collectons les
                  données personnelles suivantes :
                </p>
                <ul className="list-inside list-disc space-y-2 text-base text-charcoal font-sans marker:text-gold">
                  <li>Nom complet</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone (facultatif)</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="rounded-2xl bg-white p-8 shadow-premium">
                <h3 className="mb-4 font-serif text-xl font-semibold text-forest-green">
                  3.2 Finalité du traitement
                </h3>
                <p className="text-base leading-relaxed text-charcoal font-sans">
                  Les données collectées via le formulaire de contact sont utilisées uniquement dans
                  le but de répondre à vos demandes d&apos;information, devis ou toute autre
                  sollicitation relative à nos produits et services. Elles ne sont ni vendues, ni
                  cédées à des tiers.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="rounded-2xl bg-white p-8 shadow-premium">
                <h3 className="mb-4 font-serif text-xl font-semibold text-forest-green">
                  3.3 Vos droits
                </h3>
                <p className="mb-4 text-base leading-relaxed text-charcoal font-sans">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous
                  disposez des droits suivants concernant vos données personnelles :
                </p>
                <ul className="list-inside list-disc space-y-2 text-base text-charcoal font-sans marker:text-gold">
                  <li>
                    <strong className="text-forest-green">Droit d&apos;accès</strong> : obtenir
                    la confirmation que vos données sont traitées et en recevoir une copie
                  </li>
                  <li>
                    <strong className="text-forest-green">Droit de rectification</strong> :
                    demander la correction de données inexactes ou incomplètes
                  </li>
                  <li>
                    <strong className="text-forest-green">Droit de suppression</strong> :
                    demander l&apos;effacement de vos données personnelles
                  </li>
                  <li>
                    <strong className="text-forest-green">Droit à la portabilité</strong> :
                    recevoir vos données dans un format structuré et couramment utilisé
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="rounded-2xl bg-white p-8 shadow-premium">
                <h3 className="mb-4 font-serif text-xl font-semibold text-forest-green">
                  3.4 Exercer vos droits
                </h3>
                <p className="text-base leading-relaxed text-charcoal font-sans">
                  Pour exercer vos droits ou pour toute question relative à la protection de vos
                  données personnelles, vous pouvez nous contacter :
                </p>
                <ul className="mt-4 list-inside list-disc space-y-2 text-base text-charcoal font-sans marker:text-gold">
                  <li>
                    Par e-mail :{' '}
                    <a
                      href={`mailto:${companyInfo.contact.email}`}
                      className="text-forest-green underline decoration-gold/50 underline-offset-4 transition-colors duration-300 hover:text-gold"
                    >
                      {companyInfo.contact.email}
                    </a>
                  </li>
                  <li>Par courrier : {fullAddress}</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Terms of use */}
      <section className="bg-white px-6 py-20 lg:px-8" aria-label="Conditions d'utilisation">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 font-serif text-2xl font-bold text-forest-green">
              4. Conditions d&apos;utilisation
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal delay={100}>
              <div className="rounded-2xl bg-cream p-8 shadow-premium">
                <h3 className="mb-4 font-serif text-xl font-semibold text-forest-green">
                  4.1 Propriété intellectuelle
                </h3>
                <p className="text-base leading-relaxed text-charcoal font-sans">
                  L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes) est la
                  propriété exclusive de {companyInfo.name} ou de ses partenaires. Toute reproduction,
                  représentation ou diffusion, en tout ou partie, du contenu de ce site sans
                  autorisation préalable est interdite.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="rounded-2xl bg-cream p-8 shadow-premium">
                <h3 className="mb-4 font-serif text-xl font-semibold text-forest-green">
                  4.2 Limitation de responsabilité
                </h3>
                <p className="text-base leading-relaxed text-charcoal font-sans">
                  {companyInfo.name} s&apos;efforce de fournir des informations aussi précises que
                  possible sur ce site. Toutefois, l&apos;entreprise ne pourra être tenue responsable
                  des omissions, inexactitudes ou carences dans la mise à jour des informations, que
                  celles-ci soient de son fait ou du fait de tiers partenaires.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="rounded-2xl bg-cream p-8 shadow-premium">
                <h3 className="mb-4 font-serif text-xl font-semibold text-forest-green">
                  4.3 Cookies
                </h3>
                <p className="text-base leading-relaxed text-charcoal font-sans">
                  Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur.
                  Conformément à la réglementation CNIL, un bandeau de consentement vous est présenté
                  lors de votre première visite. Vous pouvez accepter ou refuser l&apos;utilisation
                  des cookies non essentiels. Votre choix est conservé pendant 13 mois.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
