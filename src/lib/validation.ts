import type { ContactFormData, ValidationResult } from '@/types';

/**
 * Validates that a required field is non-empty after trimming.
 * @param value - The field value to validate
 * @param fieldName - The display name of the field (used in error message)
 * @returns An error message string if invalid, or null if valid
 */
export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) {
    return `Le champ ${fieldName} est requis`;
  }
  return null;
}

/**
 * Validates an email address format.
 * Checks for exactly one @ sign, non-empty local part, and domain with at least one dot.
 * @param email - The email string to validate
 * @returns true if the email format is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;

  const atParts = trimmed.split('@');

  // Must have exactly one @ sign (resulting in exactly 2 parts)
  if (atParts.length !== 2) return false;

  const [localPart, domain] = atParts;

  // Local part must be non-empty
  if (!localPart) return false;

  // Domain must be non-empty and contain at least one dot
  if (!domain || !domain.includes('.')) return false;

  // Domain parts separated by dot must all be non-empty
  const domainParts = domain.split('.');
  if (domainParts.some((part) => !part)) return false;

  return true;
}

/**
 * Validates the entire contact form data.
 * Checks all required fields (fullName, email, message, requestType) and email format.
 * The phone field is optional and is not validated.
 * @param data - The contact form data to validate
 * @returns A ValidationResult with isValid boolean and errors record
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  const fullNameError = validateRequired(data.fullName, 'nom complet');
  if (fullNameError) {
    errors.fullName = fullNameError;
  }

  const emailRequiredError = validateRequired(data.email, 'e-mail');
  if (emailRequiredError) {
    errors.email = emailRequiredError;
  } else if (!validateEmail(data.email)) {
    errors.email = 'Veuillez saisir une adresse e-mail valide';
  }

  const messageError = validateRequired(data.message, 'message');
  if (messageError) {
    errors.message = messageError;
  }

  const requestTypeError = validateRequired(data.requestType, 'type de demande');
  if (requestTypeError) {
    errors.requestType = requestTypeError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
