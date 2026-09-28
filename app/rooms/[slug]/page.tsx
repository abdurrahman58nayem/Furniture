import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ShopView } from "@/components/shop/shop-view";
import { getRoom, rooms } from "@/lib/catalog";
import { getProductsByRoom } from "@/lib/products";
import { ProductImage } from "@/components/ui/primitives";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return { title: "ঘর পাওয়া যায়নি" };
  return {
    title: `${room.titleBn} — ঘর অনুযায়ী Furniture`,
    description: `${room.titleBn}-এর জন্য প্রয়োজনীয় সব Furniture — দাম, মাপ, Material ও ডেলিভারি তথ্যসহ।`,
    alternates: { canonical: `/rooms/${room.slug}` },
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const products = getProductsByRoom(room.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-wood-900">
        <div className="absolute inset-0">
          <ProductImage
            src={room.image}
            alt={room.titleBn}
            className="h-full w-full"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/30" />
        </div>
        <div className="container-page relative py-14 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-cream/70" aria-label="breadcrumb">
            <Link href="/" className="hover:text-cream">
              হোম
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop" className="hover:text-cream">
              ঘর অনুযায়ী
            </Link>
            <span aria-hidden="true">/</span>
            <span>{room.titleBn}</span>
          </nav>
          <h1 className="mt-3 font-display text-3xl font-semibold text-cream md:text-4xl">
            {room.titleBn}-এর Furniture
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/80">
            {room.subtitleBn} — এই ঘরের জন্য বাছাই করা সব Furniture, মাপ ও দামসহ।
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="container-page py-10">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="shimmer aspect-[4/5] w-full rounded-md" />
              ))}
            </div>
          </div>
        }
      >
        <ShopView
          products={products}
          scope={{ rooms: [room.slug] }}
          title={`${room.titleBn} — সব পণ্য`}
          subtitle="আপনার ঘরের জন্য উপযুক্ত Furniture — ফিল্টার করে দাম, মাপ ও Material মিলিয়ে নিন।"
        />
      </Suspense>

      <section className="border-t border-ink/8 bg-linen py-12">
        <div className="container-page">
          <h2 className="font-display text-xl font-semibold">অন্য ঘরগুরোও দেখুন</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
            {rooms
              .filter((item) => item.slug !== room.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/rooms/${item.slug}`}
                  className="group overflow-hidden rounded-md border border-ink/8 bg-white"
                >
                  <ProductImage
                    src={item.image}
                    alt={item.titleBn}
                    className="aspect-[4/3] w-full"
                    sizes="(max-width: 768px) 50vw, 20vw"
                    imageClassName="group-hover:scale-105"
                  />
                  <span className="block px-3 py-2.5">
                    <span className="block text-sm font-semibold">{item.titleBn}</span>
                    <span className="mt-0.5 block text-[11px] text-ink-muted">{item.subtitleBn}</span>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
