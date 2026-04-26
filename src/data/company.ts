import { CompanyInfo, SellingPoint } from '@/types';

export const companyInfo: CompanyInfo = {
  name: 'Import Mangues Sénégal',
  founder: 'Cheikh Sall',
  siren: '947 529 046',
  address: {
    street: '14 voie des meuniers',
    postalCode: '94550',
    city: 'Chevilly-Larue',
    country: 'France',
  },
  coordinates: {
    latitude: 48.7646,
    longitude: 2.3498,
  },
  contact: {
    email: 'cabs77.fr@gmail.com',
    phone: '+33 7 52 90 00 84',
  },
};

export const sellingPoints: SellingPoint[] = [
  {
    icon: '🇸🇳',
    title: 'Origine Sénégalaise',
    description:
      'Nos mangues sont cultivées au Sénégal, dans les vergers de Casamance et de la région de Thiès, par des producteurs locaux passionnés.',
  },
  {
    icon: '🥭',
    title: 'Qualité Premium',
    description:
      'Chaque mangue est sélectionnée à la main pour garantir une maturité optimale, un goût exceptionnel et une fraîcheur incomparable.',
  },
  {
    icon: '✈️',
    title: 'Import Direct',
    description:
      'Du verger sénégalais à votre table en France, nous assurons un circuit court pour préserver la qualité et la fraîcheur de nos fruits.',
  },
];
