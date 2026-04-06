export type MarketCode = "SWEDEN" | "EU" | "PAKISTAN";
export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

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
  status?: string;
  createdAt: string;
  agentName: string;
  contactPhone?: string;
  whatsappPhone?: string;
  latitude?: number;
  longitude?: number;
  imageUrls: string[];
  youtubeUrl?: string;
  queueType?: string;
  leadCount?: number;
}

export interface PropertyFilters {
  country?: string;
  city?: string;
  listingType?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  bedrooms?: number;
  marketCode?: MarketCode;
}

export interface DashboardSnapshot {
  listingCount: number;
  leadCount: number;
  queueApplications: number;
  pendingReview: number;
  listings: PropertyCardData[];
}

export interface AdminUserQueueItem {
  id: string;
  email: string;
  role: "USER" | "AGENT" | "LANDLORD" | "ADMIN";
  approvalStatus: ApprovalStatus;
  createdAt: string;
  name: string;
  phone?: string;
  country?: string;
  city?: string;
}

export interface AdminManagedUser {
  id: string;
  email: string;
  role: "USER" | "AGENT" | "LANDLORD" | "ADMIN";
  approvalStatus: ApprovalStatus;
  createdAt: string;
  name: string;
  phone?: string;
  country?: string;
  city?: string;
}

export interface AdminSnapshot {
  pendingListings: PropertyCardData[];
  verifiedCount: number;
  userCount: number;
  approvedAgentCount: number;
  pendingUsers: AdminUserQueueItem[];
  managedUsers: AdminManagedUser[];
}
