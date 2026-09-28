"use client";

import Image from "next/image";
import { useState } from "react";
import { cx } from "@/lib/format";

/* ==========================================================================
   ছোট ব্যবহারযোগ্য UI প্রিমিটিভ — পুরো Website জুড়ে reuse হয়
   ========================================================================== */

/* --------------------------- Star rating --------------------------- */
export function StarRating({
  rating,
  size = 14,
  showValue = false,
  count,
  className,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4;
  return (
    <span className={cx("inline-flex items-center gap-1", className)}>
      <span className="inline-flex items-center" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = index < full;
          const half = !filled && index === full && hasHalf;
          return (
            <svg
              key={index}
              width={size}
              height={size}
              viewBox="0 0 20 20"
              className={filled || half ? "text-brass" : "text-beige"}
            >
              {half ? (
                <>
                  <defs>
                    <linearGradient id={`half-${index}-${rating}`}>
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path
                    fill={`url(#half-${index}-${rating})`}
                    stroke="currentColor"
                    strokeWidth="1"
                    d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"
                  />
                </>
              ) : (
                <path
                  fill={filled ? "currentColor" : "transparent"}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"
                />
              )}
            </svg>
          );
        })}
      </span>
      {showValue && <span className="text-xs font-semibold text-ink-soft">{rating.toFixed(1)}</span>}
      {typeof count === "number" && (
        <span className="text-xs text-ink-muted">({count})</span>
      )}
      <span className="sr-only">{rating} out of 5</span>
    </span>
  );
}

/* --------------------------- Scroll reveal --------------------------- */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const [visible, setVisible] = useState(false);
  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        if (!node || visible) return;
        if (typeof IntersectionObserver === "undefined") {
          setVisible(true);
          return;
        }
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
              }
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
        );
        observer.observe(node);
      }}
      className={cx("reveal", className)}
      data-visible={visible ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* --------------------------- Section heading --------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow && (
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-brass/60" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h2 className="section-title text-balance">{title}</h2>
        {subtitle && <p className="section-sub mt-3 text-pretty">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* --------------------------- Product image --------------------------- */
/**
 * কালার/ফ্যাব্রিক বদলালে ইমেজের উপর একটি হালকা overlay বসে —
 * ফলে ডেমোতে color/finish পরিবর্তন চোখে ধরা পড়ে।
 */
export function ProductImage({
  src,
  alt,
  overlay,
  overlayOpacity = 0,
  className,
  sizes,
  priority = false,
  fill = true,
  width,
  height,
  imageClassName,
}: {
  src: string;
  alt: string;
  overlay?: string;
  overlayOpacity?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  imageClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span className={cx("relative block overflow-hidden bg-linen", className)}>
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width, height })}
        sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        onLoad={() => setLoaded(true)}
        className={cx(
          "object-cover transition-all duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)]",
          loaded ? "scale-100 opacity-100 blur-0" : "scale-[1.02] opacity-0 blur-sm",
          imageClassName,
        )}
      />
      {overlay && overlayOpacity > 0 && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundColor: overlay,
            opacity: overlayOpacity,
            mixBlendMode: "multiply",
          }}
        />
      )}
    </span>
  );
}

/* --------------------------- Quantity stepper --------------------------- */
export function QuantityStepper({
  value,
  onChange,
  max = 10,
  size = "md",
  label = "পরিমাণ",
}: {
  value: number;
  onChange: (next: number) => void;
  max?: number;
  size?: "sm" | "md";
  label?: string;
}) {
  const btn =
    "flex items-center justify-center border border-ink/12 bg-white text-ink transition hover:border-ink/30 hover:bg-linen disabled:opacity-40";
  const dimension = size === "sm" ? "h-8 w-8 text-sm" : "h-10 w-10";
  return (
    <div className="inline-flex items-center overflow-hidden rounded-sm" role="group" aria-label={label}>
      <button
        type="button"
        className={cx(btn, dimension, "rounded-l-sm")}
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label="কমান"
      >
        −
      </button>
      <span
        className={cx(
          "flex items-center justify-center border-y border-ink/12 bg-white font-semibold tabular-nums",
          size === "sm" ? "h-8 w-9 text-sm" : "h-10 w-12",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        className={cx(btn, dimension, "rounded-r-sm")}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="বাড়ান"
      >
        +
      </button>
    </div>
  );
}

/* --------------------------- Stock badge --------------------------- */
export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) {
    return <span className="badge badge-out">স্টকে নেই</span>;
  }
  if (stock <= 5) {
    return <span className="badge badge-low">স্টকে আছে — মাত্র {stock} পিস</span>;
  }
  return <span className="badge badge-in">স্টকে আছে</span>;
}

/* --------------------------- Delivery indicator --------------------------- */
export function DeliveryIndicator({ timeBn }: { timeBn: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-wood-500">
        <path
          d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      ডেলিভারি {timeBn}
    </span>
  );
}

/* --------------------------- Empty state --------------------------- */
export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="panel flex flex-col items-center gap-4 px-6 py-14 text-center">
      {icon ?? (
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-wood-500">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 10.5 12 4l8 6.5V20H4z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path d="M9.5 20v-6h5v6" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      )}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="section-sub mt-2 max-w-md">{description}</p>
      </div>
      {action}
    </div>
  );
}
