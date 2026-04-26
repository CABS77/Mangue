import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SectionHeading from './SectionHeading';

describe('SectionHeading', () => {
  it('renders an h2 element with the provided text', () => {
    render(<SectionHeading>Nos Mangues</SectionHeading>);
    const heading = screen.getByRole('heading', { level: 2, name: 'Nos Mangues' });
    expect(heading).toBeInTheDocument();
  });

  it('uses Senegal green color for the heading', () => {
    render(<SectionHeading>Titre</SectionHeading>);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.className).toContain('text-senegal-green-800');
  });

  it('renders subtitle when provided', () => {
    render(
      <SectionHeading subtitle="Découvrez nos variétés">
        Nos Produits
      </SectionHeading>
    );
    expect(screen.getByText('Découvrez nos variétés')).toBeInTheDocument();
  });

  it('does not render subtitle paragraph when not provided', () => {
    const { container } = render(<SectionHeading>Titre</SectionHeading>);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(0);
  });

  it('centers content by default', () => {
    const { container } = render(<SectionHeading>Centré</SectionHeading>);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('text-center');
  });

  it('does not center content when centered is false', () => {
    const { container } = render(
      <SectionHeading centered={false}>Aligné à gauche</SectionHeading>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).not.toContain('text-center');
  });

  it('merges custom className', () => {
    const { container } = render(
      <SectionHeading className="mt-16">Custom</SectionHeading>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('mt-16');
  });
});
