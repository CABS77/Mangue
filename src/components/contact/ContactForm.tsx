'use client';

import { useState } from 'react';
import { validateContactForm } from '@/lib/validation';
import type { ContactFormData } from '@/types';
import Button from '@/components/ui/Button';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputBaseClasses =
  'w-full rounded-xl border bg-white px-5 py-4 text-base font-sans text-charcoal transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold placeholder:text-charcoal-light/50';

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
        className="rounded-2xl bg-white p-12 text-center shadow-premium"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-forest-green/10">
          <span className="text-4xl">✅</span>
        </div>
        <h3 className="mb-3 font-serif text-2xl font-bold text-forest-green">
          Message envoyé avec succès
        </h3>
        <p className="text-charcoal-light font-sans">
          Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {status === 'error' && (
        <div
          className="rounded-xl bg-red-50 border border-red-200 p-5 text-red-700 font-sans"
          role="alert"
          aria-live="polite"
        >
          Une erreur est survenue, veuillez réessayer.
        </div>
      )}

      {/* Nom complet */}
      <div>
        <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
          Nom complet <span className="text-mango-orange">*</span>
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
          className={`${inputBaseClasses} ${
            errors.fullName ? 'border-red-400 focus:ring-red-300' : 'border-cream-dark'
          }`}
          placeholder="Votre nom complet"
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-2 text-sm text-red-600 font-sans" role="alert">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
          Adresse e-mail <span className="text-mango-orange">*</span>
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
          className={`${inputBaseClasses} ${
            errors.email ? 'border-red-400 focus:ring-red-300' : 'border-cream-dark'
          }`}
          placeholder="votre@email.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-600 font-sans" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
          Téléphone <span className="text-sm font-normal text-charcoal-light">(optionnel)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`${inputBaseClasses} border-cream-dark`}
          placeholder="Votre numéro de téléphone"
        />
      </div>

      {/* Type de demande */}
      <div>
        <label htmlFor="requestType" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
          Type de demande <span className="text-mango-orange">*</span>
        </label>
        <select
          id="requestType"
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.requestType}
          aria-describedby={errors.requestType ? 'requestType-error' : undefined}
          className={`${inputBaseClasses} ${
            errors.requestType ? 'border-red-400 focus:ring-red-300' : 'border-cream-dark'
          }`}
        >
          <option value="particulier">Particulier</option>
          <option value="professionnel">Professionnel</option>
        </select>
        {errors.requestType && (
          <p id="requestType-error" className="mt-2 text-sm text-red-600 font-sans" role="alert">
            {errors.requestType}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
          Message <span className="text-mango-orange">*</span>
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
          className={`${inputBaseClasses} resize-none ${
            errors.message ? 'border-red-400 focus:ring-red-300' : 'border-cream-dark'
          }`}
          placeholder="Votre message..."
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-red-600 font-sans" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full py-4 text-lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
      </Button>
    </form>
  );
}
