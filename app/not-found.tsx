import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";

export default function NotFound() {
  const suggestions = getFeaturedProducts(4);

  return (
    <div className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-5xl font-semibold text-brass">৪০৪</p>
        <h1 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
          পেজটি খুঁজে পাওয়া গেল না
        </h1>
        <p className="section-sub mt-3">
          লিংকটি হয়তো পরিবর্তিত হয়েছে বা পেজটি সরিয়ে ফেলা হয়েছে। নিচের পণ্যগুলো দেখুন অথবা সার্চ
          করুন।
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary btn-sm">
            হোমে ফিরে যান
          </Link>
          <Link href="/shop" className="btn btn-outline btn-sm">
            সব Furniture দেখুন
          </Link>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl font-semibold">জনপ্রিয় Furniture</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {suggestions.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
