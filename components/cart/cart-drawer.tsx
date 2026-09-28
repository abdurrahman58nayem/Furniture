"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useStore } from "@/components/providers/store-provider";
import { ProductImage } from "@/components/ui/primitives";
import { QuantityStepper } from "@/components/ui/primitives";
import { cx, formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

/* ==========================================================================
   CART DRAWER — ডান দিক থেকে খোলা কার্ট
   ========================================================================== */
export function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    lines,
    updateQuantity,
    removeLine,
    subtotal,
    deliveryCharge,
    total,
    deliveryZone,
    setDeliveryZone,
  } = useStore();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const freeDeliveryGap = siteConfig.freeDeliveryAbove - subtotal;

  return (
    <div
      className={cx("fixed inset-0 z-[65]", cartOpen ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!cartOpen}
    >
      <div
        onClick={closeCart}
        className={cx(
          "absolute inset-0 bg-ink/45 transition-opacity duration-300",
          cartOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-label="আপনার কার্ট"
        className={cx(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-lift transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)]",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold">আপনার কার্ট</h2>
            <p className="text-xs text-ink-muted">
              {lines.length > 0 ? `${lines.length} ধরনের পণ্য` : "কার্ট এখন খালি"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="কার্ট বন্ধ করুন"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-ink/12 bg-white"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-linen text-wood-500">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 5h2.2l2.3 10.2A2 2 0 0 0 9.46 17h8.3a2 2 0 0 0 1.96-1.6L21 8H6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div>
              <p className="font-semibold">কার্ট এখন খালি</p>
              <p className="mt-1 text-sm text-ink-muted">
                পছন্দের Furniture কার্টে যোগ করে অর্ডার সম্পন্ন করুন।
              </p>
            </div>
            <Link href="/shop" onClick={closeCart} className="btn btn-primary btn-sm">
              Furniture দেখুন
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {freeDeliveryGap > 0 ? (
                <div className="mb-4 rounded-sm bg-linen px-3.5 py-2.5 text-xs text-ink-soft">
                  আর <strong>{formatPrice(freeDeliveryGap)}</strong> কিনলেই ফ্রি ডেলিভারি
                  <span className="mt-2 block h-1 w-full overflow-hidden rounded-full bg-sand">
                    <span
                      className="block h-full bg-wood-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (subtotal / siteConfig.freeDeliveryAbove) * 100)}%`,
                      }}
                    />
                  </span>
                </div>
              ) : (
                <div className="mb-4 rounded-sm bg-success/10 px-3.5 py-2.5 text-xs font-medium text-success">
                  🎉 আপনার অর্ডারে ডেলিভারি ফ্রি!
                </div>
              )}

              <ul className="space-y-4">
                {lines.map((line) => (
                  <li key={line.key} className="flex gap-3 border-b border-ink/8 pb-4 last:border-0">
                    <Link href={`/product/${line.slug}`} onClick={closeCart} className="shrink-0">
                      <ProductImage
                        src={line.image}
                        alt={line.name}
                        fill={false}
                        width={88}
                        height={110}
                        className="h-[110px] w-[88px] rounded-sm"
                        sizes="88px"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/product/${line.slug}`}
                        onClick={closeCart}
                        className="line-clamp-2 text-sm font-semibold hover:text-brass-dark"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-1 text-xs text-ink-muted">
                        {[line.colorName, line.fabricName].filter(Boolean).join(" · ")}
                        {line.colorName || line.fabricName ? " · " : ""}
                        {line.sizeLabelBn}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <QuantityStepper
                          value={line.quantity}
                          onChange={(next) => updateQuantity(line.key, next)}
                          size="sm"
                        />
                        <div className="text-right">
                          <p className="text-sm font-semibold">
                            {formatPrice(line.price * line.quantity)}
                          </p>
                          {line.originalPrice > line.price && (
                            <p className="text-[11px] text-ink-muted line-through">
                              {formatPrice(line.originalPrice * line.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        className="mt-2 text-[11px] font-medium text-danger underline-offset-2 hover:underline"
                      >
                        সরিয়ে ফেলুন
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-ink/10 bg-white/60 px-5 py-4">
              <div className="mb-3 grid grid-cols-2 gap-2">
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

              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">পণ্যের মোট</dt>
                  <dd className="font-medium">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">ডেলিভারি</dt>
                  <dd className="font-medium">
                    {deliveryCharge === 0 ? "ফ্রি" : formatPrice(deliveryCharge)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-ink/10 pt-2 text-base">
                  <dt className="font-semibold">সর্বমোট</dt>
                  <dd className="font-semibold">{formatPrice(total)}</dd>
                </div>
              </dl>

              <Link href="/checkout" onClick={closeCart} className="btn btn-primary btn-block mt-4">
                অর্ডার সম্পন্ন করুন
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-2 block text-center text-xs font-medium text-ink-soft underline-offset-4 hover:underline"
              >
                কার্ট পেজে দেখুন
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

/* ==========================================================================
   TOAST — cart micro feedback
   ========================================================================== */
export function ToastHost() {
  const { toast, dismissToast } = useStore();
  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[80] flex justify-center px-4 md:inset-x-auto md:bottom-8 md:left-8 md:justify-start">
      <div
        key={toast.id}
        className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-md border border-ink/10 bg-ink px-4 py-3 text-cream shadow-lift animate-fade-up"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brass/25 text-brass-light">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="m5 13 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <p className="text-sm font-medium">{toast.messageBn}</p>
        {toast.actionLabelBn && toast.actionHref && (
          <Link
            href={toast.actionHref}
            onClick={dismissToast}
            className="ml-1 whitespace-nowrap text-sm font-semibold text-brass-light underline-offset-4 hover:underline"
          >
            {toast.actionLabelBn}
          </Link>
        )}
        <button
          type="button"
          onClick={dismissToast}
          aria-label="বার্তা বন্ধ করুন"
          className="ml-1 text-cream/60 transition hover:text-cream"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
