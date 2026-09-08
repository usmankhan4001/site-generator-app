'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './useCart';

export interface CartTriggerProps {
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export function CartTrigger({
  className = '',
  showLabel = false,
  label = 'Cart',
}: CartTriggerProps) {
  const { openCart, itemCount, isHydrated } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className={`relative inline-flex items-center gap-2 p-2 rounded-lg text-foreground hover:bg-muted/70 transition-colors cursor-pointer ${className}`}
      aria-label={`Shopping Cart (${isHydrated ? itemCount : 0} items)`}
    >
      <div className="relative">
        <ShoppingBag className="h-5 w-5" />
        {isHydrated && itemCount > 0 && (
          <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center leading-none shadow-xs animate-in zoom-in-75">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </div>
      {showLabel && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}

export default CartTrigger;
