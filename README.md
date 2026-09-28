# WOODORA — Premium Furniture E-commerce Demo (Bangladesh)

> **আপনার ঘর, আপনার স্টাইল**
> একটি Premium Furniture E-commerce Demo Website — বাংলাদেশি Furniture market-এর জন্য তৈরি।
> Demo Website by **[CodePixel Web](https://wa.me/8801876892958)**

---

## 🎯 প্রজেক্টের উদ্দেশ্য

এটি একটি **Demo Website** যা সম্ভাব্য Client-কে দেখায় যে বাংলাদেশে একটি Furniture Business-এর
জন্য কী ধরনের Premium, Modern, Trustworthy, Mobile-first এবং Conversion-focused E-commerce
Website তৈরি করা যায়।

- ❌ Real payment gateway নেই
- ❌ Real courier API নেই
- ❌ Real database / auth / order management নেই
- ✅ Frontend experience production-level
- ✅ WhatsApp button **প্রকৃত WhatsApp চ্যাট খোলে**

---

## 🚀 চালানো (Getting Started)

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # production server
npm run typecheck  # TypeScript check
```

**Vercel-এ deploy:** repo import করলেই হবে — কোনো environment variable লাগে না।

---

## 🧱 Technology

| Layer | ব্যবহার |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| UI | React 19 + Tailwind CSS v4 |
| Fonts | Self-hosted (Hind Siliguri, Inter, Cormorant Garamond) — external request নেই |
| Images | next/image (AVIF/WebP, lazy loading, blur reveal) |
| Icons | inline SVG (কোনো icon library নেই) |
| State | React Context + localStorage (কোনো backend নেই) |

**Dependencies মাত্র ৩টি:** `next`, `react`, `react-dom` — কোনো অপ্রয়োজনীয় প্যাকেজ নেই।

---

## 📁 Project Structure

```
app/
  layout.tsx                 # Root layout + SEO metadata + fonts
  page.tsx                   # হোমপেজ (Hero → Trust → Category → Popular → Rooms → …)
  shop/page.tsx              # সব Furniture + Filter/Sort
  category/[slug]/page.tsx   # ৬টি ক্যাটাগরি পেজ (SSG)
  rooms/[slug]/page.tsx      # ঘর অনুযায়ী shopping (SSG)
  product/[slug]/page.tsx    # Product Details (৪০টি পেজ SSG) + JSON-LD
  search/page.tsx            # বাংলা + English সার্চ
  offers/page.tsx            # আজকের অফার
  collections/               # Complete Room Collection (+ bundle pricing)
  cart/ checkout/ order-confirmation/ wishlist/
  support/page.tsx           # ডেলিভারি, Installation, ওয়ারেন্টি, রিটার্ন, FAQ
  sitemap.ts robots.ts icon.svg
components/
  layout/       header, footer, whatsapp-button
  home/         hero, sections (trust, category, rooms, offers, collections…)
  product/      product-card, product-detail, dimension-diagram
  shop/         shop-view (filter panel + sort + price range)
  cart/         cart-drawer, toast
  ui/           primitives (rating, reveal, image, stepper, badges)
  providers/    store-provider (cart, wishlist, toast, order)
lib/
  site-config.ts   # ⭐ CENTRALIZED CONFIG (brand, WhatsApp, delivery, footer, SEO)
  types.ts         # সব domain type
  catalog.ts       # ক্যাটাগরি, রুম, filter option, sort option
  products.ts      # সব selector: search, filter, sort, related, featured
  collections.ts   # Room Collection + bundle pricing
  format.ts        # দাম, মাপ, তারিখ ফরম্যাটিং
  data/            # ⭐ CENTRALIZED PRODUCT DATA (৪০টি পণ্য)
    options.ts     # color / fabric / warranty / installation / delivery / room-fit প্রিসেট
    images.ts      # সব ইমেজ পাথ এক জায়গায়
    base.ts        # makeProduct() factory — specifications auto-generate
    products-*.ts  # category-wise product seeds
scripts/
  placeholders.mjs # ডেমো ইমেজ placeholder generator
```

---

## ⚙️ Centralized Configuration (`lib/site-config.ts`)

সব তথ্য এক জায়গায় — Client project-এ শুধু এখানে বদলালেই পুরো সাইটে পরিবর্তন হয়:

```ts
brandName: "WOODORA"
brandTagline: "আপনার ঘর, আপনার স্টাইল"
phone: "01876892958"
email: "hello@woodora.com.bd"

whatsappNumber: "01876892958"
whatsappDisplayNumber: "01876892958"
whatsappInternational: "8801876892958"
whatsappCta: "এই ধরনের সাইট তৈরি করতে এখনি মেসেজ দিন।"
whatsappMessage: "আসসালামু আলাইকুম। আমি WOODORA Furniture Demo Website দেখে যোগাযোগ করছি। …"

deliveryChargeInsideDhaka: 500
deliveryChargeOutsideDhaka: 1000
freeDeliveryAbove: 100000
announcements: [...]     // announcement bar-এর লেখা এখান থেকেই
socialLinks: [...]
footerInformation: {...}
seo: {...}
```

WhatsApp নম্বর বা মেসেজ **কোথাও আলাদা করে hardcode করা নেই** — সব জায়গায়
`whatsappUrl()` হেল্পার ব্যবহার করা হয়।

---

## 🗄️ Centralized Product Data (৪০টি ডেমো পণ্য)

সব পণ্য `lib/data/*`-এ একই schema-তে থাকে এবং **একই data** ব্যবহার হয় Homepage, Category,
Shop, Search, Filter, Product Details, Related Products, Cart, Collection এবং Checkout-এ।

```
id · name · nameBn · slug · department · type · rooms
price · originalPrice · offerBn
images[] · imageLabelsBn[]
material{primary, frame, board, top, fabric, foam, hardware} · finish
colors[] · fabrics[] · dimensions{length, width, height, unit, seatHeight, noteBn}
shortDescriptionBn · descriptionBn · featuresBn[] · specifications[] · careBn[]
warranty · installation · delivery{inside, outside, time, customDelivery}
stock · rating · reviewCount · reviews[]
customization{size, color, fabric, finish, customDesign, leadTimeBn}
roomFit[] · tags[] · soldCount · addedAt · weightKg · assemblyBn · roomScene
```

`specifications` স্বয়ংক্রিয়ভাবে `makeProduct()` factory থেকে তৈরি হয় — তাই একই তথ্য
বারবার লেখা লাগে না, এবং Material-এর সঙ্গে Specification কখনো অসঙ্গত হয় না।

| বিভাগ | পণ্য | উদাহরণ |
| --- | --- | --- |
| বসার ঘর | ১১ | Oslo 3 Seater, Milan L Shape, Comfort 5 Seater, Nordic Lounge, Heritage Center Table, Modern TV Console, Metro Bookshelf |
| শোবার ঘর | ১১ | Royal Queen Bed, Oslo King Bed, Minimal Platform Bed, Classic Wooden Bed, Storage Bed, ৩টি Wardrobe, Dressing Table, Bedside Table, Chest of Drawers |
| ডাইনিং | ৬ | Nordic Dining Table, Classic 6 Seater, Modern 4 Seater, Oak Dining Set, Cane Chair, Folding Table |
| অফিস | ৬ | Executive/Minimal/Compact Work Desk, Comfort Office Chair, Ergo Executive Chair, Steel Filing Cabinet |
| স্টোরেজ | ৩ | Slim Shoe Rack, Storage Cabinet, Metal Storage Shelf |
| হোম ডেকোর | ৩ | Arch Floor Mirror, Nordic Console Table, Balcony Lounge Chair |

**দামের পজিশনিং (বাংলাদেশ মার্কেট অনুযায়ী):** ৳৫,০০০ – ৳১৫০,০০০+
(Budget ৳৫–২০ হাজার · Mid ৳২০–৬০ হাজার · Premium ৳৬০ হাজার+)

---

## ✨ Feature Checklist

### Shopping experience
- [x] Announcement bar (config থেকে পরিবর্তনযোগ্য, rotating)
- [x] Sticky header — desktop nav (সব বাংলা) + mobile menu drawer
- [x] Prominent mobile search + desktop search overlay (live suggestions)
- [x] বাংলা + English দুই ভাষার keyword সার্চ (synonym mapping)
- [x] Room-based shopping — ৬টি ঘর
- [x] Category pages — ৬টি বিভাগ, ৩২+ পণ্যের ধরন
- [x] Filter: Category · Type · Price range slider · Material · Color · Size · Room · Availability · Warranty
- [x] Dynamic filter — যে অপশন পণ্যসেটে নেই, তা দেখানো হয় না
- [x] Sort: জনপ্রিয় · নতুন · দাম কম→বেশি · বেশি→কম · বেশি বিক্রি · বেশি রেটিং
- [x] Mobile filter drawer + desktop sticky sidebar
- [x] Filter state URL-এ sync (লিংক শেয়ার করা যায়)

### Product experience
- [x] Large image gallery + thumbnail + lightbox (large preview)
- [x] Color option — select করলে image preview (overlay) বদলায়
- [x] Fabric option (Sofa/Chair) — select করলে preview বদলায়
- [x] দাম + আগের দাম + discount badge + সাশ্রয়
- [x] Stock badge (স্টকে আছে / স্টকে নেই / মাত্র X পিস)
- [x] Delivery indicator (কার্ডে ও details-এ)
- [x] **পণ্যের মাপ** — SVG dimension diagram + দৈর্ঘ্য × প্রস্থ × উচ্চতা
- [x] **উপকরণ** — Frame, Board, Top, Fabric, Foam, Finish, Hardware
- [x] **কোন জায়গার জন্য উপযুক্ত?** — Room fit (উপযুক্ত / মোটামুটি / উপযুক্ত নয়)
- [x] **ঘরে কেমন দেখাবে?** — Room visualization section
- [x] **পণ্যের বিবরণ** — responsive spec table (mobile-এ stacked)
- [x] **ওয়ারেন্টি** — dynamic (১ বছর / ২ বছর / ৬ মাস / প্রযোজ্য নয়)
- [x] **Installation** — ফ্রি / Charge প্রযোজ্য / Self Assembly
- [x] **ডেলিভারি তথ্য** — ঢাকার মধ্যে/বাইরে চার্জ ও সময় + Custom Delivery নোট
- [x] **আপনার পছন্দ অনুযায়ী তৈরি করুন** — Customization options + CTA
- [x] Related products (৮টি)
- [x] ডেমো রিভিউ (verified হিসেবে দাবি করা হয় না)

### Cart & order
- [x] Cart drawer (image, name, color, fabric, size, quantity, remove)
- [x] Cart page + summary (পণ্যের মোট · ডেলিভারি · সর্বমোট)
- [x] Free delivery progress (৳১,০০,০০০+ অর্ডারে ফ্রি)
- [x] Wishlist (localStorage)
- [x] Checkout — নাম, মোবাইল, সম্পূর্ণ ঠিকানা, এলাকা, জেলা, ডেলিভারি zone, পেমেন্ট (COD), নোট
- [x] Form validation (বাংলা error message)
- [x] Order Confirmation — অর্ডার নম্বর `#WOD-XXXXX`, delivery information, next steps
- [x] Cart micro-animation + toast feedback

### Trust & conversion
- [x] Trust strip — মানসম্মত উপকরণ · সারা দেশে ডেলিভারি · নিরাপদ অর্ডার · বিক্রয়োত্তর সহায়তা
- [x] Complete Room Collection — bundle price স্বয়ংক্রিয়ভাবে হিসাব (১২% ছাড়)
- [x] Small space collection
- [x] Offers section + offers page
- [x] Floating WhatsApp button + CTA bubble (dismissible, subtle pulse)
- [x] WhatsApp CTA throughout (product enquiry, custom order, order confirmation)

### Technical
- [x] Mobile-first (product grid ২ কলাম, sticky mobile CTA bar on product page)
- [x] No horizontal scroll, no broken layout
- [x] next/image optimization (AVIF/WebP), lazy load, skeleton/reveal animation
- [x] Semantic HTML, single H1 per page, proper heading order
- [x] SEO metadata + Open Graph + Twitter card + favicon (`icon.svg`)
- [x] JSON-LD Product schema (rating, price, availability)
- [x] `sitemap.xml` + `robots.txt`
- [x] Subtle premium animation (fade/slide/reveal/hover) — bouncing/flashy নেই
- [x] `prefers-reduced-motion` respect
- [x] Keyboard accessible, focus-visible states, aria labels, skip link
- [x] 404 page with product suggestions
- [x] `npm run build` — production build সফল (সব পেজ SSG/prerendered)

---

## 🌐 Language Policy

- 모든 **customer-facing সাধারণ লেখা বাংলায়**
- Brand name, product model, material name ও প্রয়োজনীয় technical term English-এ
  (যেমন: `Solid Wood`, `MDF`, `PU Lacquer`, `Assembly`, `Installation`, `Oslo 3 Seater Sofa`)
- দাম **৳৫২,০০০** ফরম্যাটে (বাংলাদেশি E-commerce স্ট্যান্ডার্ড — English digit)

---

## 🖼️ Imagery

সব ছবি এই ডেমো প্রজেক্টের জন্য **নতুন করে তৈরি করা মৌলিক ডেমো ইমেজারি** — কোনো Furniture
brand-এর copyrighted promotional image, logo বা brand identity ব্যবহার করা হয়নি।
ধরন: প্রোডাক্ট শট (warm cream স্টুডিও) + রুম lifestyle সিন + material macro detail।

`scripts/placeholders.mjs` — কোনো ছবি না থাকলে WOODORA টোনের placeholder তৈরি করে দেয়।

---

## ⚠️ Demo Limitation

| Real project-এ থাকবে | এই ডেমোতে |
| --- | --- |
| Payment gateway (bKash/Nagad/Card/SSLCommerz) | ক্যাশ অন ডেলিভারি (demo) |
| Courier API (Pathao/Steadfast/RedX) | ডেলিভারি চার্জ ডেমো লজিক |
| Database + Admin panel | centralized mock data file |
| Authentication | নেই (অর্ডারে অ্যাকাউন্ট লাগে না) |
| Inventory & order management | localStorage |

Cart, wishlist ও অর্ডার তথ্য শুধু ব্রাউজারের `localStorage`-এ থাকে — কোনো সার্ভারে যায় না।

---

## 📞 Contact

**Demo Website by CodePixel Web**
WhatsApp / Phone: **01876892958**
এই ধরনের সাইট তৈরি করতে এখনি মেসেজ দিন।

---

© WOODORA (fictional demo brand) · Demo project by CodePixel Web
