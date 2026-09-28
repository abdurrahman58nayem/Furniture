import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { SectionHeading } from "@/components/ui/primitives";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "সহায়তা — ডেলিভারি, ওয়ারেন্টি, রিটার্ন ও সাধারণ জিজ্ঞাসা",
  description:
    "WOODORA-র ডেলিভারি চার্জ ও সময়, Installation, ওয়ারেন্টি, রিটার্ন/রিপ্লেসমেন্ট নীতি এবং সাধারণ জিজ্ঞাসার উত্তর — সব বাংলায়।",
  alternates: { canonical: "/support" },
};

const FAQS = [
  {
    q: "Furniture অর্ডার করলে কত দিনে পাব?",
    a: `ঢাকার মধ্যে ${siteConfig.deliveryTimeInsideBn} এবং ঢাকার বাইরে ${siteConfig.deliveryTimeOutsideBn}-এর মধ্যে ডেলিভারি হয়। স্টকে থাকা পণ্য দ্রুত পাঠানো হয়, কাস্টম অর্ডারে অতিরিক্ত সময় লাগতে পারে।`,
  },
  {
    q: "ডেলিভারি চার্জ কত?",
    a: `ঢাকার মধ্যে ${formatPrice(siteConfig.deliveryChargeInsideDhaka)} এবং ঢাকার বাইরে ${formatPrice(siteConfig.deliveryChargeOutsideDhaka)} থেকে শুরু। বড় Furniture (ওয়ারড্রোব, ডাইনিং সেট, বেড) সাইজ অনুযায়ী Custom Delivery চার্জ প্রযোজ্য হতে পারে।`,
  },
  {
    q: "Installation-এর জন্য বাড়তি টাকা লাগে?",
    a: "বেশিরভাগ Furniture-এ Installation ফ্রি। কিছু বড় পণ্যে Installation Charge প্রযোজ্য এবং কিছু ছোট পণ্যে Self Assembly (সহজ নির্দেশনাসহ) — প্রতিটি পণ্যের পেজে এটি স্পষ্ট লেখা থাকে।",
  },
  {
    q: "ওয়ারেন্টি কী কী কভার করে?",
    a: "১ থেকে ২ বছরের ওয়ারেন্টি ম্যানুফ্যাকচারিং ত্রুটি, কাঠামো, জয়েন্ট, ফিটিংস ও ফিনিশের সমস্যা কভার করে। ব্যবহারজনিত ক্ষতি, কাপড়ের স্বাভাবিক ক্ষয় ও ভুল ব্যবহার ওয়ারেন্টির বাইরে।",
  },
  {
    q: "পণ্য পছন্দ না হলে ফেরত দেওয়া যাবে?",
    a: `${siteConfig.returnDaysBn} — পণ্য হাতে পাওয়ার ৭ দিনের মধ্যে জানালে আমরা সমাধান করি। ডেলিভারির সময় কোনো ক্ষতি থাকলে সাথে সাথে ছবি তুলে জানাতে হবে।`,
  },
  {
    q: "ক্যাশ অন ডেলিভারি আছে কি?",
    a: "হ্যাঁ, সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা আছে। ঢাকার বাইরের কিছু ক্ষেত্রে ডেলিভারি চার্জ অগ্রিম দিতে হতে পারে।",
  },
  {
    q: "কাস্টম মাপে Furniture বানানো যায়?",
    a: "যেসব পণ্যে Size পরিবর্তনের অপশন আছে, সেগুলো আপনার ঘরের মাপ অনুযায়ী বানানো যায়। কাস্টম অর্ডারে সাধারণত ১০–২৫ কর্মদিবস লাগে।",
  },
  {
    q: "অর্ডার করতে অ্যাকাউন্ট খুলতে হবে?",
    a: "না। 이름, মোবাইল নম্বর ও ঠিকানা দিলেই অর্ডার সম্পন্ন করা যায়। এটির কারণেই বাংলাদেশি ক্রেতাদের জন্য অর্ডার প্রক্রিয়া সহজ রাখা হয়েছে।",
  },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-linen py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <span className="eyebrow">সহায়তা</span>
          <h1 className="section-title mt-3">আমরা কীভাবে সাহায্য করতে পারি?</h1>
          <p className="section-sub mt-3">
            ডেলিভারি, Installation, ওয়ারেন্টি, রিটার্ন বা অর্ডার — যেকোনো প্রশ্নে আমাদের টিম সাথে
            আছে।
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              WhatsApp: {siteConfig.whatsappDisplayNumber}
            </a>
            <a
              href={`tel:+88${siteConfig.phone.replace(/^0/, "")}`}
              className="btn btn-outline"
            >
              ফোন: {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="btn btn-outline">
              ইমেইল করুন
            </a>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="border-b border-ink/8 bg-white">
        <div className="container-page hide-scrollbar flex gap-2 overflow-x-auto py-4">
          {[
            { href: "#delivery", labelBn: "ডেলিভারি" },
            { href: "#installation", labelBn: "Installation" },
            { href: "#warranty", labelBn: "ওয়ারেন্টি" },
            { href: "#returns", labelBn: "রিটার্ন" },
            { href: "#faq", labelBn: "সাধারণ জিজ্ঞাসা" },
            { href: "#contact", labelBn: "যোগাযোগ" },
            { href: "#about", labelBn: "আমাদের সম্পর্কে" },
            { href: "#privacy", labelBn: "প্রাইভেসি পলিসি" },
            { href: "#terms", labelBn: "শর্তাবলী" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-ink/12 bg-cream px-3.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-ink/30 hover:text-ink"
            >
              {item.labelBn}
            </a>
          ))}
        </div>
      </section>

      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* -------- Main info blocks -------- */}
          <div className="space-y-10">
            {/* Delivery */}
            <section id="delivery" className="scroll-mt-28">
              <SectionHeading eyebrow="ডেলিভারি তথ্য" title="ডেলিভারি তথ্য" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-ink/8 bg-white p-4">
                  <p className="text-sm font-semibold">ঢাকার মধ্যে</p>
                  <p className="mt-1 font-display text-xl font-semibold text-brass-dark">
                    {formatPrice(siteConfig.deliveryChargeInsideDhaka)}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {siteConfig.deliveryTimeInsideBn}
                  </p>
                </div>
                <div className="rounded-md border border-ink/8 bg-white p-4">
                  <p className="text-sm font-semibold">ঢাকার বাইরে</p>
                  <p className="mt-1 font-display text-xl font-semibold text-brass-dark">
                    {formatPrice(siteConfig.deliveryChargeOutsideDhaka)}+
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {siteConfig.deliveryTimeOutsideBn}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
                <p>
                  Furniture সাইজ ও ওজনের কারণে ডেলিভারি চার্জ পরিবর্তিত হতে পারে। বড় পণ্যের ক্ষেত্রে
                  আমাদের টিম অর্ডারের পর কল করে চার্জ কনফার্ম করে।
                </p>
                <p className="rounded-sm bg-linen px-3.5 py-3 text-xs">
                  Custom Delivery: {siteConfig.deliveryChargeCustomNoteBn}
                </p>
                <p>
                  {formatPrice(siteConfig.freeDeliveryAbove)} এবং তার বেশি মূল্যের অর্ডারে ডেলিভারি
                  ফ্রি।
                </p>
              </div>
            </section>

            {/* Installation */}
            <section id="installation" className="scroll-mt-28">
              <SectionHeading eyebrow="Installation" title="Installation তথ্য" />
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
                <p>
                  বেশিরভাগ Furniture-এ <strong className="text-ink">ফ্রি Installation</strong> — ডেলিভারির
                  সময়ই আমাদের প্রশিক্ষিত টিম পণ্য বসিয়ে, ফিট করে ও প্যাকিং সরিয়ে নিয়ে যায়।
                </p>
                <ul className="space-y-2">
                  <li>• বড় পণ্য (Wardrobe, Dining Set, Bed): ফ্রি ইনস্টলেশন, প্রয়োজনে ২ জন টেকনিশিয়ান</li>
                  <li>• ছোট পণ্য (Shoe Rack, Wall Shelf): সহজ Self Assembly — বাংলা নির্দেশনা ও টুলস দেওয়া হয়</li>
                  <li>• কিছু পণ্যে Installation Charge প্রযোজ্য — পণ্যের পেজে স্পষ্ট লেখা থাকে</li>
                </ul>
              </div>
            </section>

            {/* Warranty */}
            <section id="warranty" className="scroll-mt-28">
              <SectionHeading eyebrow="ওয়ারেন্টি" title="ওয়ারেন্টি তথ্য" />
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
                <p>{siteConfig.warrantyBn} — ম্যানুফ্যাকচারিং ত্রুটির জন্য বিক্রয়োত্তর সেবা দেওয়া হয়।</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md border border-success/25 bg-success/[0.06] p-4">
                    <p className="text-xs font-semibold text-success">কভার করা হয়</p>
                    <ul className="mt-2 space-y-1 text-xs text-ink-soft">
                      <li>• কাঠামো ও জয়েন্টের সমস্যা</li>
                      <li>• ফিটিংস, হিঞ্জ, চ্যানেল</li>
                      <li>• ফিনিশ ও ম্যানুফ্যাকচারিং ত্রুটি</li>
                    </ul>
                  </div>
                  <div className="rounded-md border border-danger/25 bg-danger/[0.05] p-4">
                    <p className="text-xs font-semibold text-danger">কভার করা হয় না</p>
                    <ul className="mt-2 space-y-1 text-xs text-ink-soft">
                      <li>• ব্যবহারজনিত ক্ষতি বা দুর্ঘটনা</li>
                      <li>• কাপড়ের স্বাভাবিক ক্ষয়</li>
                      <li>• ভুল ব্যবহারে সৃষ্ট ক্ষতি</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Returns */}
            <section id="returns" className="scroll-mt-28">
              <SectionHeading eyebrow="রিটার্ন" title="রিটার্ন ও রিপ্লেসমেন্ট" />
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
                <p>
                  পণ্য হাতে পাওয়ার সময় সমস্যা থাকলে সাথে সাথে ডেলিভারি টিমকে জানান। এরপর ৭ দিনের
                  মধ্যে আমাদের হটলাইন বা WhatsApp-এ জানালে আমরা সমাধান করি।
                </p>
                <ol className="space-y-2">
                  <li>১. সমস্যার ছবি তুলে WhatsApp-এ পাঠান</li>
                  <li>২. আমাদের টিম পণ্য যাচাই করবে</li>
                  <li>৩. প্রয়োজনে মেরামত, পরিবর্তন বা রিফান্ড দেওয়া হবে</li>
                </ol>
                <p className="text-xs text-ink-muted">
                  কাস্টম অর্ডার করা Furniture রিটার্নযোগ্য নয় (আলাদা মাপে তৈরি হওয়ায়)।
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-28">
              <SectionHeading eyebrow="FAQ" title="সাধারণ জিজ্ঞাসা" />
              <div className="mt-5 divide-y divide-ink/8 overflow-hidden rounded-md border border-ink/8 bg-white">
                {FAQS.map((faq) => (
                  <details key={faq.q} className="group">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-4 text-sm font-semibold text-ink marker:content-none">
                      {faq.q}
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linen text-ink-soft transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="px-4 pb-4 text-sm leading-relaxed text-ink-soft">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* About */}
            <section id="about" className="scroll-mt-28">
              <SectionHeading eyebrow="আমাদের সম্পর্কে" title={`${siteConfig.brandName} সম্পর্কে`} />
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
                <p>
                  {siteConfig.brandName} — {siteConfig.brandTagline}। বাংলাদেশের ঘর ও আবহাওয়ার কথা
                  ভেবে তৈরি Furniture: কিলন-ড্রাইড কাঠ, আর্দ্রতা সহনশীল বোর্ড এবং দীর্ঘস্থায়ী ফিনিশ।
                </p>
                <p>
                  {siteConfig.addressLine} · {siteConfig.hoursBn}
                </p>
                <p className="rounded-sm bg-linen px-3.5 py-3 text-xs">
                  {siteConfig.agency.noticeBn} এই ওয়েবসাইটটির ডিজাইন ও ডেভেলপমেন্ট করেছে{" "}
                  <strong className="font-semibold text-ink">{siteConfig.agency.name}</strong>।
                </p>
              </div>
            </section>

            {/* Privacy */}
            <section id="privacy" className="scroll-mt-28">
              <SectionHeading eyebrow="প্রাইভেসি" title="প্রাইভেসি পলিসি (ডেমো)" />
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
                <p>
                  এটি একটি ডেমো Website। চেকআউট ফর্মে দেওয়া নাম, মোবাইল নম্বর বা ঠিকানা কোনো সার্ভারে
                  পাঠানো হয় না — শুধু আপনার ব্রাউজারে (localStorage) সংরক্ষিত থাকে, যাতে অর্ডার
                  কনফার্মেশনের পেজটি দেখানো যায়।
                </p>
                <p>
                  কার্ট, পছন্দের তালিকা ও অর্ডার তথ্য আপনি ব্রাউজার ডেটা মুছে ফেললেই মুছে যাবে।
                </p>
              </div>
            </section>

            {/* Terms */}
            <section id="terms" className="scroll-mt-28">
              <SectionHeading eyebrow="শর্তাবলী" title="শর্তাবলী (ডেমো)" />
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
                <ul className="space-y-2">
                  <li>• এখানে দেখানো সব পণ্য, দাম, ছবি ও অফার কাল্পনিক ডেমো তথ্য।</li>
                  <li>• কোনো real payment gateway, courier API বা ডেটাবেস ব্যবহার করা হয়নি।</li>
                  <li>• অর্ডার নম্বর ডেমো উপস্থাপনার জন্য তৈরি।</li>
                  <li>• WhatsApp বাটন প্রকৃত WhatsApp চ্যাট খোলে — সেটিই একমাত্র কার্যকর যোগাযোগমাধ্যম।</li>
                </ul>
              </div>
            </section>
          </div>

          {/* -------- Sidebar: contact -------- */}
          <aside id="contact" className="scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-md border border-ink/8 bg-white p-5">
              <h2 className="text-base font-semibold">যোগাযোগ</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <p className="text-xs uppercase tracking-wide text-ink-muted">WhatsApp</p>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-semibold text-ink hover:text-brass-dark"
                  >
                    {siteConfig.whatsappDisplayNumber}
                  </a>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-wide text-ink-muted">ফোন</p>
                  <a
                    href={`tel:+88${siteConfig.phone.replace(/^0/, "")}`}
                    className="mt-1 block font-semibold text-ink hover:text-brass-dark"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-wide text-ink-muted">ইমেইল</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1 block font-semibold text-ink hover:text-brass-dark"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-wide text-ink-muted">শোরুম</p>
                  <p className="mt-1 leading-relaxed text-ink-soft">{siteConfig.addressLine}</p>
                  <p className="mt-1 text-xs text-ink-muted">{siteConfig.hoursBn}</p>
                </li>
              </ul>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-block mt-5"
              >
                WhatsApp-এ মেসেজ দিন
              </a>
            </div>

            <div className="mt-4 rounded-md border border-ink/8 bg-cream/70 p-5">
              <p className="text-sm font-semibold">দ্রুত লিংক</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>
                  <Link href="/shop" className="hover:text-ink">
                    সব Furniture দেখুন
                  </Link>
                </li>
                <li>
                  <Link href="/offers" className="hover:text-ink">
                    আজকের অফার
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-ink">
                    Complete Room Collection
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-ink">
                    আপনার কার্ট
                  </Link>
                </li>
              </ul>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-ink-muted">
              {siteConfig.agency.creditLine} · {siteConfig.agency.tagline}
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
