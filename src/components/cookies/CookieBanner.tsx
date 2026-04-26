'use client';

import { useEffect, useState } from 'react';
import { hasValidConsent, setConsent } from '@/lib/cookies';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasValidConsent()) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setVisible(false);
  };

  const handleRefuse = () => {
    setConsent(false);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Bandeau de consentement aux cookies"
      aria-modal="false"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-forest-green/95 backdrop-blur-md px-6 py-5 shadow-premium-xl"
    >
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-white/80 sm:text-left font-sans">
          Ce site utilise des cookies pour améliorer votre expérience de navigation.
          Vous pouvez accepter ou refuser les cookies non essentiels.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={handleRefuse}
            className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 btn-scale font-sans"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-forest-green transition-all duration-300 hover:bg-gold-light hover:shadow-gold btn-scale font-sans"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
