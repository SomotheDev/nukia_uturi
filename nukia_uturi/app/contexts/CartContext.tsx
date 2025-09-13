'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '../lib/db'

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product & { quantity?: number }) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartSubtotal: () => number
  getShippingCost: () => number
  applyCoupon: (code: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [couponDiscount, setCouponDiscount] = useState(0)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product & { quantity?: number }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.max(0, item.quantity + (product.quantity || 1)) }
            : item
        ).filter(item => item.quantity > 0);
      }
      return [...prevCart, { ...product, quantity: Math.max(1, product.quantity || 1) }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    return subtotal - couponDiscount
  }

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  const getShippingCost = () => {
    // Replace with your actual shipping cost calculation logic
    const subtotal = getCartSubtotal();
    return subtotal > 1000 ? 0 : 100; // Example: Free shipping over $10
  }

  const applyCoupon = (code: string) => {
    // This is a simple example. In a real application, you'd validate the coupon code against a database.
    const validCoupons = {
      'SAVE10': 1000, // 10% off, assuming prices are in cents
      'FREESHIP': 500, // 5% off
    }

    if (code in validCoupons) {
      setCouponDiscount(validCoupons[code as keyof typeof validCoupons])
      return true
    }
    return false
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getCartTotal, 
      getCartSubtotal, 
      getShippingCost, 
      applyCoupon 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCart }

