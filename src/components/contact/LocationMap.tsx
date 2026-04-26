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
    <div className="flex h-80 flex-col items-center justify-center rounded-lg bg-senegal-green-50 p-8 text-center">
      <span className="mb-4 text-4xl" aria-hidden="true">📍</span>
      <p className="mb-2 text-lg font-medium text-senegal-green-800">
        Notre adresse
      </p>
      <p className="mb-4 leading-relaxed text-senegal-green-700">{address}</p>
      <a
        href={osmUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-md bg-senegal-green-600 px-6 py-2 text-sm font-medium text-white transition-colors duration-100 hover:bg-senegal-green-500"
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
      <div className="h-80 overflow-hidden rounded-lg">
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
        <div className="mt-4 rounded-lg bg-senegal-green-50 p-6 text-center">
          <p className="mb-2 text-senegal-green-800">
            <strong>Notre adresse :</strong> {address}
          </p>
          <p>
            <a
              href={osmUrl}
              className="text-senegal-green-600 underline"
            >
              Voir notre localisation sur OpenStreetMap
            </a>
          </p>
        </div>
      </noscript>
    </div>
  );
}
