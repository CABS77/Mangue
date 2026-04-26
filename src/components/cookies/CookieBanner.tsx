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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-senegal-green-200 bg-senegal-green-800 px-4 py-4 shadow-lg sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-white sm:text-left">
          Ce site utilise des cookies pour améliorer votre expérience de navigation.
          Vous pouvez accepter ou refuser les cookies non essentiels.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={handleRefuse}
            className="rounded-md border border-white px-4 py-2 text-sm font-medium text-white transition-colors duration-100 hover:bg-senegal-green-700"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-md bg-senegal-yellow-500 px-4 py-2 text-sm font-medium text-senegal-green-900 transition-colors duration-100 hover:bg-senegal-yellow-400"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
