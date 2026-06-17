import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  // Use 'cart' as key to stay fully consistent with your existing data history
  const [cartItems, setCartItems] = useState(() => {
    const savedBasket = localStorage.getItem("cart");
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage")); // Instantly alerts components like Navbar
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const matchIndex = prevItems.findIndex(item => item.id === product.id);
      if (matchIndex > -1) {
        const updated = [...prevItems];
        updated[matchIndex].quantity += 1;
        return updated;
      }
      return [...prevItems, {
        id: product.id,
        name: product.title,
        category: product.category?.name || "Catalog Asset",
        price: product.price,
        image: product.images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
        quantity: 1
      }];
    });
  };

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map(item => {
        if (item.id === id) {
          const nextQty = item.quantity + change;
          return nextQty > 0 ? { ...item, quantity: nextQty } : item;
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const cartTotalBalance = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, cartTotalBalance }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be executed within a valid CartProvider node.");
  return context;
}