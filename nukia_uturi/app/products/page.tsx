'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '../lib/db'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Scissors, Palette, Sparkle, Plus } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import { PriceDisplay } from '../components/PriceDisplay'

export default function Products() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const { addToCart } = useCart()

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = category === 'all' || product.category.toLowerCase() === category
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.description.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Added to cart
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {product.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ), {
      duration: 2000,
      position: 'bottom-right',
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Our Products</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Label className="mb-2 block">Category</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Products', icon: Sparkles, description: 'All' },
                { value: 'skincare', label: 'Skincare', icon: Sparkle, description: 'Face' },
                { value: 'haircare', label: 'Hair Care', icon: Scissors, description: 'Hair' },
                { value: 'makeup', label: 'Makeup', icon: Palette, description: 'Makeup' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setCategory(item.value)}
                  className={`flex items-center gap-1 px-3 py-2 border rounded-full text-sm transition-colors ${
                    category === item.value ? 'bg-pink-100 border-pink-500 text-pink-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.description}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full">
            <Label htmlFor="search" className="mb-2 block">Search</Label>
            <div className="relative">
              <Input 
                id="search" 
                placeholder="Search products..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 px-4">
        {filteredProducts.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.id}`}
            className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <div className="relative aspect-square mb-2 sm:mb-4 overflow-hidden rounded-2xl bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm sm:text-base md:text-xl font-bold leading-tight line-clamp-2">{product.name}</h2>
              <p className="text-xs sm:text-sm text-gray-500">{product.category}</p>
              <div className="flex justify-between items-center pt-2">
                <PriceDisplay price={product.price} className="text-sm sm:text-base md:text-xl font-bold" />
                <button 
                  className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-pink-600 text-white rounded-full hover:bg-pink-700"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found matching your criteria.</p>
      )}
      <Toaster />
    </div>
  )
}

