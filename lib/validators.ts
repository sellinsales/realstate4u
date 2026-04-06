import { z } from "zod";
import { isAllowedListingImageUrl } from "@/lib/media";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(2),
  phone: z.string().min(6),
  country: z.string().min(2),
  role: z.enum(["USER", "AGENT", "LANDLORD"]),
});

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const resendVerificationSchema = z.object({
  email: z.email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(20),
  password: z.string().min(8),
});

export const propertyFormSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(30),
  price: z.coerce.number().positive(),
  country: z.string().min(2),
  city: z.string().min(2),
  address: z.string().min(3).optional().or(z.literal("")),
  marketCode: z.enum(["SWEDEN", "EU", "PAKISTAN"]),
  propertyType: z.enum(["APARTMENT", "HOUSE", "VILLA", "OFFICE", "PLOT", "SHOP", "ROOM"]),
  listingType: z.enum(["BUY", "RENT"]),
  bedrooms: z.coerce.number().int().min(0).optional(),
  bathrooms: z.coerce.number().int().min(0).optional(),
  areaSqm: z.coerce.number().int().positive().optional(),
  contactPhone: z.string().min(6),
  whatsappPhone: z.string().optional(),
  firstHand: z.boolean().optional().default(false),
  landlordSelection: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  youtubeUrl: z.union([z.literal(""), z.url()]).optional(),
  imageUrls: z
    .array(
      z.string().trim().refine(isAllowedListingImageUrl, {
        message: "Use uploaded images or approved image hosts only.",
      }),
    )
    .min(1),
});

export const leadFormSchema = z.object({
  propertyId: z.string().min(1),
  name: z.string().min(2),
  email: z.email().optional().or(z.literal("")),
  phone: z.string().min(6).optional().or(z.literal("")),
  message: z.string().min(10),
  source: z.enum(["WEB", "WHATSAPP", "CALL"]).default("WEB"),
});

export const queueApplicationSchema = z.object({
  propertyId: z.string().min(1),
  note: z.string().min(10).max(400).optional().or(z.literal("")),
});
