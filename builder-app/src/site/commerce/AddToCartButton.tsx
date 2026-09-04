'use client';

import React, { useState } from 'react';
import { ShoppingBag, Check, Plus } from 'lucide-react';
import { useCart } from './useCart';
import type { CartItem } from './types';

export interface AddToCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: Omit<CartItem, 'quantity'> & { quantity?: number };
  openDrawerOnAdd?: boolean;
  showIcon?: boolean;
  showPrice?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  successDuration?: number;
}

export function AddToCartButton({
  item,
  openDrawerOnAdd = true,
  showIcon = true,
  children,
  className = '',
  disabled = false,
  successDuration = 1500,
  ...props
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    addItem(item, { openDrawer: openDrawerOnAdd });
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, successDuration);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        isAdded
          ? 'bg-emerald-600 text-white shadow-xs scale-[1.02]'
          : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs active:scale-[0.98]'
      } px-4 py-2.5 ${className}`}
      {...props}
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4 animate-in zoom-in-50" />
          <span>Added to Cart</span>
        </>
      ) : (
        <>
          {showIcon && <ShoppingBag className="h-4 w-4" />}
          <span>{children || 'Add to Cart'}</span>
        </>
      )}
    </button>
  );
}

export default AddToCartButton;
