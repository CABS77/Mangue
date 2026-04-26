import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import MentionsLegalesPage from './page';

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Legal page (Mentions Légales)', () => {
  it('renders the page heading', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText('Mentions Légales')).toBeInTheDocument();
  });

  // Section 1: Company identification
  it('renders the company identification section', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText("1. Identification de l'entreprise")).toBeInTheDocument();
  });

  it('renders the company name', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText('Import Mangues Sénégal')).toBeInTheDocument();
  });

  it('renders the founder name', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText('Cheikh Ahmadou Bamba Sall')).toBeInTheDocument();
  });

  it('renders the company address', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText('14 voie des meuniers, 94550 Chevilly-Larue')).toBeInTheDocument();
  });

  it('renders the SIREN number', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText('947 529 046')).toBeInTheDocument();
  });

  // Section 2: Hosting provider
  it('renders the hosting provider section', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText('2. Hébergeur du site')).toBeInTheDocument();
    expect(screen.getByText('Vercel Inc.')).toBeInTheDocument();
  });

  // Section 3: RGPD / Data protection
  it('renders the RGPD data protection section', () => {
    render(<MentionsLegalesPage />);
    expect(
      screen.getByText('3. Protection des données personnelles (RGPD)')
    ).toBeInTheDocument();
  });

  it('renders data types collected', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText('Nom complet')).toBeInTheDocument();
    expect(screen.getByText('Adresse e-mail')).toBeInTheDocument();
    expect(screen.getByText('Numéro de téléphone (facultatif)')).toBeInTheDocument();
  });

  it('renders user rights section', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText('3.3 Vos droits')).toBeInTheDocument();
  });

  // Section 4: Terms of use
  it('renders the terms of use section', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText("4. Conditions d'utilisation")).toBeInTheDocument();
  });

  it('renders intellectual property subsection', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText('4.1 Propriété intellectuelle')).toBeInTheDocument();
  });

  it('renders cookies subsection', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByText('4.3 Cookies')).toBeInTheDocument();
  });

  it('has aria-labels on the page sections', () => {
    render(<MentionsLegalesPage />);
    expect(screen.getByLabelText("Identification de l'entreprise")).toBeInTheDocument();
    expect(screen.getByLabelText('Hébergeur')).toBeInTheDocument();
    expect(screen.getByLabelText('Protection des données personnelles')).toBeInTheDocument();
    expect(screen.getByLabelText("Conditions d'utilisation")).toBeInTheDocument();
  });
});
