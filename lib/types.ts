export type MarketCode = "SWEDEN" | "EU" | "PAKISTAN";

export interface PropertyCardData {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  country: string;
  city: string;
  address?: string;
  marketCode: MarketCode;
  propertyType: string;
  listingType: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqm?: number;
  firstHand?: boolean;
  landlordSelection?: string;
  isVerified: boolean;
  createdAt: string;
  agentName: string;
  contactPhone?: string;
  whatsappPhone?: string;
  latitude?: number;
  longitude?: number;
  imageUrls: string[];
  queueType?: string;
  leadCount?: number;
}

export interface PropertyFilters {
  country?: string;
  city?: string;
  listingType?: string;
  propertyType?: string;
  maxPrice?: number;
  marketCode?: MarketCode;
}

export interface DashboardSnapshot {
  listingCount: number;
  leadCount: number;
  queueApplications: number;
  pendingReview: number;
  listings: PropertyCardData[];
}

export interface AdminSnapshot {
  pendingListings: PropertyCardData[];
  verifiedCount: number;
  userCount: number;
}
