export interface CartItem {
  id: string;
  name: string;
  price: number;
  currency?: string;
  image?: string;
  category?: string;
  quantity: number;
  sku?: string;
  description?: string;
  variant?: string;
  maxQuantity?: number;
  href?: string;
}

export interface CartTotals {
  subtotal: number;
  itemCount: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  amountUntilFreeShipping: number;
  isFreeShippingQualified: boolean;
  formattedSubtotal: string;
}

export interface PromoDiscount {
  code: string;
  percentage?: number;
  amount?: number;
  description?: string;
}

export interface CartStoreState {
  items: CartItem[];
  isOpen: boolean;
  currency: string;
  freeShippingThreshold: number;
  appliedPromo: PromoDiscount | null;
  orderNote: string;
}

export interface CartStoreActions {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }, options?: { openDrawer?: boolean }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  incrementItem: (id: string, step?: number) => void;
  decrementItem: (id: string, step?: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCurrency: (currency: string) => void;
  setFreeShippingThreshold: (threshold: number) => void;
  applyPromo: (promo: PromoDiscount) => void;
  removePromo: () => void;
  setOrderNote: (note: string) => void;
}

export type CartStore = CartStoreState & CartStoreActions;
