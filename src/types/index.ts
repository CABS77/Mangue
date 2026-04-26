export interface Product {
  /** Unique identifier in slug format */
  id: string;
  /** Variety name (e.g., "Kent", "Keitt", "Boucodiékhal") */
  name: string;
  /** Taste and texture description */
  description: string;
  /** Availability period (e.g., "Mai - Juillet") */
  season: string;
  /** Size/caliber info (e.g., "8-10 fruits par carton") */
  caliber: string;
  /** Path to WebP image in /public/images/products/ */
  image: string;
  /** Descriptive alt text in French */
  imageAlt: string;
}

export interface CompanyInfo {
  name: string;
  founder: string;
  siren: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact: {
    email: string;
    phone: string;
  };
}

export interface SellingPoint {
  icon: string;
  title: string;
  description: string;
}

export interface CookieConsent {
  accepted: boolean;
  timestamp: number;
  expiresAt: number;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  requestType: 'particulier' | 'professionnel';
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
