/**
 * সব ইমেজ পাথ এক জায়গায় — ডেমো ইমেজারি (WOODORA-এর জন্য তৈরি মৌলিক ছবি)।
 * একই পাথ বারবার লেখা হয় না, তাই পরে ছবি বদলানো সহজ।
 */
export const IMG = {
  hero: "/images/hero-living-room.jpg",

  /* Living room */
  osloThreeSeater: "/images/products/oslo-3-seater-sofa.jpg",
  milanLShape: "/images/products/milan-l-shape-sofa.jpg",
  comfortFiveSeater: "/images/products/comfort-5-seater-sofa-set.jpg",
  nordicLounge: "/images/products/nordic-lounge-sofa.jpg",
  compactLoungeSofa: "/images/products/compact-lounge-sofa.jpg",
  heritageCenterTable: "/images/products/heritage-center-table.jpg",
  danishSideTable: "/images/products/danish-side-table.jpg",
  modernTvConsole: "/images/products/modern-tv-console.jpg",
  osloTvUnit: "/images/products/oslo-tv-unit.jpg",
  minimalTvCabinet: "/images/products/minimal-tv-cabinet.jpg",
  metroBookshelf: "/images/products/metro-bookshelf.jpg",

  /* Bedroom */
  royalQueenBed: "/images/products/royal-queen-bed.jpg",
  osloKingBed: "/images/products/oslo-king-bed.jpg",
  minimalPlatformBed: "/images/products/minimal-platform-bed.jpg",
  classicWoodenBed: "/images/products/classic-wooden-bed.jpg",
  storageBed: "/images/products/storage-bed-with-drawers.jpg",
  walnutBedsideTable: "/images/products/walnut-bedside-table.jpg",
  classicWardrobe: "/images/products/classic-3-door-wardrobe.jpg",
  slidingWardrobe: "/images/products/modern-sliding-wardrobe.jpg",
  compactWardrobe: "/images/products/compact-wardrobe.jpg",
  teakDressingTable: "/images/products/teak-dressing-table.jpg",
  chestOfDrawers: "/images/products/walnut-chest-of-drawers.jpg",

  /* Dining */
  nordicDiningTable: "/images/products/nordic-dining-table.jpg",
  classicSixSeater: "/images/products/classic-6-seater-dining-set.jpg",
  modernFourSeater: "/images/products/modern-4-seater-dining-set.jpg",
  oakDiningSet: "/images/products/oak-dining-set.jpg",
  caneDiningChair: "/images/products/cane-dining-chair.jpg",
  foldingDiningTable: "/images/products/folding-dining-table.jpg",

  /* Office */
  executiveWorkDesk: "/images/products/executive-work-desk.jpg",
  minimalOfficeDesk: "/images/products/minimal-office-desk.jpg",
  compactWorkDesk: "/images/products/compact-work-desk.jpg",
  comfortOfficeChair: "/images/products/comfort-office-chair.jpg",
  ergoExecutiveChair: "/images/products/ergo-executive-chair.jpg",
  steelFilingCabinet: "/images/products/steel-filing-cabinet.jpg",

  /* Storage */
  slimShoeRack: "/images/products/slim-shoe-rack.jpg",
  storageCabinet: "/images/products/storage-cabinet.jpg",
  metalStorageShelf: "/images/products/metal-storage-shelf.jpg",

  /* Home decor */
  archFloorMirror: "/images/products/arch-floor-mirror.jpg",
  /* নিচের দুটি lifestyle সিন থেকেই নেওয়া — ঘর-সেটআপেই পণ্য স্পষ্ট দেখা যায় */
  nordicConsoleTable: "/images/scenes/decor-scene.jpg",
  balconyLoungeChair: "/images/scenes/balcony-scene.jpg",
} as const;

/** রুম / লাইফস্টাইল সিন — পণ্যকে বাস্তব ঘরে দেখানোর জন্য */
export const SCENE = {
  /* রুম সিন — বাস্তব রুম সেটআপে তোলা ছবি */
  living: "/images/hero-living-room.jpg",
  bedroom: "/images/products/royal-queen-bed.jpg",
  dining: "/images/products/classic-6-seater-dining-set.jpg",
  office: "/images/scenes/office-scene.jpg",
  balcony: "/images/scenes/balcony-scene.jpg",
  smallSpace: "/images/scenes/small-space-scene.jpg",
  decor: "/images/scenes/decor-scene.jpg",
} as const;

/** ম্যাটেরিয়াল ক্লোজ-আপ শট (সব পণ্যের গ্যালারিতে ব্যবহৃত) */
export const DETAIL = {
  wood: "/images/scenes/detail-wood-grain.jpg",
  fabric: "/images/scenes/detail-fabric.jpg",
} as const;

/** গ্যালারির স্ট্যান্ডার্ড লেবেল */
export const GALLERY_LABELS = {
  front: "সামনের দিক",
  room: "ঘরে কেমন দেখাবে",
  material: "Material ডিটেইল",
  fabric: "Fabric ও ফিনিশ",
} as const;
