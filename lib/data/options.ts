import type {
  ColorOption,
  CustomerReview,
  DeliveryInfo,
  FabricOption,
  InstallationInfo,
  RoomFit,
  WarrantyInfo,
} from "@/lib/types";
import { siteConfig } from "@/lib/site-config";

/* ==========================================================================
   শেয়ারড অপশন প্রিসেট
   প্রতিটি পণ্য এখান থেকেই color / fabric / warranty / delivery নেয় —
   একই তথ্য বারবার লেখা হয় না।
   ========================================================================== */

/* --------------------------------- Colors --------------------------------- */
export const COLORS: Record<string, ColorOption> = {
  natural: {
    id: "natural",
    name: "Natural",
    nameBn: "ন্যাচারাল",
    hex: "#d8b78a",
    overlay: "#e8bd82",
    overlayOpacity: 0.1,
  },
  oak: {
    id: "oak",
    name: "Natural Oak",
    nameBn: "ন্যাচারাল ওক",
    hex: "#c99b5f",
    overlay: "#d9a865",
    overlayOpacity: 0.11,
  },
  teak: {
    id: "teak",
    name: "Teak",
    nameBn: "টিক",
    hex: "#a2712f",
    overlay: "#a2712f",
    overlayOpacity: 0.13,
  },
  walnut: {
    id: "walnut",
    name: "Walnut",
    nameBn: "ওয়ালনাট",
    hex: "#7a5230",
    overlay: "#6b3f1d",
    overlayOpacity: 0.2,
  },
  darkBrown: {
    id: "dark-brown",
    name: "Dark Brown",
    nameBn: "ডার্ক ব্রাউন",
    hex: "#4a2f1c",
    overlay: "#33200f",
    overlayOpacity: 0.26,
  },
  black: {
    id: "black",
    name: "Black",
    nameBn: "ব্ল্যাক",
    hex: "#201d1a",
    overlay: "#100e0c",
    overlayOpacity: 0.3,
  },
  white: {
    id: "white",
    name: "White",
    nameBn: "হোয়াইট",
    hex: "#f4f1eb",
    overlay: "#ffffff",
    overlayOpacity: 0.2,
  },
  ivory: {
    id: "ivory",
    name: "Ivory",
    nameBn: "আইভরি",
    hex: "#efe6d7",
    overlay: "#f6eddd",
    overlayOpacity: 0.2,
  },
  beige: {
    id: "beige",
    name: "Beige",
    nameBn: "বেইজ",
    hex: "#dbcdb6",
    overlay: "#dcc7a6",
    overlayOpacity: 0.18,
  },
  gray: {
    id: "gray",
    name: "Gray",
    nameBn: "গ্রে",
    hex: "#9b9a96",
    overlay: "#8e8d89",
    overlayOpacity: 0.2,
  },
  navy: {
    id: "navy",
    name: "Navy",
    nameBn: "নেভি",
    hex: "#2b3852",
    overlay: "#22304a",
    overlayOpacity: 0.24,
  },
  olive: {
    id: "olive",
    name: "Olive",
    nameBn: "অলিভ",
    hex: "#6a6a48",
    overlay: "#5e5e3c",
    overlayOpacity: 0.22,
  },
  charcoal: {
    id: "charcoal",
    name: "Charcoal",
    nameBn: "চারকোল",
    hex: "#3b3835",
    overlay: "#2c2926",
    overlayOpacity: 0.26,
  },
};

/** সংক্ষেপে color গুলো বের করা — `c.walnut`, `c.black` */
export const c = COLORS;

/* --------------------------------- Fabrics -------------------------------- */
export const FABRICS: Record<string, FabricOption> = {
  beige: {
    id: "beige",
    name: "Beige",
    nameBn: "বেইজ",
    hex: "#d9c8ae",
    overlay: "#d9c8ae",
    overlayOpacity: 0.16,
  },
  gray: {
    id: "gray",
    name: "Gray",
    nameBn: "গ্রে",
    hex: "#a3a19c",
    overlay: "#9a9893",
    overlayOpacity: 0.2,
  },
  navy: {
    id: "navy",
    name: "Navy",
    nameBn: "নেভি",
    hex: "#2b3852",
    overlay: "#233049",
    overlayOpacity: 0.24,
  },
  brown: {
    id: "brown",
    name: "Brown",
    nameBn: "ব্রাউন",
    hex: "#6f4b30",
    overlay: "#6a452b",
    overlayOpacity: 0.24,
  },
  cream: {
    id: "cream",
    name: "Cream",
    nameBn: "ক্রিম",
    hex: "#eee4d4",
    overlay: "#f2e8d8",
    overlayOpacity: 0.16,
  },
  olive: {
    id: "olive",
    name: "Olive",
    nameBn: "অলিভ",
    hex: "#6a6a48",
    overlay: "#62623f",
    overlayOpacity: 0.22,
  },
};

export const f = FABRICS;

/** সোফা/চেয়ারের ডিফল্ট fabric অপশন */
export const FABRIC_OPTIONS = [f.beige, f.gray, f.navy, f.brown];
export const FABRIC_OPTIONS_LIGHT = [f.beige, f.cream, f.gray, f.olive];

/* ------------------------------- Warranty --------------------------------- */
export const WARRANTY: Record<string, WarrantyInfo> = {
  oneYear: {
    id: "1y",
    labelBn: "১ বছরের ওয়ারেন্টি",
    coveredBn:
      "কাঠের কাঠামো, জয়েন্ট এবং ফিটিংস-এর ম্যানুফ্যাকচারিং সমস্যা কভার করা হয়। ব্যবহারজনিত ক্ষতি ও কাপড়ের স্বাভাবিক ক্ষয় কভার করা হয় না।",
  },
  twoYear: {
    id: "2y",
    labelBn: "২ বছরের ওয়ারেন্টি",
    coveredBn:
      "Solid Wood কাঠামো, জয়েন্ট, ফিটিংস ও ফিনিশ-এর ম্যানুফ্যাকচারিং সমস্যা ২ বছর কভার করা হয়।",
  },
  sixMonth: {
    id: "6m",
    labelBn: "৬ মাসের ওয়ারেন্টি",
    coveredBn:
      "ফিটিংস ও হার্ডওয়্যার (hinge, channel, handle) ছয় মাসের ওয়ারেন্টির আওতায়। কাঠামোগত সমস্যা গ্যারান্টির বাইরে।",
  },
  none: {
    id: "none",
    labelBn: "ওয়ারেন্টি প্রযোজ্য নয়",
    coveredBn:
      "এই পণ্যটি ডেকোরেটিভ/অ্যাকসেসরি ক্যাটাগরির — তাই ওয়ারেন্টি প্রযোজ্য নয়। তবে ডেলিভারির সময় ক্ষতি হলে ৭ দিনের মধ্যে রিপোর্ট করলে বদলে দেওয়া হবে।",
  },
};

/* ----------------------------- Installation ------------------------------- */
export const INSTALLATION: Record<string, InstallationInfo> = {
  free: {
    type: "free",
    labelBn: "ফ্রি Installation",
    detailBn:
      "ডেলিভারির সময় আমাদের প্রশিক্ষিত টিম সম্পূর্ণ ফ্রি-তে পণ্য বসিয়ে, ফিট করে ও প্যাকিং সরিয়ে নিয়ে যাবে।",
  },
  paid: {
    type: "paid",
    labelBn: "Installation Charge প্রযোজ্য",
    charge: 1200,
    detailBn:
      "বড় Furniture-এর জন্য প্রফেশনাল installation চার্জ প্রযোজ্য। পুরো ঘরের অর্ডারে লাগলে ২ জন টেকনিশিয়ান পাঠানো হয়।",
  },
  selfAssembly: {
    type: "self",
    labelBn: "Self Assembly (সহজ)",
    detailBn:
      "প্যাকেটে প্রয়োজনীয় টুল, স্ক্রু ও ধাপে ধাপে বাংলা নির্দেশনা দেওয়া হয়। ২০–৩০ মিনিটে নিজেই বসানো যায়।",
  },
  freeAssemblyGuide: {
    type: "free",
    labelBn: "ফ্রি Installation + Assembly Guide",
    detailBn:
      "ছোট পণ্যের জন্য ফ্রি installation এবং বাংলায় সহজ অ্যাসেম্বলি গাইড দেওয়া হয়।",
  },
};

/* -------------------------------- Delivery -------------------------------- */
export const DELIVERY: Record<string, DeliveryInfo> = {
  standard: {
    chargeInside: siteConfig.deliveryChargeInsideDhaka,
    chargeOutside: siteConfig.deliveryChargeOutsideDhaka,
    timeInsideBn: siteConfig.deliveryTimeInsideBn,
    timeOutsideBn: siteConfig.deliveryTimeOutsideBn,
    customDelivery: false,
  },
  large: {
    chargeInside: 1000,
    chargeOutside: 2000,
    timeInsideBn: siteConfig.deliveryTimeInsideBn,
    timeOutsideBn: siteConfig.deliveryTimeOutsideBn,
    customDelivery: true,
    noteBn:
      "বড় Furniture (ওয়ারড্রোব, ডাইনিং সেট, বেড) — পিকআপ ভ্যান, ফ্লোর ও দূরত্ব অনুযায়ী ডেলিভারি চার্জ পরিবর্তিত হতে পারে।",
  },
  small: {
    chargeInside: 300,
    chargeOutside: 600,
    timeInsideBn: "২–৪ কর্মদিবস",
    timeOutsideBn: "৪–৭ কর্মদিবস",
    customDelivery: false,
  },
};

/* -------------------------------- Room fit -------------------------------- */
export const ROOM_FIT: Record<string, RoomFit[]> = {
  sofaThree: [
    { labelBn: "ছোট বসার ঘর", level: "suitable", noteBn: "৯ × ১১ ফুট ঘরে আরামে বসে" },
    { labelBn: "মাঝারি বসার ঘর", level: "suitable", noteBn: "সবচেয়ে ভালো মানায়" },
    { labelBn: "বড় বসার ঘর", level: "suitable", noteBn: "Center Table-এর সঙ্গে দারুণ লাগে" },
  ],
  sofaLarge: [
    { labelBn: "ছোট বসার ঘর", level: "moderate", noteBn: "জায়গা একটু টাইট লাগতে পারে" },
    { labelBn: "মাঝারি বসার ঘর", level: "suitable" },
    { labelBn: "বড় বসার ঘর", level: "suitable", noteBn: "L-shape-এর জন্য আদর্শ" },
  ],
  sofaCompact: [
    { labelBn: "ছোট বসার ঘর", level: "suitable", noteBn: "ছোট জায়গার জন্য বিশেষভাবে তৈরি" },
    { labelBn: "মাঝারি বসার ঘর", level: "suitable" },
    { labelBn: "বড় বসার ঘর", level: "moderate", noteBn: "বড় ঘরে ছোট লাগতে পারে" },
  ],
  bedQueen: [
    { labelBn: "মাঝারি শোবার ঘর", level: "suitable" },
    { labelBn: "বড় শোবার ঘর", level: "suitable" },
    { labelBn: "ছোট শোবার ঘর", level: "moderate", noteBn: "Wardrobe-এর জায়গা একটু কমে যাবে" },
  ],
  bedKing: [
    { labelBn: "বড় শোবার ঘর", level: "suitable", noteBn: "১২ × ১৪ ফুট ঘরে সেরা" },
    { labelBn: "মাঝারি শোবার ঘর", level: "moderate" },
    { labelBn: "ছোট শোবার ঘর", level: "not-suitable", noteBn: "জায়গা যথেষ্ট হবে না" },
  ],
  wardrobe: [
    { labelBn: "মাঝারি শোবার ঘর", level: "suitable" },
    { labelBn: "বড় শোবার ঘর", level: "suitable" },
    { labelBn: "ছোট শোবার ঘর", level: "moderate", noteBn: "দরজা খোলার জায়গা রাখতে হবে" },
  ],
  wardrobeCompact: [
    { labelBn: "ছোট শোবার ঘর", level: "suitable", noteBn: "কম জায়গায় বেশি স্টোরেজ" },
    { labelBn: "ভাড়া বাসা", level: "suitable" },
    { labelBn: "হোস্টেল রুম", level: "suitable" },
  ],
  diningSix: [
    { labelBn: "৬–৮ জনের পরিবার", level: "suitable" },
    { labelBn: "মাঝারি ডাইনিং স্পেস", level: "suitable" },
    { labelBn: "ছোট ডাইনিং স্পেস", level: "not-suitable", noteBn: "চেয়ার সরানোর জায়গা লাগবে" },
  ],
  diningFour: [
    { labelBn: "ছোট ডাইনিং স্পেস", level: "suitable" },
    { labelBn: "ফ্ল্যাট ডাইনিং এরিয়া", level: "suitable" },
    { labelBn: "বড় ডাইনিং রুম", level: "moderate" },
  ],
  officeDesk: [
    { labelBn: "হোম অফিস", level: "suitable" },
    { labelBn: "ছোট অফিস", level: "suitable" },
    { labelBn: "কর্পোরেট অফিস", level: "suitable" },
  ],
  officeCompact: [
    { labelBn: "ছোট হোম অফিস", level: "suitable" },
    { labelBn: "বারান্দার কাজের কোণ", level: "suitable" },
    { labelBn: "শেয়ার্ড রুম", level: "suitable" },
  ],
  chair: [
    { labelBn: "হোম অফিস", level: "suitable" },
    { labelBn: "অফিস ওয়ার্কস্টেশন", level: "suitable" },
    { labelBn: "ডাইনিং/স্টাডি টেবিল", level: "suitable" },
  ],
  storage: [
    { labelBn: "ছোট জায়গা", level: "suitable" },
    { labelBn: "বারান্দা", level: "suitable" },
    { labelBn: "স্টোর রুম", level: "suitable" },
  ],
  decor: [
    { labelBn: "বসার ঘর", level: "suitable" },
    { labelBn: "বারান্দা", level: "suitable" },
    { labelBn: "বেডরুম", level: "suitable" },
  ],
};

/* --------------------------------- Reviews -------------------------------- */
/**
 * ডেমো রিভিউ পুল — বিভাগ অনুযায়ী।
 * এগুলো কাল্পনিক ডেমো রিভিউ, verified purchase নয়।
 */
export const REVIEW_POOL: Record<string, CustomerReview[]> = {
  "living-room": [
    {
      id: "lr-1",
      nameBn: "সাদিয়া আফরিন",
      locationBn: "উত্তরা, ঢাকা",
      rating: 5,
      dateBn: "১২ আগস্ট, ২০২৫",
      textBn: "ছবির সঙ্গে Furniture-এর বাস্তব look অনেক সুন্দর মিলেছে। কাপড়ের মান আর সেলাই খুব পরিপাটি।",
    },
    {
      id: "lr-2",
      nameBn: "রাকিবুল হাসান",
      locationBn: "আগ্রাবাদ, চট্টগ্রাম",
      rating: 5,
      dateBn: "২৮ জুলাই, ২০২৫",
      textBn: "মাপ এবং Material-এর তথ্য আগে থেকেই পরিষ্কার ছিল, তাই ঘরে আনার আগেই বুঝে নিতে পেরেছি।",
    },
    {
      id: "lr-3",
      nameBn: "ফারহানা রহমান",
      locationBn: "ধানমন্ডি, ঢাকা",
      rating: 4,
      dateBn: "৯ সেপ্টেম্বর, ২০২৫",
      textBn: "ডেলিভারি ঠিক সময়ে পেয়েছি, টিম নিজে থেকেই বসিয়ে দিয়েছে। একটু বেশি দাম মনে হলেও মান ভালো।",
    },
    {
      id: "lr-4",
      nameBn: "তানভীর আহমেদ",
      locationBn: "উপশহর, সিলেট",
      rating: 5,
      dateBn: "১৭ সেপ্টেম্বর, ২০২৫",
      textBn: "অনলাইনে Furniture কেনার সময় সবচেয়ে বেশি ভয় ছিল সাইজ নিয়ে — এখানে মাপের ছবি দেখে সমস্যা হয়নি।",
    },
    {
      id: "lr-5",
      nameBn: "মেহেদী হাসান",
      locationBn: "মিরপুর, ঢাকা",
      rating: 5,
      dateBn: "৩ জুন, ২০২৫",
      textBn: "ওয়ালনাট finish-টা খুব প্রিমিয়াম দেখায়। দুই মাস ব্যবহার করে কোনো সমস্যা পাইনি।",
    },
  ],
  bedroom: [
    {
      id: "br-1",
      nameBn: "নুসরাত জাহান",
      locationBn: "বসুন্ধরা, ঢাকা",
      rating: 5,
      dateBn: "২১ আগস্ট, ২০২৫",
      textBn: "বেডের কাঠ বেশ শক্ত আর ভারী। কোনো ঝাঁকুনি নেই, একদম নিরিবিলি ঘুম হচ্ছে।",
    },
    {
      id: "br-2",
      nameBn: "আশরাফুল ইসলাম",
      locationBn: "গুলশান, ঢাকা",
      rating: 5,
      dateBn: "৫ সেপ্টেম্বর, ২০২৫",
      textBn: "Wardrobe-এর ভেতরের ভাগ খুব কাজের — শাড়ি, শার্ট, ব্যাগ সব আলাদা রাখা যায়।",
    },
    {
      id: "br-3",
      nameBn: "শারমিন সুলতানা",
      locationBn: "কাজলার চর, রাজশাহী",
      rating: 4,
      dateBn: "১৪ জুলাই, ২০২৫",
      textBn: "ঢাকার বাইরে ডেলিভারি পেতে কিছুটা সময় লেগেছে, তবে প্যাকিং একদম সুরক্ষিত ছিল।",
    },
    {
      id: "br-4",
      nameBn: "ইমরান কবির",
      locationBn: "মোহাম্মদপুর, ঢাকা",
      rating: 5,
      dateBn: "৩০ জুন, ২০২৫",
      textBn: "Solid wood কাঠামো হওয়ায় দাম একটু বেশি, কিন্তু দীর্ঘ মেয়াদে এটাই সঠিক সিদ্ধান্ত মনে হচ্ছে।",
    },
    {
      id: "br-5",
      nameBn: "রুবিনা আক্তার",
      locationBn: "চকবাজার, কুমিল্লা",
      rating: 5,
      dateBn: "১১ সেপ্টেম্বর, ২০২৫",
      textBn: "ড্রেসিং টেবিলটির মিরর আর ড্রয়ার মান ভালো। ছবিতে যেমন, বাস্তবে তার চেয়েও সুন্দর।",
    },
  ],
  dining: [
    {
      id: "dn-1",
      nameBn: "পরিবার হক",
      locationBn: "বনানী, ঢাকা",
      rating: 5,
      dateBn: "১৯ আগস্ট, ২০২৫",
      textBn: "৬ সিটের সেটটায় পুরো পরিবার একসঙ্গে বসতে পারে। টপের ফিনিশ খুব মসৃণ।",
    },
    {
      id: "dn-2",
      nameBn: "সাব্বির রহমান",
      locationBn: "চান্দগাঁও, চট্টগ্রাম",
      rating: 4,
      dateBn: "২ সেপ্টেম্বর, ২০২৫",
      textBn: "চেয়ারগুলো হালকা কিন্তু মজবুত। কাঠের কাজ পরিষ্কার হয়েছে, কোনো rough edge নেই।",
    },
    {
      id: "dn-3",
      nameBn: "সালমা বেগম",
      locationBn: "টাঙ্গাইল সদর",
      rating: 5,
      dateBn: "২৭ জুলাই, ২০২৫",
      textBn: "দামের তুলনায় মান অনেক ভালো। পরিবারের সবাই খুশি, দ্বিতীয়বার নেওয়ার কথা ভাবছি।",
    },
    {
      id: "dn-4",
      nameBn: "জাহিদ হোসেন",
      locationBn: "উত্তরা, ঢাকা",
      rating: 5,
      dateBn: "৮ সেপ্টেম্বর, ২০২৫",
      textBn: "গ্লাস টপ নয়, তাই ছোট বাচ্চা থাকলেও নিশ্চিন্ত। পরিষ্কার করাও সহজ।",
    },
  ],
  office: [
    {
      id: "of-1",
      nameBn: "আরিফুল ইসলাম",
      locationBn: "বনানী, ঢাকা",
      rating: 5,
      dateBn: "২৩ আগস্ট, ২০২৫",
      textBn: "ওয়ার্ক ডেস্কের উচ্চতা একদম ঠিক, ঘণ্টার পর ঘণ্টা কাজ করেও পিঠে চাপ লাগে না।",
    },
    {
      id: "of-2",
      nameBn: "লামিয়া চৌধুরী",
      locationBn: "মহাখালী, ঢাকা",
      rating: 5,
      dateBn: "১ সেপ্টেম্বর, ২০২৫",
      textBn: "কেবল ম্যানেজমেন্ট খুব গোছানো। হোম অফিসের জন্য দুর্দান্ত একটা সমাধান।",
    },
    {
      id: "of-3",
      nameBn: "শাহরিয়ার কবির",
      locationBn: "বগুড়া সদর",
      rating: 4,
      dateBn: "১৫ জুলাই, ২০২৫",
      textBn: "চেয়ারটার lumbar support ভালো, তবে armrest একটু নরম মনে হয়েছে।",
    },
    {
      id: "of-4",
      nameBn: "নাফিসা তাবাসসুম",
      locationBn: "সিলেট সদর",
      rating: 5,
      dateBn: "৬ সেপ্টেম্বর, ২০২৫",
      textBn: "ছোট রুমে কম জায়গা নিয়ে অনেক কাজ হয় — এই ডেস্কটাই দরকার ছিল।",
    },
  ],
  storage: [
    {
      id: "st-1",
      nameBn: "হাসিবুল হক",
      locationBn: "কামরাঙ্গীরচর, ঢাকা",
      rating: 5,
      dateBn: "২৫ আগস্ট, ২০২৫",
      textBn: "কম জায়গায় অনেক জিনিস রাখা যাচ্ছে। ছোট বাসার জন্য একেবারে ঠিক।",
    },
    {
      id: "st-2",
      nameBn: "তাসনিম আক্তার",
      locationBn: "নারায়ণগঞ্জ সদর",
      rating: 4,
      dateBn: "১২ সেপ্টেম্বর, ২০২৫",
      textBn: "একসাথে বসানো সহজ ছিল, স্ক্রু আর টুলস সব প্যাকেটে ছিল।",
    },
    {
      id: "st-3",
      nameBn: "কামরুল ইসলাম",
      locationBn: "খুলনা সদর",
      rating: 5,
      dateBn: "২৯ জুলাই, ২০২৫",
      textBn: "বারান্দায় জুতা রাখতে বেশি ভালো লাগছে, ধুলা-ময়লা জমে না।",
    },
    {
      id: "st-4",
      nameBn: "আফসানা মিমি",
      locationBn: "ময়মনসিংহ সদর",
      rating: 5,
      dateBn: "৯ সেপ্টেম্বর, ২০২৫",
      textBn: "শেলফগুলো ভারী জিনিস রাখলেও নিচে বসে যায় না — স্টিল ফ্রেমটা মজবুত।",
    },
  ],
  "home-decor": [
    {
      id: "hd-1",
      nameBn: "রিয়া ইসলাম",
      locationBn: "বারিধারা, ঢাকা",
      rating: 5,
      dateBn: "২০ আগস্ট, ২০২৫",
      textBn: "আয়নাটি বসার ঘরের দেয়ালে লাগিয়ে ঘরের পরিবেশ পুরো বদলে গেছে।",
    },
    {
      id: "hd-2",
      nameBn: "শুভ্র দাস",
      locationBn: "আগ্রাবাদ, চট্টগ্রাম",
      rating: 4,
      dateBn: "২ সেপ্টেম্বর, ২০২৫",
      textBn: "ফিনিশ সামঞ্জস্যপূর্ণ। দেয়ালে লাগানোর ফিটিংসও দিয়েছে, বাড়তি কিছু কিনতে হয়নি।",
    },
    {
      id: "hd-3",
      nameBn: "মারিয়া খান",
      locationBn: "উত্তরা, ঢাকা",
      rating: 5,
      dateBn: "১১ সেপ্টেম্বর, ২০২৫",
      textBn: "ছোট একটা বারান্দা বসার জায়গা হয়ে গেছে — Quality আর comfort দুটোই ভালো।",
    },
    {
      id: "hd-4",
      nameBn: "সাকিব নূর",
      locationBn: "রংপুর সদর",
      rating: 5,
      dateBn: "২ জুন, ২০২৫",
      textBn: "দাম কম কিন্তু দেখতে বাজেটের মনে হয় না। ডেকোরের জন্য দারুণ।",
    },
  ],
};

const DEPARTMENT_KEYS = Object.keys(REVIEW_POOL);

/** পণ্যের জন্য deterministic ভাবে ডেমো রিভিউ বেছে নেওয়া */
export function pickReviews(
  departmentKey: string,
  seed: number,
  count = 3,
): CustomerReview[] {
  const pool = REVIEW_POOL[departmentKey] ?? REVIEW_POOL[DEPARTMENT_KEYS[0]];
  const reviews: CustomerReview[] = [];
  for (let index = 0; index < count; index += 1) {
    const review = pool[(seed + index * 2 + 1) % pool.length];
    if (!reviews.some((item) => item.id === review.id)) {
      reviews.push(review);
    }
  }
  let cursor = 0;
  while (reviews.length < count && cursor < pool.length) {
    const review = pool[cursor];
    if (!reviews.some((item) => item.id === review.id)) reviews.push(review);
    cursor += 1;
  }
  return reviews;
}
