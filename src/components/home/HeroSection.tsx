'use client';

import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest-green pt-20"
      aria-label="Bannière principale"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-green-dark via-forest-green to-forest-green-light" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,168,67,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(232,145,58,0.08),transparent_50%)]" />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className={`absolute top-[15%] left-[10%] text-5xl transition-all duration-1000 ${
            mounted ? 'opacity-20 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ animation: mounted ? 'float 4s ease-in-out infinite' : 'none' }}
        >
          🥭
        </div>
        <div
          className={`absolute top-[25%] right-[15%] text-3xl transition-all duration-1000 delay-300 ${
            mounted ? 'opacity-15 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ animation: mounted ? 'float 5s ease-in-out infinite 0.5s' : 'none' }}
        >
          🥭
        </div>
        <div
          className={`absolute bottom-[20%] left-[20%] text-4xl transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-10 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ animation: mounted ? 'float 6s ease-in-out infinite 1s' : 'none' }}
        >
          🥭
        </div>
        <div
          className={`absolute bottom-[30%] right-[10%] text-2xl transition-all duration-1000 delay-700 ${
            mounted ? 'opacity-15 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ animation: mounted ? 'float 4.5s ease-in-out infinite 1.5s' : 'none' }}
        >
          🥭
        </div>
        {/* Golden dots */}
        <div className="absolute top-[40%] left-[5%] h-2 w-2 rounded-full bg-gold/30" style={{ animation: 'float 3s ease-in-out infinite' }} />
        <div className="absolute top-[60%] right-[8%] h-3 w-3 rounded-full bg-gold/20" style={{ animation: 'float 4s ease-in-out infinite 0.5s' }} />
        <div className="absolute top-[20%] left-[50%] h-1.5 w-1.5 rounded-full bg-gold/25" style={{ animation: 'float 3.5s ease-in-out infinite 1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-content px-6 py-32 text-center lg:px-8">
        <div className={`mb-6 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="rounded-full bg-gold/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-premium text-gold font-sans border border-gold/30">
            🇸🇳 Import direct Sénégal
          </span>
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 font-sans border border-white/20">
            ~3,40 €/kg — 10% sous Rungis
          </span>
        </div>

        <h1
          className={`font-serif text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Les meilleures mangues
          <span className="block mt-2 text-gradient">du Sénégal</span>
        </h1>

        <p
          className={`mx-auto mt-8 max-w-2xl text-lg text-white/70 sm:text-xl font-sans transition-all duration-700 delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Découvrez nos variétés de mangues sénégalaises sélectionnées à la main
          pour leur goût exceptionnel et leur fraîcheur incomparable.
        </p>

        <div
          className={`mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Button href="/produits" variant="primary" className="text-lg px-10 py-4">
            Découvrir nos mangues
          </Button>
          <Button href="/commande" variant="outline" className="text-lg px-10 py-4">
            Commander maintenant
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
