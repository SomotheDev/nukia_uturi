'use client'

import Image from 'next/image'
import Link from 'next/link'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Slide {
  image: string;
  title: string;
  description: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="relative h-[60vh] md:h-[80vh]">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            style={{objectFit: "cover"}}
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
              <Link href="/products" className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition duration-300 inline-block text-lg">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  )
}

