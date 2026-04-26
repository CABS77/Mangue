import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Footer from './Footer';

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Footer', () => {
  it('renders the company name', () => {
    render(<Footer />);
    expect(screen.getByText('Import Mangues Sénégal')).toBeInTheDocument();
  });

  it('renders the company address', () => {
    render(<Footer />);
    expect(screen.getByText('14 voie des meuniers, 94550 Chevilly-Larue')).toBeInTheDocument();
  });

  it('renders the SIREN number', () => {
    render(<Footer />);
    expect(screen.getByText(/SIREN.*947 529 046/)).toBeInTheDocument();
  });

  it('renders a link to /mentions-legales', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'Mentions légales' });
    expect(link).toHaveAttribute('href', '/mentions-legales');
  });

  it('renders a link to /contact', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'Contact' });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('renders a copyright notice with the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Import Mangues Sénégal. Tous droits réservés.`)).toBeInTheDocument();
  });

  it('renders the contact email', () => {
    render(<Footer />);
    expect(screen.getByText('cabs77.fr@gmail.com')).toBeInTheDocument();
  });

  it('renders the contact phone number', () => {
    render(<Footer />);
    expect(screen.getByText('+33 7 52 90 00 84')).toBeInTheDocument();
  });

  it('uses a <footer> element', () => {
    render(<Footer />);
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });
});
