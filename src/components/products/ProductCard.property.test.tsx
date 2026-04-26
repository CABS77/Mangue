import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { render, cleanup } from '@testing-library/react';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

/**
 * Property 1: ProductCard renders all required fields
 * Validates: Requirements 3.2
 *
 * For any valid Product object, rendering a ProductCard with that product
 * should produce output containing the product's name, description, season,
 * caliber, and an image with the correct alt text.
 */
describe('Property 1: ProductCard renders all required fields', () => {
  const nonEmptyStringArb = fc
    .string({ minLength: 1 })
    .filter((s) => s.trim().length > 0);

  const productArb: fc.Arbitrary<Product> = fc.record({
    id: nonEmptyStringArb,
    name: nonEmptyStringArb,
    description: nonEmptyStringArb,
    season: nonEmptyStringArb,
    caliber: nonEmptyStringArb,
    image: nonEmptyStringArb,
    imageAlt: nonEmptyStringArb,
  });

  it('renders name, description, season, caliber, and image with correct alt text for any valid product', () => {
    fc.assert(
      fc.property(productArb, (product: Product) => {
        cleanup();
        const { container } = render(<ProductCard product={product} />);

        // Verify product name is rendered in an h3
        const heading = container.querySelector('h3');
        expect(heading).not.toBeNull();
        expect(heading!.textContent).toContain(product.name);

        // Verify description is rendered in a paragraph
        const paragraphs = container.querySelectorAll('p');
        const descriptionFound = Array.from(paragraphs).some(
          (p) => p.textContent?.includes(product.description.trim())
        );
        expect(descriptionFound).toBe(true);

        // Verify season text is present in the rendered output
        expect(container.textContent).toContain(product.season);

        // Verify caliber text is present in the rendered output
        expect(container.textContent).toContain(product.caliber);

        // Verify image with correct src and alt text
        const img = container.querySelector('img');
        expect(img).not.toBeNull();
        expect(img!.getAttribute('src')).toBe(product.image);
        expect(img!.getAttribute('alt')).toBe(product.imageAlt);

        cleanup();
      }),
      { numRuns: 100 }
    );
  });
});
