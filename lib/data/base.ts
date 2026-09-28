import type { CustomerReview, Product, Specification } from "@/lib/types";
import { formatDimensions, toBanglaDigits } from "@/lib/format";
import { pickReviews } from "@/lib/data/options";

/**
 * সব পণ্য একই factory দিয়ে তৈরি হয় — ফলে specifications, care, review
 * এমনকি SEO তথ্যও সব জায়গায় একই রকম থাকে এবং কখনো duplicate তথ্য লেখা লাগে না।
 */
export type ProductSeed = Omit<Product, "reviews" | "careBn" | "specifications"> & {
  careBn?: string[];
  extraSpecs?: Specification[];
  reviews?: CustomerReview[];
};

const DEFAULT_CARE_BN = [
  "নরম শুকনো কাপড় দিয়ে নিয়মিত ধুলা মুছুন।",
  "সরাসরি পানি বা ভেজা কাপড় দিয়ে মুছবেন না।",
  "সরাসরি রোদ, বৃষ্টি ও অতিরিক্ত আর্দ্রতা থেকে দূরে রাখুন।",
  "সরানোর সময় টেনে না সরিয়ে তুলে সরান — জয়েন্ট নিরাপদ থাকবে।",
];

/** পণ্যের সব তথ্য থেকে specification টেবিল তৈরি — একই সোর্স, কোনো duplicate নেই */
function buildSpecifications(seed: ProductSeed): Specification[] {
  const material = seed.material;
  const base: Specification[] = [
    { labelBn: "Material", valueBn: material.primary },
    ...(material.frame ? [{ labelBn: "Frame", valueBn: material.frame }] : []),
    ...(material.board ? [{ labelBn: "Board", valueBn: material.board }] : []),
    ...(material.top ? [{ labelBn: "Top", valueBn: material.top }] : []),
    ...(material.fabric ? [{ labelBn: "Fabric", valueBn: material.fabric }] : []),
    ...(material.foam ? [{ labelBn: "Filling", valueBn: material.foam }] : []),
    { labelBn: "Finish", valueBn: seed.finish },
    {
      labelBn: "Color",
      valueBn: seed.colors.map((color) => color.name).join(" / "),
    },
    { labelBn: "Size", valueBn: formatDimensions(seed.dimensions) },
    { labelBn: "ওজন", valueBn: `${toBanglaDigits(seed.weightKg)} কেজি (প্রায়)` },
    { labelBn: "Assembly", valueBn: seed.assemblyBn },
    { labelBn: "Warranty", valueBn: seed.warranty.labelBn },
    ...(material.hardware ? [{ labelBn: "Hardware", valueBn: material.hardware }] : []),
    ...(seed.extraSpecs ?? []),
  ];
  return base;
}

export function makeProduct(seed: ProductSeed): Product {
  const seedIndex = seed.slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return {
    ...seed,
    careBn: seed.careBn ?? DEFAULT_CARE_BN,
    specifications: buildSpecifications(seed),
    reviews: seed.reviews ?? pickReviews(seed.department, seedIndex, 3),
  };
}
