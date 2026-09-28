"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { useStore } from "@/components/providers/store-provider";
import { ProductImage, QuantityStepper, StarRating, StockBadge } from "@/components/ui/primitives";
import {
  cx,
  deliveryChargeLabel,
  discountPercent,
  formatDimensions,
  formatPrice,
} from "@/lib/format";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { typeTitle } from "@/lib/catalog";

/* ==========================================================================
   PRODUCT DETAIL — Gallery + Purchase Panel
   কালার/ফ্যাব্রিক বদলালে ইমেজ প্রিভিউ বদলায় (demo interaction)
   ========================================================================== */

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addLine, toggleWishlist, isWishlisted, hydrated, pushToast } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? "");
  const [fabricId, setFabricId] = useState(product.fabrics?.[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [zone, setZone] = useState<"inside" | "outside">("inside");

  const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0];
  const fabric = product.fabrics?.find((item) => item.id === fabricId) ?? product.fabrics?.[0];

  const discount = discountPercent(product.price, product.originalPrice);
  const outOfStock = product.stock <= 0;
  const wishlisted = hydrated && isWishlisted(product.id);

  /* যেকোনো color/fabric বদলালে প্রিভিউ overlay বদলায় */
  const overlay = useMemo(() => {
    if (fabric) return { color: fabric.overlay, opacity: fabric.overlayOpacity };
    if (color) return { color: color.overlay, opacity: color.overlayOpacity };
    return undefined;
  }, [color, fabric]);

  const handleAdd = () => {
    addLine({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      originalPrice: product.originalPrice,
      quantity,
      colorId: color?.id,
      colorName: color?.name,
      fabricId: fabric?.id,
      fabricName: fabric?.name,
      sizeLabelBn: formatDimensions(product.dimensions),
      deliveryChargeInside: product.delivery.chargeInside,
    });
  };

  const handleBuyNow = () => {
    handleAdd();
    router.push("/checkout");
  };

  const deliveryCharge =
    zone === "inside" ? product.delivery.chargeInside : product.delivery.chargeOutside;

  return (
    <>
      {/* ----------------------------- Gallery + Panel ----------------------------- */}
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden rounded-md border border-ink/8 bg-white">
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="block w-full cursor-zoom-in"
              aria-label="ছবি বড় করে দেখুন"
            >
              <ProductImage
                key={product.images[activeImage]}
                src={product.images[activeImage]}
                alt={`${product.name} — ${product.imageLabelsBn[activeImage] ?? ""}`}
                overlay={overlay?.color}
                overlayOpacity={overlay?.opacity}
                className="aspect-square w-full animate-fade-in sm:aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </button>

            {discount > 0 && (
              <span className="badge badge-discount absolute left-3 top-3">
                -{discount}% ছাড়
              </span>
            )}
            <span className="absolute right-3 top-3 rounded-sm bg-white/90 px-2 py-1 text-[11px] font-medium text-ink-soft">
              {product.imageLabelsBn[activeImage]}
            </span>
            {overlay && (
              <span className="absolute bottom-3 left-3 rounded-sm bg-ink/80 px-2.5 py-1 text-[11px] font-medium text-cream">
                প্রিভিউ: {fabric ? fabric.name : color?.name}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
            {product.images.map((image, index) => (
              <button
                key={image + index}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={product.imageLabelsBn[index]}
                className={cx(
                  "overflow-hidden rounded-sm border transition",
                  index === activeImage
                    ? "border-wood-600 ring-1 ring-wood-600"
                    : "border-ink/10 hover:border-ink/30",
                )}
              >
                <ProductImage
                  src={image}
                  alt={product.imageLabelsBn[index] ?? product.name}
                  className="aspect-square w-full"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-ink-muted">
            ছবিতে ক্লিক করে বড় করে দেখুন · সব ছবি ডেমো উপস্থাপনার জন্য
          </p>
        </div>

        {/* Purchase panel */}
        <div>
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted" aria-label="breadcrumb">
            <Link href="/" className="hover:text-ink">
              হোম
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/category/${product.department}`} className="hover:text-ink">
              {typeTitle(product.type)}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink-soft">{product.name}</span>
          </nav>

          <h1 className="mt-3 font-display text-2xl font-semibold leading-snug md:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1.5 text-sm text-ink-soft">{product.nameBn}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StarRating rating={product.rating} showValue />
            <span className="text-xs text-ink-muted">
              {product.reviewCount} জনের মতামত
            </span>
            <span className="h-3 w-px bg-ink/15" aria-hidden="true" />
            <span className="text-xs text-ink-muted">{product.soldCount}+ বিক্রি হয়েছে</span>
          </div>

          {/* Price block */}
          <div className="mt-5 rounded-md border border-ink/8 bg-white p-4">
            <div className="flex flex-wrap items-end gap-3">
              <span className="font-display text-3xl font-semibold text-ink">
                {formatPrice(product.price)}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-sm text-ink-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="badge badge-discount">
                    {formatPrice(product.originalPrice - product.price)} সাশ্রয়
                  </span>
                </>
              )}
            </div>
            {product.offerBn && (
              <p className="mt-2 text-xs font-medium text-brass-dark">{product.offerBn}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StockBadge stock={product.stock} />
              <span className="badge badge-soft">ঢাকায় ডেলিভারি {product.delivery.timeInsideBn}</span>
            </div>
          </div>

          {/* Color selection */}
          {product.colors.length > 0 && (
            <fieldset className="mt-6">
              <legend className="text-sm font-semibold">
                কালার নির্বাচন করুন:{" "}
                <span className="font-normal text-ink-soft">{color?.name}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {product.colors.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setColorId(option.id)}
                    aria-label={option.name}
                    aria-pressed={option.id === colorId}
                    data-active={option.id === colorId}
                    className="swatch"
                    style={{ backgroundColor: option.hex }}
                    title={option.name}
                  />
                ))}
              </div>
              <p className="mt-2 text-[11px] text-ink-muted">
                ছবি প্রিভিউতে কালার পরিবর্তন দেখা যাবে — বাস্তব ফিনিশ অর্ডারের সময় কনফার্ম করা হয়।
              </p>
            </fieldset>
          )}

          {/* Fabric selection */}
          {product.fabrics && product.fabrics.length > 0 && (
            <fieldset className="mt-5">
              <legend className="text-sm font-semibold">
                Fabric নির্বাচন করুন: <span className="font-normal text-ink-soft">{fabric?.name}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.fabrics.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFabricId(option.id)}
                    aria-pressed={option.id === fabricId}
                    className={cx(
                      "flex items-center gap-2 rounded-sm border px-3 py-2 text-xs font-medium transition",
                      option.id === fabricId
                        ? "border-wood-600 bg-wood-600 text-white"
                        : "border-ink/12 bg-white text-ink-soft hover:border-ink/30",
                    )}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: option.hex }}
                    />
                    {option.name}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* Quantity */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div>
              <p className="field-label">পরিমাণ</p>
              <QuantityStepper value={quantity} onChange={setQuantity} max={Math.max(1, Math.min(10, product.stock || 10))} />
            </div>
            <div className="min-w-[9rem] flex-1">
              <p className="field-label">আনুমানিক মোট</p>
              <p className="font-display text-xl font-semibold">
                {formatPrice(product.price * quantity)}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={outOfStock}
                className="btn btn-outline btn-lg"
              >
                কার্টে যোগ করুন
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={outOfStock}
                className="btn btn-primary btn-lg"
              >
                {outOfStock ? "স্টকে নেই" : "এখনই অর্ডার করুন"}
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={cx(
                  "btn btn-sm border",
                  wishlisted ? "border-danger text-danger" : "btn-ghost border-ink/12",
                )}
              >
                {wishlisted ? "পছন্দের তালিকায় আছে" : "পছন্দের তালিকায় যোগ করুন"}
              </button>
              <a
                href={whatsappUrl(
                  `আসসালামু আলাইকুম। আমি WOODORA Demo Website থেকে "${product.name}" সম্পর্কে জানতে চাই (কালার: ${color?.name ?? "-"}, মাপ: ${formatDimensions(product.dimensions)})।`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm border border-ink/12"
              >
                WhatsApp-এ জিজ্ঞাসা করুন
              </a>
            </div>
            <button
              type="button"
              onClick={() =>
                pushToast({
                  messageBn: "কাস্টম অর্ডারের জন্য WhatsApp-এ মেসেজ করুন",
                  actionLabelBn: "মেসেজ দিন",
                  actionHref: whatsappUrl(
                    `আসসালামু আলাইকুম। আমি "${product.name}" কাস্টম অর্ডার করতে চাই।`,
                  ),
                })
              }
              className="w-full text-center text-xs font-medium text-brass-dark underline-offset-4 hover:underline"
            >
              আপনার পছন্দ অনুযায়ী তৈরি করুন — কাস্টম অর্ডার সম্পর্কে জানতে মেসেজ করুন
            </button>
          </div>

          {/* Delivery / installation / warranty quick info */}
          <div className="mt-6 divide-y divide-ink/8 rounded-md border border-ink/8 bg-cream/60">
            <div className="flex items-start gap-3 p-4">
              <InfoIcon>🚚</InfoIcon>
              <div className="flex-1">
                <p className="text-sm font-semibold">ডেলিভারি তথ্য</p>
                <div className="mt-2 grid gap-1.5 text-xs text-ink-soft sm:grid-cols-2">
                  <p>
                    ঢাকার মধ্যে:{" "}
                    <strong className="font-semibold">
                      {deliveryChargeLabel(product.delivery.chargeInside)}
                    </strong>{" "}
                    · {product.delivery.timeInsideBn}
                  </p>
                  <p>
                    ঢাকার বাইরে:{" "}
                    <strong className="font-semibold">
                      {deliveryChargeLabel(product.delivery.chargeOutside)}
                    </strong>{" "}
                    · {product.delivery.timeOutsideBn}
                  </p>
                </div>
                {product.delivery.customDelivery && (
                  <p className="mt-2 rounded-sm bg-sand/60 px-2.5 py-1.5 text-[11px] text-ink-soft">
                    Custom Delivery: {product.delivery.noteBn ?? siteConfig.deliveryChargeCustomNoteBn}
                  </p>
                )}
                <div className="mt-2 flex gap-2">
                  {(["inside", "outside"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setZone(option)}
                      className={cx(
                        "rounded-sm border px-2.5 py-1 text-[11px] font-medium transition",
                        zone === option
                          ? "border-wood-600 bg-wood-600 text-white"
                          : "border-ink/12 bg-white text-ink-soft",
                      )}
                    >
                      {option === "inside" ? "ঢাকার মধ্যে" : "ঢাকার বাইরে"} —{" "}
                      {formatPrice(deliveryCharge)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4">
              <InfoIcon>🔧</InfoIcon>
              <div>
                <p className="text-sm font-semibold">Installation</p>
                <p className="mt-1 text-xs text-ink-soft">
                  <span className="font-semibold text-ink">{product.installation.labelBn}</span> —{" "}
                  {product.installation.detailBn}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4">
              <InfoIcon>🛡</InfoIcon>
              <div>
                <p className="text-sm font-semibold">ওয়ারেন্টি</p>
                <p className="mt-1 text-xs text-ink-soft">
                  <span className="font-semibold text-ink">{product.warranty.labelBn}</span> —{" "}
                  {product.warranty.coveredBn}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4">
              <InfoIcon>📦</InfoIcon>
              <div>
                <p className="text-sm font-semibold">Assembly</p>
                <p className="mt-1 text-xs text-ink-soft">{product.assemblyBn}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------- Mobile sticky bar ----------------------------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/97 px-4 py-3 backdrop-blur-sm shadow-bar lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-ink-muted">দাম</p>
            <p className="text-base font-semibold leading-none">{formatPrice(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={outOfStock}
            className="btn btn-outline btn-sm ml-auto whitespace-nowrap"
          >
            কার্টে যোগ করুন
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={outOfStock}
            className="btn btn-primary btn-sm whitespace-nowrap"
          >
            অর্ডার করুন
          </button>
        </div>
      </div>

      {/* ----------------------------- Lightbox ----------------------------- */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/92 p-4 animate-fade-in"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-label="ছবি প্রিভিউ"
        >
          <div className="relative max-h-full w-full max-w-5xl">
            <ProductImage
              src={product.images[activeImage]}
              alt={product.name}
              overlay={overlay?.color}
              overlayOpacity={overlay?.opacity}
              className="max-h-[80vh] min-h-[50vh] w-full rounded-md"
              sizes="100vw"
            />
            <div className="mt-3 flex justify-center gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveImage(index);
                  }}
                  className={cx(
                    "h-2 w-8 rounded-full transition",
                    index === activeImage ? "bg-cream" : "bg-cream/35",
                  )}
                  aria-label={product.imageLabelsBn[index]}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream/15 text-cream"
            aria-label="বন্ধ করুন"
            onClick={() => setLightbox(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

function InfoIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-white text-sm">
      {children}
    </span>
  );
}
