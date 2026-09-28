"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product, ProductFilters, SortKey } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/ui/primitives";
import {
  availabilityFilters,
  colorFilters,
  materialFilters,
  priceBounds,
  sizeFilters,
  sortOptions,
  warrantyFilters,
} from "@/lib/catalog";
import { availableFilterOptions, emptyFilters, filterProducts } from "@/lib/products";
import { typeTitle } from "@/lib/catalog";
import { cx, formatPrice } from "@/lib/format";

/* ==========================================================================
   SHOP VIEW — Filter (sidebar + mobile drawer), Sort, Price range
   URL থেকেই filter state পড়া হয়, তাই লিংক শেয়ার করা যায়
   ========================================================================== */

interface ShopViewProps {
  products: Product[];
  /** নির্দিষ্ট বিভাগ/রুম/টাইপ — এই সেট থেকেই filter options তৈরি হয় */
  scope?: Partial<ProductFilters>;
  title: string;
  subtitle?: string;
  hideTypeFilter?: boolean;
  syncUrl?: boolean;
}

export function ShopView({
  products,
  scope,
  title,
  subtitle,
  hideTypeFilter = false,
  syncUrl = true,
}: ShopViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const scoped = useMemo(() => filterProducts(emptyFilters(scope), products), [products, scope]);
  const options = useMemo(() => availableFilterOptions(scoped), [scoped]);

  /* URL → state */
  const initial = useMemo<ProductFilters>(() => {
    const list = (key: string) => (searchParams.get(key) ? searchParams.get(key)!.split(",") : []);
    return emptyFilters({
      query: searchParams.get("q") ?? "",
      departments: list("dept"),
      types: scope?.types?.length ? scope.types : list("type"),
      rooms: list("room"),
      materials: list("material"),
      colors: list("color"),
      sizes: list("size"),
      availability: (searchParams.get("stock") as ProductFilters["availability"]) ?? "all",
      warranty: "all",
      minPrice: Number(searchParams.get("min") ?? priceBounds.min),
      maxPrice: Number(searchParams.get("max") ?? priceBounds.max),
      sort: (searchParams.get("sort") as SortKey) ?? "popular",
      ...scope,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filters, setFilters] = useState<ProductFilters>(initial);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  /* scope বদলালে (ক্যাটাগরি/রুম পেজে) state রিসেট */
  useEffect(() => {
    setFilters(emptyFilters(initial));
    setVisibleCount(12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const update = (patch: Partial<ProductFilters>) => {
    setFilters((current) => ({ ...current, ...patch }));
    setVisibleCount(12);
  };

  const toggleIn = (key: keyof ProductFilters, value: string) => {
    setFilters((current) => {
      const list = current[key] as string[];
      const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
      return { ...current, [key]: next } as ProductFilters;
    });
    setVisibleCount(12);
  };

  /* state → URL (শুধু filter/sort বদলালে) */
  useEffect(() => {
    if (!syncUrl) return;
    const params = new URLSearchParams();
    if (filters.query) params.set("q", filters.query);
    if (filters.departments.length) params.set("dept", filters.departments.join(","));
    if (filters.types.length && !scope?.types?.length) params.set("type", filters.types.join(","));
    if (filters.rooms.length) params.set("room", filters.rooms.join(","));
    if (filters.materials.length) params.set("material", filters.materials.join(","));
    if (filters.colors.length) params.set("color", filters.colors.join(","));
    if (filters.sizes.length) params.set("size", filters.sizes.join(","));
    if (filters.availability !== "all") params.set("stock", filters.availability);
    if (filters.sort !== "popular") params.set("sort", filters.sort);
    if (filters.minPrice !== priceBounds.min) params.set("min", String(filters.minPrice));
    if (filters.maxPrice !== priceBounds.max) params.set("max", String(filters.maxPrice));
    const query = params.toString();
    router.replace(query ? `?${query}` : "?", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const results = useMemo(() => {
    const scopedProducts = products.filter((product) => {
      if (scope?.departments?.length && !scope.departments.includes(product.department)) return false;
      if (scope?.rooms?.length && !product.rooms.some((room) => scope.rooms!.includes(room)))
        return false;
      return true;
    });
    return filterProducts(filters, scopedProducts);
  }, [filters, products, scope]);

  const activeCount =
    filters.departments.length +
    (scope?.types?.length ? 0 : filters.types.length) +
    filters.rooms.length +
    filters.materials.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.availability !== "all" ? 1 : 0) +
    (filters.minPrice !== priceBounds.min || filters.maxPrice !== priceBounds.max ? 1 : 0) +
    (filters.query ? 1 : 0);

  const clearAll = () => {
    setFilters(emptyFilters(scope));
    setVisibleCount(12);
  };

  return (
    <div className="container-page py-8 md:py-10">
      {/* Heading */}
      <header className="max-w-3xl">
        <h1 className="font-display text-2xl font-semibold md:text-4xl">{title}</h1>
        {subtitle && <p className="section-sub mt-3">{subtitle}</p>}
        <p className="mt-3 text-xs text-ink-muted">
          {results.length} টি পণ্য পাওয়া গেছে
          {filters.query && ` — “${filters.query}” এর জন্য`}
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
        {/* ---------------- Desktop filter sidebar ---------------- */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <FilterPanel
              filters={filters}
              options={options}
              hideTypeFilter={hideTypeFilter}
              onToggle={toggleIn}
              onUpdate={update}
              onClear={clearAll}
              activeCount={activeCount}
            />
          </div>
        </aside>

        <div>
          {/* toolbar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-ink/10 pb-4">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="btn btn-outline btn-sm lg:hidden"
            >
              ফিল্টার
              {activeCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-cream">
                  {activeCount}
                </span>
              )}
            </button>

            <label className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-ink-muted">সাজান:</span>
              <select
                value={filters.sort}
                onChange={(event) => update({ sort: event.target.value as SortKey })}
                className="field h-10 w-auto py-0 pr-8 text-sm"
                aria-label="সাজান"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.labelBn}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* active chips */}
          {activeCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {[
                ...filters.departments.map((id) => ({
                  key: "departments" as const,
                  id,
                  label:
                    options.departments.find((item) => item.id === id)?.labelBn ?? id,
                })),
                ...(scope?.types?.length
                  ? []
                  : filters.types.map((id) => ({ key: "types" as const, id, label: id }))),
                ...filters.materials.map((id) => ({
                  key: "materials" as const,
                  id,
                  label: materialFilters.find((item) => item.id === id)?.labelBn ?? id,
                })),
                ...filters.colors.map((id) => ({
                  key: "colors" as const,
                  id,
                  label: colorFilters.find((item) => item.id === id)?.labelBn ?? id,
                })),
                ...filters.sizes.map((id) => ({
                  key: "sizes" as const,
                  id,
                  label: sizeFilters.find((item) => item.id === id)?.labelBn ?? id,
                })),
              ].map((chip) => (
                <button
                  key={`${chip.key}-${chip.id}`}
                  type="button"
                  onClick={() => toggleIn(chip.key, chip.id)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-ink/30"
                >
                  {chip.label}
                  <span aria-hidden="true">×</span>
                </button>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-medium text-danger underline-offset-4 hover:underline"
              >
                সব ফিল্টার মুছুন
              </button>
            </div>
          )}

          {/* grid */}
          {results.length === 0 ? (
            <div className="mt-8">
              <EmptyState
                title="কোনো পণ্য পাওয়া যায়নি"
                description="ফিল্টার একটু কমিয়ে দেখুন, অথবা অন্য ক্যাটাগরি থেকে পণ্য বেছে নিন।"
                action={
                  <button type="button" onClick={clearAll} className="btn btn-primary btn-sm">
                    ফিল্টার মুছে আবার দেখুন
                  </button>
                }
              />
            </div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                {results.slice(0, visibleCount).map((product, index) => (
                  <ProductCard key={product.id} product={product} priority={index < 3} />
                ))}
              </div>
              {visibleCount < results.length && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + 12)}
                    className="btn btn-outline"
                  >
                    আরও পণ্য দেখুন ({results.length - visibleCount} বাকি)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ---------------- Mobile filter drawer ---------------- */}
      <div
        className={cx(
          "fixed inset-0 z-[68] lg:hidden",
          drawerOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={cx(
            "absolute inset-0 bg-ink/45 transition-opacity duration-300",
            drawerOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cx(
            "absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-xl bg-cream p-5 transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)]",
            drawerOpen ? "translate-y-0" : "translate-y-full",
          )}
          style={{ animation: drawerOpen ? "slideUpSheet .3s cubic-bezier(.22,.61,.36,1)" : undefined }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">ফিল্টার</h2>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="ফিল্টার বন্ধ করুন"
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-ink/12 bg-white"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
          <FilterPanel
            filters={filters}
            options={options}
            hideTypeFilter={hideTypeFilter}
            onToggle={toggleIn}
            onUpdate={update}
            onClear={clearAll}
            activeCount={activeCount}
            embedded
          />
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="btn btn-primary btn-block mt-5"
          >
            {results.length} টি পণ্য দেখুন
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   FILTER PANEL — dynamic: যে অপশন নেই সেটা দেখানো হয় না
   ========================================================================== */
function FilterPanel({
  filters,
  options,
  hideTypeFilter,
  onToggle,
  onUpdate,
  onClear,
  activeCount,
  embedded = false,
}: {
  filters: ProductFilters;
  options: ReturnType<typeof availableFilterOptions>;
  hideTypeFilter: boolean;
  onToggle: (key: keyof ProductFilters, value: string) => void;
  onUpdate: (patch: Partial<ProductFilters>) => void;
  onClear: () => void;
  activeCount: number;
  embedded?: boolean;
}) {
  const typeLabels = Object.fromEntries(options.types.map((item) => [item.id, typeTitle(item.id)]));

  return (
    <div className={cx(!embedded && "rounded-md border border-ink/8 bg-white p-5")}>
      {!embedded && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">ফিল্টার</h2>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-medium text-danger underline-offset-4 hover:underline"
            >
              সব মুছুন
            </button>
          )}
        </div>
      )}

      <div className="space-y-6">
        {/* ---------------- দামের মধ্যে খুঁজুন ---------------- */}
        <FilterBlock title="দামের মধ্যে খুঁজুন">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>{formatPrice(filters.minPrice)}</span>
            <span>
              {formatPrice(filters.maxPrice)}
              {filters.maxPrice >= priceBounds.max ? "+" : ""}
            </span>
          </div>
          <div className="mt-3 space-y-2">
            <label className="block">
              <span className="sr-only">সর্বনিম্ন দাম</span>
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                step={5000}
                value={filters.minPrice}
                onChange={(event) =>
                  onUpdate({
                    minPrice: Math.min(Number(event.target.value), filters.maxPrice - 5000),
                  })
                }
                className="w-full"
              />
            </label>
            <label className="block">
              <span className="sr-only">সর্বোচ্চ দাম</span>
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                step={5000}
                value={filters.maxPrice}
                onChange={(event) =>
                  onUpdate({
                    maxPrice: Math.max(Number(event.target.value), filters.minPrice + 5000),
                  })
                }
                className="w-full"
              />
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { labelBn: "৫–২০ হাজার", min: 5000, max: 20000 },
              { labelBn: "২০–৬০ হাজার", min: 20000, max: 60000 },
              { labelBn: "৬০ হাজার+", min: 60000, max: 150000 },
            ].map((preset) => (
              <button
                key={preset.labelBn}
                type="button"
                onClick={() => onUpdate({ minPrice: preset.min, maxPrice: preset.max })}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-[11px] font-medium transition",
                  filters.minPrice === preset.min && filters.maxPrice === preset.max
                    ? "border-wood-600 bg-wood-600 text-white"
                    : "border-ink/12 bg-white text-ink-soft hover:border-ink/30",
                )}
              >
                {preset.labelBn}
              </button>
            ))}
          </div>
        </FilterBlock>

        {/* ---------------- ক্যাটাগরি ---------------- */}
        {options.departments.length > 0 && (
          <FilterBlock title="ক্যাটাগরি">
            <ul className="space-y-2">
              {options.departments.map((item) => (
                <CheckRow
                  key={item.id}
                  label={item.labelBn}
                  count={item.count}
                  checked={filters.departments.includes(item.id)}
                  onChange={() => onToggle("departments", item.id)}
                />
              ))}
            </ul>
          </FilterBlock>
        )}

        {/* ---------------- পণ্যের ধরন ---------------- */}
        {!hideTypeFilter && options.types.length > 1 && (
          <FilterBlock title="পণ্যের ধরন">
            <ul className="space-y-2">
              {options.types.map((item) => (
                <CheckRow
                  key={item.id}
                  label={typeLabels[item.id] ?? item.id}
                  count={item.count}
                  checked={filters.types.includes(item.id)}
                  onChange={() => onToggle("types", item.id)}
                />
              ))}
            </ul>
          </FilterBlock>
        )}

        {/* ---------------- Material ---------------- */}
        {options.materials.length > 0 && (
          <FilterBlock title="Material">
            <ul className="space-y-2">
              {materialFilters
                .filter((material) => options.materials.some((item) => item.id === material.id))
                .map((material) => {
                  const count = options.materials.find((item) => item.id === material.id)?.count ?? 0;
                  return (
                    <CheckRow
                      key={material.id}
                      label={material.labelBn}
                      count={count}
                      checked={filters.materials.includes(material.id)}
                      onChange={() => onToggle("materials", material.id)}
                    />
                  );
                })}
            </ul>
          </FilterBlock>
        )}

        {/* ---------------- কালার ---------------- */}
        {options.colors.length > 0 && (
          <FilterBlock title="কালার">
            <div className="flex flex-wrap gap-2">
              {colorFilters
                .filter((color) => options.colors.some((item) => item.id === color.id))
                .map((color) => {
                  const active = filters.colors.includes(color.id);
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => onToggle("colors", color.id)}
                      aria-pressed={active}
                      title={color.labelBn}
                      className={cx(
                        "flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition",
                        active
                          ? "border-wood-600 bg-wood-600 text-white"
                          : "border-ink/12 bg-white text-ink-soft hover:border-ink/30",
                      )}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.labelBn}
                    </button>
                  );
                })}
            </div>
          </FilterBlock>
        )}

        {/* ---------------- মাপ ---------------- */}
        {options.sizes.length > 0 && (
          <FilterBlock title="মাপ">
            <ul className="space-y-2">
              {sizeFilters
                .filter((size) => options.sizes.some((item) => item.id === size.id))
                .map((size) => {
                  const count = options.sizes.find((item) => item.id === size.id)?.count ?? 0;
                  return (
                    <CheckRow
                      key={size.id}
                      label={size.labelBn}
                      count={count}
                      checked={filters.sizes.includes(size.id)}
                      onChange={() => onToggle("sizes", size.id)}
                    />
                  );
                })}
            </ul>
          </FilterBlock>
        )}

        {/* ---------------- স্টক ---------------- */}
        <FilterBlock title="Availability">
          <ul className="space-y-2">
            {availabilityFilters.map((item) => (
              <CheckRow
                key={item.id}
                label={item.labelBn}
                type="radio"
                checked={filters.availability === item.id}
                onChange={() => onUpdate({ availability: item.id })}
              />
            ))}
          </ul>
        </FilterBlock>

        {/* ---------------- ওয়ারেন্টি ---------------- */}
        <FilterBlock title="ওয়ারেন্টি">
          <ul className="space-y-2">
            {warrantyFilters.map((item) => (
              <CheckRow
                key={item.id}
                label={item.labelBn}
                type="radio"
                checked={filters.warranty === item.id}
                onChange={() => onUpdate({ warranty: item.id })}
              />
            ))}
          </ul>
        </FilterBlock>

        {embedded && activeCount > 0 && (
          <button type="button" onClick={onClear} className="text-xs font-medium text-danger">
            সব ফিল্টার মুছুন
          </button>
        )}
      </div>
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-ink/8 pt-5 first:border-0 first:pt-0">
      <h3 className="text-[13px] font-semibold text-ink">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function CheckRow({
  label,
  count,
  checked,
  onChange,
  type = "checkbox",
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
  type?: "checkbox" | "radio";
}) {
  return (
    <li>
      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft transition hover:text-ink">
        <input
          type={type}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 accent-[#7a5a33]"
        />
        <span className="flex-1">{label}</span>
        {typeof count === "number" && <span className="text-[11px] text-ink-muted">({count})</span>}
      </label>
    </li>
  );
}
