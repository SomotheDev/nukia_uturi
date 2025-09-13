'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Gift, Truck, Tag, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { products } from './lib/db'
import { PriceDisplay } from './components/PriceDisplay'
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from 'embla-carousel-react'
import { toast } from 'react-hot-toast'


const heroSlides = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-CIDP3OhLkyMPGE5qPhVX4VXJ8M3I3G.jpeg",
    title: "Holiday Gift Guide",
    description: "Choose the right gift for your loved ones with us",
    cta: "Find out more",
    link: "/products?category=gift-sets"
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%202-UTwDR4aN9jjzU0ArVHS2Ki1BXtsEOZ.jpeg",
    title: "BLACK FRIDAY",
    description: "We have many gifts with your BLACK FRIDAY orders",
    cta: "I want a gift",
    link: "/products?sale=black-friday"
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%203-fwfjmGd1nG18RuuFMi85SLaUzG8pmb.jpeg",
    title: "Discover NARS",
    description: "Get a free mini Explicit Lipstick with your purchase of 2 products",
    cta: "Discover",
    link: "/products?brand=nars"
  }
]

const featuredProducts = products.slice(0, 4)

const promotions = [
  { 
    title: "Black Friday Special", 
    description: "Up to 50% off on selected items", 
    code: "BLACK50",
    icon: Tag,
    color: "bg-purple-100 text-purple-800"
  },
  { 
    title: "Free Shipping", 
    description: "On orders over 50,000 TZS", 
    code: "FREESHIP50",
    icon: Truck,
    color: "bg-pink-100 text-pink-800"
  },
  { 
    title: "Gift with Purchase", 
    description: "Free mini lipstick with NARS products", 
    code: "NARSGIFT",
    icon: Gift,
    color: "bg-orange-100 text-orange-800"
  }
]

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      {/* Hero Carousel */}
      <Carousel 
        ref={emblaRef}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full relative"
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  style={{objectFit: "cover"}}
                  priority={index === 0}
                  className="object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                  <div className="text-white px-4 sm:px-8 md:px-16 max-w-xl md:max-w-2xl lg:max-w-3xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4">{slide.title}</h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8">{slide.description}</p>
                    <Link href={slide.link}>
                      <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100 text-sm sm:text-base">
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className="w-6 sm:w-8 h-2 sm:h-3 rounded-full bg-white bg-opacity-50 transition-all duration-300 ease-in-out focus:outline-none hover:bg-opacity-100"
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className="relative aspect-square mb-2 sm:mb-3 lg:mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 line-clamp-2">{product.name}</h3>
                  <PriceDisplay price={product.price} className="text-xs sm:text-sm lg:text-base" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6 sm:mt-8 lg:mt-10">
          <Link href="/products">
            <Button variant="outline" size="lg" className="text-sm sm:text-base hover:bg-pink-100 hover:text-pink-700 transition-colors duration-300">
              View All Products
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Promotions */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center text-pink-800">
            Exclusive Offers Just for You
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {promotions.map((promo, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className={`${promo.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <promo.icon size={32} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-center">{promo.title}</h3>
                  <p className="text-gray-600 text-center mb-4">{promo.description}</p>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <span className="text-sm text-gray-500 block mb-1">Use Code:</span>
                    <span 
                      className="font-mono text-lg font-bold cursor-pointer hover:text-pink-600 transition-colors flex items-center justify-center gap-2"
                      onClick={() => {
                        navigator.clipboard.writeText(promo.code)
                          .then(() => toast.success(`Copied code: ${promo.code}`))
                          .catch(() => toast.error('Failed to copy code'))
                      }}
                    >
                      {promo.code}
                      <Copy size={18} className="inline-block" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10 sm:mt-12 lg:mt-16">
            <Button variant="outline" size="lg" className="bg-white hover:bg-pink-50 text-pink-800 border-pink-300 hover:border-pink-400 transition-colors duration-300">
              View All Offers
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Stay Updated</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Subscribe to our newsletter for exclusive Black Friday deals and beauty tips.</p>
        <form className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
          />
          <Button type="submit" size="lg" className="w-full sm:w-auto text-sm sm:text-base">Subscribe</Button>
        </form>
      </section>
    </div>
  )
}

