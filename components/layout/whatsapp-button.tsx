"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { cx } from "@/lib/format";

/**
 * Floating WhatsApp button + CodePixel Web CTA
 * — ছোট, পরিষ্কার, mobile screen ঢাকে না, subtle animation সহ।
 * — সব তথ্য lib/site-config.ts থেকে আসে (কোথাও hardcode নেই)।
 */
export function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const showCta = mounted && !dismissed;

  return (
    <div className="pointer-events-none fixed inset-x-3 bottom-3 z-[55] flex justify-end md:inset-x-auto md:right-6 md:bottom-6">
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        {/* CTA bubble — ছোট, dismissible */}
        <div
          className={cx(
            "relative max-w-[15rem] rounded-lg border border-ink/10 bg-white/97 px-3.5 py-2.5 pr-7 shadow-card backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
            showCta ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="বার্তা বন্ধ করুন"
            className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-ink-muted transition hover:text-ink"
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
          <p className="text-[11.5px] font-semibold leading-snug text-ink">
            {siteConfig.whatsappCta}
          </p>
          <p className="mt-0.5 text-[10.5px] leading-snug text-ink-muted">
            {siteConfig.agency.name} · {siteConfig.whatsappDisplayNumber}
          </p>
        </div>

        {/* WhatsApp button */}
        <a
          href={whatsappUrl(siteConfig.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp-এ মেসেজ দিন"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-105 md:h-14 md:w-14"
          style={{ animation: "softPulse 3.2s ease-out infinite" }}
        >
          <svg width="27" height="27" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.86 9.86 0 0 0 4.68 1.2h.01c5.43 0 9.84-4.4 9.84-9.84A9.78 9.78 0 0 0 12.04 2Zm0 17.94h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.09.81.83-3.02-.2-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.52 3.68-8.19 8.2-8.19a8.16 8.16 0 0 1 8.18 8.2c0 4.51-3.67 8.17-8.19 8.17Zm4.5-6.13c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.66.81-.81.97-.15.17-.3.19-.55.07-.25-.13-1.06-.4-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.01-.39.11-.51.11-.11.25-.3.37-.45.13-.15.17-.25.25-.42.09-.17.04-.31-.02-.44-.06-.12-.55-1.34-.75-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.17.86 2.31.98 2.47.12.17 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.11-.23-.17-.48-.29Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/** Footer-এ CodePixel Web attribution — subtle থাকবে */
export function AgencyCredit() {
  return (
    <p className="text-xs text-ink-muted">
      <span className="font-medium text-ink-soft">{siteConfig.agency.creditLine}</span>
      <span className="mx-2 text-stone/60" aria-hidden="true">
        ·
      </span>
      {siteConfig.agency.noticeBn}
    </p>
  );
}

/** ছোট inline CTA — service pages ও collection-এ ব্যবহৃত */
export function AgencyInlineCta({ className }: { className?: string }) {
  return (
    <Link
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex items-center gap-2 text-sm font-medium text-brass-dark underline-offset-4 hover:underline",
        className,
      )}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.86 9.86 0 0 0 4.68 1.2c5.43 0 9.84-4.4 9.84-9.84A9.78 9.78 0 0 0 12.04 2Z" />
      </svg>
      {siteConfig.whatsappCta}
    </Link>
  );
}
