'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon paths broken by bundlers
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationMapProps {
  latitude: number;
  longitude: number;
  address: string;
}

function StaticFallback({ latitude, longitude, address }: LocationMapProps) {
  const osmUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;

  return (
    <div className="flex h-80 flex-col items-center justify-center rounded-2xl bg-cream p-8 text-center">
      <span className="mb-4 text-4xl" aria-hidden="true">📍</span>
      <p className="mb-2 font-serif text-lg font-semibold text-forest-green">
        Notre adresse
      </p>
      <p className="mb-6 leading-relaxed text-charcoal-light font-sans">{address}</p>
      <a
        href={osmUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-full bg-gold px-8 py-3 text-sm font-semibold text-forest-green transition-all duration-300 hover:bg-gold-light hover:shadow-gold btn-scale font-sans"
      >
        Voir sur OpenStreetMap
      </a>
    </div>
  );
}

export default function LocationMap({ latitude, longitude, address }: LocationMapProps) {
  const [tileError, setTileError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <StaticFallback latitude={latitude} longitude={longitude} address={address} />;
  }

  if (tileError) {
    return <StaticFallback latitude={latitude} longitude={longitude} address={address} />;
  }

  const osmUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;

  return (
    <div>
      <div className="h-80 overflow-hidden rounded-2xl">
        <MapContainer
          center={[latitude, longitude]}
          zoom={14}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            eventHandlers={{
              tileerror: () => setTileError(true),
            }}
          />
          <Marker position={[latitude, longitude]} icon={defaultIcon}>
            <Popup>
              <p className="text-sm font-medium">{address}</p>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <noscript>
        <div className="mt-4 rounded-2xl bg-cream p-6 text-center">
          <p className="text-charcoal font-sans">
            <strong className="text-forest-green">Notre adresse :</strong> {address}
          </p>
          <p className="mt-2">
            <a
              href={osmUrl}
              className="text-forest-green underline decoration-gold/50 underline-offset-4"
            >
              Voir notre localisation sur OpenStreetMap
            </a>
          </p>
        </div>
      </noscript>
    </div>
  );
}
