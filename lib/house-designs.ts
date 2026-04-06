export type HouseDesignIdea = {
  slug: string;
  title: string;
  plotSize: string;
  category: string;
  summary: string;
  idealFor: string;
  floors: string;
  bedrooms: number;
  bathrooms: number;
  highlights: string[];
  rooms: Array<{
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
};

export const HOUSE_DESIGNS: HouseDesignIdea[] = [
  {
    slug: "5-marla-smart-family-home",
    title: "5 marla smart family home",
    plotSize: "5 marla",
    category: "Compact urban layout",
    summary:
      "A neat double-floor concept with an open lounge, practical parking, and a clean room split for growing families.",
    idealFor: "Young families who want a modern home on a manageable plot.",
    floors: "2 floors",
    bedrooms: 4,
    bathrooms: 4,
    highlights: [
      "One-car porch with a direct family entry",
      "Ground-floor guest bedroom for parents or visitors",
      "Open kitchen-dining setup to keep the space feeling larger",
    ],
    rooms: [
      { label: "Porch", x: 8, y: 8, width: 86, height: 56 },
      { label: "Drawing", x: 100, y: 8, width: 90, height: 56 },
      { label: "Lounge", x: 8, y: 70, width: 118, height: 68 },
      { label: "Kitchen", x: 132, y: 70, width: 58, height: 68 },
      { label: "Bed", x: 8, y: 144, width: 86, height: 56 },
      { label: "Bath", x: 100, y: 144, width: 40, height: 56 },
      { label: "Stairs", x: 146, y: 144, width: 44, height: 56 },
    ],
  },
  {
    slug: "7-marla-corner-living-plan",
    title: "7 marla corner living plan",
    plotSize: "7 marla",
    category: "Corner plot concept",
    summary:
      "Built for wider frontage, natural light, and a stronger family living zone with cleaner circulation.",
    idealFor: "Corner-plot buyers who want extra openness without moving to a much larger budget.",
    floors: "2 floors",
    bedrooms: 5,
    bathrooms: 5,
    highlights: [
      "Wider front allows better windows and stair placement",
      "Separate dining edge keeps the lounge uncluttered",
      "Flexible upstairs family sitting for study or TV use",
    ],
    rooms: [
      { label: "Porch", x: 8, y: 8, width: 96, height: 54 },
      { label: "Drawing", x: 110, y: 8, width: 82, height: 54 },
      { label: "Dining", x: 8, y: 68, width: 66, height: 62 },
      { label: "Lounge", x: 80, y: 68, width: 112, height: 62 },
      { label: "Kitchen", x: 8, y: 136, width: 82, height: 64 },
      { label: "Bed", x: 96, y: 136, width: 62, height: 64 },
      { label: "Stairs", x: 164, y: 136, width: 28, height: 64 },
    ],
  },
  {
    slug: "10-marla-dual-lounge-plan",
    title: "10 marla dual lounge plan",
    plotSize: "10 marla",
    category: "Premium family flow",
    summary:
      "A balanced plan with stronger room sizes, formal drawing space, and a second family lounge upstairs.",
    idealFor: "Families who want comfort, guest handling, and a more premium room layout.",
    floors: "2 floors",
    bedrooms: 5,
    bathrooms: 6,
    highlights: [
      "Formal drawing room plus daily family lounge",
      "Large kitchen backed by utility support space",
      "Upstairs lounge works as study, cinema, or play area",
    ],
    rooms: [
      { label: "Porch", x: 8, y: 8, width: 74, height: 58 },
      { label: "Drawing", x: 88, y: 8, width: 104, height: 58 },
      { label: "Lounge", x: 8, y: 72, width: 112, height: 64 },
      { label: "Dining", x: 126, y: 72, width: 66, height: 64 },
      { label: "Kitchen", x: 8, y: 142, width: 74, height: 58 },
      { label: "Bed", x: 88, y: 142, width: 72, height: 58 },
      { label: "Stairs", x: 166, y: 142, width: 26, height: 58 },
    ],
  },
  {
    slug: "1-kanal-signature-residence",
    title: "1 kanal signature residence",
    plotSize: "1 kanal",
    category: "Luxury residence",
    summary:
      "A spacious family home concept with entertainment flow, guest privacy, and stronger outdoor landscaping potential.",
    idealFor: "Owners planning a long-term premium family home with formal and informal zones.",
    floors: "2 floors",
    bedrooms: 6,
    bathrooms: 7,
    highlights: [
      "Wide porch and formal drawing room for guest hosting",
      "Main kitchen plus dirty kitchen arrangement",
      "Large rear lawn or deck space for evening use",
    ],
    rooms: [
      { label: "Porch", x: 8, y: 8, width: 82, height: 54 },
      { label: "Drawing", x: 96, y: 8, width: 96, height: 54 },
      { label: "Lawn", x: 8, y: 68, width: 58, height: 132 },
      { label: "Lounge", x: 72, y: 68, width: 78, height: 62 },
      { label: "Dining", x: 156, y: 68, width: 36, height: 62 },
      { label: "Kitchen", x: 72, y: 136, width: 62, height: 64 },
      { label: "Bed", x: 140, y: 136, width: 52, height: 64 },
    ],
  },
  {
    slug: "farmhouse-courtyard-retreat",
    title: "Farmhouse courtyard retreat",
    plotSize: "Farmhouse",
    category: "Weekend and event concept",
    summary:
      "A relaxed farmhouse layout with a central lawn, deep outdoor sitting, and a strong indoor-outdoor leisure flow.",
    idealFor: "Buyers planning weekend living, rental stays, or event-friendly private property.",
    floors: "Single level + loft option",
    bedrooms: 4,
    bathrooms: 5,
    highlights: [
      "Courtyard planning keeps the home airy and event-friendly",
      "Outdoor barbecue and pool edge can sit beside the lawn",
      "Guest rooms can stay private from the main family block",
    ],
    rooms: [
      { label: "Deck", x: 8, y: 8, width: 74, height: 48 },
      { label: "Suite", x: 88, y: 8, width: 104, height: 48 },
      { label: "Courtyard", x: 8, y: 62, width: 98, height: 138 },
      { label: "Lounge", x: 112, y: 62, width: 80, height: 64 },
      { label: "Kitchen", x: 112, y: 132, width: 42, height: 68 },
      { label: "Guest", x: 160, y: 132, width: 32, height: 68 },
    ],
  },
];
