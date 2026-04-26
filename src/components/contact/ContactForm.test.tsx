import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import ContactForm from './ContactForm';

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nom complet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type de demande/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /envoyer le message/i })).toBeInTheDocument();
  });

  it('shows field-specific errors when submitting empty required fields', async () => {
    render(<ContactForm />);

    // Clear the fullName and message fields (they start empty), submit
    fireEvent.click(screen.getByRole('button', { name: /envoyer le message/i }));

    await waitFor(() => {
      expect(screen.getByText(/le champ nom complet est requis/i)).toBeInTheDocument();
      expect(screen.getByText(/le champ e-mail est requis/i)).toBeInTheDocument();
      expect(screen.getByText(/le champ message est requis/i)).toBeInTheDocument();
    });
  });

  it('shows email format error for invalid email', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/nom complet/i), { target: { value: 'Jean Dupont' } });
    fireEvent.change(screen.getByLabelText(/adresse e-mail/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Bonjour' } });

    fireEvent.click(screen.getByRole('button', { name: /envoyer le message/i }));

    await waitFor(() => {
      expect(screen.getByText(/veuillez saisir une adresse e-mail valide/i)).toBeInTheDocument();
    });
  });

  it('preserves form data after validation errors', async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/nom complet/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/adresse e-mail/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Jean Dupont' } });
    fireEvent.change(emailInput, { target: { value: 'bad-email' } });

    fireEvent.click(screen.getByRole('button', { name: /envoyer le message/i }));

    await waitFor(() => {
      expect(screen.getByText(/veuillez saisir une adresse e-mail valide/i)).toBeInTheDocument();
    });

    // Data should be preserved
    expect(nameInput.value).toBe('Jean Dupont');
    expect(emailInput.value).toBe('bad-email');
  });

  it('shows success message after successful submission', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/nom complet/i), { target: { value: 'Jean Dupont' } });
    fireEvent.change(screen.getByLabelText(/adresse e-mail/i), { target: { value: 'jean@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Bonjour, je souhaite commander.' } });

    fireEvent.click(screen.getByRole('button', { name: /envoyer le message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message envoyé avec succès/i)).toBeInTheDocument();
    });
  });

  it('shows error message and preserves data on submission failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/nom complet/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/adresse e-mail/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'Jean Dupont' } });
    fireEvent.change(emailInput, { target: { value: 'jean@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Bonjour' } });

    fireEvent.click(screen.getByRole('button', { name: /envoyer le message/i }));

    await waitFor(() => {
      expect(screen.getByText(/une erreur est survenue, veuillez réessayer/i)).toBeInTheDocument();
    });

    // Form data should be preserved
    expect(nameInput.value).toBe('Jean Dupont');
    expect(emailInput.value).toBe('jean@example.com');
    expect(messageInput.value).toBe('Bonjour');
  });

  it('has requestType select with particulier and professionnel options', () => {
    render(<ContactForm />);
    const select = screen.getByLabelText(/type de demande/i) as HTMLSelectElement;
    const options = Array.from(select.options).map((o) => o.value);
    expect(options).toContain('particulier');
    expect(options).toContain('professionnel');
  });
});
