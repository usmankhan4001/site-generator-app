'use client';

import { useSyncExternalStore } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, CartStore, CartTotals, PromoDiscount } from './types';
import { formatCurrency } from './formatCurrency';

const DEFAULT_FREE_SHIPPING_THRESHOLD = 100;
const STORAGE_KEY = 'airwallex-cart-storage';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      currency: 'USD',
      freeShippingThreshold: DEFAULT_FREE_SHIPPING_THRESHOLD,
      appliedPromo: null,
      orderNote: '',

      addItem: (item, options = { openDrawer: true }) => {
        const qtyToAdd = Math.max(1, item.quantity ?? 1);
        const { items } = get();
        const existingIndex = items.findIndex((i) => i.id === item.id);

        let newItems: CartItem[];
        if (existingIndex > -1) {
          newItems = items.map((cartItem, idx) => {
            if (idx === existingIndex) {
              const max = cartItem.maxQuantity ?? 999;
              const newQty = Math.min(max, cartItem.quantity + qtyToAdd);
              return { ...cartItem, quantity: newQty };
            }
            return cartItem;
          });
        } else {
          newItems = [
            ...items,
            {
              ...item,
              quantity: qtyToAdd,
            },
          ];
        }

        set({
          items: newItems,
          ...(options.openDrawer ? { isOpen: true } : {}),
          ...(item.currency ? { currency: item.currency } : {}),
        });
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              const max = item.maxQuantity ?? 999;
              return { ...item, quantity: Math.min(max, quantity) };
            }
            return item;
          }),
        }));
      },

      incrementItem: (id: string, step = 1) => {
        const item = get().items.find((i) => i.id === id);
        if (item) {
          get().updateQuantity(id, item.quantity + step);
        }
      },

      decrementItem: (id: string, step = 1) => {
        const item = get().items.find((i) => i.id === id);
        if (item) {
          get().updateQuantity(id, item.quantity - step);
        }
      },

      clearCart: () => {
        set({ items: [], appliedPromo: null });
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      setCurrency: (currency: string) => set({ currency }),
      setFreeShippingThreshold: (threshold: number) => set({ freeShippingThreshold: Math.max(0, threshold) }),

      applyPromo: (promo: PromoDiscount) => set({ appliedPromo: promo }),
      removePromo: () => set({ appliedPromo: null }),

      setOrderNote: (note: string) => set({ orderNote: note }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return window.localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      // Don't persist isOpen across page refreshes
      partialize: (state) => ({
        items: state.items,
        currency: state.currency,
        freeShippingThreshold: state.freeShippingThreshold,
        appliedPromo: state.appliedPromo,
        orderNote: state.orderNote,
      }),
    }
  )
);

/**
 * Calculates derived totals and progress indicators from cart items.
 */
export function calculateCartTotals(
  items: CartItem[],
  currency: string = 'USD',
  freeShippingThreshold: number = DEFAULT_FREE_SHIPPING_THRESHOLD,
  promo: PromoDiscount | null = null
): CartTotals & { discountAmount: number; total: number; formattedTotal: string } {
  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const itemCount = items.reduce((count, item) => count + (item.quantity || 1), 0);

  let discountAmount = 0;
  if (promo) {
    if (promo.percentage) {
      discountAmount = (subtotal * promo.percentage) / 100;
    } else if (promo.amount) {
      discountAmount = Math.min(subtotal, promo.amount);
    }
  }

  const total = Math.max(0, subtotal - discountAmount);
  const threshold = Math.max(0, freeShippingThreshold);
  const isFreeShippingQualified = subtotal >= threshold;
  const amountUntilFreeShipping = Math.max(0, threshold - subtotal);
  const freeShippingProgress = threshold > 0 ? Math.min(100, Math.round((subtotal / threshold) * 100)) : 100;

  return {
    subtotal,
    itemCount,
    freeShippingThreshold: threshold,
    freeShippingProgress,
    amountUntilFreeShipping,
    isFreeShippingQualified,
    formattedSubtotal: formatCurrency(subtotal, currency),
    discountAmount,
    total,
    formattedTotal: formatCurrency(total, currency),
  };
}

/**
 * SSR-safe hook that wraps the Zustand store with hydration detection
 * and computed totals.
 */
export function useCart() {
  const store = useCartStore();

  // Ensure SSR safety with useSyncExternalStore
  const isHydrated = useSyncExternalStore(
    (callback) => {
      const unsub = useCartStore.persist.onFinishHydration(callback);
      return () => unsub?.();
    },
    () => useCartStore.persist.hasHydrated(),
    () => false
  );

  const safeItems = isHydrated ? store.items : [];
  const totals = calculateCartTotals(
    safeItems,
    store.currency,
    store.freeShippingThreshold,
    store.appliedPromo
  );

  return {
    ...store,
    items: safeItems,
    isHydrated,
    ...totals,
  };
}

export default useCart;
