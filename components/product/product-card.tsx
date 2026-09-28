"use client";

import Link from "next/link";
import { useStore } from "@/components/providers/store-provider";
import { ProductImage, StarRating, StockBadge, DeliveryIndicator } from "@/components/ui/primitives";
import type { Product } from "@/lib/types";
import { cx, discountPercent, formatDimensions, formatPrice } from "@/lib/format";
import { typeTitle } from "@/lib/catalog";
import { whatsappUrl } from "@/lib/site-config";

/* ==========================================================================
   PRODUCT CARD — mobile-এ ২ কলাম, Large image, সব প্রয়োজনীয় তথ্য
   ========================================================================== */

export function ProductCard({
  product,
  priority = false,
  compact = false,
}: {
  product: Product;
  priority?: boolean;
  compact?: boolean;
}) {
  const { addLine, toggleWishlist, isWishlisted, hydrated, lastAddedKey } = useStore();
  const discount = discountPercent(product.price, product.originalPrice);
  const wishlisted = hydrated && isWishlisted(product.id);
  const outOfStock = product.stock <= 0;
  const lineKey = `${product.id}::${product.colors[0]?.id ?? "default"}::default`;
  const bumping = lastAddedKey === lineKey;

  const addToCart = () => {
    addLine({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      originalPrice: product.originalPrice,
      colorId: product.colors[0]?.id,
      colorName: product.colors[0]?.name,
      sizeLabelBn: formatDimensions(product.dimensions),
      deliveryChargeInside: product.delivery.chargeInside,
    });
  };

  return (
    <article
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-md border border-ink/8 bg-white transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1 hover:shadow-card",
        bumping && "animate-cart-bump",
      )}
    >
      {/* ---------------------------- Image ---------------------------- */}
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block image-zoom">
          <ProductImage
            src={product.images[0]}
            alt={`${product.name} — ${product.nameBn}`}
            className={cx("w-full", compact ? "aspect-[4/5]" : "aspect-square sm:aspect-[4/5]")}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
          />
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
          {discount > 0 && (
            <span className="badge badge-discount shadow-sm">-{discount}% ছাড়</span>
          )}
          {product.tags.includes("new") && <span className="badge badge-new">নতুন</span>}
          {product.tags.includes("bestseller") && !product.tags.includes("new") && (
            <span className="badge badge-best">বেস্ট সেলার</span>
          )}
          {outOfStock && <span className="badge badge-out bg-white/90">স্টকে নেই</span>}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? "পছন্দের তালিকা থেকে সরান" : "পছন্দের তালিকায় যোগ করুন"}
          aria-pressed={wishlisted}
          className={cx(
            "absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-ink/8 backdrop-blur-sm transition-all duration-300",
            wishlisted
              ? "bg-danger text-white"
              : "bg-white/88 text-ink-soft hover:bg-white hover:text-danger",
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"}>
            <path
              d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* ---------------------------- Body ---------------------------- */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-brass">
            {typeTitle(product.type)}
          </span>
          <StarRating rating={product.rating} size={12} showValue />
        </div>

        <h3 className="mt-1.5 text-[15px] font-semibold leading-snug">
          <Link href={`/product/${product.slug}`} className="transition hover:text-brass-dark">
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">{product.nameBn}</p>

        <p className="mt-2 line-clamp-1 text-xs text-ink-soft">
          <span className="text-ink-muted">Material:</span> {product.material.primary}
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          <span className="text-ink-muted">মাপ:</span> {formatDimensions(product.dimensions)}
        </p>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.id}
                title={color.name}
                className="h-3.5 w-3.5 rounded-full border border-ink/12"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-ink-muted">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-[17px] font-semibold leading-none">{formatPrice(product.price)}</p>
            {discount > 0 && (
              <p className="mt-1 text-xs text-ink-muted line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          <StockBadge stock={product.stock} />
        </div>

        <div className="mt-2">
          <DeliveryIndicator timeBn={product.delivery.timeInsideBn} />
        </div>

        {/* Actions */}
        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={addToCart}
            disabled={outOfStock}
            className="btn btn-outline btn-sm btn-block"
          >
            কার্টে যোগ করুন
          </button>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappUrl(
                `আসসালামু আলাইকুম। আমি "${product.name}" সম্পর্কে জানতে চাই (WOODORA Demo Website)।`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm border border-ink/12 text-xs"
            >
              জিজ্ঞাসা
            </a>
            <Link
              href={outOfStock ? `/product/${product.slug}` : `/checkout?buy=${product.slug}`}
              className={cx("btn btn-sm text-xs", outOfStock ? "btn-outline" : "btn-primary")}
            >
              {outOfStock ? "বিস্তারিত দেখুন" : "এখনই অর্ডার করুন"}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------- Grid ---------------------------- */
export function ProductGrid({
  products,
  columns = 4,
  priorityCount = 4,
}: {
  products: Product[];
  columns?: 2 | 3 | 4;
  priorityCount?: number;
}) {
  return (
    <div
      className={cx(
        "grid grid-cols-2 gap-3 sm:gap-4",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "md:grid-cols-3 lg:grid-cols-4",
      )}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}
