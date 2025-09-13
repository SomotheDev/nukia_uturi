'use client'

import { useCart } from '../contexts/CartContext'
import { X, Minus, Plus, ShoppingBag, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PriceDisplay } from './PriceDisplay'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'react-hot-toast'

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export function CartPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, addToCart, getCartTotal, applyCoupon } = useCart()
  const [couponCode, setCouponCode] = useState('')

  if (!isOpen) return null

  const handleIncrement = (item: CartItem) => {
    addToCart({ ...item, quantity: 1 });
  };

  const handleDecrement = (item: CartItem) => {
    addToCart({ ...item, quantity: -1 });
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === '') {
      toast.error('Please enter a coupon code');
      return;
    }
    const success = applyCoupon(couponCode);
    if (success) {
      toast.success('Coupon applied successfully');
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b">
                  <div className="w-20 h-20 relative mr-4">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <PriceDisplay price={item.price} className="text-gray-500" />
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-gray-700 ml-4"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center mb-4">
            <Input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button onClick={handleApplyCoupon} className="whitespace-nowrap">
              <Tag className="mr-2 h-4 w-4" /> Apply
            </Button>
          </div>
          <div className="text-lg font-semibold mb-4">
            Total: <PriceDisplay price={getCartTotal()} />
          </div>
          <Link href="/checkout" onClick={onClose}>
            <Button className="w-full bg-pink-600 text-white hover:bg-pink-700">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

