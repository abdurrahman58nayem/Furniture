import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/products";
import { departments, rooms } from "@/lib/catalog";
import { roomCollections } from "@/lib/collections";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.url;
  const now = new Date();

  const staticRoutes = [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/shop`, priority: 0.9 },
    { url: `${base}/offers`, priority: 0.8 },
    { url: `${base}/collections`, priority: 0.8 },
    { url: `${base}/support`, priority: 0.6 },
    { url: `${base}/cart`, priority: 0.3 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: route.url,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
    ...departments.map((department) => ({
      url: `${base}/category/${department.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...rooms.map((room) => ({
      url: `${base}/rooms/${room.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...roomCollections.map((collection) => ({
      url: `${base}/collections/${collection.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...allProducts.map((product) => ({
      url: `${base}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
