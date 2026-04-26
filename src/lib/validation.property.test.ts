import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { validateContactForm, validateEmail } from './validation';
import type { ContactFormData } from '@/types';

/**
 * Property 2: Form validation correctness
 * Validates: Requirements 5.2, 5.3
 *
 * For any ContactFormData object, validateContactForm should return isValid: true
 * with an empty errors record if and only if all required fields (fullName, email,
 * message, requestType) are non-empty strings (after trimming) and the email field
 * passes email format validation. If any required field is empty or the email is
 * invalid, isValid should be false and the errors record should contain an entry
 * for each failing field.
 */
describe('Property 2: Form validation correctness', () => {
  // Arbitrary for alphanumeric characters
  const alphanumCharArb = fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
  );
  const alphaCharArb = fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split(''));

  // Generator for valid email addresses that pass our validateEmail function
  const validEmailArb = fc
    .tuple(
      fc.array(alphanumCharArb, { minLength: 1, maxLength: 10 }),
      fc.array(alphanumCharArb, { minLength: 1, maxLength: 8 }),
      fc.array(alphaCharArb, { minLength: 2, maxLength: 5 })
    )
    .map(([local, domain, tld]) => `${local.join('')}@${domain.join('')}.${tld.join('')}`);

  // Generator for non-empty strings (after trimming)
  const nonEmptyStringArb = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);

  // Generator for empty-ish strings (empty or whitespace-only)
  const emptyStringArb = fc.constantFrom('', '   ', '\t', '\n', '  \t\n  ');

  // Generator for requestType values
  const validRequestTypeArb = fc.constantFrom<'particulier' | 'professionnel'>(
    'particulier',
    'professionnel'
  );

  // Generator for invalid requestType (empty/whitespace)
  const invalidRequestTypeArb = fc
    .constantFrom('', '   ', '\t')
    .map((s) => s as ContactFormData['requestType']);

  it('returns isValid: true with empty errors when all required fields are non-empty and email is valid', () => {
    fc.assert(
      fc.property(
        nonEmptyStringArb,
        validEmailArb,
        fc.string(),
        validRequestTypeArb,
        nonEmptyStringArb,
        (fullName, email, phone, requestType, message) => {
          const data: ContactFormData = { fullName, email, phone, requestType, message };
          const result = validateContactForm(data);

          expect(result.isValid).toBe(true);
          expect(Object.keys(result.errors)).toHaveLength(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 5.3**
   * When fullName is empty, isValid must be false and errors must contain fullName.
   */
  it('returns isValid: false with fullName error when fullName is empty', () => {
    fc.assert(
      fc.property(
        emptyStringArb,
        validEmailArb,
        fc.string(),
        validRequestTypeArb,
        nonEmptyStringArb,
        (fullName, email, phone, requestType, message) => {
          const data: ContactFormData = { fullName, email, phone, requestType, message };
          const result = validateContactForm(data);

          expect(result.isValid).toBe(false);
          expect(result.errors).toHaveProperty('fullName');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 5.3**
   * When email is empty, isValid must be false and errors must contain email.
   */
  it('returns isValid: false with email error when email is empty', () => {
    fc.assert(
      fc.property(
        nonEmptyStringArb,
        emptyStringArb,
        fc.string(),
        validRequestTypeArb,
        nonEmptyStringArb,
        (fullName, email, phone, requestType, message) => {
          const data: ContactFormData = {
            fullName,
            email,
            phone,
            requestType,
            message,
          };
          const result = validateContactForm(data);

          expect(result.isValid).toBe(false);
          expect(result.errors).toHaveProperty('email');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 5.3**
   * When message is empty, isValid must be false and errors must contain message.
   */
  it('returns isValid: false with message error when message is empty', () => {
    fc.assert(
      fc.property(
        nonEmptyStringArb,
        validEmailArb,
        fc.string(),
        validRequestTypeArb,
        emptyStringArb,
        (fullName, email, phone, requestType, message) => {
          const data: ContactFormData = { fullName, email, phone, requestType, message };
          const result = validateContactForm(data);

          expect(result.isValid).toBe(false);
          expect(result.errors).toHaveProperty('message');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 5.3**
   * When requestType is empty, isValid must be false and errors must contain requestType.
   */
  it('returns isValid: false with requestType error when requestType is empty', () => {
    fc.assert(
      fc.property(
        nonEmptyStringArb,
        validEmailArb,
        fc.string(),
        invalidRequestTypeArb,
        nonEmptyStringArb,
        (fullName, email, phone, requestType, message) => {
          const data: ContactFormData = { fullName, email, phone, requestType, message };
          const result = validateContactForm(data);

          expect(result.isValid).toBe(false);
          expect(result.errors).toHaveProperty('requestType');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 5.2, 5.3**
   * For any ContactFormData with a mix of valid/invalid fields, isValid is true
   * if and only if ALL required fields are non-empty (after trimming) and email is valid.
   * The errors record contains exactly the keys of the failing fields.
   */
  it('isValid is true iff all required fields are non-empty and email is valid', () => {
    // Generate each required field as either valid or empty
    const fieldArb = fc.oneof(nonEmptyStringArb, emptyStringArb);
    const emailFieldArb = fc.oneof(validEmailArb, emptyStringArb, fc.constant('invalid-email'));
    const requestTypeFieldArb = fc.oneof(validRequestTypeArb, invalidRequestTypeArb);

    fc.assert(
      fc.property(
        fieldArb,
        emailFieldArb,
        fc.string(),
        requestTypeFieldArb,
        fieldArb,
        (fullName, email, phone, requestType, message) => {
          const data: ContactFormData = { fullName, email, phone, requestType, message };
          const result = validateContactForm(data);

          const fullNameValid = fullName.trim().length > 0;
          const emailValid = email.trim().length > 0 && validateEmail(email);
          const messageValid = message.trim().length > 0;
          const requestTypeValid = (requestType as string).trim().length > 0;

          const allValid = fullNameValid && emailValid && messageValid && requestTypeValid;

          // isValid should match whether all fields are valid
          expect(result.isValid).toBe(allValid);

          if (allValid) {
            expect(Object.keys(result.errors)).toHaveLength(0);
          } else {
            // errors should have at least one entry
            expect(Object.keys(result.errors).length).toBeGreaterThan(0);

            // Each failing field should have an error entry
            if (!fullNameValid) {
              expect(result.errors).toHaveProperty('fullName');
            }
            if (!emailValid) {
              expect(result.errors).toHaveProperty('email');
            }
            if (!messageValid) {
              expect(result.errors).toHaveProperty('message');
            }
            if (!requestTypeValid) {
              expect(result.errors).toHaveProperty('requestType');
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
