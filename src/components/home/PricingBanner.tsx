import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';

const advantages = [
  { icon: '🚢', label: 'Mangue bateau', price: '~3,40 €/kg', detail: '10% sous le cours Rungis' },
  { icon: '✈️', label: 'Mangue avion Sénégal', price: '~4–4,50 €/kg', detail: 'Fraîcheur maximale garantie' },
];

const perks = [
  { icon: '✅', text: 'Importateur direct — sans intermédiaire' },
  { icon: '📦', text: 'Boîtes 4 kg et 6 kg disponibles' },
  { icon: '🚚', text: 'Livraison Île-de-France possible' },
  { icon: '💳', text: 'Acompte 50% — solde à la livraison' },
];

export default function PricingBanner() {
  return (
    <section className="bg-forest-green px-6 py-24 lg:px-8" aria-label="Nos tarifs">
      <div className="mx-auto max-w-content">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="mb-3 text-sm font-medium uppercase tracking-premium text-gold font-sans">Tarifs transparents</p>
            <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              Le meilleur prix du marché
            </h2>
            <p className="mt-4 text-white/60 font-sans max-w-xl mx-auto">
              Nos prix sont indexés 10% sous le cours Rungis chaque semaine. Pas de surprise.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          {advantages.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 150}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-sm font-medium uppercase tracking-wide text-gold/80 font-sans mb-1">{item.label}</p>
                <p className="font-serif text-4xl font-bold text-white mb-2">{item.price}</p>
                <p className="text-sm text-white/50 font-sans">{item.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {perks.map((perk) => (
                <div key={perk.text} className="flex items-center gap-3">
                  <span className="text-xl flex-shrink-0">{perk.icon}</span>
                  <span className="text-sm text-white/70 font-sans">{perk.text}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="text-center">
            <Button href="/commande" variant="primary" className="text-lg px-10 py-4">
              Passer une commande
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
