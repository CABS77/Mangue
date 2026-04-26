import type { MetadataRoute } from 'next';

const BASE_URL = 'https://import-mangues-senegal.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/produits`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date(),
    },
  ];
}
