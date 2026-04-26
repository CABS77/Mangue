import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Home from './page';

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Homepage', () => {
  it('renders the hero section with main heading', () => {
    render(<Home />);
    // Heading text is split across elements: "Les meilleures mangues" + "du Sénégal"
    expect(screen.getByText(/les meilleures mangues/i)).toBeInTheDocument();
    // "du Sénégal" appears in multiple places, verify at least one exists
    const matches = screen.getAllByText(/du sénégal/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the hero CTA linking to /produits', () => {
    render(<Home />);
    const ctaLink = screen.getByRole('link', { name: /découvrir nos mangues/i });
    expect(ctaLink).toHaveAttribute('href', '/produits');
  });

  it('renders the three selling points', () => {
    render(<Home />);
    expect(screen.getByText('Origine Sénégalaise')).toBeInTheDocument();
    expect(screen.getByText('Qualité Premium')).toBeInTheDocument();
    expect(screen.getByText('Import Direct')).toBeInTheDocument();
  });

  it('renders the product preview section with featured mangoes', () => {
    render(<Home />);
    expect(screen.getByText('Nos mangues phares')).toBeInTheDocument();
    // First 3 products should be shown
    expect(screen.getByText('Kent')).toBeInTheDocument();
    expect(screen.getByText('Keitt')).toBeInTheDocument();
    expect(screen.getByText('Boucodiékhal')).toBeInTheDocument();
  });

  it('renders a link to see all varieties', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /voir toutes nos variétés/i });
    expect(link).toHaveAttribute('href', '/produits');
  });

  it('renders the testimonials / key figures section', () => {
    render(<Home />);
    expect(screen.getByText(/chiffres clés/i)).toBeInTheDocument();
    expect(screen.getByText('Marie L.')).toBeInTheDocument();
    expect(screen.getByText('Chef Amadou D.')).toBeInTheDocument();
  });

  it('renders the bottom CTA section linking to /contact', () => {
    render(<Home />);
    expect(screen.getByText(/envie de mangues du sénégal/i)).toBeInTheDocument();
    // Multiple "Nous contacter" links exist (hero + CTA), use getAllBy
    const ctaLinks = screen.getAllByRole('link', { name: /nous contacter/i });
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
    expect(ctaLinks.some(link => link.getAttribute('href') === '/contact')).toBe(true);
  });

  it('renders all five homepage sections with aria-labels', () => {
    render(<Home />);
    expect(screen.getByLabelText('Bannière principale')).toBeInTheDocument();
    expect(screen.getByLabelText('Nos engagements')).toBeInTheDocument();
    expect(screen.getByLabelText('Aperçu des produits')).toBeInTheDocument();
    expect(screen.getByLabelText('Chiffres clés et témoignages')).toBeInTheDocument();
    expect(screen.getByLabelText("Appel à l'action")).toBeInTheDocument();
  });
});
