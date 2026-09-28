"use client";

import Link from "next/link";
import { useStore } from "@/components/providers/store-provider";
import { EmptyState, ProductImage } from "@/components/ui/primitives";
import { formatPrice } from "@/lib/format";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

export default function OrderConfirmationPage() {
  const { lastOrder, hydrated } = useStore();

  if (!hydrated) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto h-72 max-w-2xl animate-pulse rounded-md bg-sand" />
      </div>
    );
  }

  if (!lastOrder) {
    return (
      <div className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <EmptyState
            title="কোনো অর্ডার পাওয়া যায়নি"
            description="এখনো কোনো ডেমো অর্ডার করা হয়নি। পছন্দের Furniture কার্টে যোগ করে অর্ডার সম্পন্ন করুন।"
            action={
              <Link href="/shop" className="btn btn-primary btn-sm">
                Furniture দেখুন
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        {/* Success header */}
        <div className="rounded-md border border-success/25 bg-success/[0.06] p-6 text-center md:p-8">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success text-white animate-pop">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="m5 13 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
            আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
          </h1>
          <p className="mt-3 font-display text-xl font-semibold text-brass-dark">
            অর্ডার নম্বর: {lastOrder.orderNumber}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            আপনার পছন্দের Furniture-এর জন্য ধন্যবাদ। আমাদের টিম শীঘ্রই কনফার্ম করার জন্য যোগাযোগ
            করবে।
          </p>
          <p className="mt-3 text-[11px] text-ink-muted">
            ডেমো অর্ডার — {lastOrder.placedAtBn} · কোনো বাস্তব পেমেন্ট বা ডেটাবেস ব্যবহার হয়নি
          </p>
        </div>

        {/* Delivery information */}
        <section className="mt-6 rounded-md border border-ink/8 bg-white p-5 md:p-6">
          <h2 className="text-base font-semibold">Delivery information</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-ink-muted">ক্রেতা</p>
              <p className="mt-1 text-sm font-semibold">{lastOrder.name}</p>
              <p className="mt-0.5 text-sm text-ink-soft">{lastOrder.phone}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-ink-muted">ডেলিভারি ঠিকানা</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {lastOrder.address}
                <br />
                {lastOrder.areaBn}, {lastOrder.districtBn}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-ink-muted">ডেলিভারি এলাকা</p>
              <p className="mt-1 text-sm font-semibold">
                {lastOrder.deliveryZone === "inside" ? "ঢাকার মধ্যে" : "ঢাকার বাইরে"}
              </p>
              <p className="mt-0.5 text-xs text-ink-muted">
                আনুমানিক সময়: {lastOrder.estimatedDeliveryBn}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-ink-muted">পেমেন্ট</p>
              <p className="mt-1 text-sm font-semibold">{lastOrder.paymentBn}</p>
              <p className="mt-0.5 text-xs text-ink-muted">
                Installation: {siteConfig.installationBn} · {siteConfig.warrantyBn}
              </p>
            </div>
          </div>
          {lastOrder.note && (
            <p className="mt-4 rounded-sm bg-linen px-3.5 py-2.5 text-xs text-ink-soft">
              আপনার নির্দেশনা: {lastOrder.note}
            </p>
          )}
        </section>

        {/* Items */}
        <section className="mt-6 rounded-md border border-ink/8 bg-white p-5 md:p-6">
          <h2 className="text-base font-semibold">অর্ডারের পণ্য</h2>
          <ul className="mt-4 space-y-4">
            {lastOrder.items.map((line) => (
              <li key={line.key} className="flex gap-3 border-b border-ink/8 pb-4 last:border-0 last:pb-0">
                <ProductImage
                  src={line.image}
                  alt={line.name}
                  fill={false}
                  width={64}
                  height={78}
                  className="h-[78px] w-16 shrink-0 rounded-sm"
                  sizes="64px"
                />
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${line.slug}`} className="text-sm font-semibold hover:text-brass-dark">
                    {line.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {[line.colorName, line.fabricName].filter(Boolean).join(" · ")} ·{" "}
                    {line.sizeLabelBn} · পরিমাণ {line.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold tabular-nums">
                  {formatPrice(line.price * line.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2 border-t border-ink/8 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-muted">পণ্যের মোট</dt>
              <dd className="font-medium tabular-nums">{formatPrice(lastOrder.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">ডেলিভারি</dt>
              <dd className="font-medium tabular-nums">
                {lastOrder.deliveryCharge === 0 ? "ফ্রি" : formatPrice(lastOrder.deliveryCharge)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-lg">
              <dt className="font-semibold">সর্বমোট</dt>
              <dd className="font-semibold tabular-nums">{formatPrice(lastOrder.total)}</dd>
            </div>
          </dl>
        </section>

        {/* Next steps */}
        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { titleBn: "১. কনফার্মেশন কল", textBn: "২৪ ঘণ্টার মধ্যে নম্বরে কল করে অর্ডার কনফার্ম করা হবে।" },
            { titleBn: "২. ডেলিভারি", textBn: `আনুমানিক ${lastOrder.estimatedDeliveryBn} — টিম আগে জানিয়ে আসবে।` },
            { titleBn: "৩. Installation", textBn: "ডেলিভারির সময়ই ফ্রি সেটআপ ও প্যাকিং সরিয়ে নেওয়া।" },
          ].map((step) => (
            <div key={step.titleBn} className="rounded-md border border-ink/8 bg-cream/60 p-4">
              <p className="text-sm font-semibold">{step.titleBn}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">{step.textBn}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-primary btn-sm">
            আরও Furniture দেখুন
          </Link>
          <a
            href={whatsappUrl(
              `আসসালামু আলাইকুম। আমার ডেমো অর্ডার নম্বর ${lastOrder.orderNumber} — কিছু জানতে চাই।`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
          >
            WhatsApp-এ অর্ডার নিয়ে জিজ্ঞাসা
          </a>
        </div>

        <p className="mt-6 text-center text-[11px] text-ink-muted">
          {siteConfig.agency.noticeBn}
        </p>
      </div>
    </div>
  );
}
