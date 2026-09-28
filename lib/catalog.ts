import type { DepartmentSlug, RoomSlug } from "@/lib/types";

/* ==========================================================================
   ক্যাটাগরি ও রুম taxonomy — পুরো Website এই একই সোর্স ব্যবহার করে।
   ========================================================================== */

export interface Department {
  slug: DepartmentSlug;
  titleBn: string;
  subtitleBn: string;
  descriptionBn: string;
  image: string;
  /** এই বিভাগের পণ্যের ধরন (filter chips) */
  types: { slug: string; titleBn: string }[];
}

export const departments: Department[] = [
  {
    slug: "living-room",
    titleBn: "বসার ঘর",
    subtitleBn: "Sofa, Center Table, TV Cabinet",
    descriptionBn:
      "পরিবারের আড্ডা আর অতিথি আপ্যায়নের জন্য আরামদায়ক ও টেকসই Furniture — Sofa, Center Table, TV Cabinet ও Bookshelf।",
    image: "/images/hero-living-room.jpg",
    types: [
      { slug: "sofa", titleBn: "সোফা" },
      { slug: "sofa-set", titleBn: "Sofa Set" },
      { slug: "center-table", titleBn: "সেন্টার টেবিল" },
      { slug: "tv-cabinet", titleBn: "টিভি ক্যাবিনেট" },
      { slug: "side-table", titleBn: "সাইড টেবিল" },
      { slug: "bookshelf", titleBn: "বুকশেলফ" },
      { slug: "console-table", titleBn: "কনসোল টেবিল" },
      { slug: "coffee-table", titleBn: "কফি টেবিল" },
    ],
  },
  {
    slug: "bedroom",
    titleBn: "শোবার ঘর",
    subtitleBn: "Bed, Wardrobe, Dressing Table",
    descriptionBn:
      "গভীর ঘুম আর পরিপাটি সংসার — Solid Wood Bed, Wardrobe, Dressing Table ও Bedside Table-এর সংগ্রহ।",
    image: "/images/products/royal-queen-bed.jpg",
    types: [
      { slug: "bed", titleBn: "বেড" },
      { slug: "bedside-table", titleBn: "বেডসাইড টেবিল" },
      { slug: "wardrobe", titleBn: "ওয়ারড্রোব" },
      { slug: "dressing-table", titleBn: "ড্রেসিং টেবিল" },
      { slug: "chest-of-drawers", titleBn: "Chest of Drawers" },
    ],
  },
  {
    slug: "dining",
    titleBn: "ডাইনিং",
    subtitleBn: "Dining Table, Chair, Set",
    descriptionBn:
      "পরিবারের খাবার হোক একসঙ্গে — ৪ ও ৬ সিটের Dining Table, Chair এবং সম্পূর্ণ Dining Set।",
    image: "/images/products/classic-6-seater-dining-set.jpg",
    types: [
      { slug: "dining-table", titleBn: "ডাইনিং টেবিল" },
      { slug: "dining-chair", titleBn: "ডাইনিং চেয়ার" },
      { slug: "dining-set", titleBn: "Dining Set" },
      { slug: "side-cabinet", titleBn: "সাইড ক্যাবিনেট" },
    ],
  },
  {
    slug: "office",
    titleBn: "অফিস",
    subtitleBn: "Office Table, Chair, Cabinet",
    descriptionBn:
      "হোম অফিস থেকে কর্পোরেট অফিস — Executive Work Desk, Office Chair ও Filing Cabinet-এর সংগ্রহ।",
    image: "/images/scenes/office-scene.jpg",
    types: [
      { slug: "office-table", titleBn: "অফিস টেবিল" },
      { slug: "office-chair", titleBn: "অফিস চেয়ার" },
      { slug: "executive-chair", titleBn: "Executive Chair" },
      { slug: "filing-cabinet", titleBn: "ফাইলিং ক্যাবিনেট" },
      { slug: "bookshelf", titleBn: "বুকশেলফ" },
    ],
  },
  {
    slug: "storage",
    titleBn: "স্টোরেজ",
    subtitleBn: "Wardrobe, Cabinet, Shoe Rack",
    descriptionBn:
      "কম জায়গায় বেশি জিনিস — Wardrobe, Cabinet, Shoe Rack ও Storage Shelf।",
    image: "/images/scenes/small-space-scene.jpg",
    types: [
      { slug: "wardrobe", titleBn: "ওয়ারড্রোব" },
      { slug: "cabinet", titleBn: "ক্যাবিনেট" },
      { slug: "shoe-rack", titleBn: "জুতা রাখার র‍্যাক" },
      { slug: "storage-shelf", titleBn: "স্টোরেজ শেলফ" },
    ],
  },
  {
    slug: "home-decor",
    titleBn: "হোম ডেকোর",
    subtitleBn: "Mirror, Console Table, Wall Shelf",
    descriptionBn:
      "ছোট ছোট পরিবর্তনেই ঘর নতুন — Mirror, Console Table, Wall Shelf ও Decorative Furniture।",
    image: "/images/scenes/decor-scene.jpg",
    types: [
      { slug: "mirror", titleBn: "মিরর" },
      { slug: "console-table", titleBn: "কনসোল টেবিল" },
      { slug: "wall-shelf", titleBn: "ওয়াল শেলফ" },
      { slug: "decorative", titleBn: "ডেকোরেটিভ Furniture" },
      { slug: "planter-stand", titleBn: "প্ল্যান্ট স্ট্যান্ড" },
    ],
  },
];

export function getDepartment(slug: string): Department | undefined {
  return departments.find((department) => department.slug === slug);
}

export function departmentTitle(slug: string): string {
  return getDepartment(slug)?.titleBn ?? slug;
}

export function typeTitle(typeSlug: string): string {
  for (const department of departments) {
    const type = department.types.find((item) => item.slug === typeSlug);
    if (type) return type.titleBn;
  }
  return typeSlug;
}

/* ---------------------------------- Rooms ---------------------------------- */

export interface RoomCard {
  slug: RoomSlug;
  titleBn: string;
  subtitleBn: string;
  image: string;
  /** রুম অনুযায়ী browse করার সময় যে departments দেখানো হবে */
  departments: DepartmentSlug[];
}

export const rooms: RoomCard[] = [
  {
    slug: "living-room",
    titleBn: "বসার ঘর",
    subtitleBn: "Sofa, Center Table, TV Cabinet",
    image: "/images/hero-living-room.jpg",
    departments: ["living-room"],
  },
  {
    slug: "bedroom",
    titleBn: "শোবার ঘর",
    subtitleBn: "Bed, Wardrobe, Dressing Table",
    image: "/images/products/royal-queen-bed.jpg",
    departments: ["bedroom"],
  },
  {
    slug: "dining",
    titleBn: "ডাইনিং",
    subtitleBn: "Dining Table, Chair, Set",
    image: "/images/products/classic-6-seater-dining-set.jpg",
    departments: ["dining"],
  },
  {
    slug: "home-office",
    titleBn: "হোম অফিস",
    subtitleBn: "Work Desk, Office Chair",
    image: "/images/scenes/office-scene.jpg",
    departments: ["office"],
  },
  {
    slug: "balcony",
    titleBn: "বারান্দা",
    subtitleBn: "Lounge Chair, Plant Stand",
    image: "/images/scenes/balcony-scene.jpg",
    departments: ["home-decor", "living-room"],
  },
  {
    slug: "small-space",
    titleBn: "ছোট জায়গার জন্য",
    subtitleBn: "Compact ও Smart Furniture",
    image: "/images/scenes/small-space-scene.jpg",
    departments: ["storage", "bedroom"],
  },
];

export function getRoom(slug: string): RoomCard | undefined {
  return rooms.find((room) => room.slug === slug);
}

export function roomTitle(slug: string): string {
  return getRoom(slug)?.titleBn ?? slug;
}

/* ---------------------------------- Filters --------------------------------- */

export const materialFilters = [
  { id: "solid-wood", labelBn: "Solid Wood" },
  { id: "mdf", labelBn: "MDF Board" },
  { id: "plywood", labelBn: "Plywood" },
  { id: "engineered-wood", labelBn: "Engineered Wood" },
  { id: "metal", labelBn: "Metal" },
  { id: "glass", labelBn: "Glass" },
  { id: "cane", labelBn: "Cane" },
] as const;

export const colorFilters = [
  { id: "natural", labelBn: "Natural", hex: "#d8b78a" },
  { id: "walnut", labelBn: "Walnut", hex: "#7a5230" },
  { id: "dark-brown", labelBn: "Dark Brown", hex: "#4a2f1c" },
  { id: "black", labelBn: "Black", hex: "#201d1a" },
  { id: "white", labelBn: "White", hex: "#f6f3ee" },
  { id: "beige", labelBn: "Beige", hex: "#dbcdb6" },
  { id: "gray", labelBn: "Gray", hex: "#9b9a96" },
] as const;

export const sizeFilters = [
  { id: "compact", labelBn: "ছোট (Compact)" },
  { id: "medium", labelBn: "মাঝারি" },
  { id: "large", labelBn: "বড়" },
] as const;

export const sortOptions = [
  { id: "popular", labelBn: "জনপ্রিয়" },
  { id: "newest", labelBn: "নতুন" },
  { id: "price-asc", labelBn: "দাম: কম থেকে বেশি" },
  { id: "price-desc", labelBn: "দাম: বেশি থেকে কম" },
  { id: "best-selling", labelBn: "বেশি বিক্রি হয়েছে" },
  { id: "top-rated", labelBn: "বেশি রেটিং" },
] as const;

export const availabilityFilters = [
  { id: "all", labelBn: "সব পণ্য" },
  { id: "in-stock", labelBn: "স্টকে আছে" },
  { id: "out-of-stock", labelBn: "স্টকে নেই" },
] as const;

export const warrantyFilters = [
  { id: "all", labelBn: "সব" },
  { id: "with-warranty", labelBn: "ওয়ারেন্টি আছে" },
  { id: "any", labelBn: "ওয়ারেন্টি নেই" },
] as const;

/** প্রাইস স্লাইডারের সীমা */
export const priceBounds = { min: 5000, max: 150000 };

/** Size filter-এর জন্য মাপের সীমা (ইঞ্চি) */
export const sizeBounds = {
  compact: { maxLength: 48, maxWidth: 30 },
  medium: { maxLength: 74, maxWidth: 40 },
} as const;
