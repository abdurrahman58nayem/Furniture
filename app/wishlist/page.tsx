"use client";

import Link from "next/link";
import { useStore } from "@/components/providers/store-provider";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/ui/primitives";
import { allProducts } from "@/lib/products";

export default function WishlistPage() {
  const { wishlist, hydrated } = useStore();
  const products = allProducts.filter((product) => wishlist.includes(product.id));

  return (
    <div className="container-page py-10 md:py-14">
      <header className="max-w-2xl">
        <h1 className="font-display text-2xl font-semibold md:text-3xl">পছন্দের তালিকা</h1>
        <p className="section-sub mt-3">
          এখানে রাখা Furniture পরে দেখে নিতে পারেন। তালিকা আপনার ব্রাউজারে সংরক্ষিত (ডেমো)।
        </p>
      </header>

      <div className="mt-8">
        {!hydrated ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="shimmer aspect-[4/5] w-full rounded-md" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="পছন্দের তালিকা এখন খালি"
            description="পণ্যের কার্ডে ♡ আইকনে ক্লিক করে Furniture পছন্দের তালিকায় যোগ করুন।"
            action={
              <Link href="/shop" className="btn btn-primary btn-sm">
                Furniture দেখুন
              </Link>
            }
          />
        ) : (
          <>
            <p className="mb-5 text-xs text-ink-muted">{products.length} টি পণ্য সংরক্ষিত</p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
