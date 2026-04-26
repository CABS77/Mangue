'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { companyInfo } from '@/data/company';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/produits', label: 'Produits' },
  { href: '/a-propos', label: 'À Propos' },
  { href: '/contact', label: 'Contact' },
];

function CloseIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav aria-label="Navigation principale" className="bg-senegal-green-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and company name */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white no-underline transition-colors duration-100 hover:text-senegal-yellow-300"
            onClick={closeMobileMenu}
          >
            <span className="text-2xl" role="img" aria-label="Mangue">🥭</span>
            <span className="text-lg font-bold">{companyInfo.name}</span>
          </Link>

          {/* Desktop navigation links */}
          <ul className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-100 ${
                      isActive
                        ? 'bg-senegal-green-600 text-senegal-yellow-300'
                        : 'text-white hover:bg-senegal-green-700 hover:text-senegal-yellow-200'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger button (mobile) */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-white transition-colors duration-100 hover:bg-senegal-green-700 hover:text-senegal-yellow-200 md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">
              {mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            </span>
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel (slide-down) */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-4 pb-4 pt-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium transition-colors duration-100 ${
                    isActive
                      ? 'bg-senegal-green-600 text-senegal-yellow-300'
                      : 'text-white hover:bg-senegal-green-700 hover:text-senegal-yellow-200'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
