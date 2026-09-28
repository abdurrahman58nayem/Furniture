/**
 * WOODORA — shared domain types.
 * সব পণ্য, ফিল্টার, কার্ট ও অর্ডার একই টাইপ সিস্টেম ব্যবহার করে।
 */

/* ---------------------------------- Taxonomy --------------------------------- */
export type DepartmentSlug =
  | "living-room"
  | "bedroom"
  | "dining"
  | "office"
  | "storage"
  | "home-decor";

export type RoomSlug =
  | "living-room"
  | "bedroom"
  | "dining"
  | "home-office"
  | "balcony"
  | "small-space";

export type ProductTag = "new" | "bestseller" | "featured" | "small-space" | "offer";

export type SuitabilityLevel = "suitable" | "moderate" | "not-suitable";

/* ---------------------------------- Options ---------------------------------- */
export interface ColorOption {
  id: string;
  /** English label (ব্র্যান্ড/টেকনিক্যাল টার্ম) */
  name: string;
  /** বাংলা লেবেল */
  nameBn: string;
  hex: string;
  /** ইমেজের উপর যে overlay বসে — color/finish বদলের ভিজ্যুয়াল প্রিভিউ */
  overlay: string;
  overlayOpacity: number;
}

export interface FabricOption {
  id: string;
  name: string;
  nameBn: string;
  hex: string;
  overlay: string;
  overlayOpacity: number;
}

/* --------------------------------- Structure --------------------------------- */
export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: "inch";
  seatHeight?: number;
  /** পণ্যের মাপ বোঝার জন্য বাড়তি নোট */
  noteBn?: string;
}

export interface Specification {
  labelBn: string;
  valueBn: string;
}

export interface ProductMaterial {
  /** এক লাইনে প্রধান উপকরণ — কার্ডে দেখানো হয় */
  primary: string;
  frame?: string;
  board?: string;
  finish?: string;
  fabric?: string;
  foam?: string;
  hardware?: string;
  top?: string;
}

export interface DeliveryInfo {
  chargeInside: number;
  chargeOutside: number;
  timeInsideBn: string;
  timeOutsideBn: string;
  /** বড় Furniture-এ custom delivery charge প্রযোজ্য */
  customDelivery: boolean;
  noteBn?: string;
}

export type InstallationType = "free" | "paid" | "self";

export interface InstallationInfo {
  type: InstallationType;
  labelBn: string;
  charge?: number;
  detailBn: string;
}

export interface WarrantyInfo {
  id: "1y" | "6m" | "2y" | "none";
  labelBn: string;
  coveredBn: string;
}

export interface CustomerReview {
  id: string;
  nameBn: string;
  locationBn: string;
  rating: number;
  dateBn: string;
  textBn: string;
}

export interface RoomFit {
  labelBn: string;
  level: SuitabilityLevel;
  noteBn?: string;
}

export interface CustomizationInfo {
  size: boolean;
  color: boolean;
  fabric: boolean;
  finish: boolean;
  customDesign: boolean;
  leadTimeBn: string;
}

/* ---------------------------------- Product ---------------------------------- */
export interface Product {
  id: string;
  /** English product/model name — brand & model term হিসেবে থাকবে */
  name: string;
  /** বাংলা সাব-টাইটেল (ঐচ্ছিক) */
  nameBn: string;
  slug: string;

  /** প্রধান বিভাগ */
  department: DepartmentSlug;
  /** নির্দিষ্ট product type (filter-এর জন্য) */
  type: string;
  /** কোন কোন ঘরের জন্য */
  rooms: RoomSlug[];

  price: number;
  originalPrice: number;
  /** ডেমো ডিসকাউন্ট ব্যাজ — ‘আজকের অফার’ */
  offerBn?: string;

  /** প্রথম ছবি = main image, বাকিগুলো gallery */
  images: string[];
  imageLabelsBn: string[];

  material: ProductMaterial;
  finish: string;
  colors: ColorOption[];
  fabrics?: FabricOption[];

  dimensions: Dimensions;

  shortDescriptionBn: string;
  descriptionBn: string;
  featuresBn: string[];
  specifications: Specification[];
  careBn: string[];

  warranty: WarrantyInfo;
  installation: InstallationInfo;
  delivery: DeliveryInfo;

  stock: number;
  rating: number;
  reviewCount: number;
  reviews: CustomerReview[];

  customization: CustomizationInfo;
  roomFit: RoomFit[];

  tags: ProductTag[];
  /** বেশি বিক্রি হয়েছে — sorting */
  soldCount: number;
  /** নতুন — sorting */
  addedAt: string;
  weightKg: number;
  assemblyBn: string;
  /** room visualization-এর জন্য lifestyle scene */
  roomScene: {
    image: string;
    captionBn: string;
  };
}

/* ------------------------------- Collections -------------------------------- */
export interface RoomCollection {
  id: string;
  slug: string;
  titleBn: string;
  subtitleBn: string;
  descriptionBn: string;
  image: string;
  productSlugs: string[];
  bundlePrice: number;
  originalPrice: number;
  accent: string;
}

/* ----------------------------------- Cart ----------------------------------- */
export interface CartLine {
  /** product.id + option signature */
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  colorId?: string;
  colorName?: string;
  fabricId?: string;
  fabricName?: string;
  /** মাপ (ইঞ্চি) — কার্টে দেখানোর জন্য */
  sizeLabelBn: string;
  deliveryChargeInside: number;
}

export interface OrderDetails {
  orderNumber: string;
  name: string;
  phone: string;
  address: string;
  areaBn: string;
  districtBn: string;
  deliveryZone: "inside" | "outside";
  paymentBn: string;
  note?: string;
  items: CartLine[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  placedAtBn: string;
  estimatedDeliveryBn: string;
}

/* ---------------------------------- Filters --------------------------------- */
export type SortKey =
  | "popular"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "best-selling"
  | "top-rated";

export interface ProductFilters {
  query: string;
  departments: string[];
  types: string[];
  rooms: string[];
  materials: string[];
  colors: string[];
  sizes: string[];
  availability: "all" | "in-stock" | "out-of-stock";
  warranty: "all" | "with-warranty" | "any";
  minPrice: number;
  maxPrice: number;
  sort: SortKey;
}
