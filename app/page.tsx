import Link from "next/link";
import { Hero } from "@/components/home/hero";
import {
  AgencyCtaBand,
  CategorySections,
  CollectionsSection,
  DepartmentsStrip,
  FeaturedSection,
  OffersSection,
  ReviewsSection,
  RoomShoppingSection,
  SmallSpaceSection,
  TrustStrip,
} from "@/components/home/sections";
import { getFeaturedProducts, getOfferProducts, getNewArrivals, totalProductCount } from "@/lib/products";
import { ProductImage, SectionHeading } from "@/components/ui/primitives";
import { ProductCard } from "@/components/product/product-card";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const featured = getFeaturedProducts(16);
  const offers = getOfferProducts(4);
  const newArrivals = getNewArrivals(4);

  return (
    <>
      <Hero />
      <TrustStrip />
      <CategorySections />
      <FeaturedSection products={featured} />
      <RoomShoppingSection />

      {/* -------------------------- New arrivals -------------------------- */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="নতুন এসেছে"
          title="নতুন Collection"
          subtitle="সম্প্রতি যুক্ত হওয়া ডিজাইন — নতুনত্ব পছন্দ হলে এখান থেকেই শুরু করুন।"
          action={
            <Link href="/shop?sort=newest" className="btn btn-outline btn-sm">
              নতুন সব পণ্য
            </Link>
          }
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <OffersSection products={offers} />
      <CollectionsSection />
      <SmallSpaceSection />
      <DepartmentsStrip />

      {/* -------------------------- Shopping help -------------------------- */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="কেন WOODORA"
          title="অনলাইনে Furniture কেনা এখন নিশ্চিন্ত"
          subtitle="যা দেখছেন, ঠিক সেটাই পাবেন — প্রতিটি পণ্যের মাপ, Material, Delivery ও Warranty আগেই জানা যায়।"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              titleBn: "সব তথ্য আগেই পরিষ্কার",
              descriptionBn:
                "দাম, মাপ, উপকরণ, কালার অপশন, ডেলিভারি চার্জ ও ওয়ারেন্টি — সিদ্ধান্ত নেওয়ার আগেই সব জানা যায়।",
              image: "/images/scenes/detail-wood-grain.jpg",
            },
            {
              titleBn: "ঘরে বসিয়ে দেখার অনুভূতি",
              descriptionBn:
                "প্রতিটি পণ্যের ‘ঘরে কেমন দেখাবে’ সেকশনে বাস্তব রুম সেটআপ — কল্পনা করতে আর অসুবিধা নেই।",
              image: "/images/hero-living-room.jpg",
            },
            {
              titleBn: "অর্ডার থেকে ইনস্টলেশন",
              descriptionBn:
                "অর্ডার করার পর ডেলিভারি, ইনস্টলেশন ও ওয়ারেন্টি — পুরো প্রক্রিয়া সহজ ও পরিষ্কার।",
              image: "/images/scenes/office-scene.jpg",
            },
          ].map((item) => (
            <article key={item.titleBn} className="overflow-hidden rounded-md border border-ink/8 bg-white">
              <ProductImage
                src={item.image}
                alt={item.titleBn}
                className="aspect-[16/10] w-full"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="p-5">
                <h3 className="text-base font-semibold">{item.titleBn}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.descriptionBn}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ReviewsSection />

      {/* -------------------------- Demo stats -------------------------- */}
      <section className="bg-linen py-12">
        <div className="container-page grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[
            { value: `${totalProductCount}+`, labelBn: "ডেমো পণ্য" },
            { value: "৬", labelBn: "ক্যাটাগরি" },
            { value: "৬৪", labelBn: "জেলা ডেলিভারি" },
            { value: "৭ দিন", labelBn: "রিটার্ন সুবিধা" },
          ].map((item) => (
            <div key={item.labelBn}>
              <p className="font-display text-3xl font-semibold text-ink">{item.value}</p>
              <p className="mt-1 text-xs text-ink-muted">{item.labelBn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------- Delivery info -------------------------- */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-6 rounded-lg border border-ink/8 bg-white p-6 md:grid-cols-3 md:p-9">
          <div>
            <span className="eyebrow">ডেলিভারি তথ্য</span>
            <h2 className="section-title mt-3 text-2xl">সারা বাংলাদেশে ডেলিভারি</h2>
            <p className="section-sub mt-3">
              Furniture সাইজ অনুযায়ী ডেলিভারি চার্জ পরিবর্তিত হতে পারে। বড় পণ্যের জন্য আমাদের টিম
              আলাদা ভাবে যোগাযোগ করে কনফার্ম করবে।
            </p>
            <p className="mt-4 text-xs text-ink-muted">{siteConfig.deliveryChargeCustomNoteBn}</p>
          </div>
          <div className="md:col-span-2">
            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  titleBn: "ঢাকার মধ্যে",
                  price: formatPrice(siteConfig.deliveryChargeInsideDhaka),
                  time: siteConfig.deliveryTimeInsideBn,
                },
                {
                  titleBn: "ঢাকার বাইরে",
                  price: `${formatPrice(siteConfig.deliveryChargeOutsideDhaka)}+`,
                  time: siteConfig.deliveryTimeOutsideBn,
                },
              ].map((item) => (
                <div key={item.titleBn} className="rounded-md border border-ink/8 bg-cream/60 p-4">
                  <dt className="text-sm font-semibold">{item.titleBn}</dt>
                  <dd className="mt-1 font-display text-xl font-semibold text-brass-dark">
                    {item.price}
                  </dd>
                  <dd className="mt-1 text-xs text-ink-muted">{item.time}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/support#delivery" className="btn btn-outline btn-sm">
                বিস্তারিত ডেলিভারি তথ্য
              </Link>
              <Link href="/support#warranty" className="btn btn-outline btn-sm">
                ওয়ারেন্টি ও রিটার্ন
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AgencyCtaBand />
    </>
  );
}
