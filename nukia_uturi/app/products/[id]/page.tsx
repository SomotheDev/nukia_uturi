'use client'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { products } from '../../lib/db'
import { ShoppingBag, Heart } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useState } from 'react'
import { PriceDisplay } from '../../components/PriceDisplay'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id))
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart(product)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
      <div className="md:w-1/2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="md:w-1/2 space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <p className="text-sm text-pink-600">{product.category}</p>
        </div>
        <p className="text-gray-600 text-sm md:text-base">{product.description}</p>
        <div className="text-2xl md:text-3xl font-bold">
          <PriceDisplay price={product.price} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition flex items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-5 h-5" />
            {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
          </button>
          <button className="flex-1 sm:flex-none border border-pink-600 text-pink-600 px-6 py-3 rounded-full hover:bg-pink-50 transition flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

