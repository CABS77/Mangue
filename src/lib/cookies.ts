import { CookieConsent } from '@/types';

const STORAGE_KEY = 'cookie-consent';

/** 13 months in milliseconds (approximate: 13 × 30 days) */
const THIRTEEN_MONTHS_MS = 13 * 30 * 24 * 60 * 60 * 1000;

/**
 * Reads the cookie consent from localStorage.
 * Returns the parsed CookieConsent object, or null if missing, corrupted,
 * or localStorage is unavailable (e.g. private browsing).
 */
export function getConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return null;
    }
    const parsed = JSON.parse(raw) as CookieConsent;
    // Basic shape validation
    if (
      typeof parsed.accepted !== 'boolean' ||
      typeof parsed.timestamp !== 'number' ||
      typeof parsed.expiresAt !== 'number'
    ) {
      return null;
    }
    return parsed;
  } catch {
    // localStorage unavailable or JSON parse error
    return null;
  }
}

/**
 * Stores a CookieConsent object in localStorage.
 * If localStorage is unavailable (private browsing), the call is silently ignored.
 */
export function setConsent(accepted: boolean): void {
  try {
    const timestamp = Date.now();
    const consent: CookieConsent = {
      accepted,
      timestamp,
      expiresAt: timestamp + THIRTEEN_MONTHS_MS,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

/**
 * Returns true if the consent has not yet expired (current time < expiresAt).
 */
export function isConsentValid(consent: CookieConsent): boolean {
  return Date.now() < consent.expiresAt;
}

/**
 * Convenience function: returns true if a valid, non-expired consent exists
 * in localStorage.
 */
export function hasValidConsent(): boolean {
  const consent = getConsent();
  if (consent === null) {
    return false;
  }
  return isConsentValid(consent);
}
