import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import ProduitsPage from './page';
import { products } from '@/data/products';

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Products page', () => {
  it('renders the introduction section', () => {
    render(<ProduitsPage />);
    expect(screen.getByText('Nos variétés de mangues')).toBeInTheDocument();
    expect(
      screen.getByText(/des mangues d'exception, du verger sénégalais à votre table/i)
    ).toBeInTheDocument();
  });

  it('renders all products from the data source', () => {
    render(<ProduitsPage />);
    for (const product of products) {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    }
  });

  it('renders product descriptions', () => {
    render(<ProduitsPage />);
    for (const product of products) {
      expect(screen.getByText(product.description)).toBeInTheDocument();
    }
  });

  it('renders product seasons', () => {
    render(<ProduitsPage />);
    const uniqueSeasons = [...new Set(products.map((p) => p.season))];
    for (const season of uniqueSeasons) {
      expect(screen.getAllByText(season).length).toBeGreaterThan(0);
    }
  });

  it('renders product images with correct alt text', () => {
    render(<ProduitsPage />);
    for (const product of products) {
      const img = screen.getByAltText(product.imageAlt);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', product.image);
    }
  });

  it('renders the correct number of product cards', () => {
    render(<ProduitsPage />);
    const articles = document.querySelectorAll('article');
    expect(articles.length).toBe(products.length);
  });

  it('has aria-labels on the page sections', () => {
    render(<ProduitsPage />);
    expect(screen.getByLabelText('Introduction produits')).toBeInTheDocument();
    expect(screen.getByLabelText('Catalogue de mangues')).toBeInTheDocument();
  });
});
