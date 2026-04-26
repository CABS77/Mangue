# Implementation Plan: Mango Import Website

## Overview

Build a professional static website for a Senegalese mango import business using Next.js 14 (App Router), TypeScript, and Tailwind CSS. The site includes 5 pages (Accueil, Produits, À Propos, Contact, Mentions Légales), a contact form via external service, an OpenStreetMap embed, and CNIL-compliant cookie consent. All data is static, and the site is exported as a static build.

## Tasks

- [x] 1. Set up project structure, types, and static data
  - [x] 1.1 Initialize Next.js 14 project with TypeScript and Tailwind CSS
    - Run `npx create-next-app@14` with App Router, TypeScript, Tailwind CSS, and ESLint
    - Install additional dependencies: `leaflet`, `react-leaflet`, `@types/leaflet`, `fast-check`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
    - Configure `next.config.mjs` for static export (`output: 'export'`)
    - Set up `vitest.config.ts` with jsdom environment and React Testing Library
    - Set up `src/styles/globals.css` with Tailwind imports and custom CSS variables for the Senegal-inspired color palette (greens, yellow-orange, gold)
    - _Requirements: 9.2, 9.3_

  - [x] 1.2 Define TypeScript types and static data files
    - Create `src/types/index.ts` with `Product`, `CompanyInfo`, `SellingPoint`, `CookieConsent` interfaces
    - Create `src/data/products.ts` with mango variety catalog (Kent, Keitt, Boucodiékhal, etc.) including id, name, description, season, caliber, image path, and imageAlt
    - Create `src/data/company.ts` with company information constants (name, founder, SIREN, address, coordinates, contact)
    - _Requirements: 3.2, 4.1, 5.5_

- [x] 2. Implement utility modules (validation and cookies)
  - [x] 2.1 Implement form validation module
    - Create `src/lib/validation.ts` with `validateContactForm`, `validateEmail`, and `validateRequired` functions
    - `validateContactForm` returns `{ isValid, errors }` — `isValid` is true only when all required fields (fullName, email, message, requestType) are non-empty after trimming and email passes format validation
    - `validateEmail` checks for valid email pattern (local@domain.tld with exactly one `@`, non-empty local part, domain with at least one dot)
    - `validateRequired` returns an error message string if the value is empty after trimming, or null if valid
    - _Requirements: 5.2, 5.3, 5.4_

  - [ ]* 2.2 Write property test: Form validation correctness (Property 2)
    - **Property 2: Form validation correctness**
    - Generate random `ContactFormData` objects with varying valid/invalid fields using `fc.record` with mix of `fc.string()` and `fc.constant('')`
    - Verify `validateContactForm` returns `isValid: true` with empty errors only when all required fields are non-empty and email is valid
    - Verify `isValid: false` with appropriate error entries when any required field is empty or email is invalid
    - Minimum 100 iterations
    - **Validates: Requirements 5.2, 5.3**

  - [ ]* 2.3 Write property test: Email format validation (Property 3)
    - **Property 3: Email format validation**
    - Generate valid emails using `fc.emailAddress()` and verify `validateEmail` returns `true`
    - Generate random invalid strings using `fc.string()` and verify `validateEmail` returns `false` for strings without valid email structure
    - Minimum 100 iterations
    - **Validates: Requirements 5.4**

  - [x] 2.4 Implement cookie consent module
    - Create `src/lib/cookies.ts` with `getConsent`, `setConsent`, `isConsentValid`, and `hasValidConsent` functions
    - `setConsent(accepted)` stores a `CookieConsent` object in localStorage with `accepted`, `timestamp` (Date.now()), and `expiresAt` (timestamp + 13 months)
    - `getConsent()` reads from localStorage, returns parsed `CookieConsent` or null if missing/corrupted
    - `isConsentValid(consent)` returns true if current time < `expiresAt`
    - `hasValidConsent()` combines getConsent + isConsentValid
    - Handle localStorage unavailability (private browsing) with try/catch fallback
    - _Requirements: 7.2, 7.3, 7.5_

  - [ ]* 2.5 Write property test: Cookie consent round-trip (Property 4)
    - **Property 4: Cookie consent storage round-trip**
    - Generate random booleans with `fc.boolean()`, call `setConsent(value)` then `getConsent()`
    - Verify returned `CookieConsent.accepted` equals the original value
    - Verify `timestamp` is close to current time and `expiresAt` is approximately 13 months after `timestamp`
    - Minimum 100 iterations
    - **Validates: Requirements 7.2, 7.3**

  - [ ]* 2.6 Write property test: Cookie consent expiry validation (Property 5)
    - **Property 5: Cookie consent expiry validation**
    - Generate random `CookieConsent` objects with `fc.record({ accepted: fc.boolean(), timestamp: fc.integer(), expiresAt: fc.integer() })`
    - Verify `isConsentValid` returns `true` when `expiresAt` is in the future and `false` when `expiresAt` is in the past
    - Minimum 100 iterations
    - **Validates: Requirements 7.5**

- [x] 3. Checkpoint — Utility modules
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement shared layout components
  - [x] 4.1 Implement Navbar component
    - Create `src/components/layout/Navbar.tsx`
    - Display logo and company name on the left, navigation links (Accueil, Produits, À Propos, Contact) on the right
    - Collapse to hamburger menu below 768px (md breakpoint) with `aria-expanded` and `aria-controls` attributes
    - Highlight active page link using `usePathname()`
    - Mobile menu as slide-down panel
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6_

  - [x] 4.2 Implement Footer component
    - Create `src/components/layout/Footer.tsx`
    - Display company address (14 voie des meuniers, 94550 Chevilly-Larue), SIREN (947 529 046)
    - Include links to `/mentions-legales` and `/contact`
    - Display copyright notice
    - _Requirements: 1.4, 6.5_

  - [x] 4.3 Implement CookieBanner component
    - Create `src/components/cookies/CookieBanner.tsx`
    - Check localStorage for existing consent on mount using `hasValidConsent()` from cookies.ts
    - If no valid consent: display banner with "Accepter" and "Refuser" buttons
    - "Accepter" calls `setConsent(true)`, hides banner
    - "Refuser" calls `setConsent(false)`, hides banner
    - No non-essential cookies loaded until explicit consent
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 4.4 Implement reusable UI components
    - Create `src/components/ui/Button.tsx` — reusable button with hover feedback within 100ms
    - Create `src/components/ui/SectionHeading.tsx` — reusable section heading component
    - Use Tailwind for consistent styling with the Senegal-inspired palette
    - _Requirements: 9.2, 9.5_

  - [x] 4.5 Implement root layout
    - Create `src/app/layout.tsx` with Navbar, Footer, and CookieBanner as shared components
    - Add Schema.org LocalBusiness JSON-LD structured data in `<script type="application/ld+json">`
    - Set default meta tags (title, description) with Next.js Metadata API
    - Use semantic HTML elements (header, main, footer)
    - Set minimum font size of 16px for body text
    - _Requirements: 1.1, 1.4, 8.2, 8.3, 8.6, 9.3_

- [x] 5. Implement pages
  - [x] 5.1 Implement Homepage (/)
    - Create `src/app/page.tsx`
    - Create `src/components/home/HeroSection.tsx` — hero banner with mango image, catchy title, and CTA button linking to `/produits`
    - Create `src/components/home/SellingPoints.tsx` — three selling points (Senegalese origin, fruit quality, direct import)
    - Create `src/components/home/ProductPreview.tsx` — featured mango varieties with link to `/produits`
    - Create `src/components/home/Testimonials.tsx` — testimonials or key figures section
    - Create `src/components/home/CtaSection.tsx` — bottom CTA linking to `/contact`
    - Set page-specific meta tags
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 8.2_

  - [x] 5.2 Implement Products page (/produits)
    - Create `src/app/produits/page.tsx`
    - Create `src/components/products/ProductCard.tsx` — displays product image (WebP with descriptive alt text), variety name, description, season, and caliber
    - Render all products from `src/data/products.ts` as ProductCard components
    - Add introduction section explaining mango origin and selection process
    - Responsive grid: single column below 768px, 2-3 columns at 768px+
    - Set page-specific meta tags
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.2, 8.5_

  - [ ]* 5.3 Write property test: ProductCard renders all required fields (Property 1)
    - **Property 1: ProductCard renders all required fields**
    - Generate random valid `Product` objects using `fc.record({ id: fc.string(), name: fc.string({minLength:1}), ... })`
    - Render `ProductCard` with each generated product and verify output contains name, description, season, caliber, and image with correct alt text
    - Minimum 100 iterations
    - **Validates: Requirements 3.2**

  - [x] 5.4 Implement Contact page (/contact)
    - Create `src/app/contact/page.tsx`
    - Create `src/components/contact/ContactForm.tsx` — form with fields: fullName, email, phone (optional), requestType (particulier/professionnel), message
    - Client-side validation using `validateContactForm` from validation.ts before submission
    - Show field-specific error messages without clearing entered data
    - On successful submit: send to Formspree/Web3Forms, show confirmation message
    - On failed submit: show generic error message, preserve form data
    - Display company coordinates alongside the form (address, email, phone)
    - Set page-specific meta tags
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 8.2_

  - [x] 5.5 Implement LocationMap component and integrate on Contact page
    - Create `src/components/contact/LocationMap.tsx` using Leaflet with OpenStreetMap tiles
    - Display marker at company coordinates (48.7646, 2.3498) with address popup on click
    - Lazy-load the map component to avoid SSR issues (`dynamic` import with `ssr: false`)
    - Provide static fallback with address text and OpenStreetMap link if tiles fail to load
    - Add `<noscript>` block with address and link for JavaScript-disabled browsers
    - _Requirements: 5.6_

  - [x] 5.6 Implement About page (/a-propos)
    - Create `src/app/a-propos/page.tsx`
    - Display founder presentation (Cheikh Ahmadou Bamba Sall), creation date, location (Chevilly-Larue)
    - Display company mission: importing quality mangoes directly from Senegal
    - Display import process section: selection, transport, delivery in France
    - Display company values: quality, traceability, fair trade, connection with Senegal
    - Display photo or illustration of founder/team
    - Set page-specific meta tags
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 8.2_

  - [x] 5.7 Implement Legal Mentions page (/mentions-legales)
    - Create `src/app/mentions-legales/page.tsx`
    - Display company identification: responsible person, registered address, SIREN, registration date
    - Display hosting provider information
    - Display RGPD data protection policy: data types collected, processing purpose, user rights
    - Display terms of use
    - Set page-specific meta tags
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 8.2_

- [x] 6. Checkpoint — All pages implemented
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. SEO, sitemap, and responsive polish
  - [x] 7.1 Implement sitemap and robots.txt
    - Create `src/app/sitemap.ts` to generate sitemap.xml listing all pages (/, /produits, /a-propos, /contact, /mentions-legales)
    - Create `src/app/robots.ts` to generate robots.txt allowing all crawlers
    - _Requirements: 8.4_

  - [x] 7.2 Responsive design and visual polish
    - Ensure all pages adapt from 320px to 2560px without horizontal scrolling or content loss
    - Verify hover feedback on interactive elements (buttons, links, cards) responds within 100ms
    - Verify images use WebP format with descriptive French alt text
    - Verify color palette consistency (greens, yellow-orange, gold) across all pages
    - _Requirements: 9.1, 9.2, 9.4, 9.5, 8.5_

  - [ ]* 7.3 Write unit tests for key components
    - Test Navbar renders all navigation links and hamburger menu at mobile viewport
    - Test Footer renders company address, SIREN, and links
    - Test CookieBanner displays when no consent stored and hides after accept/refuse
    - Test ContactForm shows field-specific errors on invalid submission and preserves data
    - Test Homepage sections render expected content and CTAs
    - Test Products page renders all products from data source
    - Test Legal page renders all required sections
    - _Requirements: 1.1, 1.4, 2.1, 3.1, 5.1, 6.1, 7.1_

- [x] 8. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document using fast-check
- Unit tests validate specific examples and edge cases using Vitest + React Testing Library
- The site uses static export (`next export`) — no server-side runtime required
- Contact form submission is handled by an external service (Formspree or Web3Forms) — no backend code needed
- Map uses Leaflet/OpenStreetMap (free, no API key, RGPD-friendly)
