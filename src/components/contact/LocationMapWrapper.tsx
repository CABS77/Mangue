'use client';

import dynamic from 'next/dynamic';

interface LocationMapWrapperProps {
  latitude: number;
  longitude: number;
  address: string;
}

const LocationMap = dynamic(() => import('./LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-80 items-center justify-center rounded-2xl bg-cream">
      <p className="text-charcoal-light font-sans">Chargement de la carte…</p>
    </div>
  ),
});

export default function LocationMapWrapper({ latitude, longitude, address }: LocationMapWrapperProps) {
  return <LocationMap latitude={latitude} longitude={longitude} address={address} />;
}
