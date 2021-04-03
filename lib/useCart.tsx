import { createContext, useContext, useMemo, useState } from 'react';

interface Context {
  cartOpen: boolean;
  toggleCart(): void;
  closeCart(): void;
  openCart(): void;
}

const CartContext = createContext<Context | undefined>(undefined);

export default function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export const CartProvider: React.FC = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const value = useMemo(
    () => ({
      cartOpen,
      toggleCart() {
        setCartOpen(!cartOpen);
      },
      closeCart() {
        setCartOpen(false);
      },
      openCart() {
        setCartOpen(true);
      },
    }),
    [cartOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
