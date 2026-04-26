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
    <div className="flex h-80 items-center justify-center rounded-lg bg-senegal-green-50">
      <p className="text-senegal-green-700">Chargement de la carte…</p>
    </div>
  ),
});

export default function LocationMapWrapper({ latitude, longitude, address }: LocationMapWrapperProps) {
  return <LocationMap latitude={latitude} longitude={longitude} address={address} />;
}
