import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CookieBanner from './CookieBanner';

// Mock the cookies module
vi.mock('@/lib/cookies', () => ({
  hasValidConsent: vi.fn(),
  setConsent: vi.fn(),
}));

import { hasValidConsent, setConsent } from '@/lib/cookies';

const mockedHasValidConsent = vi.mocked(hasValidConsent);
const mockedSetConsent = vi.mocked(setConsent);

describe('CookieBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays the banner when no valid consent exists', () => {
    mockedHasValidConsent.mockReturnValue(false);
    render(<CookieBanner />);

    expect(screen.getByRole('dialog', { name: /consentement aux cookies/i })).toBeInTheDocument();
    expect(screen.getByText(/ce site utilise des cookies/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accepter' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refuser' })).toBeInTheDocument();
  });

  it('does not display the banner when valid consent exists', () => {
    mockedHasValidConsent.mockReturnValue(true);
    render(<CookieBanner />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('hides the banner and stores consent when "Accepter" is clicked', () => {
    mockedHasValidConsent.mockReturnValue(false);
    render(<CookieBanner />);

    fireEvent.click(screen.getByRole('button', { name: 'Accepter' }));

    expect(mockedSetConsent).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('hides the banner and stores refusal when "Refuser" is clicked', () => {
    mockedHasValidConsent.mockReturnValue(false);
    render(<CookieBanner />);

    fireEvent.click(screen.getByRole('button', { name: 'Refuser' }));

    expect(mockedSetConsent).toHaveBeenCalledWith(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    mockedHasValidConsent.mockReturnValue(false);
    render(<CookieBanner />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Bandeau de consentement aux cookies');
  });
});
