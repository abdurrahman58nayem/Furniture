/**
 * ============================================================================
 * CENTRALIZED SITE CONFIGURATION — WOODORA
 * ============================================================================
 * একটি জায়গা থেকেই পুরো Website-এর সব তথ্য পরিবর্তন করা যায়।
 * WhatsApp, ফোন, ইমেইল, ডেলিভারি চার্জ — কোথাও আলাদা করে hardcode করা হয়নি।
 * ============================================================================
 */

export const siteConfig = {
  /* ---------- Brand ---------- */
  brandName: "WOODORA",
  brandTagline: "আপনার ঘর, আপনার স্টাইল",
  brandHref: "/",
  established: "২০২১",

  /* ---------- Demo attribution (CodePixel Web) ---------- */
  agency: {
    name: "CodePixel Web",
    tagline: "বাংলাদেশি ব্যবসার জন্য প্রিমিয়াম ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট",
    creditLine: "Demo Website by CodePixel Web",
    noticeBn: "এই ওয়েবসাইটটি CodePixel Web-এর একটি ডেমো প্রজেক্ট।",
    noticeFooterBn:
      "এখানে দেখানো সব পণ্য, দাম, ছবি ও অফার শুধুমাত্র ডেমো উপস্থাপনার জন্য তৈরি কাল্পনিক তথ্য।",
  },

  /* ---------- Contact ---------- */
  phone: "01876892958",
  phoneDisplay: "01876892958",
  email: "hello@woodora.com.bd",
  addressLine: "শোরুম: বাড়ি ১২, রোড ৫, উত্তরা সেক্টর ১১, ঢাকা ১২৩০",
  hoursBn: "প্রতিদিন সকাল ১০টা – রাত ৯টা",

  /* ---------- WhatsApp (একটাই source of truth) ---------- */
  whatsappNumber: "01876892958",
  whatsappDisplayNumber: "01876892958",
  whatsappInternational: "8801876892958",
  whatsappCta: "এই ধরনের সাইট তৈরি করতে এখনি মেসেজ দিন।",
  whatsappMessage:
    "আসসালামু আলাইকুম। আমি WOODORA Furniture Demo Website দেখে যোগাযোগ করছি। আমার Furniture Business-এর জন্য এমন একটি Website তৈরি করতে চাই।",
  whatsappSupportMessage:
    "আসসালামু আলাইকুম। আমি WOODORA Furniture Demo Website থেকে পণ্য সম্পর্কে জানতে চাই।",

  /* ---------- Delivery ---------- */
  deliveryChargeInsideDhaka: 500,
  deliveryChargeOutsideDhaka: 1000,
  deliveryChargeCustomNoteBn:
    "বড় Furniture (ওয়ারড্রোব, ডাইনিং সেট, বেড) সাইজ অনুযায়ী অতিরিক্ত ডেলিভারি চার্জ প্রযোজ্য হতে পারে।",
  deliveryTimeInsideBn: "৩–৭ কর্মদিবস",
  deliveryTimeOutsideBn: "৫–১০ কর্মদিবস",
  freeDeliveryAbove: 100000,
  cashOnDeliveryBn: "ক্যাশ অন ডেলিভারি সুবিধা আছে",

  /* ---------- Policies ---------- */
  warrantyBn: "১ বছরের ওয়ারেন্টি",
  installationBn: "ফ্রি Installation",
  returnDaysBn: "৭ দিনের রিটার্ন সুবিধা",
  emiBn: "৬ মাস পর্যন্ত ০% EMI",

  /* ---------- Announcement bar (configuration থেকে পরিবর্তনযোগ্য) ---------- */
  announcements: [
    "সারা বাংলাদেশে Furniture Delivery",
    "নির্বাচিত Furniture-এ বিশেষ ছাড়",
    "আপনার পছন্দের Furniture এখন আরও সহজে",
    "৬ মাস পর্যন্ত ০% EMI সুবিধা",
  ],

  /* ---------- Social ---------- */
  socialLinks: [
    { id: "facebook", label: "Facebook", labelBn: "ফেসবুক", href: "https://facebook.com" },
    { id: "instagram", label: "Instagram", labelBn: "ইনস্টাগ্রাম", href: "https://instagram.com" },
    { id: "youtube", label: "YouTube", labelBn: "ইউটিউব", href: "https://youtube.com" },
    { id: "tiktok", label: "TikTok", labelBn: "টিকটক", href: "https://tiktok.com" },
  ],

  /* ---------- Footer / support information ---------- */
  footerInformation: {
    shopTitleBn: "Furniture",
    shopLinks: [
      { labelBn: "বসার ঘর", href: "/category/living-room" },
      { labelBn: "শোবার ঘর", href: "/category/bedroom" },
      { labelBn: "ডাইনিং", href: "/category/dining" },
      { labelBn: "অফিস", href: "/category/office" },
      { labelBn: "স্টোরেজ", href: "/category/storage" },
      { labelBn: "হোম ডেকোর", href: "/category/home-decor" },
    ],
    helpTitleBn: "সহায়তা",
    helpLinks: [
      { labelBn: "যোগাযোগ", href: "/support#contact" },
      { labelBn: "ডেলিভারি", href: "/support#delivery" },
      { labelBn: "ওয়ারেন্টি", href: "/support#warranty" },
      { labelBn: "রিটার্ন", href: "/support#returns" },
      { labelBn: "সাধারণ জিজ্ঞাসা", href: "/support#faq" },
    ],
    contactTitleBn: "যোগাযোগ",
    legalTitleBn: "তথ্য",
    legalLinks: [
      { labelBn: "আমাদের সম্পর্কে", href: "/support#about" },
      { labelBn: "প্রাইভেসি পলিসি", href: "/support#privacy" },
      { labelBn: "শর্তাবলী", href: "/support#terms" },
    ],
  },

  /* ---------- SEO ---------- */
  seo: {
    title: "WOODORA — Premium Furniture Store in Bangladesh",
    description:
      "WOODORA হলো বাংলাদেশি Furniture market-এর জন্য তৈরি একটি Premium Furniture E-commerce Demo Website by CodePixel Web।",
    keywords: [
      "furniture bangladesh",
      "premium furniture dhaka",
      "sofa price in bangladesh",
      "bed price in bangladesh",
      "dining table bangladesh",
      "woodora",
      "codeixel web demo",
    ],
    url: "https://woodora-demo.vercel.app",
    ogImage: "/images/og-woodora.jpg",
  },

  /* ---------- Demo notice ---------- */
  demoNoticeBn:
    "এটি একটি ডেমো Website — কোনো real payment, courier বা database ব্যবহার করা হয়নি।",
} as const;

export type SiteConfig = typeof siteConfig;

/** WhatsApp deep-link builder — সব WhatsApp লিংক এখান থেকেই তৈরি হয়। */
export function whatsappUrl(message: string = siteConfig.whatsappMessage): string {
  return `https://wa.me/${siteConfig.whatsappInternational}?text=${encodeURIComponent(message)}`;
}

/** টেলিফোন লিংক */
export function telUrl(number: string = siteConfig.phone): string {
  return `tel:+88${number.replace(/^0/, "")}`;
}

/** ইমেইল লিংক */
export function mailUrl(email: string = siteConfig.email): string {
  return `mailto:${email}`;
}
