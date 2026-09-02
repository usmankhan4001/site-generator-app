'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart, X, Minus, Plus, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="px-1 py-2 text-left">
          <SheetTitle className="flex items-center text-xl">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Your Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
          </SheetTitle>
        </SheetHeader>
        
        <Separator className="my-2" />
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 space-y-4">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/30" />
            <div className="text-xl font-medium text-muted-foreground">Your cart is empty</div>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-6 pb-6 pr-4 mt-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium leading-none">{item.name}</h4>
                      <p className="text-sm font-semibold text-primary">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none rounded-l-md"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none rounded-r-md"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="pt-6 pb-2 space-y-4 border-t">
              <div className="flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Button className="w-full" size="lg" onClick={onCheckout}>
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
