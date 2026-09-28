import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionBySlug, roomCollections } from "@/lib/collections";
import { ProductCard } from "@/components/product/product-card";
import { ProductImage } from "@/components/ui/primitives";
import { formatDimensions, formatPrice } from "@/lib/format";
import { whatsappUrl } from "@/lib/site-config";

export function generateStaticParams() {
  return roomCollections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection পাওয়া যায়নি" };
  return {
    title: `${collection.titleBn} — Complete Room Collection`,
    description: collection.descriptionBn,
    alternates: { canonical: `/collections/${collection.slug}` },
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <ProductImage
            src={collection.image}
            alt={collection.titleBn}
            className="h-full w-full"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/25" />
        </div>
        <div className="container-page relative py-12 md:py-16">
          <nav className="flex items-center gap-1.5 text-xs text-cream/70" aria-label="breadcrumb">
            <Link href="/" className="hover:text-cream">
              হোম
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/collections" className="hover:text-cream">
              Collection
            </Link>
            <span aria-hidden="true">/</span>
            <span>{collection.titleBn}</span>
          </nav>
          <span className="eyebrow mt-4 block text-brass-light">{collection.accent}</span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-cream md:text-4xl">
            {collection.titleBn}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/80">
            {collection.descriptionBn}
          </p>

          <div className="mt-7 flex flex-wrap items-end gap-6 rounded-md border border-cream/12 bg-cream/[0.06] p-5 backdrop-blur-sm">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-cream/60">Bundle price</p>
              <p className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-semibold text-cream">
                  {formatPrice(collection.bundlePrice)}
                </span>
                <span className="text-sm text-cream/50 line-through">
                  {formatPrice(collection.originalPrice)}
                </span>
              </p>
              <p className="mt-1 text-xs font-medium text-brass-light">
                সাশ্রয় {formatPrice(collection.savings)} (১২% ছাড়)
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl(
                  `আসসালামু আলাইকুম। আমি "${collection.titleBn}" Collection অর্ডার করতে চাই (WOODORA Demo)।`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light"
              >
                Collection অর্ডার করুন
              </a>
              <Link
                href={`/search?q=${encodeURIComponent(collection.titleBn)}`}
                className="btn border border-cream/30 bg-cream/10 text-cream hover:bg-cream/20"
              >
                আলাদা পণ্য দেখুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Included products + total */}
      <section className="container-page py-12">
        <h2 className="font-display text-2xl font-semibold">Collection-এ যা যা আছে</h2>
        <div className="mt-6 overflow-hidden rounded-md border border-ink/8 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-linen text-left text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  পণ্য
                </th>
                <th scope="col" className="hidden px-4 py-3 font-medium md:table-cell">
                  মাপ
                </th>
                <th scope="col" className="px-4 py-3 text-right font-medium">
                  দাম
                </th>
              </tr>
            </thead>
            <tbody>
              {collection.products.map((product) => (
                <tr key={product.id} className="border-t border-ink/8">
                  <td className="px-4 py-3">
                    <Link href={`/product/${product.slug}`} className="font-medium hover:text-brass-dark">
                      {product.name}
                    </Link>
                    <span className="mt-0.5 block text-[11px] text-ink-muted md:hidden">
                      {formatDimensions(product.dimensions)}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-ink-soft md:table-cell">
                    {formatDimensions(product.dimensions)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">
                    {formatPrice(product.price)}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-ink/12 bg-linen/60">
                <td className="px-4 py-3 text-xs text-ink-muted">আলাদা কেনার মোট</td>
                <td className="hidden md:table-cell" />
                <td className="px-4 py-3 text-right text-ink-muted line-through tabular-nums">
                  {formatPrice(collection.originalPrice)}
                </td>
              </tr>
              <tr className="border-t border-ink/12 bg-white">
                <td className="px-4 py-3 font-semibold">Bundle price</td>
                <td className="hidden md:table-cell" />
                <td className="px-4 py-3 text-right font-display text-lg font-semibold tabular-nums">
                  {formatPrice(collection.bundlePrice)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-ink-muted">
          ডেমো হিসাব — সব দাম centralized product data থেকে স্বয়ংক্রিয়ভাবে হিসাব করা হয়।
        </p>
      </section>

      {/* Products grid */}
      <section className="container-page pb-16">
        <h2 className="font-display text-2xl font-semibold">পণ্যগুলো আলাদাভাবে</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
