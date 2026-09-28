import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading, ProductImage } from "@/components/ui/primitives";
import { getOfferProducts, getBestSellers } from "@/lib/products";
import { discountPercent, formatPrice } from "@/lib/format";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "আজকের Furniture অফার ও ছাড়",
  description:
    "WOODORA-র চলমান Furniture অফার — Sofa, Bed, Dining Set ও Wardrobe-এ বিশেষ ছাড়, ডেমো অফার তালিকা।",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  const offers = getOfferProducts(12);
  const bestSellers = getBestSellers(4);

  return (
    <>
      {/* Offer hero */}
      <section className="relative isolate overflow-hidden bg-wood-900">
        <div className="absolute inset-0">
          <ProductImage
            src="/images/hero-living-room.jpg"
            alt="WOODORA অফার"
            className="h-full w-full"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
        </div>
        <div className="container-page relative py-12 md:py-16">
          <span className="eyebrow text-brass-light">
            <span className="h-px w-6 bg-brass-light/70" aria-hidden="true" />
            Limited Time Offer
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-cream md:text-4xl">
            আজকের Furniture অফার
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/80">
            নির্বাচিত Sofa, Bedroom Collection ও Dining Set-এ বিশেষ ছাড়। ডেমো ওয়েবসাইটে দেখানো
            অফারগুলো উপস্থাপনার জন্য তৈরি।
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#offers-grid" className="btn btn-light">
              অফার দেখুন
            </Link>
            <a
              href={whatsappUrl("আসসালামু আলাইকুম। চলমান অফার সম্পর্কে জানতে চাই (WOODORA Demo)।")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-cream/30 bg-cream/10 text-cream backdrop-blur-sm hover:bg-cream/20"
            >
              WhatsApp-এ জিজ্ঞাসা
            </a>
          </div>
        </div>
      </section>

      {/* Offer highlights */}
      <section className="border-b border-ink/8 bg-white py-8">
        <div className="container-page grid gap-4 sm:grid-cols-3">
          {[
            { titleBn: "নির্বাচিত Sofa-তে ১৫% ছাড়", detailBn: "Oslo, Milan ও Comfort সিরিজে" },
            { titleBn: "Bedroom Collection-এ বিশেষ মূল্য", detailBn: "Bed + Wardrobe একসাথে নিলে" },
            { titleBn: "Dining Set-এ বিশেষ অফার", detailBn: "৬ সিটার সেটে সর্বোচ্চ সাশ্রয়" },
          ].map((offer) => (
            <div key={offer.titleBn} className="rounded-md border border-ink/8 bg-cream/60 p-4">
              <p className="text-sm font-semibold text-ink">{offer.titleBn}</p>
              <p className="mt-1 text-xs text-ink-muted">{offer.detailBn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offers grid */}
      <section className="container-page py-12 md:py-16" id="offers-grid">
        <SectionHeading
          eyebrow="ছাড়"
          title="ছাড়ে পাওয়া যাচ্ছে"
          subtitle="সবচেয়ে বেশি সাশ্রয়ের পণ্যগুলো প্রথমে দেখানো হয়েছে।"
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {offers.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          ))}
        </div>
      </section>

      {/* Bundle offer */}
      <section className="bg-linen py-12 md:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Bundle"
            title="পুরো ঘর একসাথে — বেশি সাশ্রয়"
            subtitle="Collection একসাথে নিলে আলাদা কেনার চেয়ে ১২% পর্যন্ত কম দাম।"
            action={
              <Link href="/collections" className="btn btn-outline btn-sm">
                Collection দেখুন
              </Link>
            }
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group overflow-hidden rounded-md border border-ink/8 bg-white"
              >
                <ProductImage
                  src={product.images[0]}
                  alt={product.name}
                  className="aspect-square w-full"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  imageClassName="group-hover:scale-[1.04]"
                />
                <span className="block p-3">
                  <span className="block truncate text-sm font-semibold">{product.name}</span>
                  <span className="mt-1 flex items-baseline gap-2">
                    <span className="font-semibold">{formatPrice(product.price)}</span>
                    <span className="badge badge-discount">
                      -{discountPercent(product.price, product.originalPrice)}%
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <p className="text-center text-xs text-ink-muted">
          {siteConfig.agency.noticeFooterBn}
        </p>
      </section>
    </>
  );
}
