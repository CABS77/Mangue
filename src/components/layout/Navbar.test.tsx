import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Navbar from './Navbar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement('a', { href: props.href, ...props }, props.children),
}));

import { usePathname } from 'next/navigation';

describe('Navbar', () => {
  it('renders the company name', () => {
    render(<Navbar />);
    expect(screen.getByText('Import Mangues Sénégal')).toBeInTheDocument();
  });

  it('renders the mango logo emoji', () => {
    render(<Navbar />);
    expect(screen.getByLabelText('Mangue')).toHaveTextContent('🥭');
  });

  it('renders all navigation links', () => {
    render(<Navbar />);
    const accueilLinks = screen.getAllByText('Accueil');
    const produitsLinks = screen.getAllByText('Produits');
    const aProposLinks = screen.getAllByText('À Propos');
    const contactLinks = screen.getAllByText('Contact');

    // Each link appears twice: desktop + mobile
    expect(accueilLinks.length).toBe(2);
    expect(produitsLinks.length).toBe(2);
    expect(aProposLinks.length).toBe(2);
    expect(contactLinks.length).toBe(2);
  });

  it('uses a <nav> element with aria-label', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation', { name: 'Navigation principale' });
    expect(nav).toBeInTheDocument();
  });

  it('highlights the active page link with aria-current="page"', () => {
    vi.mocked(usePathname).mockReturnValue('/produits');
    render(<Navbar />);

    const produitsLinks = screen.getAllByText('Produits');
    produitsLinks.forEach((link) => {
      expect(link).toHaveAttribute('aria-current', 'page');
    });

    // Non-active links should not have aria-current
    const accueilLinks = screen.getAllByText('Accueil');
    accueilLinks.forEach((link) => {
      expect(link).not.toHaveAttribute('aria-current');
    });
  });

  it('renders hamburger button with aria-expanded and aria-controls', () => {
    render(<Navbar />);
    const button = screen.getByRole('button', { name: /menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('toggles mobile menu open and closed', () => {
    render(<Navbar />);
    const button = screen.getByRole('button', { name: /menu/i });
    const mobileMenu = document.getElementById('mobile-menu');

    // Initially closed
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(mobileMenu).toHaveClass('max-h-0');

    // Open
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(mobileMenu).toHaveClass('max-h-64');

    // Close
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(mobileMenu).toHaveClass('max-h-0');
  });

  it('closes mobile menu when a link is clicked', () => {
    render(<Navbar />);
    const button = screen.getByRole('button', { name: /menu/i });

    // Open menu
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Click a mobile link (get the second "Produits" which is the mobile one)
    const produitsLinks = screen.getAllByText('Produits');
    fireEvent.click(produitsLinks[1]);

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('has a mobile-menu element with matching id for aria-controls', () => {
    render(<Navbar />);
    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
  });
});
