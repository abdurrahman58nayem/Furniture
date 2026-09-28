import { siteConfig } from "@/lib/site-config";

/** ৳ ৫২,০০০ স্টাইলে দাম — বাংলাদেশি E-commerce স্ট্যান্ডার্ড (English digits)। */
export function formatPrice(value: number): string {
  return `৳${formatNumber(value)}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(value),
  );
}

/** বাংলা সংখ্যা — যেখানে বাংলা লেখার ভেতরে সংখ্যা দেখানো দরকার */
export function toBanglaDigits(value: number | string): string {
  const map = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(value).replace(/\d/g, (digit) => map[Number(digit)]);
}

export function discountPercent(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/** "৭৮ × ৩৪ × ৩২ inch" (দৈর্ঘ্য × প্রস্থ × উচ্চতা) */
export function formatDimensions(dim: {
  length: number;
  width: number;
  height: number;
  unit: string;
}): string {
  return `${dim.length} × ${dim.width} × ${dim.height} ${dim.unit}`;
}

export function formatDimensionsBn(dim: {
  length: number;
  width: number;
  height: number;
  unit: string;
}): string {
  return `${toBanglaDigits(dim.length)} × ${toBanglaDigits(dim.width)} × ${toBanglaDigits(
    dim.height,
  )} ${dim.unit}`;
}

/** Delivery charge টেক্সট */
export function deliveryChargeLabel(charge: number): string {
  return charge === 0 ? "ফ্রি" : formatPrice(charge);
}

export function estimatedDeliveryBn(zone: "inside" | "outside"): string {
  return zone === "inside"
    ? siteConfig.deliveryTimeInsideBn
    : siteConfig.deliveryTimeOutsideBn;
}

/** প্রতি ইউনিট ডেলিভারি চার্জ zone অনুযায়ী */
export function deliveryChargeFor(
  zone: "inside" | "outside",
  product?: { delivery?: { chargeInside: number; chargeOutside: number } },
): number {
  if (!product?.delivery) {
    return zone === "inside"
      ? siteConfig.deliveryChargeInsideDhaka
      : siteConfig.deliveryChargeOutsideDhaka;
  }
  return zone === "inside" ? product.delivery.chargeInside : product.delivery.chargeOutside;
}

/** ৮ ডিজিটের ডেমো বাংলা তারিখ */
export function todayBn(): string {
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function orderNumber(): string {
  const serial = Math.floor(10000 + Math.random() * 89999);
  return `#WOD-${serial}`;
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** বাংলা/English মিশ্রিত নাম থেকে initials */
export function initialsOf(value: string): string {
  const parts = value.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}
