import type { Product, ProductFilters, SortKey } from "@/lib/types";
import { livingRoomProducts } from "@/lib/data/products-living-room";
import { bedroomProducts } from "@/lib/data/products-bedroom";
import { diningProducts } from "@/lib/data/products-dining";
import { officeProducts } from "@/lib/data/products-office";
import { storageDecorProducts } from "@/lib/data/products-storage-decor";
import { departments, sizeBounds } from "@/lib/catalog";

/**
 * ============================================================================
 * CENTRALIZED PRODUCT SELECTORS
 * ============================================================================
 * Homepage, Category, Search, Filter, Product Details, Related Products,
 * Cart ও Collection — সবাই এই একই ফাংশন ব্যবহার করে।
 * কোনো পণ্যের তথ্য কোথাও আলাদা করে লেখা হয় না।
 * ============================================================================
 */

export const allProducts: Product[] = [
  ...livingRoomProducts,
  ...bedroomProducts,
  ...diningProducts,
  ...officeProducts,
  ...storageDecorProducts,
];

export const totalProductCount = allProducts.length;

/* --------------------------------- Lookups -------------------------------- */
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id === id);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));
}

export function getProductsByDepartment(department: string): Product[] {
  return allProducts.filter((product) => product.department === department);
}

export function getProductsByType(type: string): Product[] {
  return allProducts.filter((product) => product.type === type);
}

export function getProductsByRoom(room: string): Product[] {
  return allProducts.filter((product) => product.rooms.includes(room as Product["rooms"][number]));
}

export function getProductsByTag(tag: Product["tags"][number]): Product[] {
  return allProducts.filter((product) => product.tags.includes(tag));
}

/* ------------------------------- Collections ------------------------------- */
export function getFeaturedProducts(limit = 16): Product[] {
  const featured = [
    ...getProductsByTag("featured"),
    ...getProductsByTag("bestseller"),
  ].filter((product, index, list) => list.findIndex((item) => item.id === product.id) === index);
  const rest = allProducts.filter((product) => !featured.includes(product));
  return [...featured, ...rest].slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return [...allProducts]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit);
}

export function getBestSellers(limit = 8): Product[] {
  return [...allProducts].sort((a, b) => b.soldCount - a.soldCount).slice(0, limit);
}

export function getOfferProducts(limit = 8): Product[] {
  return [...allProducts]
    .filter((product) => product.originalPrice > product.price)
    .sort(
      (a, b) =>
        (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice,
    )
    .slice(0, limit);
}

export function getSmallSpaceProducts(limit = 6): Product[] {
  return getProductsByTag("small-space").slice(0, limit);
}

/** একই বিভাগের পণ্য — Sofa → Center Table → TV Cabinet → Side Table */
export function getRelatedProducts(product: Product, limit = 8): Product[] {
  const sameDepartment = allProducts.filter(
    (item) => item.department === product.department && item.id !== product.id,
  );
  const sameRoom = allProducts.filter(
    (item) =>
      item.id !== product.id &&
      item.rooms.some((room) => product.rooms.includes(room)) &&
      item.department !== product.department,
  );
  const merged = [...sameDepartment, ...sameRoom].filter(
    (item, index, list) => list.findIndex((entry) => entry.id === item.id) === index,
  );
  return merged.slice(0, limit);
}

/* --------------------------------- Search --------------------------------- */
/** বাংলা ও English — দুই ভাষার keyword একসঙ্গে কাজ করে */
const SEARCH_SYNONYMS: Record<string, string[]> = {
  sofa: ["সোফা", "শোফা", "couch", "sofa set"],
  সোফা: ["sofa", "couch", "sofa set"],
  bed: ["বেড", "খাট", "শয্যা"],
  বেড: ["bed", "খাট"],
  খাট: ["bed"],
  table: ["টেবিল"],
  টেবিল: ["table", "desk"],
  ডাইনিং: ["dining", "dining table", "dinner"],
  dining: ["ডাইনিং"],
  wardrobe: ["ওয়ারড্রোব", "আলমারি", "almirah", "closet", "কবাট"],
  ওয়ারড্রোব: ["wardrobe", "almirah", "আলমারি"],
  আলমারি: ["wardrobe", "almirah"],
  chair: ["চেয়ার"],
  চেয়ার: ["chair"],
  টিভি: ["tv", "television", "tv cabinet", "tv unit", "console"],
  tv: ["টিভি", "television", "console"],
  জুতা: ["shoe", "shoe rack", "shoes"],
  shoe: ["জুতা", "shoes"],
  mirror: ["মিরর", "আয়না"],
  মিরর: ["mirror", "আয়না"],
  আয়না: ["mirror", "মিরর"],
  cabinet: ["ক্যাবিনেট", "almirah"],
  ক্যাবিনেট: ["cabinet"],
  bookshelf: ["বুকশেলফ", "book shelf", "bookcase", "শেলফ"],
  বুকশেলফ: ["bookshelf", "book shelf", "bookcase"],
  desk: ["ডেস্ক", "office table", "work desk"],
  ডেস্ক: ["desk", "work desk"],
  office: ["অফিস", "work desk", "office chair"],
  অফিস: ["office", "desk", "chair"],
  dressing: ["ড্রেসিং", "dressing table"],
  ড্রেসিং: ["dressing", "dressing table"],
  storage: ["স্টোরেজ", "shelf", "cabinet"],
  স্টোরেজ: ["storage", "shelf", "cabinet"],
  balcony: ["বারান্দা", "lounge"],
  বারান্দা: ["balcony", "lounge"],
  drawer: ["ড্রয়ার", "chest"],
  ড্রয়ার: ["drawer", "chest"],
  wood: ["কাঠ", "solid wood"],
  কাঠ: ["wood", "solid wood"],
  ছোট: ["small", "compact"],
  small: ["ছোট", "compact"],
  কমপ্যাক্ট: ["compact", "small"],
  কম: ["low", "cheap"],
  দাম: ["price"],
};

function searchableText(product: Product): string {
  return [
    product.name,
    product.nameBn,
    product.type,
    product.department,
    product.finish,
    product.material.primary,
    product.shortDescriptionBn,
    product.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

export function searchProducts(query: string, source: Product[] = allProducts): Product[] {
  const term = query.trim().toLowerCase();
  if (!term) return source;
  const extraTerms = new Set<string>([term]);
  Object.entries(SEARCH_SYNONYMS).forEach(([key, values]) => {
    if (term.includes(key.toLowerCase())) {
      values.forEach((value) => extraTerms.add(value.toLowerCase()));
    }
  });
  const terms = Array.from(extraTerms);
  return source.filter((product) => {
    const haystack = searchableText(product);
    return terms.some((value) => value.length > 1 && haystack.includes(value));
  });
}

/** Search dropdown-এর জন্য সাজেশন */
export function searchSuggestions(query: string, limit = 6): Product[] {
  if (query.trim().length < 2) return [];
  return searchProducts(query).slice(0, limit);
}

/** Popular search keywords — homepage search-এ দেখানো হয় */
export const popularSearchesBn = [
  "Sofa",
  "Bed",
  "Dining Table",
  "Wardrobe",
  "Office Table",
  "Shoe Rack",
  "আয়না",
  "ছোট ঘরের Furniture",
];

/* --------------------------------- Filters -------------------------------- */
export function materialTagsOf(product: Product): string[] {
  const text = `${product.material.primary} ${product.material.frame ?? ""} ${product.material.board ?? ""} ${product.material.top ?? ""}`.toLowerCase();
  const tags: string[] = [];
  if (text.includes("solid wood") || text.includes("solid oak") || text.includes("solid teak") || text.includes("সলিড")) {
    tags.push("solid-wood");
  }
  if (text.includes("mdf")) tags.push("mdf");
  if (text.includes("plywood")) tags.push("plywood");
  if (text.includes("hdf") || text.includes("engineered") || text.includes("laminate")) {
    tags.push("engineered-wood");
  }
  if (text.includes("steel") || text.includes("metal") || text.includes("স্টিল") || text.includes("মেটাল")) {
    tags.push("metal");
  }
  if (text.includes("glass") || text.includes("mirror") || text.includes("গ্লাস")) tags.push("glass");
  if (text.includes("cane") || text.includes("বেত")) tags.push("cane");
  return tags;
}

export function sizeTagOf(product: Product): string {
  const { length, width } = product.dimensions;
  if (length <= sizeBounds.compact.maxLength || width <= sizeBounds.compact.maxWidth) {
    return "compact";
  }
  if (length <= sizeBounds.medium.maxLength || width <= sizeBounds.medium.maxWidth) {
    return "medium";
  }
  return "large";
}

export function colorIdsOf(product: Product): string[] {
  return product.colors.map((color) => color.id);
}

export function filterProducts(filters: ProductFilters, source: Product[] = allProducts): Product[] {
  let result = searchProducts(filters.query, source);

  if (filters.departments.length) {
    result = result.filter((product) => filters.departments.includes(product.department));
  }
  if (filters.types.length) {
    result = result.filter((product) => filters.types.includes(product.type));
  }
  if (filters.rooms.length) {
    result = result.filter((product) =>
      product.rooms.some((room) => filters.rooms.includes(room)),
    );
  }
  if (filters.materials.length) {
    result = result.filter((product) =>
      materialTagsOf(product).some((tag) => filters.materials.includes(tag)),
    );
  }
  if (filters.colors.length) {
    result = result.filter((product) =>
      colorIdsOf(product).some((id) => filters.colors.includes(id)),
    );
  }
  if (filters.sizes.length) {
    result = result.filter((product) => filters.sizes.includes(sizeTagOf(product)));
  }
  if (filters.availability === "in-stock") {
    result = result.filter((product) => product.stock > 0);
  } else if (filters.availability === "out-of-stock") {
    result = result.filter((product) => product.stock === 0);
  }
  if (filters.warranty === "with-warranty") {
    result = result.filter((product) => product.warranty.id !== "none");
  } else if (filters.warranty === "any") {
    result = result.filter((product) => product.warranty.id === "none");
  }
  result = result.filter(
    (product) => product.price >= filters.minPrice && product.price <= filters.maxPrice,
  );

  return sortProducts(result, filters.sort);
}

export function sortProducts(source: Product[], sort: SortKey): Product[] {
  const list = [...source];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "best-selling":
      return list.sort((a, b) => b.soldCount - a.soldCount);
    case "top-rated":
      return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "newest":
      return list.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    case "popular":
    default:
      return list.sort(
        (a, b) =>
          b.rating * Math.log10(b.reviewCount + 10) - a.rating * Math.log10(a.reviewCount + 10),
      );
  }
}

/* ------------------------------ Filter options ----------------------------- */
/** শুধু সেই ফিল্টারগুলোই দেখানো হয় যেগুলো এই পণ্যসেটে সত্যিই আছে */
export function availableFilterOptions(source: Product[]) {
  const departmentCounts = new Map<string, number>();
  const typeCounts = new Map<string, number>();
  const roomCounts = new Map<string, number>();
  const materialCounts = new Map<string, number>();
  const colorCounts = new Map<string, number>();
  const sizeCounts = new Map<string, number>();
  let minPrice = Number.POSITIVE_INFINITY;
  let maxPrice = 0;

  source.forEach((product) => {
    departmentCounts.set(product.department, (departmentCounts.get(product.department) ?? 0) + 1);
    typeCounts.set(product.type, (typeCounts.get(product.type) ?? 0) + 1);
    product.rooms.forEach((room) => roomCounts.set(room, (roomCounts.get(room) ?? 0) + 1));
    materialTagsOf(product).forEach((tag) =>
      materialCounts.set(tag, (materialCounts.get(tag) ?? 0) + 1),
    );
    colorIdsOf(product).forEach((id) => colorCounts.set(id, (colorCounts.get(id) ?? 0) + 1));
    const size = sizeTagOf(product);
    sizeCounts.set(size, (sizeCounts.get(size) ?? 0) + 1);
    minPrice = Math.min(minPrice, product.price);
    maxPrice = Math.max(maxPrice, product.price);
  });

  return {
    departments: departments
      .filter((department) => departmentCounts.has(department.slug))
      .map((department) => ({
        id: department.slug,
        labelBn: department.titleBn,
        count: departmentCounts.get(department.slug) ?? 0,
      })),
    types: Array.from(typeCounts.entries()).map(([id, count]) => ({ id, count })),
    rooms: Array.from(roomCounts.entries()).map(([id, count]) => ({ id, count })),
    materials: Array.from(materialCounts.entries()).map(([id, count]) => ({ id, count })),
    colors: Array.from(colorCounts.entries()).map(([id, count]) => ({ id, count })),
    sizes: Array.from(sizeCounts.entries()).map(([id, count]) => ({ id, count })),
    price: {
      min: Number.isFinite(minPrice) ? Math.floor(minPrice / 1000) * 1000 : 0,
      max: Math.ceil(maxPrice / 1000) * 1000,
    },
  };
}

export function emptyFilters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return {
    query: "",
    departments: [],
    types: [],
    rooms: [],
    materials: [],
    colors: [],
    sizes: [],
    availability: "all",
    warranty: "all",
    minPrice: 0,
    maxPrice: 200000,
    sort: "popular",
    ...overrides,
  };
}
