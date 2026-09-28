"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { buildOrder, useStore } from "@/components/providers/store-provider";
import { EmptyState, ProductImage } from "@/components/ui/primitives";
import { cx, formatDimensions, formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import { getProductBySlug } from "@/lib/products";

/* ==========================================================================
   CHECKOUT — সহজ ফর্ম, COD, অর্ডার নিশ্চিতকরণ
   ========================================================================== */

const DISTRICTS = [
  "ঢাকা",
  "চট্টগ্রাম",
  "গাজীপুর",
  "নারায়ণগঞ্জ",
  "সিলেট",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "রংপুর",
  "ময়মনসিংহ",
  "কুমিল্লা",
  "বগুড়া",
  "যশোর",
  "নোয়াখালী",
  "অন্য জেলা",
];

interface FormState {
  name: string;
  phone: string;
  address: string;
  areaBn: string;
  districtBn: string;
  note: string;
  payment: "cod" | "bank";
}

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  address: "",
  areaBn: "",
  districtBn: "ঢাকা",
  note: "",
  payment: "cod",
};

function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    lines,
    hydrated,
    subtotal,
    deliveryCharge,
    total,
    deliveryZone,
    setDeliveryZone,
    addLine,
    clearCart,
    saveOrder,
  } = useStore();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [placing, setPlacing] = useState(false);

  /* “এখনই অর্ডার করুন” থেকে এলে পণ্যটি কার্টে যোগ করা হয় */
  const buySlug = searchParams.get("buy");
  useEffect(() => {
    if (!buySlug || !hydrated) return;
    const product = getProductBySlug(buySlug);
    if (!product) return;
    const alreadyInCart = lines.some((line) => line.productId === product.id);
    if (alreadyInCart) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buySlug, hydrated]);

  const savings = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + Math.max(0, line.originalPrice - line.price) * line.quantity,
        0,
      ),
    [lines],
  );

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 3) next.name = "পুরো নাম লিখুন";
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!/^01\d{9}$/.test(phoneDigits)) next.phone = "সঠিক মোবাইল নম্বর দিন (১১ ডিজিট, 01 দিয়ে শুরু)";
    if (form.address.trim().length < 10) next.address = "সম্পূর্ণ ঠিকানা লিখুন (বাসা/রোড/এলাকা)";
    if (form.areaBn.trim().length < 2) next.areaBn = "এলাকা লিখুন (যেমন: উত্তরা সেক্টর ১১)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate() || lines.length === 0) return;
    setPlacing(true);
    const order = buildOrder({
      lines,
      subtotal,
      deliveryCharge,
      total,
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      areaBn: form.areaBn.trim(),
      districtBn: form.districtBn,
      deliveryZone,
      paymentBn: form.payment === "cod" ? "ক্যাশ অন ডেলিভারি" : "ব্যাংক ট্রান্সফার (ডেমো)",
      note: form.note.trim() || undefined,
    });
    saveOrder(order);
    window.setTimeout(() => {
      clearCart();
      router.push("/order-confirmation");
    }, 500);
  };

  /* ------------------------------ Empty cart ------------------------------ */
  if (hydrated && lines.length === 0) {
    return (
      <div className="container-page py-12 md:py-16">
        <header className="max-w-2xl">
          <h1 className="font-display text-2xl font-semibold md:text-3xl">অর্ডার সম্পন্ন করুন</h1>
        </header>
        <div className="mt-8">
          <EmptyState
            title="কার্টে কোনো পণ্য নেই"
            description="চেকআউট করার আগে অন্তত একটি Furniture কার্টে যোগ করুন।"
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
      <header className="max-w-2xl">
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted" aria-label="breadcrumb">
          <Link href="/cart" className="hover:text-ink">
            কার্ট
          </Link>
          <span aria-hidden="true">/</span>
          <span>অর্ডার সম্পন্ন করুন</span>
        </nav>
        <h1 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
          অর্ডার সম্পন্ন করুন
        </h1>
        <p className="section-sub mt-3">
          মাত্র কয়েকটি তথ্য দিলেই অর্ডার কনফার্ম হয়ে যাবে। ডেমো ওয়েবসাইট — কোনো পেমেন্ট বা ডেটা
          কোথাও পাঠানো হয় না।
        </p>
      </header>

      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10" noValidate>
        {/* ------------------------- Buyer information ------------------------- */}
        <div className="space-y-6">
          <section className="rounded-md border border-ink/8 bg-white p-5">
            <h2 className="text-base font-semibold">ক্রেতার তথ্য</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="name">
                  নাম <span className="text-danger">*</span>
                </label>
                <input
                  id="name"
                  className={cx("field", errors.name && "field-error")}
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="যেমন: রাকিবুল হাসান"
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1 text-[11px] text-danger">{errors.name}</p>}
              </div>

              <div>
                <label className="field-label" htmlFor="phone">
                  মোবাইল নম্বর <span className="text-danger">*</span>
                </label>
                <input
                  id="phone"
                  className={cx("field", errors.phone && "field-error")}
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  placeholder="01XXXXXXXXX"
                  inputMode="tel"
                  autoComplete="tel"
                />
                {errors.phone ? (
                  <p className="mt-1 text-[11px] text-danger">{errors.phone}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-ink-muted">
                    ডেলিভারির আগে এই নম্বরে কল করে কনফার্ম করা হবে।
                  </p>
                )}
              </div>

              <div>
                <label className="field-label" htmlFor="area">
                  এলাকা <span className="text-danger">*</span>
                </label>
                <input
                  id="area"
                  className={cx("field", errors.areaBn && "field-error")}
                  value={form.areaBn}
                  onChange={(event) => setForm({ ...form, areaBn: event.target.value })}
                  placeholder="যেমন: উত্তরা সেক্টর ১১"
                />
                {errors.areaBn && <p className="mt-1 text-[11px] text-danger">{errors.areaBn}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="address">
                  সম্পূর্ণ ঠিকানা <span className="text-danger">*</span>
                </label>
                <textarea
                  id="address"
                  rows={3}
                  className={cx("field resize-y", errors.address && "field-error")}
                  value={form.address}
                  onChange={(event) => setForm({ ...form, address: event.target.value })}
                  placeholder="বাসা/ফ্ল্যাট নম্বর, রোড, ব্লক, ল্যান্ডমার্ক"
                  autoComplete="street-address"
                />
                {errors.address && <p className="mt-1 text-[11px] text-danger">{errors.address}</p>}
              </div>

              <div>
                <label className="field-label" htmlFor="district">
                  জেলা <span className="text-danger">*</span>
                </label>
                <select
                  id="district"
                  className="field"
                  value={form.districtBn}
                  onChange={(event) => {
                    const districtBn = event.target.value;
                    setForm({ ...form, districtBn });
                    setDeliveryZone(districtBn === "ঢাকা" ? "inside" : "outside");
                  }}
                >
                  {DISTRICTS.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="note">
                  অতিরিক্ত নির্দেশনা (ঐচ্ছিক)
                </label>
                <input
                  id="note"
                  className="field"
                  value={form.note}
                  onChange={(event) => setForm({ ...form, note: event.target.value })}
                  placeholder="যেমন: ৪র্থ তলায় লিফট আছে / সকাল ১০টার পর ডেলিভারি"
                />
              </div>
            </div>
          </section>

          {/* ------------------------- Delivery zone ------------------------- */}
          <section className="rounded-md border border-ink/8 bg-white p-5">
            <h2 className="text-base font-semibold">ডেলিভারি</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  {
                    id: "inside" as const,
                    titleBn: "ঢাকার মধ্যে",
                    charge: siteConfig.deliveryChargeInsideDhaka,
                    timeBn: siteConfig.deliveryTimeInsideBn,
                  },
                  {
                    id: "outside" as const,
                    titleBn: "ঢাকার বাইরে",
                    charge: siteConfig.deliveryChargeOutsideDhaka,
                    timeBn: siteConfig.deliveryTimeOutsideBn,
                  },
                ] satisfies {
                  id: "inside" | "outside";
                  titleBn: string;
                  charge: number;
                  timeBn: string;
                }[]
              ).map((option) => (
                <label
                  key={option.id}
                  className={cx(
                    "flex cursor-pointer flex-col rounded-sm border p-3.5 transition",
                    deliveryZone === option.id
                      ? "border-wood-600 bg-wood-50"
                      : "border-ink/12 hover:border-ink/30",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={deliveryZone === option.id}
                      onChange={() => setDeliveryZone(option.id)}
                      className="h-4 w-4 accent-[#7a5a33]"
                    />
                    <span className="text-sm font-semibold">{option.titleBn}</span>
                  </span>
                  <span className="mt-1.5 pl-6 text-xs text-ink-muted">
                    চার্জ {formatPrice(option.charge)} থেকে · {option.timeBn}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-3 rounded-sm bg-linen px-3.5 py-2.5 text-[11px] leading-relaxed text-ink-soft">
              Custom Delivery: {siteConfig.deliveryChargeCustomNoteBn}
            </p>
          </section>

          {/* ------------------------- Payment ------------------------- */}
          <section className="rounded-md border border-ink/8 bg-white p-5">
            <h2 className="text-base font-semibold">পেমেন্ট</h2>
            <div className="mt-4 space-y-3">
              <label
                className={cx(
                  "flex cursor-pointer items-start gap-3 rounded-sm border p-3.5 transition",
                  form.payment === "cod" ? "border-wood-600 bg-wood-50" : "border-ink/12",
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === "cod"}
                  onChange={() => setForm({ ...form, payment: "cod" })}
                  className="mt-0.5 h-4 w-4 accent-[#7a5a33]"
                />
                <span>
                  <span className="block text-sm font-semibold">ক্যাশ অন ডেলিভারি</span>
                  <span className="mt-0.5 block text-xs text-ink-muted">
                    পণ্য হাতে পেয়ে টাকা পরিশোধ করুন — সবচেয়ে জনপ্রিয় বিকল্প।
                  </span>
                </span>
              </label>

              <label
                className={cx(
                  "flex cursor-pointer items-start gap-3 rounded-sm border p-3.5 transition",
                  form.payment === "bank" ? "border-wood-600 bg-wood-50" : "border-ink/12",
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === "bank"}
                  onChange={() => setForm({ ...form, payment: "bank" })}
                  className="mt-0.5 h-4 w-4 accent-[#7a5a33]"
                />
                <span>
                  <span className="block text-sm font-semibold">
                    ব্যাংক ট্রান্সফার / bKash (ডেমো)
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-muted">
                    ডেমো ওয়েবসাইটে কোনো real payment gateway নেই — শুধু উপস্থাপনার জন্য।
                  </span>
                </span>
              </label>
            </div>
          </section>
        </div>

        {/* ------------------------- Order summary ------------------------- */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-md border border-ink/8 bg-white p-5">
            <h2 className="text-base font-semibold">অর্ডার সারাংশ</h2>

            <ul className="mt-4 space-y-3 border-b border-ink/8 pb-4">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3">
                  <ProductImage
                    src={line.image}
                    alt={line.name}
                    fill={false}
                    width={56}
                    height={68}
                    className="h-[68px] w-14 shrink-0 rounded-sm"
                    sizes="56px"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-semibold leading-snug">{line.name}</p>
                    <p className="mt-0.5 text-[11px] text-ink-muted">
                      {[line.colorName, line.fabricName].filter(Boolean).join(" · ")} × {line.quantity}
                    </p>
                  </div>
                  <p className="text-xs font-semibold tabular-nums">
                    {formatPrice(line.price * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-muted">পণ্যের মোট</dt>
                <dd className="font-medium tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">ডেলিভারি</dt>
                <dd className="font-medium tabular-nums">
                  {deliveryCharge === 0 ? "ফ্রি" : formatPrice(deliveryCharge)}
                </dd>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-success">
                  <dt>সাশ্রয়</dt>
                  <dd className="font-medium tabular-nums">−{formatPrice(savings)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-ink/10 pt-3 text-lg">
                <dt className="font-semibold">সর্বমোট</dt>
                <dd className="font-semibold tabular-nums">{formatPrice(total)}</dd>
              </div>
            </dl>

            <button type="submit" disabled={placing} className="btn btn-primary btn-block mt-5">
              {placing ? "অর্ডার নেওয়া হচ্ছে…" : "অর্ডার নিশ্চিত করুন"}
            </button>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-muted">
              অর্ডার নিশ্চিত করলে আপনার তথ্য কোথাও পাঠানো হয় না — এটি একটি ডেমো checkout।
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-12">
          <div className="h-8 w-64 animate-pulse rounded bg-sand" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="h-64 animate-pulse rounded-md bg-sand" />
            <div className="h-64 animate-pulse rounded-md bg-sand" />
          </div>
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
