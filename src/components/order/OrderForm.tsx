'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { products } from '@/data/products';

type OrderStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ProductOrder {
  productId: string;
  quantity: number;
  boxSize: '4kg' | '6kg';
}

interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  customerType: 'particulier' | 'professionnel';
  company: string;
  address: string;
  city: string;
  postalCode: string;
  orders: ProductOrder[];
  notes: string;
}

const inputBaseClasses =
  'w-full rounded-xl border bg-white px-5 py-4 text-base font-sans text-charcoal transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold placeholder:text-charcoal-light/50';

const PRICE_BATEAU = 3.40;

export default function OrderForm() {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    email: '',
    phone: '',
    customerType: 'particulier',
    company: '',
    address: '',
    city: '',
    postalCode: '',
    orders: products.map((p) => ({ productId: p.id, quantity: 0, boxSize: '4kg' })),
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<OrderStatus>('idle');

  function handleField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  }

  function handleOrderChange(idx: number, field: keyof ProductOrder, value: string | number) {
    setFormData((prev) => {
      const orders = [...prev.orders];
      orders[idx] = { ...orders[idx], [field]: value };
      return { ...prev, orders };
    });
  }

  function totalBoxes() {
    return formData.orders.reduce((sum, o) => sum + o.quantity, 0);
  }

  function totalWeight() {
    return formData.orders.reduce((sum, o) => sum + o.quantity * (o.boxSize === '4kg' ? 4 : 6), 0);
  }

  function estimatedPrice() {
    return (totalWeight() * PRICE_BATEAU).toFixed(2);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = 'Le nom est requis.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Email invalide.';
    if (!formData.phone.trim()) e.phone = 'Le téléphone est requis.';
    if (!formData.address.trim()) e.address = "L'adresse est requise.";
    if (!formData.city.trim()) e.city = 'La ville est requise.';
    if (!formData.postalCode.trim()) e.postalCode = 'Le code postal est requis.';
    if (totalBoxes() === 0) e.orders = 'Sélectionnez au moins un produit.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');

    const orderLines = formData.orders
      .filter((o) => o.quantity > 0)
      .map((o) => {
        const p = products.find((p) => p.id === o.productId);
        return `${p?.name} — ${o.quantity} boîte(s) de ${o.boxSize}`;
      })
      .join('\n');

    const payload = {
      type: 'COMMANDE',
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      customerType: formData.customerType,
      company: formData.company || '—',
      address: `${formData.address}, ${formData.postalCode} ${formData.city}`,
      orders: orderLines,
      totalBoxes: totalBoxes(),
      totalWeight: `${totalWeight()} kg`,
      estimatedPrice: `${estimatedPrice()} € HT`,
      notes: formData.notes || '—',
    };

    try {
      const res = await fetch('https://formspree.io/f/mdayvnro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-premium" role="status" aria-live="polite">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-forest-green/10">
          <span className="text-4xl">✅</span>
        </div>
        <h3 className="mb-3 font-serif text-2xl font-bold text-forest-green">Commande reçue !</h3>
        <p className="text-charcoal-light font-sans mb-2">
          Merci <strong>{formData.fullName}</strong>. Votre demande a bien été enregistrée.
        </p>
        <p className="text-charcoal-light font-sans">
          Nous vous contactons sous 24h au <strong>{formData.phone}</strong> pour confirmer votre commande et organiser la livraison.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {status === 'error' && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-5 text-red-700 font-sans" role="alert">
          Une erreur est survenue. Veuillez réessayer ou nous appeler au +33 7 52 90 00 84.
        </div>
      )}

      {/* Produits */}
      <div>
        <h3 className="mb-4 font-serif text-xl font-bold text-forest-green">Vos produits</h3>
        <div className="space-y-4">
          {products.map((product, idx) => (
            <div key={product.id} className="rounded-xl border border-cream-dark bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-forest-green font-sans">{product.name}</p>
                  <p className="text-sm text-charcoal-light font-sans">Saison : {product.season}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={formData.orders[idx].boxSize}
                    onChange={(e) => handleOrderChange(idx, 'boxSize', e.target.value)}
                    className="rounded-lg border border-cream-dark px-3 py-2 text-sm font-sans text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50"
                  >
                    <option value="4kg">Boîtes 4 kg</option>
                    <option value="6kg">Boîtes 6 kg</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOrderChange(idx, 'quantity', Math.max(0, formData.orders[idx].quantity - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-cream-dark bg-cream text-lg font-bold text-charcoal hover:bg-gold/20 transition-colors"
                    >−</button>
                    <span className="w-8 text-center font-semibold font-sans text-charcoal">
                      {formData.orders[idx].quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOrderChange(idx, 'quantity', formData.orders[idx].quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-cream-dark bg-cream text-lg font-bold text-charcoal hover:bg-gold/20 transition-colors"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {errors.orders && <p className="mt-2 text-sm text-red-600 font-sans">{errors.orders}</p>}

        {/* Récapitulatif */}
        {totalBoxes() > 0 && (
          <div className="mt-4 rounded-xl bg-forest-green/5 border border-forest-green/20 p-5">
            <p className="font-semibold text-forest-green font-sans">Récapitulatif</p>
            <p className="text-sm text-charcoal font-sans mt-1">{totalBoxes()} boîte(s) — {totalWeight()} kg total</p>
            <p className="text-sm font-semibold text-mango-orange font-sans mt-1">
              Estimation : ~{estimatedPrice()} € HT <span className="font-normal text-charcoal-light">(prix définitif confirmé à la commande)</span>
            </p>
          </div>
        )}
      </div>

      {/* Coordonnées */}
      <div>
        <h3 className="mb-4 font-serif text-xl font-bold text-forest-green">Vos coordonnées</h3>
        <div className="space-y-5">
          <div>
            <label htmlFor="customerType" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
              Vous êtes <span className="text-mango-orange">*</span>
            </label>
            <select id="customerType" name="customerType" value={formData.customerType} onChange={handleField}
              className={`${inputBaseClasses} border-cream-dark`}>
              <option value="particulier">Particulier</option>
              <option value="professionnel">Professionnel (restaurant, épicerie...)</option>
            </select>
          </div>

          {formData.customerType === 'professionnel' && (
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
                Nom de l&apos;établissement
              </label>
              <input type="text" id="company" name="company" value={formData.company} onChange={handleField}
                className={`${inputBaseClasses} border-cream-dark`} placeholder="Nom de votre restaurant, épicerie..." />
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
                Nom complet <span className="text-mango-orange">*</span>
              </label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleField}
                className={`${inputBaseClasses} ${errors.fullName ? 'border-red-400' : 'border-cream-dark'}`}
                placeholder="Prénom Nom" />
              {errors.fullName && <p className="mt-1 text-sm text-red-600 font-sans">{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
                Téléphone <span className="text-mango-orange">*</span>
              </label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleField}
                className={`${inputBaseClasses} ${errors.phone ? 'border-red-400' : 'border-cream-dark'}`}
                placeholder="+33 6 xx xx xx xx" />
              {errors.phone && <p className="mt-1 text-sm text-red-600 font-sans">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
              Email <span className="text-mango-orange">*</span>
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleField}
              className={`${inputBaseClasses} ${errors.email ? 'border-red-400' : 'border-cream-dark'}`}
              placeholder="votre@email.com" />
            {errors.email && <p className="mt-1 text-sm text-red-600 font-sans">{errors.email}</p>}
          </div>
        </div>
      </div>

      {/* Livraison */}
      <div>
        <h3 className="mb-4 font-serif text-xl font-bold text-forest-green">Adresse de livraison</h3>
        <p className="mb-4 text-sm text-charcoal-light font-sans">Livraison disponible en Île-de-France. Pour les autres régions, nous convenons ensemble du mode de transport.</p>
        <div className="space-y-5">
          <div>
            <label htmlFor="address" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
              Adresse <span className="text-mango-orange">*</span>
            </label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleField}
              className={`${inputBaseClasses} ${errors.address ? 'border-red-400' : 'border-cream-dark'}`}
              placeholder="Numéro et nom de rue" />
            {errors.address && <p className="mt-1 text-sm text-red-600 font-sans">{errors.address}</p>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="postalCode" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
                Code postal <span className="text-mango-orange">*</span>
              </label>
              <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleField}
                className={`${inputBaseClasses} ${errors.postalCode ? 'border-red-400' : 'border-cream-dark'}`}
                placeholder="75001" />
              {errors.postalCode && <p className="mt-1 text-sm text-red-600 font-sans">{errors.postalCode}</p>}
            </div>
            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
                Ville <span className="text-mango-orange">*</span>
              </label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleField}
                className={`${inputBaseClasses} ${errors.city ? 'border-red-400' : 'border-cream-dark'}`}
                placeholder="Paris" />
              {errors.city && <p className="mt-1 text-sm text-red-600 font-sans">{errors.city}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-semibold text-forest-green font-sans">
          Informations complémentaires <span className="text-sm font-normal text-charcoal-light">(optionnel)</span>
        </label>
        <textarea id="notes" name="notes" value={formData.notes} onChange={handleField} rows={3}
          className={`${inputBaseClasses} resize-none border-cream-dark`}
          placeholder="Disponibilités, instructions de livraison, demandes spéciales..." />
      </div>

      <Button type="submit" variant="primary" className="w-full py-4 text-lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer ma commande'}
      </Button>

      <div className="rounded-xl bg-gold/10 border border-gold/30 p-4 text-sm font-sans text-charcoal space-y-1">
        <p className="font-semibold text-forest-green">💳 Conditions de paiement</p>
        <p>• <strong>Nouveau client :</strong> 50% d&apos;acompte à la commande (virement ou PayPal), solde à la livraison</p>
        <p>• <strong>Client régulier :</strong> paiement à la livraison ou en fin de mois</p>
        <p className="text-charcoal-light pt-1">Questions ? <a href="tel:+33752900084" className="text-forest-green font-semibold hover:underline">+33 7 52 90 00 84</a></p>
      </div>
    </form>
  );
}
