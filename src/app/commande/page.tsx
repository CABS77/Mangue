import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import OrderForm from '@/components/order/OrderForm';

export const metadata: Metadata = {
  title: 'Commander',
  description:
    'Passez votre commande de mangues fraîches importées directement du Sénégal. Livraison en Île-de-France. Kent, Keitt, Boucodiékhal disponibles.',
};

export default function CommandePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-green px-6 pt-32 pb-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(212,168,67,0.1),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <SectionHeading
            subtitle="Mangues fraîches importées directement du Sénégal"
            light
          >
            Passer une commande
          </SectionHeading>
          <p className="text-base leading-relaxed text-white/70 font-sans">
            Choisissez vos variétés et quantités. Nous vous confirmons votre commande sous 24h
            et organisons la livraison en Île-de-France ou la remise sur place à Chevilly-Larue.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Form + Info */}
      <section className="bg-cream px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-content">
          <div className="grid gap-12 lg:grid-cols-3">

            {/* Sidebar info */}
            <aside className="space-y-6 lg:col-span-1">
              <ScrollReveal>
                <div className="rounded-2xl bg-white p-6 shadow-premium">
                  <h3 className="mb-4 font-serif text-lg font-bold text-forest-green">Nos tarifs</h3>
                  <div className="space-y-3 text-sm font-sans text-charcoal">
                    <div className="flex justify-between">
                      <span>Mangue bateau</span>
                      <span className="font-semibold text-mango-orange">~3,40 €/kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mangue avion Sénégal</span>
                      <span className="font-semibold text-mango-orange">~4–4,50 €/kg</span>
                    </div>
                    <div className="border-t border-cream-dark pt-3 text-charcoal-light text-xs">
                      Prix HT · 10% sous le cours Rungis · Paiement à la livraison
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="rounded-2xl bg-white p-6 shadow-premium">
                  <h3 className="mb-4 font-serif text-lg font-bold text-forest-green">Conditionnement</h3>
                  <ul className="space-y-2 text-sm font-sans text-charcoal">
                    <li className="flex items-center gap-2"><span className="text-gold">▸</span> Boîtes de 4 kg</li>
                    <li className="flex items-center gap-2"><span className="text-gold">▸</span> Boîtes de 6 kg</li>
                    <li className="flex items-center gap-2"><span className="text-gold">▸</span> Commande minimum : 1 boîte</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="rounded-2xl bg-white p-6 shadow-premium">
                  <h3 className="mb-4 font-serif text-lg font-bold text-forest-green">Livraison</h3>
                  <ul className="space-y-2 text-sm font-sans text-charcoal">
                    <li className="flex items-center gap-2"><span className="text-gold">▸</span> Île-de-France : livraison possible</li>
                    <li className="flex items-center gap-2"><span className="text-gold">▸</span> Retrait : 14 voie des meuniers, Chevilly-Larue</li>
                    <li className="flex items-center gap-2"><span className="text-gold">▸</span> Autres régions : nous contacter</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="rounded-2xl bg-forest-green p-6">
                  <h3 className="mb-2 font-serif text-lg font-bold text-white">Besoin d&apos;aide ?</h3>
                  <p className="text-sm text-white/70 font-sans mb-4">Appelez directement Ahmed pour toute question.</p>
                  <a href="tel:+33752900084" className="block w-full rounded-xl bg-gold py-3 text-center text-sm font-semibold text-forest-green hover:bg-gold/90 transition-colors font-sans">
                    +33 7 52 90 00 84
                  </a>
                </div>
              </ScrollReveal>
            </aside>

            {/* Order form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="rounded-2xl bg-white p-8 shadow-premium md:p-10">
                  <OrderForm />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
