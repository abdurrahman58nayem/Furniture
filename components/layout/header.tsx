"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { departments } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";
import { cx } from "@/lib/format";
import { searchSuggestions } from "@/lib/products";
import { useStore } from "@/components/providers/store-provider";
import { formatPrice, discountPercent } from "@/lib/format";
import { ProductImage } from "@/components/ui/primitives";

/* ==========================================================================
   HEADER — Sticky, mobile-first, বাংলা navigation
   ========================================================================== */

const NAV_LINKS = [
  { href: "/", labelBn: "হোম" },
  ...departments.map((department) => ({
    href: `/category/${department.slug}`,
    labelBn: department.titleBn,
  })),
  { href: "/offers", labelBn: "অফার" },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % siteConfig.announcements.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-ink text-cream">
      <div className="container-page flex h-9 items-center justify-center gap-3 text-[12px] md:text-xs">
        <span className="hidden text-cream/60 md:inline">✆ {siteConfig.phoneDisplay}</span>
        <span className="hidden h-3 w-px bg-cream/25 md:inline" aria-hidden="true" />
        <div className="relative h-9 flex-1 overflow-hidden md:flex-none">
          {siteConfig.announcements.map((announcement, itemIndex) => (
            <p
              key={announcement}
              className={cx(
                "absolute inset-0 flex items-center justify-center tracking-wide transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
                itemIndex === index
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0",
              )}
            >
              {announcement}
            </p>
          ))}
        </div>
        <Link
          href="/support#delivery"
          className="hidden text-cream/60 underline-offset-4 hover:text-cream hover:underline md:inline"
        >
          ডেলিভারি তথ্য
        </Link>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const { totalItems, openCart, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <AnnouncementBar />
      <header
        className={cx(
          "sticky top-0 z-50 border-b bg-cream/95 backdrop-blur-sm transition-shadow duration-300",
          scrolled ? "border-ink/10 shadow-[0_10px_30px_-24px_rgba(29,26,22,.45)]" : "border-transparent",
        )}
      >
        <div className="container-page">
          {/* ---------- Mobile top row ---------- */}
          <div className="flex h-16 items-center justify-between gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="মেনু খুলুন"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-ink/12 bg-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <Link href="/" className="flex flex-col items-center leading-none">
              <span className="font-display text-xl font-semibold tracking-[0.22em] text-ink">
                WOODORA
              </span>
              <span className="mt-0.5 text-[9.5px] tracking-wide text-ink-muted">
                {siteConfig.brandTagline}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="পণ্য খুঁজুন"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-ink/12 bg-white"
              >
                <SearchIcon />
              </button>
              <CartButton count={totalItems} onClick={openCart} />
            </div>
          </div>

          {/* ---------- Mobile search field ---------- */}
          <div className="pb-3 md:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center gap-2 rounded-sm border border-ink/12 bg-white px-3.5 py-2.5 text-left text-sm text-ink-muted"
            >
              <SearchIcon className="text-wood-500" />
              পণ্য খুঁজুন — Sofa, Bed, Dining Table…
            </button>
          </div>

          {/* ---------- Desktop rows ---------- */}
          <div className="hidden items-center justify-between gap-6 py-4 md:flex">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-display text-2xl font-semibold tracking-[0.24em] text-ink">
                WOODORA
              </span>
              <span className="mt-1 text-[10px] tracking-[0.12em] text-ink-muted uppercase">
                {siteConfig.brandTagline}
              </span>
            </Link>

            <nav aria-label="প্রধান মেনু" className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cx(
                      "relative px-3 py-2 text-sm font-medium transition-colors",
                      active ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {link.labelBn}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-px bg-brass" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-10 items-center gap-2 rounded-sm border border-ink/12 bg-white px-3 text-sm text-ink-muted transition hover:border-ink/25"
              >
                <SearchIcon className="text-wood-500" />
                পণ্য খুঁজুন
              </button>
              <Link
                href="/wishlist"
                aria-label="পছন্দের তালিকা"
                className="relative flex h-10 w-10 items-center justify-center rounded-sm border border-ink/12 bg-white transition hover:border-ink/25"
              >
                <HeartIcon />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brass px-1 text-[10px] font-semibold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={openCart}
                className="flex h-10 items-center gap-2 rounded-sm bg-ink px-4 text-sm font-semibold text-cream transition hover:bg-wood-800"
              >
                <CartIcon />
                কার্ট
                {totalItems > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brass px-1 text-[10px] font-semibold text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

/* ------------------------------ Mobile menu ------------------------------ */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cx(
        "fixed inset-0 z-[60] md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cx(
          "absolute inset-0 bg-ink/45 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cx(
          "absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-cream shadow-lift transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-label="মোবাইল মেনু"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <span className="font-display text-lg font-semibold tracking-[0.2em]">WOODORA</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="মেনু বন্ধ করুন"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-ink/12 bg-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-sm px-3 py-3 text-[15px] font-medium text-ink-soft transition hover:bg-white hover:text-ink"
                >
                  {link.labelBn}
                  <ChevronIcon />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-ink/10 pt-4">
            <p className="eyebrow px-3">ঘর অনুযায়ী</p>
            <ul className="mt-2 space-y-1">
              {[
                { href: "/rooms/living-room", labelBn: "বসার ঘর" },
                { href: "/rooms/bedroom", labelBn: "শোবার ঘর" },
                { href: "/rooms/dining", labelBn: "ডাইনিং" },
                { href: "/rooms/home-office", labelBn: "হোম অফিস" },
                { href: "/rooms/balcony", labelBn: "বারান্দা" },
                { href: "/rooms/small-space", labelBn: "ছোট জায়গার জন্য" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-sm px-3 py-2.5 text-sm text-ink-soft transition hover:bg-white hover:text-ink"
                  >
                    {link.labelBn}
                    <ChevronIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="border-t border-ink/10 px-5 py-4">
          <a
            href={`tel:+88${siteConfig.phone.replace(/^0/, "")}`}
            className="flex items-center gap-3 text-sm font-medium text-ink-soft"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-wood-600">
              ✆
            </span>
            {siteConfig.phoneDisplay}
          </a>
          <p className="mt-3 text-xs text-ink-muted">{siteConfig.hoursBn}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Search ------------------------------ */
function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchSuggestions(query, 5);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(timer);
    }
    setQuery("");
  }, [open]);

  const submit = (value: string) => {
    if (!value.trim()) return;
    onClose();
    window.location.href = `/search?q=${encodeURIComponent(value.trim())}`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-ink/50 animate-fade-in" onClick={onClose} />
      <div className="absolute inset-x-0 top-0 bg-cream shadow-lift animate-fade-up">
        <div className="container-page py-5">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submit(query);
            }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-wood-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveIndex((index) => Math.min(index + 1, results.length - 1));
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActiveIndex((index) => Math.max(index - 1, 0));
                  }
                  if (event.key === "Enter" && results[activeIndex]) {
                    event.preventDefault();
                    submit(results[activeIndex].name);
                  }
                }}
                placeholder="পণ্য খুঁজুন — Sofa, Bed, Dining Table, Wardrobe…"
                className="field pl-11 text-base"
                aria-label="পণ্য খুঁজুন"
              />
            </div>
            <button type="button" onClick={onClose} className="btn btn-outline btn-sm md:hidden">
              বন্ধ
            </button>
          </form>

          <div className="mt-4">
            {query.trim().length < 2 ? (
              <div>
                <p className="eyebrow">জনপ্রিয় খোঁজ</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Sofa", "Bed", "Dining Table", "Wardrobe", "Office Table", "Shoe Rack", "আয়না"].map(
                    (term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => submit(term)}
                        className="rounded-full border border-ink/12 bg-white px-3.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-ink/30 hover:text-ink"
                      >
                        {term}
                      </button>
                    ),
                  )}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="py-6 text-center text-sm text-ink-muted">
                “{query}” — এর জন্য কোনো পণ্য পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজুন।
              </p>
            ) : (
              <ul className="divide-y divide-ink/8">
                {results.map((product, index) => (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cx(
                        "flex items-center gap-3 py-3 transition",
                        index === activeIndex ? "bg-white/70" : "",
                      )}
                    >
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        fill={false}
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-sm"
                        sizes="56px"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{product.name}</span>
                        <span className="block truncate text-xs text-ink-muted">
                          {product.nameBn}
                        </span>
                      </span>
                      <span className="text-right">
                        <span className="block text-sm font-semibold">
                          {formatPrice(product.price)}
                        </span>
                        {discountPercent(product.price, product.originalPrice) > 0 && (
                          <span className="block text-[11px] text-danger">
                            {discountPercent(product.price, product.originalPrice)}% ছাড়
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Icons ------------------------------ */
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16.5 16.5 3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 5h2.2l2.3 10.2A2 2 0 0 0 9.46 17h8.3a2 2 0 0 0 1.96-1.6L21 8H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-ink-muted">
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="কার্ট দেখুন"
      className="relative flex h-10 w-10 items-center justify-center rounded-sm border border-ink/12 bg-white"
    >
      <CartIcon />
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brass px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
