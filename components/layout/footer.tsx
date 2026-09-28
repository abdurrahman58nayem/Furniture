import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { AgencyCredit } from "@/components/layout/whatsapp-button";
import { departments } from "@/lib/catalog";

/* ==========================================================================
   FOOTER — সহায়তা, যোগাযোগ ও তথ্য (সব বাংলায়)
   ========================================================================== */
export function Footer() {
  const info = siteConfig.footerInformation;

  return (
    <footer className="mt-20 border-t border-ink/10 bg-linen">
      {/* ---------------- Trust row ---------------- */}
      <div className="border-b border-ink/8">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              titleBn: "সারা দেশে ডেলিভারি",
              detailBn: "ঢাকায় ৩–৭ কর্মদিবস · ঢাকার বাইরে ৫–১০ কর্মদিবস",
            },
            {
              titleBn: "ফ্রি Installation",
              detailBn: "নির্বাচিত Furniture-এ ডেলিভারির সময়ই সেটআপ",
            },
            {
              titleBn: siteConfig.warrantyBn,
              detailBn: "ম্যানুফ্যাকচারিং সমস্যায় বিক্রয়োত্তর সেবা",
            },
            {
              titleBn: "ক্যাশ অন ডেলিভারি",
              detailBn: "পণ্য হাতে পেয়ে টাকা পরিশোধের সুবিধা",
            },
          ].map((item) => (
            <div key={item.titleBn}>
              <p className="text-sm font-semibold text-ink">{item.titleBn}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{item.detailBn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Links ---------------- */}
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="font-display text-xl font-semibold tracking-[0.2em] text-ink">
            {siteConfig.brandName}
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            {siteConfig.brandTagline} — বাংলাদেশের ঘরের জন্য তৈরি প্রিমিয়াম ও টেকসই Furniture।
          </p>
          <div className="mt-5 space-y-1.5 text-sm text-ink-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              যোগাযোগ
            </p>
            <a href={`tel:+88${siteConfig.phone.replace(/^0/, "")}`} className="block hover:text-ink">
              ফোন: {siteConfig.phoneDisplay}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-ink"
            >
              WhatsApp: {siteConfig.whatsappDisplayNumber}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="block hover:text-ink">
              ইমেইল: {siteConfig.email}
            </a>
            <p>বাংলাদেশ · {siteConfig.hoursBn}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {info.shopTitleBn}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {info.shopLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-ink">
                  {link.labelBn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {info.helpTitleBn}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {info.helpLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-ink">
                  {link.labelBn}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {info.legalTitleBn}
          </p>
          <ul className="mt-3 space-y-2.5 text-sm text-ink-soft">
            {info.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-ink">
                  {link.labelBn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            ঘর অনুযায়ী কিনুন
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {[
              { href: "/rooms/living-room", labelBn: "বসার ঘর" },
              { href: "/rooms/bedroom", labelBn: "শোবার ঘর" },
              { href: "/rooms/dining", labelBn: "ডাইনিং" },
              { href: "/rooms/home-office", labelBn: "হোম অফিস" },
              { href: "/rooms/balcony", labelBn: "বারান্দা" },
              { href: "/rooms/small-space", labelBn: "ছোট জায়গার জন্য" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-ink">
                  {link.labelBn}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {siteConfig.socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-ink/12 bg-white px-2.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-ink/30 hover:text-ink"
              >
                {social.labelBn}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Category strip ---------------- */}
      <div className="border-t border-ink/8">
        <div className="container-page flex flex-wrap gap-x-5 gap-y-2 py-5 text-xs text-ink-muted">
          {departments.map((department) => (
            <Link
              key={department.slug}
              href={`/category/${department.slug}`}
              className="transition hover:text-ink"
            >
              {department.titleBn} — {department.subtitleBn}
            </Link>
          ))}
        </div>
      </div>

      {/* ---------------- Bottom ---------------- */}
      <div className="border-t border-ink/8 bg-cream">
        <div className="container-page flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs text-ink-muted">
              © {new Date().getFullYear()} {siteConfig.brandName}. সর্বস্বত্ব সংরক্ষিত।
            </p>
            <AgencyCredit />
          </div>
          <div className="flex flex-col gap-1 md:items-end">
            <p className="text-[11px] text-ink-muted">{siteConfig.agency.noticeFooterBn}</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-brass-dark underline-offset-4 hover:underline"
            >
              {siteConfig.whatsappCta}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
