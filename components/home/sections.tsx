import Link from "next/link";
import Image from "next/image";
import { ProductImage } from "@/components/ui/primitives";
import { ProductCard } from "@/components/product/product-card";
import { Reveal, SectionHeading, StarRating } from "@/components/ui/primitives";
import { departments, getDepartment, rooms } from "@/lib/catalog";
import { getAllCollections } from "@/lib/collections";
import { getSmallSpaceProducts } from "@/lib/products";
import type { Product } from "@/lib/types";
import { discountPercent, formatDimensions, formatPrice } from "@/lib/format";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

/* ==========================================================================
   হোমপেজের সেকশনগুলো — প্রতিটি সেকশন reusable
   ========================================================================== */

/* ------------------------------ Trust strip ------------------------------ */
export function TrustStrip() {
  const items = [
    {
      titleBn: "মানসম্মত উপকরণ",
      subtitleBn: "নির্বাচিত Material",
      icon: (
        <path d="M4 7.5 12 4l8 3.5-8 3.5zM4 12.5 12 16l8-3.5M4 17l8 3.5 8-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      ),
    },
    {
      titleBn: "সারা দেশে ডেলিভারি",
      subtitleBn: "বাংলাদেশজুড়ে",
      icon: (
        <>
          <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="7" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="17" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.4" />
        </>
      ),
    },
    {
      titleBn: "নিরাপদ অর্ডার",
      subtitleBn: "সহজ অর্ডার প্রক্রিয়া",
      icon: (
        <path d="M12 3.5 5.5 6v5.5c0 4 2.8 7.4 6.5 9 3.7-1.6 6.5-5 6.5-9V6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      ),
    },
    {
      titleBn: "বিক্রয়োত্তর সহায়তা",
      subtitleBn: "প্রয়োজনে যোগাযোগ করুন",
      icon: (
        <path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-2v-6h4M4 13h4v6H6a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      ),
    },
  ];

  return (
    <section className="border-y border-ink/8 bg-white">
      <div className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-8 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.titleBn} delay={index * 60} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-linen text-wood-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                {item.icon}
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{item.titleBn}</span>
              <span className="mt-0.5 block text-xs text-ink-muted">{item.subtitleBn}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- ক্যাটাগরি অনুযায়ী --------------------------- */
const CATEGORY_TILES = [
  { type: "sofa", titleBn: "সোফা", image: "/images/products/oslo-3-seater-sofa.jpg" },
  { type: "bed", titleBn: "বেড", image: "/images/products/royal-queen-bed.jpg" },
  { type: "dining-set", titleBn: "ডাইনিং", image: "/images/products/classic-6-seater-dining-set.jpg" },
  { type: "wardrobe", titleBn: "ওয়ারড্রোব", image: "/images/products/classic-3-door-wardrobe.jpg" },
  { type: "tv-cabinet", titleBn: "টিভি ক্যাবিনেট", image: "/images/products/modern-tv-console.jpg" },
  { type: "office-table", titleBn: "অফিস Furniture", image: "/images/scenes/office-scene.jpg" },
  { type: "shoe-rack", titleBn: "জুতা রাখার র‍্যাক", image: "/images/products/slim-shoe-rack.jpg" },
  { type: "bookshelf", titleBn: "বুকশেলফ", image: "/images/products/metro-bookshelf.jpg" },
];

export function CategorySections() {
  return (
    <section className="container-page py-14 md:py-20">
      <SectionHeading
        eyebrow="ক্যাটাগরি"
        title="ক্যাটাগরি অনুযায়ী Furniture দেখুন"
        subtitle="যে Furniture দরকার, তার ক্যাটাগরিতে ঢুকে সব মডেল, দাম ও মাপ একসঙ্গে দেখে নিন।"
        action={
          <Link href="/shop" className="btn btn-outline btn-sm">
            সব পণ্য দেখুন
          </Link>
        }
      />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {CATEGORY_TILES.map((tile, index) => (
          <Reveal key={tile.type} delay={index * 40}>
            <Link
              href={`/shop?type=${tile.type}`}
              className="group relative block overflow-hidden rounded-md border border-ink/8 bg-white"
            >
              <ProductImage
                src={tile.image}
                alt={tile.titleBn}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 640px) 50vw, 25vw"
                imageClassName="group-hover:scale-[1.05]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-3 pb-3 pt-8">
                <span className="block text-sm font-semibold text-cream">{tile.titleBn}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- ঘর অনুযায়ী কিনুন --------------------------- */
export function RoomShoppingSection() {
  return (
    <section className="bg-linen py-14 md:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="ঘর অনুযায়ী"
          title="ঘর অনুযায়ী পণ্য দেখুন"
          subtitle="পুরো ঘর সাজানোর পরিকল্পনা থাকলে ঘর বেছে নিন — সেই ঘরের সব প্রয়োজনীয় Furniture একসঙ্গে পেয়ে যাবেন।"
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <Reveal key={room.slug} delay={index * 50}>
              <Link
                href={`/rooms/${room.slug}`}
                className="group relative block overflow-hidden rounded-md border border-ink/8 bg-white"
              >
                <ProductImage
                  src={room.image}
                  alt={room.titleBn}
                  className="aspect-[16/10] w-full"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  imageClassName="group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-display text-lg font-semibold text-cream">
                    {room.titleBn}
                  </span>
                  <span className="mt-0.5 block text-xs text-cream/80">{room.subtitleBn}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Offers ------------------------------- */
export function OffersSection({ products }: { products: Product[] }) {
  const [lead, ...rest] = products;
  if (!lead) return null;
  const leadDiscount = discountPercent(lead.price, lead.originalPrice);

  return (
    <section className="container-page py-14 md:py-20">
      <SectionHeading
        eyebrow="অফার"
        title="আজকের Furniture অফার"
        subtitle="নির্বাচিত Furniture-এ সীমিত সময়ের ছাড় — স্টক শেষ হওয়ার আগেই নিয়ে নিন।"
        action={
          <Link href="/offers" className="btn btn-outline btn-sm">
            সব অফার দেখুন
          </Link>
        }
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        {/* Lead offer */}
        <Reveal className="h-full">
          <Link
            href={`/product/${lead.slug}`}
            className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-md border border-ink/8 bg-ink"
          >
            <ProductImage
              src={lead.images[0]}
              alt={lead.name}
              className="absolute inset-0 h-full w-full"
              sizes="(max-width: 1024px) 100vw, 60vw"
              imageClassName="group-hover:scale-[1.04] opacity-95"
            />
            <span className="relative z-10 bg-gradient-to-t from-ink/92 via-ink/55 to-transparent p-6 pt-24">
              <span className="badge badge-discount">{leadDiscount}% ছাড়</span>
              <span className="mt-3 block font-display text-2xl font-semibold text-cream">
                {lead.name}
              </span>
              <span className="mt-1 block text-sm text-cream/80">{lead.offerBn ?? lead.nameBn}</span>
              <span className="mt-4 flex items-baseline gap-3">
                <span className="text-xl font-semibold text-cream">{formatPrice(lead.price)}</span>
                <span className="text-sm text-cream/60 line-through">
                  {formatPrice(lead.originalPrice)}
                </span>
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brass-light">
                অফার দেখুন
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </Link>
        </Reveal>

        {/* Offer list */}
        <div className="grid gap-3">
          {rest.slice(0, 3).map((product, index) => (
            <Reveal key={product.id} delay={index * 60}>
              <Link
                href={`/product/${product.slug}`}
                className="flex items-center gap-4 rounded-md border border-ink/8 bg-white p-3 transition hover:shadow-soft"
              >
                <ProductImage
                  src={product.images[0]}
                  alt={product.name}
                  fill={false}
                  width={104}
                  height={104}
                  className="h-[104px] w-[104px] shrink-0 rounded-sm"
                  sizes="104px"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-snug">{product.name}</span>
                  <span className="mt-1 block text-xs text-ink-muted">
                    {product.offerBn ?? `${discountPercent(product.price, product.originalPrice)}% ছাড়`}
                  </span>
                  <span className="mt-2 flex items-baseline gap-2">
                    <span className="font-semibold">{formatPrice(product.price)}</span>
                    <span className="text-xs text-ink-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="badge badge-discount ml-auto">
                      -{discountPercent(product.price, product.originalPrice)}%
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- সম্পূর্ণ ঘরের Collection ----------------------- */
export function CollectionsSection() {
  const collections = getAllCollections();

  return (
    <section className="bg-wood-900 py-14 text-cream md:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow text-brass-light">
              <span className="h-px w-6 bg-brass-light/60" aria-hidden="true" />
              Complete Collection
            </span>
            <h2 className="section-title mt-3 text-cream">পুরো ঘরের জন্য একসাথে</h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              মিলিয়ে নেওয়া ফিনিশ ও কালারে সাজানো সম্পূর্ণ Collection — একসাথে নিলে আলাদা কেনার চেয়ে{" "}
              <strong className="font-semibold text-brass-light">১২% পর্যন্ত সাশ্রয়</strong>।
            </p>
          </div>
          <Link href="/collections" className="btn btn-light btn-sm shrink-0">
            সব Collection দেখুন
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {collections.map((collection, index) => (
            <Reveal key={collection.id} delay={index * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-md border border-cream/12 bg-cream/[0.04]">
                <div className="relative">
                  <ProductImage
                    src={collection.image}
                    alt={collection.titleBn}
                    className="aspect-[16/9] w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    imageClassName="group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 badge badge-soft bg-cream/90">
                    {collection.accent}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-semibold text-cream">
                    {collection.titleBn}
                  </h3>
                  <p className="mt-1 text-xs text-cream/60">{collection.subtitleBn}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {collection.products.map((product) => (
                      <li
                        key={product.id}
                        className="rounded-full border border-cream/15 px-2.5 py-1 text-[11px] text-cream/80"
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-cream/50">
                        একসাথে নিলে দাম
                      </p>
                      <p className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-cream">
                          {formatPrice(collection.bundlePrice)}
                        </span>
                        <span className="text-xs text-cream/50 line-through">
                          {formatPrice(collection.originalPrice)}
                        </span>
                      </p>
                      <p className="text-[11px] text-brass-light">
                        সাশ্রয় {formatPrice(collection.savings)}
                      </p>
                    </div>
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="btn btn-light btn-sm"
                    >
                      Collection দেখুন
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- ছোট জায়গার Furniture --------------------------- */
export function SmallSpaceSection() {
  const products = getSmallSpaceProducts(6);

  return (
    <section className="container-page py-14 md:py-20">
      <div className="overflow-hidden rounded-lg border border-ink/8 bg-white">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative order-2 lg:order-1">
            <ProductImage
              src="/images/scenes/small-space-scene.jpg"
              alt="ছোট জায়গার জন্য Smart Furniture"
              className="h-full min-h-[280px] w-full"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute bottom-4 left-4 max-w-[15rem] rounded-md bg-cream/95 p-3 backdrop-blur-sm">
              <p className="text-xs font-semibold text-ink">ঢাকার ছোট ফ্ল্যাটে</p>
              <p className="mt-1 text-[11px] leading-snug text-ink-muted">
                কম জায়গায় বেশি সুবিধা — মাপ ও ছবি দেখে নিশ্চিন্তে কিনুন।
              </p>
            </div>
          </div>
          <div className="order-1 p-6 md:p-9 lg:order-2">
            <span className="eyebrow">
              <span className="h-px w-6 bg-brass/60" aria-hidden="true" />
              ছোট জায়গার জন্য
            </span>
            <h2 className="section-title mt-3">ছোট জায়গার জন্য Smart Furniture</h2>
            <p className="section-sub mt-3">
              বাংলাদেশের অ্যাপার্টমেন্ট ও ছোট বাসার কথা ভেবে বাছাই করা Furniture — প্রতিটির মাপ,
              স্টোরেজ ও ফোল্ডিং সুবিধা আগেই জানা যায়।
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="flex h-full items-center gap-3 rounded-sm border border-ink/8 bg-cream/60 p-2.5 transition hover:border-ink/20"
                  >
                    <ProductImage
                      src={product.images[0]}
                      alt={product.name}
                      fill={false}
                      width={72}
                      height={72}
                      className="h-[72px] w-[72px] shrink-0 rounded-sm"
                      sizes="72px"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{product.name}</span>
                      <span className="mt-0.5 block text-[11px] text-ink-muted">
                        {formatDimensions(product.dimensions)}
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-brass-dark">
                        {formatPrice(product.price)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/rooms/small-space" className="btn btn-primary btn-sm mt-6">
              ছোট জায়গার Collection দেখুন
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- ক্রেতাদের মতামত --------------------------- */
const HOME_REVIEWS = [
  {
    nameBn: "সাদিয়া আফরিন",
    locationBn: "উত্তরা, ঢাকা",
    rating: 5,
    textBn: "ছবির সঙ্গে Furniture-এর বাস্তব look অনেক সুন্দর মিলেছে। কাপড়ের মান আর সেলাই খুব পরিপাটি।",
    productBn: "Oslo 3 Seater Sofa",
  },
  {
    nameBn: "রাকিবুল হাসান",
    locationBn: "আগ্রাবাদ, চট্টগ্রাম",
    rating: 5,
    textBn: "মাপ এবং Material-এর তথ্য আগে থেকেই পরিষ্কার ছিল, তাই ঘরে আনার আগেই বুঝে নিতে পেরেছি।",
    productBn: "Royal Queen Bed",
  },
  {
    nameBn: "ফারহানা রহমান",
    locationBn: "ধানমন্ডি, ঢাকা",
    rating: 4,
    textBn: "ডেলিভারি ঠিক সময়ে পেয়েছি, টিম নিজে থেকেই বসিয়ে দিয়েছে। ছোট ফ্ল্যাটে জায়গা বাঁচল।",
    productBn: "Compact Wardrobe",
  },
  {
    nameBn: "তানভীর আহমেদ",
    locationBn: "উপশহর, সিলেট",
    rating: 5,
    textBn: "ঢাকার বাইরে থেকেও ডেলিভারি পেয়েছি ঠিকভাবে। প্যাকিং এত ভালো ছিল যে একটুও দাগ পড়েনি।",
    productBn: "Nordic Dining Table",
  },
];

export function ReviewsSection() {
  return (
    <section className="container-page py-14 md:py-20">
      <SectionHeading
        eyebrow="ক্রেতাদের মতামত"
        title="ক্রেতাদের মতামত"
        subtitle="নিচের মতামতগুলো ডেমো উপস্থাপনার জন্য তৈরি — যাচাইকৃত ক্রয় নয়।"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_REVIEWS.map((review, index) => (
          <Reveal key={review.nameBn} delay={index * 60} className="h-full">
            <figure className="flex h-full flex-col rounded-md border border-ink/8 bg-white p-5">
              <StarRating rating={review.rating} />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                “{review.textBn}”
              </blockquote>
              <figcaption className="mt-4 border-t border-ink/8 pt-3">
                <span className="block text-sm font-semibold text-ink">{review.nameBn}</span>
                <span className="block text-xs text-ink-muted">{review.locationBn}</span>
                <span className="mt-1 block text-[11px] text-brass">{review.productBn}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-center text-[11px] text-ink-muted">
        ডেমো রিভিউ — বাস্তব ক্রেতার যাচাইকৃত মতামত নয়।
      </p>
    </section>
  );
}

/* --------------------------- সব বিভাগ একসঙ্গে --------------------------- */
export function DepartmentsStrip() {
  return (
    <section className="border-y border-ink/8 bg-white py-10">
      <div className="container-page">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department, index) => (
            <Reveal key={department.slug} delay={index * 40}>
              <Link
                href={`/category/${department.slug}`}
                className="flex items-start gap-4 rounded-md border border-ink/8 bg-cream/60 p-4 transition hover:border-ink/20 hover:bg-cream"
              >
                <ProductImage
                  src={department.image}
                  alt={department.titleBn}
                  fill={false}
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 rounded-sm"
                  sizes="80px"
                />
                <span className="min-w-0">
                  <span className="block font-display text-lg font-semibold">
                    {department.titleBn}
                  </span>
                  <span className="mt-0.5 block text-xs text-brass">{department.subtitleBn}</span>
                  <span className="mt-2 line-clamp-2 block text-xs leading-relaxed text-ink-muted">
                    {department.descriptionBn}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- WhatsApp CTA band --------------------------- */
export function AgencyCtaBand() {
  return (
    <section className="container-page pb-4 pt-10">
      <div className="relative overflow-hidden rounded-lg border border-ink/8 bg-white">
        <div className="grid items-center gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:p-9">
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-brass/60" aria-hidden="true" />
              Demo by {siteConfig.agency.name}
            </span>
            <h2 className="section-title mt-3">
              আপনার Furniture Business-এর জন্যও এমন Website চান?
            </h2>
            <p className="section-sub mt-3 max-w-xl">
              এটির মতো Premium, Mobile-first ও বিক্রয়-কেন্দ্রিক E-commerce Website আপনার
              ব্যবসার জন্য তৈরি করা যায় — Product, Cart, Checkout ও WhatsApp অর্ডার সুবিধাসহ।
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                WhatsApp-এ মেসেজ দিন
              </a>
              <a href={`tel:+88${siteConfig.phone.replace(/^0/, "")}`} className="btn btn-outline">
                ফোন: {siteConfig.phoneDisplay}
              </a>
            </div>
            <p className="mt-4 text-xs text-ink-muted">{siteConfig.agency.noticeBn}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src="/images/hero-living-room.jpg"
              alt="WOODORA demo website preview"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <p className="absolute bottom-3 left-3 text-xs font-medium text-cream">
              {siteConfig.brandName} — {siteConfig.brandTagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Featured grid --------------------------- */
export function FeaturedSection({ products }: { products: Product[] }) {
  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="জনপ্রিয়"
          title="জনপ্রিয় Furniture"
          subtitle="বাংলাদেশের ক্রেতারা সবচেয়ে বেশি যে Furniture বেছে নিচ্ছেন — দাম, মাপ, Material ও ডেলিভারি তথ্য একসঙ্গে।"
          action={
            <Link href="/shop?sort=best-selling" className="btn btn-outline btn-sm">
              সবচেয়ে বেশি বিক্রি
            </Link>
          }
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/shop" className="btn btn-primary">
            সব Furniture দেখুন
          </Link>
        </div>
      </div>
    </section>
  );
}
