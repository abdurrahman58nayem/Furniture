import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { DimensionDiagram, RoomFitSection, SpecificationsTable } from "@/components/product/dimension-diagram";
import { ProductGrid } from "@/components/product/product-card";
import {
  ProductImage,
  Reveal,
  SectionHeading,
  StarRating,
} from "@/components/ui/primitives";
import { getProductBySlug, getRelatedProducts, allProducts } from "@/lib/products";
import { departmentTitle, typeTitle } from "@/lib/catalog";
import { formatDimensions, formatPrice, toBanglaDigits } from "@/lib/format";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

/* ----------------------------- Static params ----------------------------- */
export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

/* ------------------------------- Metadata ------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "পণ্য পাওয়া যায়নি" };

  const title = `${product.name} — ${formatPrice(product.price)}`;
  const description = `${product.shortDescriptionBn} মাপ: ${formatDimensions(product.dimensions)} · Material: ${product.material.primary} · ${product.warranty.labelBn} · ${product.delivery.timeInsideBn}-এ ডেলিভারি।`;

  return {
    title,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} | ${siteConfig.brandName}`,
      description,
      images: [{ url: product.images[0], width: 1200, height: 1200, alt: product.name }],
      type: "website",
    },
  };
}

/* -------------------------------- Page -------------------------------- */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 8);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescriptionBn,
    image: product.images,
    brand: { "@type": "Brand", name: siteConfig.brandName },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BDT",
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-page pt-6 pb-28 lg:pb-16">
        <ProductDetail product={product} />
      </div>

      {/* --------------------------- উপকরণ --------------------------- */}
      <section className="border-y border-ink/8 bg-linen py-12 md:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div>
            <span className="eyebrow">উপকরণ ও ফিনিশ</span>
            <h2 className="section-title mt-3">কী দিয়ে তৈরি?</h2>
            <p className="section-sub mt-3">{product.descriptionBn}</p>

            <ul className="mt-5 grid gap-2 text-sm">
              {product.featuresBn.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 rounded-sm bg-white/70 px-3.5 py-2.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-success">
                    <path d="m5 13 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-ink-soft">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <dl className="divide-y divide-ink/8 overflow-hidden rounded-md border border-ink/8 bg-white">
              {[
                { labelBn: "Frame / মূল কাঠামো", valueBn: product.material.frame },
                { labelBn: "Board", valueBn: product.material.board },
                { labelBn: "Top", valueBn: product.material.top },
                { labelBn: "Fabric", valueBn: product.material.fabric },
                { labelBn: "Filling / Foam", valueBn: product.material.foam },
                { labelBn: "Finish", valueBn: product.finish },
                { labelBn: "Hardware", valueBn: product.material.hardware },
              ]
                .filter((item) => Boolean(item.valueBn))
                .map((item) => (
                  <div key={item.labelBn} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:justify-between sm:gap-6">
                    <dt className="text-xs font-medium text-ink-muted">{item.labelBn}</dt>
                    <dd className="text-sm font-medium text-ink sm:text-right">{item.valueBn}</dd>
                  </div>
                ))}
            </dl>
            <div className="mt-4 rounded-md border border-ink/8 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                পরিচর্যা
              </p>
              <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-ink-soft">
                {product.careBn.map((care) => (
                  <li key={care}>• {care}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- পণ্যের মাপ --------------------------- */}
      <section className="container-page py-12 md:py-16" id="dimensions">
        <SectionHeading
          eyebrow="পণ্যের মাপ"
          title="পণ্যের মাপ"
          subtitle="ঘরে আনার আগেই মাপ মিলিয়ে নিন — দৈর্ঘ্য, প্রস্থ ও উচ্চতা ইঞ্চিতে দেওয়া আছে।"
        />
        <div className="mt-6">
          <DimensionDiagram dimensions={product.dimensions} productName={product.name} />
        </div>
      </section>

      {/* --------------------------- কোন জায়গার জন্য --------------------------- */}
      <section className="bg-linen py-12 md:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="ঘরের উপযোগিতা"
            title="কোন জায়গার জন্য উপযুক্ত?"
            subtitle="ডেমো লজিক অনুযায়ী আপনার ঘরের আকারের সঙ্গে মিলিয়ে দেখুন।"
          />
          <div className="mt-6">
            <RoomFitSection roomFit={product.roomFit} />
          </div>
        </div>
      </section>

      {/* --------------------------- ঘরে কেমন দেখাবে --------------------------- */}
      <section className="container-page py-12 md:py-16">
        <SectionHeading
          eyebrow="ঘরে কেমন দেখাবে?"
          title="ঘরে কেমন দেখাবে?"
          subtitle="বাস্তব রুম সেটআপে দেখে নিন — সাইজ, প্রপোরশন ও কালার মিলিয়ে নেওয়া সহজ হবে।"
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-md border border-ink/8 bg-white">
              <ProductImage
                src={product.roomScene.image}
                alt={product.roomScene.captionBn}
                className="aspect-[16/10] w-full"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <p className="border-t border-ink/8 px-4 py-3 text-xs text-ink-muted">
                {product.roomScene.captionBn}
              </p>
            </div>
          </Reveal>
          <div className="rounded-md border border-ink/8 bg-cream/70 p-6">
            <h3 className="font-display text-xl font-semibold">আপনার ঘরে ফিট হবে?</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              ঘরের দৈর্ঘ্য-প্রস্থ মেপে নিন, তারপর দরজার প্রস্থও একবার দেখে নিন। Furniture ঢোকানোর সময়
              সাধারণত দরজার চেয়ে ২–৪ ইঞ্চি ছোট হওয়া দরকার।
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>• এই পণ্যের মাপ: {formatDimensions(product.dimensions)}</li>
              <li>• ওজন: প্রায় {toBanglaDigits(product.weightKg)} কেজি</li>
              <li>• 필요 জায়গা: সামনে অতিরিক্ত ১২–১৮ ইঞ্চি</li>
            </ul>
            <a
              href={whatsappUrl(
                `আসসালামু আলাইকুম। আমার ঘরের মাপ পাঠাতে চাই — "${product.name}" ফিট হবে কি না জানতে চাই।`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm mt-5"
            >
              ঘরের মাপ নিয়ে পরামর্শ নিন
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------- আপনার পছন্দ অনুযায়ী --------------------------- */}
      <section className="border-y border-ink/8 bg-wood-900 py-12 text-cream md:py-16">
        <div className="container-page grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <span className="eyebrow text-brass-light">
              <span className="h-px w-6 bg-brass-light/60" aria-hidden="true" />
              Customization
            </span>
            <h2 className="section-title mt-3 text-cream">আপনার পছন্দ অনুযায়ী তৈরি করুন</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/70">
              মাপ, কালার, ফ্যাব্রিক ও ফিনিশ — আপনার ঘরের সঙ্গে মিলিয়ে বানানো যায়। ডেমোতে অপশনগুলো
              দেখানো হয়েছে; বাস্তবে অর্ডারের সময় আমাদের টিম কনফার্ম করে।
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {[
                { label: "Size পরিবর্তন", enabled: product.customization.size },
                { label: "Color পরিবর্তন", enabled: product.customization.color },
                { label: "Fabric পরিবর্তন", enabled: product.customization.fabric },
                { label: "Finish পরিবর্তন", enabled: product.customization.finish },
                { label: "Custom Design", enabled: product.customization.customDesign },
              ].map((option) => (
                <li
                  key={option.label}
                  className={
                    option.enabled
                      ? "rounded-full border border-brass-light/50 bg-brass-light/12 px-3.5 py-1.5 text-xs font-medium text-brass-light"
                      : "rounded-full border border-cream/15 px-3.5 py-1.5 text-xs text-cream/35 line-through"
                  }
                >
                  {option.label}
                  {option.enabled ? " ✓" : ""}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-cream/60">
              কাস্টম অর্ডারের সময় লাগে: {product.customization.leadTimeBn}
            </p>
          </div>
          <div className="rounded-md border border-cream/12 bg-cream/[0.05] p-6">
            <p className="text-sm leading-relaxed text-cream/80">
              “আমার ঘরের জন্য আলাদা মাপে বানাতে চাই” — এটুকু লিখে WhatsApp-এ মেসেজ দিলেই আমাদের টিম
              সাথে সাথে যোগাযোগ করবে।
            </p>
            <a
              href={whatsappUrl(
                `আসসালামু আলাইকুম। আমি "${product.name}" কাস্টমাইজ করতে চাই (মাপ/কালার/ফ্যাব্রিক পরিবর্তন)।`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light btn-block mt-5"
            >
              কাস্টম অর্ডার সম্পর্কে জানতে মেসেজ করুন
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------- পণ্যের বিবরণ --------------------------- */}
      <section className="container-page py-12 md:py-16" id="specifications">
        <SectionHeading
          eyebrow="পণ্যের বিবরণ"
          title="পণ্যের বিবরণ"
          subtitle="প্রয়োজনীয় সব তথ্য একসঙ্গে — order করার আগে নিশ্চিত হয়ে নিন।"
        />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <SpecificationsTable specifications={product.specifications} />
          <div className="space-y-3">
            <div className="rounded-md border border-ink/8 bg-white p-4">
              <p className="text-sm font-semibold">ডেলিভারি সময়</p>
              <p className="mt-1 text-xs text-ink-soft">
                ঢাকার মধ্যে {product.delivery.timeInsideBn} · ঢাকার বাইরে{" "}
                {product.delivery.timeOutsideBn}
              </p>
            </div>
            <div className="rounded-md border border-ink/8 bg-white p-4">
              <p className="text-sm font-semibold">Installation</p>
              <p className="mt-1 text-xs text-ink-soft">{product.installation.labelBn}</p>
            </div>
            <div className="rounded-md border border-ink/8 bg-white p-4">
              <p className="text-sm font-semibold">ওয়ারেন্টি</p>
              <p className="mt-1 text-xs text-ink-soft">{product.warranty.labelBn}</p>
            </div>
            <div className="rounded-md border border-ink/8 bg-white p-4">
              <p className="text-sm font-semibold">রিটার্ন সুবিধা</p>
              <p className="mt-1 text-xs text-ink-soft">
                {siteConfig.returnDaysBn} — পণ্য হাতে পাওয়ার ৭ দিনের মধ্যে জানালে সমাধান করা হয়।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- ক্রেতাদের মতামত --------------------------- */}
      <section className="bg-linen py-12 md:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="ক্রেতাদের মতামত"
            title="ক্রেতাদের মতামত"
            subtitle="ডেমো রিভিউ — বাস্তব ক্রেতার যাচাইকৃত মতামত নয়।"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {product.reviews.map((review) => (
              <figure key={review.id} className="flex h-full flex-col rounded-md border border-ink/8 bg-white p-5">
                <StarRating rating={review.rating} />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  “{review.textBn}”
                </blockquote>
                <figcaption className="mt-4 border-t border-ink/8 pt-3 text-xs">
                  <span className="block font-semibold text-ink">{review.nameBn}</span>
                  <span className="block text-ink-muted">{review.locationBn}</span>
                  <span className="mt-0.5 block text-ink-muted">{review.dateBn}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- সম্পর্কিত পণ্য --------------------------- */}
      {related.length > 0 && (
        <section className="container-page py-12 md:py-16">
          <SectionHeading
            eyebrow="সম্পর্কিত"
            title="আপনার পছন্দ হতে পারে"
            subtitle={`${departmentTitle(product.department)}-এর সঙ্গে দারুণ মানায় এমন Furniture`}
            action={
              <Link href={`/category/${product.department}`} className="btn btn-outline btn-sm">
                {typeTitle(product.type)} সব দেখুন
              </Link>
            }
          />
          <div className="mt-6">
            <ProductGrid products={related} priorityCount={0} />
          </div>
        </section>
      )}
    </>
  );
}
