export const HOME_QUICK_LINKS = [
  { label: "Homes", href: "/buy" },
  { label: "Plots", href: "/plot-finder" },
  { label: "Commercial", href: "/commercial" },
  { label: "Apartments", href: "/properties?propertyType=APARTMENT" },
  { label: "Houses", href: "/properties?propertyType=HOUSE" },
] as const;

export const POPULAR_AREAS = [
  {
    title: "DHA Lahore",
    subtitle: "1,200 Listings",
    href: "/properties?city=Lahore",
    imageUrl:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Bahria Town Karachi",
    subtitle: "950 Listings",
    href: "/properties?city=Karachi",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "G-11 Islamabad",
    subtitle: "720 Listings",
    href: "/properties?city=Islamabad",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Gulshan-e-Iqbal Karachi",
    subtitle: "850 Listings",
    href: "/properties?city=Karachi",
    imageUrl:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Askari Lahore",
    subtitle: "540 Listings",
    href: "/properties?city=Lahore",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "B-17 Islamabad",
    subtitle: "610 Listings",
    href: "/properties?city=Islamabad",
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export const PROJECT_OPPORTUNITIES = [
  {
    title: "Green Residencia",
    subtitle: "Starting from PKR 5.5M",
    meta: "Apartments",
    href: "/projects",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Skyline Heights",
    subtitle: "Starting from PKR 8M",
    meta: "Luxury apartments",
    href: "/projects",
    imageUrl:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Capital Smart City",
    subtitle: "Starting from PKR 5.5M",
    meta: "Gated community",
    href: "/projects",
    imageUrl:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Park View Villas",
    subtitle: "Starting from PKR 3M",
    meta: "Villas and plots",
    href: "/projects",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export const PROPERTY_TYPE_SHORTCUTS = [
  { label: "Homes", href: "/properties?propertyType=HOUSE", icon: "home" as const },
  { label: "Plots", href: "/plot-finder", icon: "plot" as const },
  { label: "Commercial", href: "/commercial", icon: "commercial" as const },
  { label: "Apartments", href: "/properties?propertyType=APARTMENT", icon: "apartment" as const },
  { label: "Villas", href: "/properties?propertyType=VILLA", icon: "villa" as const },
  { label: "Farmhouses", href: "/house-designs", icon: "farm" as const },
] as const;

export const CITY_SHORTCUTS = [
  {
    title: "Lahore",
    subtitle: "5,200 Listings",
    href: "/properties?city=Lahore",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Islamabad",
    subtitle: "4,100 Listings",
    href: "/properties?city=Islamabad",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Karachi",
    subtitle: "6,800 Listings",
    href: "/properties?city=Karachi",
    imageUrl:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Rawalpindi",
    subtitle: "3,500 Listings",
    href: "/properties?city=Rawalpindi",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Peshawar",
    subtitle: "1,900 Listings",
    href: "/properties?city=Peshawar",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Multan",
    subtitle: "1,800 Listings",
    href: "/properties?city=Multan",
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export const GUIDE_SHORTCUTS = [
  {
    title: "Best Areas to Invest",
    subtitle: "Find the strongest buyer and rental demand zones first.",
    href: "/area-guides",
    icon: "guide" as const,
  },
  {
    title: "Price Trends",
    subtitle: "Compare area pricing before you decide where to buy.",
    href: "/area-guides",
    icon: "chart" as const,
  },
  {
    title: "Society Maps",
    subtitle: "Review society layouts, blocks, and plot locations faster.",
    href: "/area-guides",
    icon: "map" as const,
  },
  {
    title: "Housing Guides",
    subtitle: "Read practical buying, selling, and area selection guidance.",
    href: "/area-guides",
    icon: "guide" as const,
  },
] as const;
