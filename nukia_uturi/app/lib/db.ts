export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Color WOW Dream Coat Spray",
    description: "Revolutionary anti-humidity hair treatment that creates a water-resistant barrier for sleek, glossy hair that lasts up to 3-4 shampoos.",
    price: 7000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Color%20WOW%20Dream%20Coat%20Spray-jc4La4cr53EA8ufc6ZttpZSvC5v7zC.webp",
    category: "Hair Care"
  },
  {
    id: 2,
    name: "Dior Forever Skin Glow Foundation",
    description: "24h* wear high perfection skin-caring foundation with medium-to-full coverage and radiant finish.",
    price: 12200,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dior%20Forever%20Skin%20Glow%20Foundation-BoqNdviKYIdJ0ZsAfK3sRmBZcCqyjH.webp",
    category: "Makeup"
  },
  {
    id: 3,
    name: "OUHOE Hydrating Face Mask",
    description: "Visible results hydrating face mask with collagen for minimizing, firming, and balance.",
    price: 5800,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Collagen%20Face%20Mask%20Beauty%20-%20Face%20Mask%20Set.jpg-YGncW7IuwwQXHLj7MLIvN0jMpFWaQa.jpeg",
    category: "Skincare"
  },
  {
    id: 4,
    name: "Chanel Rouge Coco Baume",
    description: "Luxurious lip balm that provides intense hydration and a subtle hint of color for naturally beautiful lips.",
    price: 9800,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rouge%20Coco%20Baume%20918-MQ7WI8uPkqbVFT6408jetgMzBLxrkS.webp",
    category: "Makeup"
  },
  {
    id: 5,
    name: "Scandinavian Biolabs Bio-Pilixin Shampoo",
    description: "Advanced hair strengthening formula designed specifically for men, helping reduce hair loss and rebalance scalp health.",
    price: 8200,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scandinavian%20Biolabs%20Bio-Pilixin%20Shampoo%20250ml.jpg-2sI22JyJMyP8ElzqQ0QyaCVOWj8uFz.jpeg",
    category: "Hair Care"
  },
  {
    id: 6,
    name: "SHOW Beauty Sublime Repair Shampoo",
    description: "Luxury repair shampoo that restores and revitalizes damaged hair for a sublime, healthy finish.",
    price: 10500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SHOW%20Beauty%20Sublime%20Repair%20Shampoo.jpg-Xzl6DfDIgCuBmjNNNJz19LORQjKUzo.jpeg",
    category: "Hair Care"
  },
  {
    id: 7,
    name: "Sally Hansen Vitamin E Nail & Cuticle Oil",
    description: "Nourishing nail and cuticle treatment enriched with Vitamin E for healthy, strong nails.",
    price: 21000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sally%20Hansen%20Vitamin%20E%20Nail%20and%20Cuticle%20Oil.jpg-jhD7bJV6aRAWtmJ5QLUHdZCOlObN70.jpeg",
    category: "Nail Care"
  },
  {
    id: 8,
    name: "Vaseline Intensive Care Essential Healing",
    description: "Deep moisturizing body lotion that keeps skin healed for 3 weeks with regular use.",
    price: 18000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vaseline%20Intensive%20Care%20Essential%20Healing,%20400ml.jpg-F2PxNqPbR4TlPKGFCQONzicW4TKaxS.jpeg",
    category: "Body Care"
  },
  {
    id: 9,
    name: "Sanctuary Spa Gift Set",
    description: "Luxurious collection of body care essentials presented in a beautiful heart-shaped box.",
    price: 7500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sanctuary%20Spa%20Lost%20In%20The%20Moment%20Gift%20Set.jpg-CcVqMeQ811Nn8vdXI56JBFWh5XTBEG.jpeg",
    category: "Gift Sets"
  },
  {
    id: 10,
    name: "Schwarzkopf Blondme All Blondes Rich Shampoo",
    description: "Intensive nourishing shampoo specially formulated for blonde hair maintenance.",
    price: 5400,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Schwarzkopf%20Blondme%20All%20Blondes%20Rich%20Shampoo%20300ml.jpg-ofdlgxujC5QkXzDL4EssxncQG4VPOd.jpeg",
    category: "Hair Care"
  },
  {
    id: 11,
    name: "UpCircle Shampoo Crème",
    description: "Sustainable shampoo crème enriched with coconut and rosemary oil for healthy, vibrant hair.",
    price: 4000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UpCircle%20Shampoo%20Cr%C3%A8me%20with%20Rosemary%20Oil%20+%20Pink%20Berry.jpg-v6LmVFOH2C5FSVAgXDFOdMjSf2crzX.jpeg",
    category: "Hair Care"
  },
  {
    id: 12,
    name: "Simple Age Resisting Facial Wash",
    description: "Gentle facial cleanser with green tea and mushroom extract for age-defying results.",
    price: 2100,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Simple%20Regeneration%20Age%20Resisting%20Facial%20Wash%20with%20green%20tea%20and%20prebiotic%20cleanser.jpg-M87TtnAbMNrG6bLpZtgZZgafD59PC8.jpeg",
    category: "Skincare"
  },
  {
    id: 13,
    name: "Wilkinson Sword Quattro For Women",
    description: "Premium 4-blade razor with aloe vera strip for a smooth, comfortable shave.",
    price: 2300,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WILKINSON%20SWORD%20-%20Quattro%20For%20Women.jpg-cEI7BJuq26RDbyuPxMH5ZP0Ys311OT.jpeg",
    category: "Personal Care"
  }
];

