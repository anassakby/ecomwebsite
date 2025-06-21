import { useState, useEffect, useCallback } from "react";
import { CartItem, Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const CART_STORAGE_KEY = 'ecommerce-cart';

// Create a global cart state that persists across re-renders
let globalCart: CartItem[] = [];
const cartListeners: Array<(cart: CartItem[]) => void> = [];

function notifyCartListeners(newCart: CartItem[]) {
  globalCart = [...newCart];
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
  cartListeners.forEach(listener => listener(newCart));
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(globalCart);
  const { toast } = useToast();

  // Subscribe to cart changes on mount
  useEffect(() => {
    // Initialize from localStorage only once globally
    if (globalCart.length === 0) {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      console.log('Loading cart from localStorage:', savedCart);
      
      if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
        try {
          const parsedCart = JSON.parse(savedCart);
          console.log('Parsed cart:', parsedCart);
          if (Array.isArray(parsedCart)) {
            globalCart = parsedCart;
            setCart(parsedCart);
          }
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    } else {
      // Use existing global cart
      setCart(globalCart);
    }

    // Add this component as a listener
    const listener = (newCart: CartItem[]) => {
      setCart([...newCart]);
    };
    cartListeners.push(listener);

    // Cleanup listener on unmount
    return () => {
      const index = cartListeners.indexOf(listener);
      if (index > -1) {
        cartListeners.splice(index, 1);
      }
    };
  }, []);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    console.log('=== ADD TO CART START ===');
    console.log('Product:', product);
    console.log('Quantity:', quantity);
    console.log('Current global cart:', globalCart);
    
    const existingItem = globalCart.find(item => item.id === product.id);
    console.log('Existing item:', existingItem);
    
    let newCart: CartItem[];
    if (existingItem) {
      newCart = globalCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...globalCart, { ...product, quantity }];
    }
    
    console.log('New cart:', newCart);
    notifyCartListeners(newCart);
    
    console.log('=== ADD TO CART END ===');
    
    toast({
      title: "Produit ajouté au panier",
      description: `${product.title} a été ajouté à votre panier.`,
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: number) => {
    const newCart = globalCart.filter(item => item.id !== productId);
    notifyCartListeners(newCart);
    
    toast({
      title: "Produit retiré du panier",
      description: "Le produit a été retiré de votre panier.",
      variant: "destructive",
    });
  }, [toast]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const newCart = globalCart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    notifyCartListeners(newCart);
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    notifyCartListeners([]);
    toast({
      title: "Panier vidé",
      description: "Tous les produits ont été retirés de votre panier.",
    });
  }, [toast]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  console.log('Cart hook returning:', { 
    cartLength: cart.length, 
    cartItemsCount, 
    cartTotal 
  });

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemsCount,
  };
}
