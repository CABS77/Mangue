import { describe, it, expect, beforeEach, vi } from 'vitest';
import fc from 'fast-check';
import { setConsent, getConsent, isConsentValid } from './cookies';
import { CookieConsent } from '@/types';

/**
 * Property 4: Cookie consent storage round-trip
 * **Validates: Requirements 7.2, 7.3**
 *
 * For any boolean value (true or false), calling setConsent(value) followed
 * by getConsent() should return a CookieConsent object where `accepted`
 * equals the original value, `timestamp` is close to the current time,
 * and `expiresAt` is approximately 13 months after `timestamp`.
 */

/** 13 months in milliseconds (matches the implementation) */
const THIRTEEN_MONTHS_MS = 13 * 30 * 24 * 60 * 60 * 1000;

/** Tolerance for timestamp comparison (1 second) */
const TIMESTAMP_TOLERANCE_MS = 1000;

function createLocalStorageMock() {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
  };
}

describe('Property 4: Cookie consent storage round-trip', () => {
  let mockStorage: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    mockStorage = createLocalStorageMock();
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true,
    });
  });

  /**
   * **Validates: Requirements 7.2, 7.3**
   *
   * For any boolean, setConsent followed by getConsent returns a
   * CookieConsent where accepted matches the input, timestamp is close
   * to Date.now(), and expiresAt ≈ timestamp + 13 months.
   */
  it('round-trips accepted value and stores correct timestamps', () => {
    fc.assert(
      fc.property(fc.boolean(), (accepted) => {
        // Clear storage between iterations
        mockStorage.clear();

        const before = Date.now();
        setConsent(accepted);
        const after = Date.now();

        const consent = getConsent();

        // Must return a non-null consent
        expect(consent).not.toBeNull();

        // accepted must equal the original value
        expect(consent!.accepted).toBe(accepted);

        // timestamp should be between before and after (inclusive)
        expect(consent!.timestamp).toBeGreaterThanOrEqual(before);
        expect(consent!.timestamp).toBeLessThanOrEqual(after);

        // timestamp should be close to current time
        expect(Math.abs(consent!.timestamp - Date.now())).toBeLessThan(TIMESTAMP_TOLERANCE_MS);

        // expiresAt should be exactly timestamp + 13 months
        expect(consent!.expiresAt).toBe(consent!.timestamp + THIRTEEN_MONTHS_MS);
      }),
      { numRuns: 100 }
    );
  });
});


/**
 * Property 5: Cookie consent expiry validation
 * **Validates: Requirements 7.5**
 *
 * For any CookieConsent object, isConsentValid should return true if and only
 * if the current time is less than expiresAt. A consent with expiresAt in the
 * past should return false, and a consent with expiresAt in the future should
 * return true.
 */
describe('Property 5: Cookie consent expiry validation', () => {
  it('returns true when expiresAt is in the future', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.integer(),
        fc.integer({ min: 1 }),
        (accepted, timestamp, offset) => {
          const consent: CookieConsent = {
            accepted,
            timestamp,
            expiresAt: Date.now() + offset,
          };

          expect(isConsentValid(consent)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('returns false when expiresAt is in the past', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.integer(),
        fc.integer({ min: 1 }),
        (accepted, timestamp, offset) => {
          const consent: CookieConsent = {
            accepted,
            timestamp,
            expiresAt: Date.now() - offset,
          };

          expect(isConsentValid(consent)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});
