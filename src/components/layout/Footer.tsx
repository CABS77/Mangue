import Link from 'next/link';
import { companyInfo } from '@/data/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const fullAddress = `${companyInfo.address.street}, ${companyInfo.address.postalCode} ${companyInfo.address.city}`;

  return (
    <footer className="bg-senegal-green-900 text-senegal-green-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Company info */}
          <div>
            <h2 className="mb-3 text-lg font-bold text-white">{companyInfo.name}</h2>
            <address className="not-italic leading-relaxed text-senegal-green-200">
              <p>{fullAddress}</p>
              <p>SIREN : {companyInfo.siren}</p>
            </address>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="mb-3 text-lg font-bold text-white">Liens utiles</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-senegal-green-200 transition-colors duration-100 hover:text-senegal-yellow-300"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-senegal-green-200 transition-colors duration-100 hover:text-senegal-yellow-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h2 className="mb-3 text-lg font-bold text-white">Contact</h2>
            <ul className="space-y-2 text-senegal-green-200">
              <li>
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="transition-colors duration-100 hover:text-senegal-yellow-300"
                >
                  {companyInfo.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.contact.phone.replace(/\s/g, '')}`}
                  className="transition-colors duration-100 hover:text-senegal-yellow-300"
                >
                  {companyInfo.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-senegal-green-700 pt-6 text-center text-sm text-senegal-green-300">
          <p>© {currentYear} {companyInfo.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
