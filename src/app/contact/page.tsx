import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ContactForm from '@/components/contact/ContactForm';
import LocationMapWrapper from '@/components/contact/LocationMapWrapper';
import { companyInfo } from '@/data/company';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez Import Mangues Sénégal pour toute demande de renseignements, devis ou commande de mangues. Particuliers et professionnels bienvenus.',
};

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-forest-green px-6 pt-32 pb-24 lg:px-8" aria-label="En-tête contact">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,168,67,0.08),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <SectionHeading subtitle="Particuliers ou professionnels, nous sommes à votre écoute" light>
            Contactez-nous
          </SectionHeading>
          <p className="text-base leading-relaxed text-white/70 font-sans">
            Vous souhaitez en savoir plus sur nos mangues, passer une commande ou obtenir un devis ?
            Remplissez le formulaire ci-dessous ou contactez-nous directement.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Form + Company coordinates — split layout */}
      <section className="bg-cream px-6 py-24 lg:px-8" aria-label="Formulaire et coordonnées">
        <div className="mx-auto grid max-w-content gap-16 lg:grid-cols-5">
          {/* Contact form — takes 3 columns */}
          <ScrollReveal className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-10 shadow-premium">
              <h3 className="mb-8 font-serif text-2xl font-bold text-forest-green">
                Envoyez-nous un message
              </h3>
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Company coordinates — takes 2 columns */}
          <ScrollReveal className="lg:col-span-2" delay={200}>
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-forest-green">
                Nos coordonnées
              </h3>

              {/* Info cards */}
              <div className="space-y-4">
                {/* Address */}
                <div className="rounded-2xl bg-white p-6 shadow-premium card-hover">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream">
                      <span aria-hidden="true" className="text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-premium text-gold font-sans">
                        Adresse
                      </h4>
                      <address className="mt-1 not-italic text-sm leading-relaxed text-charcoal font-sans">
                        {companyInfo.address.street}
                        <br />
                        {companyInfo.address.postalCode} {companyInfo.address.city}
                        <br />
                        {companyInfo.address.country}
                      </address>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl bg-white p-6 shadow-premium card-hover">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream">
                      <span aria-hidden="true" className="text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-premium text-gold font-sans">
                        E-mail
                      </h4>
                      <a
                        href={`mailto:${companyInfo.contact.email}`}
                        className="mt-1 block text-sm text-forest-green transition-colors duration-300 hover:text-gold font-sans"
                      >
                        {companyInfo.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-2xl bg-white p-6 shadow-premium card-hover">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream">
                      <span aria-hidden="true" className="text-xl">📞</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-premium text-gold font-sans">
                        Téléphone
                      </h4>
                      <a
                        href={`tel:${companyInfo.contact.phone.replace(/\s/g, '')}`}
                        className="mt-1 block text-sm text-forest-green transition-colors duration-300 hover:text-gold font-sans"
                      >
                        {companyInfo.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business info */}
                <div className="rounded-2xl bg-white p-6 shadow-premium card-hover">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream">
                      <span aria-hidden="true" className="text-xl">🏢</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-premium text-gold font-sans">
                        Entreprise
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal font-sans">
                        {companyInfo.name}
                        <br />
                        SIREN : {companyInfo.siren}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Location map */}
      <section className="bg-white px-6 py-24 lg:px-8" aria-label="Carte de localisation">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <h3 className="mb-10 text-center font-serif text-3xl font-bold text-forest-green">
              Nous trouver
            </h3>
            <div className="overflow-hidden rounded-2xl shadow-premium">
              <LocationMapWrapper
                latitude={companyInfo.coordinates.latitude}
                longitude={companyInfo.coordinates.longitude}
                address={`${companyInfo.address.street}, ${companyInfo.address.postalCode} ${companyInfo.address.city}`}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
