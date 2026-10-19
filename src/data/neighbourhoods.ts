export type Neighbourhood = {
  slug: string;
  name: string;
  blurb: string;
  medianPrice: string;
  listings: number;
  image: string;
};

export const NEIGHBOURHOODS: Neighbourhood[] = [
  {
    slug: "bgc",
    name: "BGC",
    blurb: "City living, curated — parks, galleries and dinner within a walk.",
    medianPrice: "\u20B122M median",
    listings: 12,
    image: "/images/hood-1.jpg",
  },
  {
    slug: "makati",
    name: "Makati",
    blurb: "Old money, new energy. Salcedo and Legazpi at your doorstep.",
    medianPrice: "\u20B118M median",
    listings: 9,
    image: "/images/hood-2.jpg",
  },
  {
    slug: "tagaytay",
    name: "Tagaytay",
    blurb: "Weekend air, permanent calm — the ridge and the lake beyond.",
    medianPrice: "\u20B116M median",
    listings: 7,
    image: "/images/hood-3.jpg",
  },
  {
    slug: "cebu",
    name: "Cebu",
    blurb: "Island light, city convenience — Mactan to the mountains.",
    medianPrice: "\u20B120M median",
    listings: 6,
    image: "/images/hood-4.jpg",
  },
];
