export type Agent = {
  name: string;
  role: string;
  initials: string;
};

export type Property = {
  slug: string;
  title: string;
  location: string;
  type: string;
  price: number;
  beds: number;
  baths: number;
  sqm: number;
  lot?: string;
  year: number;
  description: string;
  features: string[];
  images: string[];
  featured?: boolean;
  agent: Agent;
};

const camille: Agent = {
  name: "Camille Reyes",
  role: "Senior Advisor · BGC & Makati",
  initials: "CR",
};

const miguel: Agent = {
  name: "Miguel Torres",
  role: "Advisor · Alabang & Tagaytay",
  initials: "MT",
};

const sofia: Agent = {
  name: "Sofia Lim",
  role: "Advisor · Cebu & Visayas",
  initials: "SL",
};

export const PROPERTIES: Property[] = [
  {
    slug: "alcove-bgc",
    title: "The Alcove at BGC",
    location: "Bonifacio Global City, Taguig",
    type: "Condominium",
    price: 18500000,
    beds: 2,
    baths: 2,
    sqm: 118,
    year: 2021,
    description:
      "A corner residence above High Street with double-aspect skyline views, a quiet study nook and a balcony made for slow mornings. Steps from restaurants, galleries and the BGC Greenway.",
    features: [
      "Corner unit with skyline views",
      "Two parking slots included",
      "24/7 concierge and security",
      "Walk to BGC High Street",
    ],
    images: ["/images/home-1.jpg", "/images/hero-1.jpg", "/images/about.jpg"],
    featured: true,
    agent: camille,
  },
  {
    slug: "makati-sky-penthouse",
    title: "Makati Sky Penthouse",
    location: "Salcedo Village, Makati",
    type: "Penthouse",
    price: 42000000,
    beds: 3,
    baths: 3,
    sqm: 220,
    year: 2019,
    description:
      "A duplex penthouse with a private roof deck, wrap-around glazing and a wine wall. Salcedo Saturdays and the weekday financial district are both within a short walk.",
    features: [
      "Private roof deck and plunge pool",
      "Wrap-around floor-to-ceiling glazing",
      "Dedicated service entrance",
      "Three parking slots",
    ],
    images: ["/images/home-2.jpg", "/images/hero-2.jpg"],
    featured: true,
    agent: camille,
  },
  {
    slug: "casa-verde-alabang",
    title: "Casa Verde Alabang",
    location: "Ayala Alabang, Muntinlupa",
    type: "House & Lot",
    price: 28000000,
    beds: 5,
    baths: 4,
    sqm: 320,
    lot: "480 sqm lot",
    year: 2017,
    description:
      "A family home set behind a quiet garden, with a lanai that opens to mature trees, a separate service wing and space for everyone to find their own corner.",
    features: [
      "Mature landscaped garden",
      "Separate service and laundry wing",
      "Two-car carport plus driveway",
      "Gated village with 24/7 security",
    ],
    images: ["/images/home-3.jpg", "/images/hero-3.jpg"],
    featured: true,
    agent: miguel,
  },
  {
    slug: "tagaytay-ridge-villa",
    title: "Tagaytay Ridge Villa",
    location: "Tagaytay Highlands, Cavite",
    type: "Villa",
    price: 22000000,
    beds: 4,
    baths: 3,
    sqm: 280,
    lot: "600 sqm lot",
    year: 2020,
    description:
      "Cool air, a long view of the ridge and a deep covered terrace for weekend lunches. Designed as a second home that works just as well on a rainy weekday.",
    features: [
      "Ridge and lake views",
      "Covered outdoor dining terrace",
      "Fireplace and family den",
      "Clubhouse membership included",
    ],
    images: ["/images/home-4.jpg", "/images/hood-3.jpg"],
    agent: miguel,
  },
  {
    slug: "cebu-shore-house",
    title: "Cebu Shore House",
    location: "Punta Engaño, Mactan, Cebu",
    type: "Beach House",
    price: 35000000,
    beds: 4,
    baths: 5,
    sqm: 350,
    lot: "820 sqm lot",
    year: 2018,
    description:
      "A whitewashed house that opens straight onto the water, with a shaded lanai, an outdoor shower and a guest wing that feels like its own small hotel.",
    features: [
      "Direct beach access",
      "Guest wing with private entry",
      "Outdoor shower and storage for dive gear",
      "Ten minutes to Mactan airport",
    ],
    images: ["/images/home-5.jpg", "/images/hood-4.jpg"],
    agent: sofia,
  },
  {
    slug: "the-gable-vertis",
    title: "The Gable at Vertis",
    location: "Vertis North, Quezon City",
    type: "Townhouse",
    price: 9800000,
    beds: 3,
    baths: 2,
    sqm: 156,
    year: 2023,
    description:
      "A quiet corner townhouse in the middle of the city — high ceilings, a pocket garden and a study that catches the afternoon light.",
    features: [
      "Corner lot with pocket garden",
      "Skylight over the stairwell",
      "Two parking slots",
      "Walk to Vertis North mall",
    ],
    images: ["/images/home-6.jpg", "/images/about.jpg"],
    agent: camille,
  },
];

export function getProperty(slug: string): Property | undefined {
  return PROPERTIES.find((property) => property.slug === slug);
}
