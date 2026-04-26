import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

// Mock next/link to render a plain anchor for testing
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Button', () => {
  it('renders as a button element by default', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: 'Click me' });
    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe('BUTTON');
  });

  it('renders as a link when href is provided', () => {
    render(<Button href="/produits">Voir les produits</Button>);
    const link = screen.getByRole('link', { name: 'Voir les produits' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/produits');
  });

  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole('button', { name: 'Primary' });
    expect(btn.className).toContain('bg-gold');
    expect(btn.className).toContain('text-forest-green');
  });

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole('button', { name: 'Secondary' });
    expect(btn.className).toContain('bg-forest-green');
    expect(btn.className).toContain('text-white');
  });

  it('applies outline variant classes', () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole('button', { name: 'Outline' });
    expect(btn.className).toContain('bg-transparent');
    expect(btn.className).toContain('border-white');
  });

  it('includes scale animation class for hover feedback', () => {
    render(<Button>Hover me</Button>);
    const btn = screen.getByRole('button', { name: 'Hover me' });
    expect(btn.className).toContain('btn-scale');
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Click' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<Button className="mt-4">Styled</Button>);
    const btn = screen.getByRole('button', { name: 'Styled' });
    expect(btn.className).toContain('mt-4');
  });

  it('applies variant classes to link buttons', () => {
    render(<Button href="/contact" variant="secondary">Contact</Button>);
    const link = screen.getByRole('link', { name: 'Contact' });
    expect(link.className).toContain('bg-forest-green');
    expect(link.className).toContain('text-white');
  });
});
