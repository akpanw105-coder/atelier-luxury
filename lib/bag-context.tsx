"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface BagItem {
  id: string;
  slug: string;
  name: string;
  reference: string;
  price: number;
  image: string;
  selectedCase?: string;
  selectedStrap?: string;
  quantity: number;
}

interface BagContextValue {
  items: BagItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  openBag: () => void;
  closeBag: () => void;
  addItem: (item: Omit<BagItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBag: () => void;
}

const BagContext = createContext<BagContextValue | null>(null);

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openBag  = useCallback(() => setIsOpen(true),  []);
  const closeBag = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<BagItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.selectedCase === item.selectedCase && i.selectedStrap === item.selectedStrap);
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearBag = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal   = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <BagContext.Provider value={{ items, isOpen, totalItems, subtotal, openBag, closeBag, addItem, removeItem, updateQuantity, clearBag }}>
      {children}
    </BagContext.Provider>
  );
}

export function useBag(): BagContextValue {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used within BagProvider");
  return ctx;
}
