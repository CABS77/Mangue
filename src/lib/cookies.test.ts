import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getConsent, setConsent, isConsentValid, hasValidConsent } from './cookies';

// Create a proper localStorage mock since jsdom may not provide one
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

describe('cookies', () => {
  let mockStorage: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    mockStorage = createLocalStorageMock();
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true,
    });
  });

  describe('setConsent', () => {
    it('stores consent with accepted=true in localStorage', () => {
      setConsent(true);
      expect(mockStorage.setItem).toHaveBeenCalledOnce();
      const raw = mockStorage.getItem('cookie-consent');
      expect(raw).not.toBeNull();
      const parsed = JSON.parse(raw!);
      expect(parsed.accepted).toBe(true);
      expect(typeof parsed.timestamp).toBe('number');
      expect(typeof parsed.expiresAt).toBe('number');
    });

    it('stores consent with accepted=false in localStorage', () => {
      setConsent(false);
      const raw = mockStorage.getItem('cookie-consent');
      const parsed = JSON.parse(raw!);
      expect(parsed.accepted).toBe(false);
    });

    it('sets expiresAt approximately 13 months after timestamp', () => {
      setConsent(true);
      const raw = mockStorage.getItem('cookie-consent');
      const parsed = JSON.parse(raw!);
      const thirteenMonths = 13 * 30 * 24 * 60 * 60 * 1000;
      expect(parsed.expiresAt).toBe(parsed.timestamp + thirteenMonths);
    });

    it('silently handles localStorage unavailability', () => {
      mockStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage unavailable');
      });
      expect(() => setConsent(true)).not.toThrow();
    });
  });

  describe('getConsent', () => {
    it('returns null when no consent is stored', () => {
      expect(getConsent()).toBeNull();
    });

    it('returns parsed CookieConsent after setConsent', () => {
      setConsent(true);
      const consent = getConsent();
      expect(consent).not.toBeNull();
      expect(consent!.accepted).toBe(true);
    });

    it('returns null for corrupted JSON in localStorage', () => {
      mockStorage.setItem('cookie-consent', 'not-valid-json');
      expect(getConsent()).toBeNull();
    });

    it('returns null for data with wrong shape', () => {
      mockStorage.setItem('cookie-consent', JSON.stringify({ foo: 'bar' }));
      expect(getConsent()).toBeNull();
    });

    it('returns null when localStorage is unavailable', () => {
      mockStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage unavailable');
      });
      expect(getConsent()).toBeNull();
    });
  });

  describe('isConsentValid', () => {
    it('returns true when expiresAt is in the future', () => {
      const consent = {
        accepted: true,
        timestamp: Date.now(),
        expiresAt: Date.now() + 1000000,
      };
      expect(isConsentValid(consent)).toBe(true);
    });

    it('returns false when expiresAt is in the past', () => {
      const consent = {
        accepted: true,
        timestamp: Date.now() - 2000000,
        expiresAt: Date.now() - 1000000,
      };
      expect(isConsentValid(consent)).toBe(false);
    });
  });

  describe('hasValidConsent', () => {
    it('returns false when no consent is stored', () => {
      expect(hasValidConsent()).toBe(false);
    });

    it('returns true when valid non-expired consent exists', () => {
      setConsent(true);
      expect(hasValidConsent()).toBe(true);
    });

    it('returns true even when consent was refused but not expired', () => {
      setConsent(false);
      expect(hasValidConsent()).toBe(true);
    });

    it('returns false when consent is expired', () => {
      const expired = {
        accepted: true,
        timestamp: Date.now() - 2000000,
        expiresAt: Date.now() - 1000000,
      };
      mockStorage.setItem('cookie-consent', JSON.stringify(expired));
      expect(hasValidConsent()).toBe(false);
    });
  });
});
