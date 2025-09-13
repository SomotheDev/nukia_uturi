'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Home, ShoppingBag, User, ShoppingCart, Search } from 'lucide-react'
import { useCart } from './contexts/CartContext'
import { CartPopup } from './components/CartPopup'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white bg-opacity-90 shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
            Nukia
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-gray-600 hover:text-pink-600 transition-colors">Products</Link>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-600 hover:text-pink-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
            <Link href="/onboarding" className="text-gray-600 hover:text-pink-600 transition-colors">
              <User size={24} />
            </Link>
          </nav>
          <button
            className="md:hidden text-gray-600 hover:text-pink-600 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 md:hidden"
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-pink-600">Nukia</span>
                <button
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-4">
                <Link href="/products" className="text-gray-600 hover:text-pink-600 transition-colors text-lg" onClick={() => setMobileMenuOpen(false)}>Products</Link>
                <Link href="/onboarding" className="text-gray-600 hover:text-pink-600 transition-colors text-lg" onClick={() => setMobileMenuOpen(false)}>Account</Link>
              </nav>
              <div className="mt-auto">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="mb-4 pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                />
                <Button
                  onClick={() => { setMobileMenuOpen(false); setIsCartOpen(true); }}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                >
                  View Cart ({cartItemCount})
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

function BottomNav() {
  const { cart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 border-t border-pink-200 backdrop-blur-sm">
        <div className="flex justify-around py-2">
          <Link href="/" className="flex flex-col items-center text-pink-600">
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/products" className="flex flex-col items-center text-pink-600">
            <ShoppingBag size={24} />
            <span className="text-xs">Products</span>
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center text-pink-600 relative">
            <ShoppingCart size={24} />
            <span className="text-xs">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
          <Link 
            href="/onboarding" 
            className="flex flex-col items-center text-pink-600"
            onClick={() => window.scrollTo(0, 0)}
          >
            <User size={24} />
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </div>
      <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  try {
    return (
      <>
        <Header />
        <main className="container mx-auto py-8 px-4 pb-16 md:pb-8 mt-20 bg-gray-50">
          {children}
        </main>
        <footer className="bg-pink-200 p-4 mt-8 mb-16 md:mb-0">
          <div className="container mx-auto text-center text-pink-600">
            © 2023 Nukia Cosmetics. All rights reserved.
          </div>
        </footer>
        <BottomNav />
      </>
    )
  } catch (error) {
    console.error('Error in ClientLayout:', error)
    return <div>An error occurred. Please try again later.</div>
  }
}

