import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ShopView } from "@/components/shop/shop-view";
import { departments, getDepartment } from "@/lib/catalog";
import { getProductsByDepartment } from "@/lib/products";
import { ProductImage, SectionHeading } from "@/components/ui/primitives";
import { typeTitle } from "@/lib/catalog";

export function generateStaticParams() {
  return departments.map((department) => ({ slug: department.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const department = getDepartment(slug);
  if (!department) return { title: "ক্যাটাগরি পাওয়া যায়নি" };
  return {
    title: `${department.titleBn} Furniture — দাম, মাপ ও Material`,
    description: `${department.descriptionBn} বাংলাদেশে ডেলিভারি, ফ্রি Installation ও ওয়ারেন্টিসহ।`,
    alternates: { canonical: `/category/${department.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const department = getDepartment(slug);
  if (!department) notFound();

  const products = getProductsByDepartment(department.slug);

  return (
    <>
      {/* ---------------- Category hero ---------------- */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <ProductImage
            src={department.image}
            alt={department.titleBn}
            className="h-full w-full"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/65 to-ink/25" />
        </div>
        <div className="container-page relative py-12 md:py-16">
          <nav className="flex items-center gap-1.5 text-xs text-cream/70" aria-label="breadcrumb">
            <Link href="/" className="hover:text-cream">
              হোম
            </Link>
            <span aria-hidden="true">/</span>
            <span>{department.titleBn}</span>
          </nav>
          <h1 className="mt-3 font-display text-3xl font-semibold text-cream md:text-4xl">
            {department.titleBn} Furniture
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/80">
            {department.descriptionBn}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cream/70">
            <span>মোট {products.length} টি পণ্য</span>
            <span>সারা দেশে ডেলিভারি</span>
            <span>ফ্রি Installation</span>
            <span>১ বছরের ওয়ারেন্টি</span>
          </p>
        </div>
      </section>

      {/* ---------------- Type shortcuts ---------------- */}
      <section className="border-b border-ink/8 bg-white">
        <div className="container-page hide-scrollbar flex gap-2 overflow-x-auto py-4">
          <Link
            href={`/category/${department.slug}`}
            className="whitespace-nowrap rounded-full border border-wood-600 bg-wood-600 px-3.5 py-1.5 text-xs font-medium text-white"
          >
            সব
          </Link>
          {department.types.map((type) => (
            <Link
              key={type.slug}
              href={`/shop?type=${type.slug}`}
              className="whitespace-nowrap rounded-full border border-ink/12 bg-cream px-3.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-ink/30"
            >
              {type.titleBn}
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Product listing with filters ---------------- */}
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
          scope={{ departments: [department.slug] }}
          title={`${department.titleBn} — সব Furniture`}
          subtitle={`${department.subtitleBn} · দাম, মাপ, Material ও স্টক অনুযায়ী ফিল্টার করে দেখুন।`}
        />
      </Suspense>

      {/* ---------------- Buying guide ---------------- */}
      <section className="border-t border-ink/8 bg-linen py-12">
        <div className="container-page">
          <SectionHeading
            eyebrow="কেনার আগে"
            title={`${department.titleBn}-এর Furniture বাছাই করার সময়`}
            subtitle="যা দেখে নিলে পরে আফসোস থাকবে না।"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "মাপ আগে মিলিয়ে নিন",
                text: "ঘরের জায়গা ও দরজার প্রস্থ মেপে নিন। প্রতিটি পণ্যের মাপ ইঞ্চিতে দেওয়া আছে।",
              },
              {
                title: "Material বুঝে নিন",
                text: "Solid Wood টেকসই ও দামি; MDF ও Engineered Board বাজেট-বান্ধব এবং আর্দ্র আবহাওয়ায় স্থিতিশীল।",
              },
              {
                title: "ডেলিভারি ও ইনস্টলেশন",
                text: "বড় Furniture-এ ডেলিভারি চার্জ সাইজ অনুযায়ী বদলায় — অর্ডারের আগেই চার্জ দেখে নিন।",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-md border border-ink/8 bg-white p-5">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Other departments ---------------- */}
      <section className="container-page py-12">
        <h2 className="font-display text-xl font-semibold">অন্য ক্যাটাগরিও দেখুন</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {departments
            .filter((item) => item.slug !== department.slug)
            .map((item) => (
              <Link
                key={item.slug}
                href={`/category/${item.slug}`}
                className="rounded-md border border-ink/8 bg-white p-4 transition hover:border-ink/25"
              >
                <span className="block text-sm font-semibold">{item.titleBn}</span>
                <span className="mt-1 block text-[11px] text-ink-muted">{item.subtitleBn}</span>
                <span className="mt-3 block text-[11px] text-brass">
                  {getProductsByDepartment(item.slug)
                    .slice(0, 2)
                    .map((product) => typeTitle(product.type))
                    .join(" · ")}
                </span>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
