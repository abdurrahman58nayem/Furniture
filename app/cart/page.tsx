"use client";

import Link from "next/link";
import { useStore } from "@/components/providers/store-provider";
import { EmptyState, ProductImage, QuantityStepper } from "@/components/ui/primitives";
import { cx, formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

export default function CartPage() {
  const {
    lines,
    hydrated,
    updateQuantity,
    removeLine,
    subtotal,
    deliveryCharge,
    total,
    deliveryZone,
    setDeliveryZone,
  } = useStore();

  const savings = lines.reduce(
    (sum, line) => sum + Math.max(0, line.originalPrice - line.price) * line.quantity,
    0,
  );
  const freeDeliveryGap = siteConfig.freeDeliveryAbove - subtotal;

  return (
    <div className="container-page py-10 md:py-14">
      <header className="max-w-2xl">
        <h1 className="font-display text-2xl font-semibold md:text-3xl">আপনার কার্ট</h1>
        <p className="section-sub mt-3">
          কার্টে যোগ করা Furniture চেক করে অর্ডার সম্পন্ন করুন। অর্ডার করতে কোনো অ্যাকাউন্ট লাগবে না।
        </p>
      </header>

      {!hydrated ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="h-32 animate-pulse rounded-md bg-sand" />
            ))}
          </div>
          <div className="h-64 animate-pulse rounded-md bg-sand" />
        </div>
      ) : lines.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="কার্ট এখন খালি"
            description="পছন্দের Furniture কার্টে যোগ করে অর্ডার সম্পন্ন করুন — ডেমোতে কোনো পেমেন্ট লাগবে না।"
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/shop" className="btn btn-primary btn-sm">
                  Furniture দেখুন
                </Link>
                <Link href="/offers" className="btn btn-outline btn-sm">
                  অফার দেখুন
                </Link>
              </div>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          {/* -------------------------- Lines -------------------------- */}
          <section>
            <ul className="space-y-4">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="flex flex-col gap-4 rounded-md border border-ink/8 bg-white p-4 sm:flex-row"
                >
                  <Link href={`/product/${line.slug}`} className="shrink-0">
                    <ProductImage
                      src={line.image}
                      alt={line.name}
                      fill={false}
                      width={132}
                      height={160}
                      className="h-[160px] w-full rounded-sm sm:h-[140px] sm:w-[116px]"
                      sizes="132px"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-[15px] font-semibold leading-snug">
                          <Link href={`/product/${line.slug}`} className="hover:text-brass-dark">
                            {line.name}
                          </Link>
                        </h2>
                        <dl className="mt-1.5 space-y-0.5 text-xs text-ink-muted">
                          {line.colorName && <dd>কালার: {line.colorName}</dd>}
                          {line.fabricName && <dd>Fabric: {line.fabricName}</dd>}
                          <dd>মাপ: {line.sizeLabelBn}</dd>
                        </dl>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        aria-label="পণ্য সরিয়ে ফেলুন"
                        className="flex h-8 w-8 items-center justify-center rounded-sm border border-ink/10 text-ink-muted transition hover:border-danger/40 hover:text-danger"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M5 7h14M9 7V5h6v2M7 7l1 12h8l1-12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4">
                      <div>
                        <p className="field-label">পরিমাণ</p>
                        <QuantityStepper
                          value={line.quantity}
                          onChange={(next) => updateQuantity(line.key, next)}
                          size="sm"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          {formatPrice(line.price * line.quantity)}
                        </p>
                        {line.originalPrice > line.price && (
                          <p className="text-xs text-ink-muted line-through">
                            {formatPrice(line.originalPrice * line.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <Link href="/shop" className="btn btn-ghost btn-sm border border-ink/12">
                আরও Furniture দেখুন
              </Link>
              <p className="text-xs text-ink-muted">
                ডেলিভারি চার্জ পণ্যের সাইজ অনুযায়ী পরিবর্তিত হতে পারে।
              </p>
            </div>
          </section>

          {/* -------------------------- Summary -------------------------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-md border border-ink/8 bg-white p-5">
              <h2 className="text-base font-semibold">অর্ডার সারাংশ</h2>

              <div className="mt-4">
                <p className="field-label">ডেলিভারি এলাকা</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["inside", "outside"] as const).map((zone) => (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => setDeliveryZone(zone)}
                      className={cx(
                        "rounded-sm border px-3 py-2 text-xs font-medium transition",
                        deliveryZone === zone
                          ? "border-wood-600 bg-wood-600 text-white"
                          : "border-ink/12 bg-white text-ink-soft hover:border-ink/30",
                      )}
                    >
                      {zone === "inside" ? "ঢাকার মধ্যে" : "ঢাকার বাইরে"}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-ink-muted">
                  {deliveryZone === "inside"
                    ? `ডেলিভারি সময়: ${siteConfig.deliveryTimeInsideBn}`
                    : `ডেলিভারি সময়: ${siteConfig.deliveryTimeOutsideBn}`}
                </p>
              </div>

              <dl className="mt-5 space-y-2 border-t border-ink/8 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">পণ্যের মোট</dt>
                  <dd className="font-medium tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">ডেলিভারি</dt>
                  <dd className="font-medium tabular-nums">
                    {deliveryCharge === 0 ? "ফ্রি" : formatPrice(deliveryCharge)}
                  </dd>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-success">
                    <dt>আপনার সাশ্রয়</dt>
                    <dd className="font-medium tabular-nums">−{formatPrice(savings)}</dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-ink/10 pt-3 text-lg">
                  <dt className="font-semibold">সর্বমোট</dt>
                  <dd className="font-semibold tabular-nums">{formatPrice(total)}</dd>
                </div>
              </dl>

              {freeDeliveryGap > 0 && (
                <p className="mt-3 rounded-sm bg-linen px-3 py-2 text-[11px] text-ink-soft">
                  আর {formatPrice(freeDeliveryGap)} কিনলে ডেলিভারি ফ্রি
                </p>
              )}

              <Link href="/checkout" className="btn btn-primary btn-block mt-5">
                অর্ডার সম্পন্ন করুন
              </Link>
              <p className="mt-3 text-center text-[11px] text-ink-muted">
                ক্যাশ অন ডেলিভারি সুবিধা আছে · ডেমো অর্ডার, কোনো পেমেন্ট লাগবে না
              </p>
            </div>

            <div className="mt-4 rounded-md border border-ink/8 bg-cream/70 p-4 text-xs leading-relaxed text-ink-soft">
              <p className="font-semibold text-ink">সাহায্য দরকার?</p>
              <p className="mt-1">
                অর্ডার নিয়ে প্রশ্ন থাকলে WhatsApp করুন — {siteConfig.whatsappDisplayNumber}
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
