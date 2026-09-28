import type { Metadata } from "next";
import Link from "next/link";
import { getAllCollections } from "@/lib/collections";
import { ProductImage, SectionHeading } from "@/components/ui/primitives";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Complete Room Collection — পুরো ঘরের জন্য একসাথে",
  description:
    "Modern Living Room, Complete Bedroom, Family Dining Set ও Home Office Setup — মিলিয়ে নেওয়া Collection, একসাথে নিলে ১২% পর্যন্ত সাশ্রয়।",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  const collections = getAllCollections();

  return (
    <>
      <section className="bg-linen py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <span className="eyebrow">Complete Collection</span>
          <h1 className="section-title mt-3">পুরো ঘরের জন্য একসাথে</h1>
          <p className="section-sub mt-3">
            একটি Collection-এ সেই ঘরের সব প্রয়োজনীয় Furniture — মিলিয়ে নেওয়া ফিনিশ ও কালারে।
            একসাথে নিলে আলাদা কেনার চেয়ে সাশ্রয়, এবং ঘরের লুকও থাকে সামঞ্জস্যপূর্ণ।
          </p>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {collections.map((collection) => (
            <article
              key={collection.id}
              className="overflow-hidden rounded-md border border-ink/8 bg-white transition hover:shadow-card"
            >
              <Link href={`/collections/${collection.slug}`} className="block">
                <ProductImage
                  src={collection.image}
                  alt={collection.titleBn}
                  className="aspect-[16/9] w-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </Link>
              <div className="p-5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-brass">
                  {collection.accent}
                </p>
                <h2 className="mt-1.5 font-display text-xl font-semibold">
                  <Link href={`/collections/${collection.slug}`} className="hover:text-brass-dark">
                    {collection.titleBn}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {collection.descriptionBn}
                </p>

                <ul className="mt-4 space-y-2 text-xs text-ink-soft">
                  {collection.products.map((product) => (
                    <li key={product.id} className="flex items-center justify-between gap-3">
                      <Link href={`/product/${product.slug}`} className="hover:text-ink">
                        • {product.name}
                      </Link>
                      <span className="tabular-nums text-ink-muted">
                        {formatPrice(product.price)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-end justify-between gap-4 border-t border-ink/8 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-ink-muted">
                      একসাথে নিলে দাম
                    </p>
                    <p className="flex items-baseline gap-2">
                      <span className="font-display text-xl font-semibold">
                        {formatPrice(collection.bundlePrice)}
                      </span>
                      <span className="text-xs text-ink-muted line-through">
                        {formatPrice(collection.originalPrice)}
                      </span>
                    </p>
                    <p className="text-[11px] font-medium text-success">
                      সাশ্রয় {formatPrice(collection.savings)}
                    </p>
                  </div>
                  <Link href={`/collections/${collection.slug}`} className="btn btn-primary btn-sm">
                    Collection দেখুন
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-12">
        <SectionHeading
          eyebrow="Custom"
          title="নিজের Collection বানাতে চান?"
          subtitle="আপনার ঘরের মাপ ও পছন্দ অনুযায়ী Furniture বেছে নিয়ে একটি কাস্টম Collection তৈরি করে দেওয়া যায়।"
        />
      </section>
    </>
  );
}
