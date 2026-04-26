'use client';

import { useState } from 'react';
import { validateContactForm } from '@/lib/validation';
import type { ContactFormData } from '@/types';
import Button from '@/components/ui/Button';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    requestType: 'particulier',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Client-side validation
    const result = validateContactForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mdayvnro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-lg bg-senegal-green-50 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mb-4 text-4xl">✅</div>
        <h3 className="mb-2 text-xl font-semibold text-senegal-green-800">
          Message envoyé avec succès
        </h3>
        <p className="text-senegal-green-700">
          Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {status === 'error' && (
        <div
          className="rounded-lg bg-red-50 p-4 text-red-700"
          role="alert"
          aria-live="polite"
        >
          Une erreur est survenue, veuillez réessayer.
        </div>
      )}

      {/* Nom complet */}
      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-senegal-green-800">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-base transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-senegal-green-500 ${
            errors.fullName ? 'border-red-500' : 'border-senegal-green-200'
          }`}
          placeholder="Votre nom complet"
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-senegal-green-800">
          Adresse e-mail <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-base transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-senegal-green-500 ${
            errors.email ? 'border-red-500' : 'border-senegal-green-200'
          }`}
          placeholder="votre@email.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Téléphone (optionnel) */}
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-senegal-green-800">
          Téléphone <span className="text-sm font-normal text-senegal-green-500">(optionnel)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-senegal-green-200 px-4 py-3 text-base transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-senegal-green-500"
          placeholder="Votre numéro de téléphone"
        />
      </div>

      {/* Type de demande */}
      <div>
        <label htmlFor="requestType" className="mb-1 block text-sm font-medium text-senegal-green-800">
          Type de demande <span className="text-red-500">*</span>
        </label>
        <select
          id="requestType"
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.requestType}
          aria-describedby={errors.requestType ? 'requestType-error' : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-base transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-senegal-green-500 ${
            errors.requestType ? 'border-red-500' : 'border-senegal-green-200'
          }`}
        >
          <option value="particulier">Particulier</option>
          <option value="professionnel">Professionnel</option>
        </select>
        {errors.requestType && (
          <p id="requestType-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.requestType}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-senegal-green-800">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-base transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-senegal-green-500 ${
            errors.message ? 'border-red-500' : 'border-senegal-green-200'
          }`}
          placeholder="Votre message..."
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
      </Button>
    </form>
  );
}
