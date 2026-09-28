import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

/* ==========================================================================
   HERO — Website-এর সবচেয়ে premium অংশ
   ========================================================================== */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-wood-900">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-living-room.jpg"
          alt="WOODORA — আধুনিক ও আরামদায়ক বসার ঘর"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/70 to-ink/25 md:from-ink/82 md:via-ink/55 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent md:from-ink/40" />
      </div>

      <div className="container-page relative py-16 md:py-24 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow text-brass-light animate-fade-up">
            <span className="h-px w-8 bg-brass-light/70" aria-hidden="true" />
            {siteConfig.established} সাল থেকে · বাংলাদেশ
          </p>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.15] text-cream animate-fade-up sm:text-5xl lg:text-[3.4rem]">
            <span className="block tracking-[0.14em]">WOODORA</span>
            <span className="bn mt-3 block text-[1.65rem] font-semibold leading-snug sm:text-[2rem] lg:text-[2.15rem]">
              আপনার ঘরকে দিন নতুন পরিচয়
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/85 animate-fade-up sm:text-base">
            আধুনিক ডিজাইন, মানসম্মত উপকরণ এবং আপনার জীবনযাপনের জন্য তৈরি Furniture।
          </p>

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up">
            <Link href="/shop" className="btn btn-light btn-lg">
              Furniture দেখুন
            </Link>
            <Link
              href="/offers"
              className="btn btn-lg border border-cream/35 bg-cream/10 text-cream backdrop-blur-sm hover:bg-cream/20"
            >
              অফার দেখুন
            </Link>
          </div>

          {/* Hero trust points */}
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-cream/15 pt-6">
            {[
              { value: "ফ্রি", label: "Installation" },
              { value: "৩–৭", label: "কর্মদিবসে ডেলিভারি" },
              { value: "১ বছর", label: "ওয়ারেন্টি" },
            ].map((item) => (
              <div key={item.label}>
                <dt className="font-display text-xl font-semibold text-cream">{item.value}</dt>
                <dd className="mt-0.5 text-[11px] leading-snug text-cream/70">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Bottom fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
