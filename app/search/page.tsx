import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ShopView } from "@/components/shop/shop-view";
import { allProducts, popularSearchesBn } from "@/lib/products";

export const metadata: Metadata = {
  title: "পণ্য খুঁজুন — বাংলা ও English Keyword",
  description:
    "Sofa, Bed, Dining Table, Wardrobe, Office Table, Shoe Rack — বাংলা বা English যেভাবে খুঁজতে চান, WOODORA-তে সহজেই পেয়ে যাবেন।",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="container-page py-10">
            <div className="h-8 w-72 animate-pulse rounded bg-sand" />
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="shimmer aspect-[4/5] w-full rounded-md" />
              ))}
            </div>
          </div>
        }
      >
        <ShopView
          products={allProducts}
          title="পণ্য খুঁজুন"
          subtitle="বাংলা বা English — দুই ভাষাতেই খুঁজতে পারবেন। যেমন: “সোফা”, “Bed”, “ডাইনিং টেবিল”, “Shoe Rack”।"
        />
      </Suspense>

      <section className="border-t border-ink/8 bg-linen py-10">
        <div className="container-page">
          <h2 className="text-sm font-semibold text-ink">জনপ্রিয় খোঁজ</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {popularSearchesBn.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-full border border-ink/12 bg-white px-3.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-ink/30 hover:text-ink"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
