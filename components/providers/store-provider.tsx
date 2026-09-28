"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, OrderDetails } from "@/lib/types";
import { deliveryChargeFor, orderNumber, todayBn } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

/**
 * ============================================================================
 * DEMO STORE — Cart · Wishlist · Toast
 * ============================================================================
 * কোনো real backend নেই। সব তথ্য ব্রাউজারের localStorage-এ থাকে,
 * তাই ডেমো reload করলেও কার্ট হারায় না।
 * ============================================================================
 */

export interface AddLineInput {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity?: number;
  colorId?: string;
  colorName?: string;
  fabricId?: string;
  fabricName?: string;
  sizeLabelBn: string;
  deliveryChargeInside: number;
  deliveryChargeOutside?: number;
  overlay?: string;
  overlayOpacity?: number;
}

interface ToastState {
  id: number;
  messageBn: string;
  actionLabelBn?: string;
  actionHref?: string;
}

interface StoreValue {
  hydrated: boolean;
  /* cart */
  lines: CartLine[];
  addLine: (input: AddLineInput) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryZone: "inside" | "outside";
  setDeliveryZone: (zone: "inside" | "outside") => void;
  deliveryCharge: number;
  total: number;
  /* drawer */
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  /* wishlist */
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  /* toast */
  toast: ToastState | null;
  pushToast: (toast: Omit<ToastState, "id">) => void;
  dismissToast: () => void;
  /* recently added line (cart micro animation) */
  lastAddedKey: string | null;
  /* order */
  saveOrder: (order: OrderDetails) => void;
  lastOrder: OrderDetails | null;
}

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "woodora-demo-cart";
const WISHLIST_KEY = "woodora-demo-wishlist";
const ZONE_KEY = "woodora-demo-zone";
const ORDER_KEY = "woodora-demo-order";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [deliveryZone, setDeliveryZoneState] = useState<"inside" | "outside">("inside");
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  /* ------------------------------ hydrate ------------------------------ */
  useEffect(() => {
    setLines(readJson<CartLine[]>(CART_KEY, []));
    setWishlist(readJson<string[]>(WISHLIST_KEY, []));
    setDeliveryZoneState(readJson<"inside" | "outside">(ZONE_KEY, "inside"));
    setLastOrder(readJson<OrderDetails | null>(ORDER_KEY, null));
    setHydrated(true);
  }, []);

  /* ------------------------------ persist ------------------------------ */
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(ZONE_KEY, JSON.stringify(deliveryZone));
  }, [deliveryZone, hydrated]);

  /* -------------------------------- toast ------------------------------ */
  const pushToast = useCallback((next: Omit<ToastState, "id">) => {
    setToast({ ...next, id: Date.now() });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  /* --------------------------------- cart ------------------------------ */
  const addLine = useCallback(
    (input: AddLineInput) => {
      const key = [
        input.productId,
        input.colorId ?? "default",
        input.fabricId ?? "default",
      ].join("::");

      setLines((current) => {
        const existing = current.find((line) => line.key === key);
        if (existing) {
          return current.map((line) =>
            line.key === key
              ? { ...line, quantity: Math.min(line.quantity + (input.quantity ?? 1), 10) }
              : line,
          );
        }
        const line: CartLine = {
          key,
          productId: input.productId,
          slug: input.slug,
          name: input.name,
          image: input.image,
          price: input.price,
          originalPrice: input.originalPrice,
          quantity: input.quantity ?? 1,
          colorId: input.colorId,
          colorName: input.colorName,
          fabricId: input.fabricId,
          fabricName: input.fabricName,
          sizeLabelBn: input.sizeLabelBn,
          deliveryChargeInside: input.deliveryChargeInside,
        };
        return [...current, line];
      });

      setLastAddedKey(key);
      window.setTimeout(() => setLastAddedKey(null), 700);
      pushToast({
        messageBn: "কার্টে যোগ করা হয়েছে",
        actionLabelBn: "কার্ট দেখুন",
        actionHref: "/cart",
      });
    },
    [pushToast],
  );

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setLines((current) =>
      current
        .map((line) =>
          line.key === key ? { ...line, quantity: Math.max(0, Math.min(quantity, 10)) } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((current) => current.filter((line) => line.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const subtotal = useMemo(
    () => lines.reduce((total, line) => total + line.price * line.quantity, 0),
    [lines],
  );

  const totalItems = useMemo(
    () => lines.reduce((total, line) => total + line.quantity, 0),
    [lines],
  );

  /** Delivery: পণ্য অনুযায়ী charge + বড় অর্ডারে ফ্রি ডেলিভারি */
  const deliveryCharge = useMemo(() => {
    if (!lines.length) return 0;
    if (subtotal >= siteConfig.freeDeliveryAbove) return 0;
    const perItem = lines.map((line) =>
      deliveryZone === "inside" ? line.deliveryChargeInside : line.deliveryChargeInside + 500,
    );
    return Math.max(...perItem);
  }, [lines, subtotal, deliveryZone]);

  const total = subtotal + deliveryCharge;

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((current) => {
        const exists = current.includes(productId);
        pushToast({
          messageBn: exists ? "পছন্দের তালিকা থেকে সরানো হয়েছে" : "পছন্দের তালিকায় যোগ করা হয়েছে",
          actionLabelBn: exists ? undefined : "তালিকা দেখুন",
          actionHref: exists ? undefined : "/wishlist",
        });
        return exists ? current.filter((id) => id !== productId) : [...current, productId];
      });
    },
    [pushToast],
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const setDeliveryZone = useCallback((zone: "inside" | "outside") => {
    setDeliveryZoneState(zone);
  }, []);

  const saveOrder = useCallback((order: OrderDetails) => {
    setLastOrder(order);
    window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  }, []);

  const value: StoreValue = {
    hydrated,
    lines,
    addLine,
    updateQuantity,
    removeLine,
    clearCart,
    totalItems,
    subtotal,
    deliveryZone,
    setDeliveryZone,
    deliveryCharge,
    total,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    wishlist,
    toggleWishlist,
    isWishlisted,
    toast,
    pushToast,
    dismissToast,
    lastAddedKey,
    saveOrder,
    lastOrder,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside <StoreProvider>");
  }
  return context;
}

/** অর্ডার তৈরি — ডেমো checkout এই ফাংশন ব্যবহার করে */
export function buildOrder(input: {
  lines: CartLine[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  name: string;
  phone: string;
  address: string;
  areaBn: string;
  districtBn: string;
  deliveryZone: "inside" | "outside";
  paymentBn: string;
  note?: string;
}): OrderDetails {
  return {
    orderNumber: orderNumber(),
    name: input.name,
    phone: input.phone,
    address: input.address,
    areaBn: input.areaBn,
    districtBn: input.districtBn,
    deliveryZone: input.deliveryZone,
    paymentBn: input.paymentBn,
    note: input.note,
    items: input.lines,
    subtotal: input.subtotal,
    deliveryCharge: input.deliveryCharge,
    total: input.total,
    placedAtBn: todayBn(),
    estimatedDeliveryBn:
      input.deliveryZone === "inside"
        ? siteConfig.deliveryTimeInsideBn
        : siteConfig.deliveryTimeOutsideBn,
  };
}

export { deliveryChargeFor };
