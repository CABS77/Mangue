'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-forest-green/95 backdrop-blur-md shadow-premium-lg'
          : 'bg-forest-green'
      }`}
    >
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and company name */}
          <Link
            href="/"
            className="flex items-center gap-3 text-white no-underline transition-all duration-300 hover:text-gold group"
            onClick={closeMobileMenu}
          >
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110" role="img" aria-label="Mangue">🥭</span>
            <span className="text-lg font-semibold tracking-wide font-sans">{companyInfo.name}</span>
          </Link>

          {/* Desktop navigation links */}
          <ul className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 font-sans nav-link-underline ${
                      isActive
                        ? 'text-gold active'
                        : 'text-white/90 hover:text-gold'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="ml-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-forest-green transition-all duration-300 hover:bg-gold-light hover:shadow-gold btn-scale font-sans"
              >
                Commander
              </Link>
            </li>
          </ul>

          {/* Hamburger button (mobile) */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-white transition-colors duration-300 hover:text-gold md:hidden"
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

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/10 px-6 pb-6 pt-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 font-sans ${
                      isActive
                        ? 'bg-white/10 text-gold'
                        : 'text-white/90 hover:bg-white/5 hover:text-gold'
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
          <div className="mt-4 pt-4 border-t border-white/10">
            <Link
              href="/contact"
              className="block w-full rounded-full bg-gold px-6 py-3 text-center text-base font-semibold text-forest-green transition-all duration-300 hover:bg-gold-light font-sans"
              onClick={closeMobileMenu}
            >
              Commander
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
