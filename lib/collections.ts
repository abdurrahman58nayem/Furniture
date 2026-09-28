import type { RoomCollection } from "@/lib/types";
import { getProductsBySlugs } from "@/lib/products";

/**
 * সম্পূর্ণ ঘরের Collection — bundle হিসেবে কেনার সুবিধা।
 * একই centralized product data থেকে দাম হিসাব করা হয়।
 */
export const roomCollections: RoomCollection[] = [
  {
    id: "collection-living",
    slug: "modern-living-room",
    titleBn: "Modern Living Room",
    subtitleBn: "পুরো বসার ঘরের জন্য একসাথে",
    descriptionBn:
      "Sofa, Center Table, TV Cabinet ও Side Table — চারটি পণ্য একসাথে নিলে আলাদা কেনার চেয়ে সাশ্রয়, আর পুরো ঘরের স্টাইল এক রকম থাকে।",
    image: "/images/hero-living-room.jpg",
    productSlugs: [
      "oslo-3-seater-sofa",
      "heritage-center-table",
      "modern-tv-console",
      "danish-side-table",
    ],
    bundlePrice: 0,
    originalPrice: 0,
    accent: "সবচেয়ে জনপ্রিয় Collection",
  },
  {
    id: "collection-bedroom",
    slug: "complete-bedroom",
    titleBn: "Complete Bedroom",
    subtitleBn: "শোবার ঘরের সম্পূর্ণ সেটআপ",
    descriptionBn:
      "Bed, Bedside Table, Wardrobe ও Dressing Table — একটি Collection-এই শোবার ঘরের সবকিছু, মিলিয়ে নেওয়া ফিনিশ ও কালারে।",
    image: "/images/products/royal-queen-bed.jpg",
    productSlugs: [
      "royal-queen-bed",
      "walnut-bedside-table",
      "classic-3-door-wardrobe",
      "teak-dressing-table",
    ],
    bundlePrice: 0,
    originalPrice: 0,
    accent: "পরিবারের পছন্দ",
  },
  {
    id: "collection-dining",
    slug: "family-dining-set",
    titleBn: "Family Dining Set",
    subtitleBn: "পরিবারের খাবার একসঙ্গে",
    descriptionBn:
      "৬ সিটার Dining Table, বেতের Cane Dining Chair ও একটি Side Cabinet — অতিথি আপ্যায়নের জন্য সম্পূর্ণ ডাইনিং সেটআপ।",
    image: "/images/products/classic-6-seater-dining-set.jpg",
    productSlugs: [
      "nordic-dining-table",
      "cane-dining-chair",
      "storage-cabinet",
    ],
    bundlePrice: 0,
    originalPrice: 0,
    accent: "নতুন পরিবারের জন্য",
  },
  {
    id: "collection-office",
    slug: "home-office-setup",
    titleBn: "Home Office Setup",
    subtitleBn: "ঘরে বসেই প্রফেশনাল কাজ",
    descriptionBn:
      "Executive Work Desk, Ergonomic Office Chair, Bookshelf ও Filing Cabinet — হোম অফিসের জন্য প্রফেশনাল সেটআপ।",
    image: "/images/scenes/office-scene.jpg",
    productSlugs: [
      "executive-work-desk",
      "comfort-office-chair",
      "metro-bookshelf",
      "steel-filing-cabinet",
    ],
    bundlePrice: 0,
    originalPrice: 0,
    accent: "ওয়ার্ক ফ্রম হোম",
  },
];

const BUNDLE_DISCOUNT = 0.12; // একসাথে নিলে ১২% সাশ্রয়

/** Collection-এর দাম centralized পণ্যের দাম থেকেই হিসাব করা হয় */
export function getCollectionWithPricing(collection: RoomCollection) {
  const products = getProductsBySlugs(collection.productSlugs);
  const originalPrice = products.reduce((total, product) => total + product.price, 0);
  const bundlePrice = Math.round((originalPrice * (1 - BUNDLE_DISCOUNT)) / 100) * 100;
  return {
    ...collection,
    products,
    originalPrice,
    bundlePrice,
    savings: originalPrice - bundlePrice,
  };
}

export function getAllCollections() {
  return roomCollections.map(getCollectionWithPricing);
}

export function getCollectionBySlug(slug: string) {
  const collection = roomCollections.find((item) => item.slug === slug);
  return collection ? getCollectionWithPricing(collection) : undefined;
}

/* ------------------------------ ছোট জায়গা ------------------------------- */
export const smallSpaceCollection = {
  titleBn: "ছোট জায়গার জন্য Smart Furniture",
  subtitleBn: "ঢাকার ছোট ফ্ল্যাট ও বাসার জন্য বিশেষভাবে বাছাই করা",
  descriptionBn:
    "কম জায়গায় বেশি সুবিধা — Compact Sofa, Folding Dining Table, Storage Bed, Slim Shoe Rack আর Compact Work Desk একসঙ্গে।",
  slugs: [
    "compact-lounge-sofa",
    "folding-dining-table",
    "storage-bed-with-drawers",
    "slim-shoe-rack",
    "compact-work-desk",
  ],
};
