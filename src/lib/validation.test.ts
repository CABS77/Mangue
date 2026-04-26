import { describe, it, expect } from 'vitest';
import { validateRequired, validateEmail, validateContactForm } from './validation';
import type { ContactFormData } from '@/types';

describe('validateRequired', () => {
  it('returns null for a non-empty string', () => {
    expect(validateRequired('hello', 'test')).toBeNull();
  });

  it('returns an error message for an empty string', () => {
    expect(validateRequired('', 'nom complet')).toBe('Le champ nom complet est requis');
  });

  it('returns an error message for a whitespace-only string', () => {
    expect(validateRequired('   ', 'message')).toBe('Le champ message est requis');
  });

  it('returns null for a string with leading/trailing spaces but content', () => {
    expect(validateRequired('  hello  ', 'test')).toBeNull();
  });
});

describe('validateEmail', () => {
  it('returns true for a valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('returns true for an email with subdomains', () => {
    expect(validateEmail('user@mail.example.com')).toBe(true);
  });

  it('returns false for an empty string', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('returns false for a string without @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  it('returns false for a string with multiple @ signs', () => {
    expect(validateEmail('user@@example.com')).toBe(false);
  });

  it('returns false for a string with empty local part', () => {
    expect(validateEmail('@example.com')).toBe(false);
  });

  it('returns false for a string with no domain dot', () => {
    expect(validateEmail('user@example')).toBe(false);
  });

  it('returns false for a string with trailing dot in domain', () => {
    expect(validateEmail('user@example.')).toBe(false);
  });

  it('returns false for a string with leading dot in domain', () => {
    expect(validateEmail('user@.example.com')).toBe(false);
  });

  it('returns false for whitespace-only input', () => {
    expect(validateEmail('   ')).toBe(false);
  });
});

describe('validateContactForm', () => {
  const validData: ContactFormData = {
    fullName: 'Jean Dupont',
    email: 'jean@example.com',
    phone: '',
    requestType: 'particulier',
    message: 'Bonjour, je souhaite commander des mangues.',
  };

  it('returns isValid true with no errors for valid data', () => {
    const result = validateContactForm(validData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('returns isValid true when phone is empty (optional field)', () => {
    const result = validateContactForm({ ...validData, phone: '' });
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('returns error for empty fullName', () => {
    const result = validateContactForm({ ...validData, fullName: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBeDefined();
  });

  it('returns error for empty email', () => {
    const result = validateContactForm({ ...validData, email: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it('returns email format error for invalid email', () => {
    const result = validateContactForm({ ...validData, email: 'not-an-email' });
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Veuillez saisir une adresse e-mail valide');
  });

  it('returns error for empty message', () => {
    const result = validateContactForm({ ...validData, message: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBeDefined();
  });

  it('returns error for whitespace-only requestType', () => {
    const result = validateContactForm({
      ...validData,
      requestType: '   ' as ContactFormData['requestType'],
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.requestType).toBeDefined();
  });

  it('returns multiple errors when multiple fields are invalid', () => {
    const result = validateContactForm({
      fullName: '',
      email: '',
      phone: '',
      requestType: '' as ContactFormData['requestType'],
      message: '',
    });
    expect(result.isValid).toBe(false);
    expect(Object.keys(result.errors)).toHaveLength(4);
    expect(result.errors.fullName).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.message).toBeDefined();
    expect(result.errors.requestType).toBeDefined();
  });
});
