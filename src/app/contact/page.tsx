import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
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
      <section className="bg-senegal-green-50 px-4 py-20" aria-label="En-tête contact">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading subtitle="Particuliers ou professionnels, nous sommes à votre écoute">
            Contactez-nous
          </SectionHeading>
          <p className="text-base leading-relaxed text-senegal-green-700">
            Vous souhaitez en savoir plus sur nos mangues, passer une commande ou obtenir un devis ?
            Remplissez le formulaire ci-dessous ou contactez-nous directement.
          </p>
        </div>
      </section>

      {/* Form + Company coordinates */}
      <section className="px-4 py-20" aria-label="Formulaire et coordonnées">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold text-senegal-green-800">
              Envoyez-nous un message
            </h3>
            <ContactForm />
          </div>

          {/* Company coordinates */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold text-senegal-green-800">
              Nos coordonnées
            </h3>
            <div className="space-y-8 rounded-lg bg-senegal-green-50 p-8">
              {/* Address */}
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-lg font-medium text-senegal-green-800">
                  <span aria-hidden="true">📍</span>
                  Adresse
                </h4>
                <address className="not-italic leading-relaxed text-senegal-green-700">
                  {companyInfo.address.street}
                  <br />
                  {companyInfo.address.postalCode} {companyInfo.address.city}
                  <br />
                  {companyInfo.address.country}
                </address>
              </div>

              {/* Email */}
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-lg font-medium text-senegal-green-800">
                  <span aria-hidden="true">✉️</span>
                  E-mail
                </h4>
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="text-senegal-green-600 underline transition-colors duration-100 hover:text-senegal-green-500"
                >
                  {companyInfo.contact.email}
                </a>
              </div>

              {/* Phone */}
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-lg font-medium text-senegal-green-800">
                  <span aria-hidden="true">📞</span>
                  Téléphone
                </h4>
                <a
                  href={`tel:${companyInfo.contact.phone.replace(/\s/g, '')}`}
                  className="text-senegal-green-600 underline transition-colors duration-100 hover:text-senegal-green-500"
                >
                  {companyInfo.contact.phone}
                </a>
              </div>

              {/* Business info */}
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-lg font-medium text-senegal-green-800">
                  <span aria-hidden="true">🏢</span>
                  Entreprise
                </h4>
                <p className="leading-relaxed text-senegal-green-700">
                  {companyInfo.name}
                  <br />
                  SIREN : {companyInfo.siren}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location map */}
      <section className="bg-senegal-green-50 px-4 py-20" aria-label="Carte de localisation">
        <div className="mx-auto max-w-6xl">
          <h3 className="mb-8 text-center text-2xl font-semibold text-senegal-green-800">
            Nous trouver
          </h3>
          <LocationMapWrapper
            latitude={companyInfo.coordinates.latitude}
            longitude={companyInfo.coordinates.longitude}
            address={`${companyInfo.address.street}, ${companyInfo.address.postalCode} ${companyInfo.address.city}`}
          />
        </div>
      </section>
    </>
  );
}
