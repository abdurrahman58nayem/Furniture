import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopView } from "@/components/shop/shop-view";
import { allProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "সব Furniture — দাম, মাপ ও Material সহ",
  description:
    "WOODORA-র সব Furniture একসঙ্গে দেখুন — Sofa, Bed, Dining, Wardrobe, Office Furniture ও Storage। দাম, মাপ, Material, ডেলিভারি চার্জ ও ওয়ারেন্টি ফিল্টার করে খুঁজুন।",
  alternates: { canonical: "/shop" },
};

function ShopFallback() {
  return (
    <div className="container-page py-10">
      <div className="h-8 w-64 animate-pulse rounded bg-sand" />
      <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-sand" />
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="shimmer aspect-[4/5] w-full rounded-md" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-sand" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-sand" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopView
        products={allProducts}
        title="সব Furniture"
        subtitle="পুরো সংগ্রহ একসঙ্গে — ক্যাটাগরি, দাম, Material, কালার, মাপ ও স্টক অনুযায়ী ফিল্টার করে আপনার Furniture খুঁজে নিন।"
      />
      {/* SEO-এর জন্য স্ট্যাটিক কনটেন্ট — ডেমো তথ্য */}
      <section className="border-t border-ink/8 bg-linen py-10">
        <div className="container-page max-w-3xl text-sm leading-relaxed text-ink-soft">
          <h2 className="font-display text-xl font-semibold text-ink">
            অনলাইনে Furniture কেনার আগে যা দেখে নেওয়া দরকার
          </h2>
          <p className="mt-3">
            {siteConfig.brandName}-তে প্রতিটি পণ্যের সঙ্গে দাম, মাপ (দৈর্ঘ্য × প্রস্থ × উচ্চতা),
            Material, কালার অপশন, ডেলিভারি চার্জ, Installation ও ওয়ারেন্টি তথ্য দেওয়া আছে। তাই ঘরে
            আনার আগেই আপনি নিশ্চিত হতে পারবেন — কোনটা আপনার জায়গায় ফিট হবে, কত পড়বে এবং কত দিনে
            পৌঁছাবে।
          </p>
          <p className="mt-3">
            ঢাকার মধ্যে ডেলিভারি {siteConfig.deliveryTimeInsideBn} এবং ঢাকার বাইরে{" "}
            {siteConfig.deliveryTimeOutsideBn}। বড় Furniture (ওয়ারড্রোব, ডাইনিং সেট, বেড) সাইজ
            অনুযায়ী Custom Delivery চার্জ প্রযোজ্য হতে পারে।
          </p>
        </div>
      </section>
    </Suspense>
  );
}
