'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Percent, Clock, Gift, User, MapPin, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const benefits = [
  { icon: Percent, title: "Instant Discounts", description: "Get immediate access to exclusive discounts on your favorite products." },
  { icon: Clock, title: "Early Access", description: "Be the first to shop new collections and limited edition items." },
  { icon: Gift, title: "Birthday Rewards", description: "Enjoy special treats and offers on your birthday." },
]

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ fullName, address, phoneNumber })
    // For now, we'll just redirect to the home page
    router.push('/')
  }

  const steps = [
    // Step 1: Benefits
    <motion.div
      key="benefits"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-center">Welcome to Nukia</h1>
      <p className="text-center text-gray-600">Create an account to enjoy these exclusive benefits:</p>
      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-pink-50 rounded-lg">
            <benefit.icon className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-semibold">{benefit.title}</h2>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => setStep(1)} className="w-full">
        Get Started <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>,

    // Step 2: Personal Information
    <motion.form
      key="personal-info"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">Create Your Account</h1>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="pl-10"
            placeholder="John Doe"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" />
          <Textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="pl-10"
            placeholder="123 Main St, City, Country"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="pl-10"
            placeholder="+1 (123) 456-7890"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Complete Onboarding
      </Button>
    </motion.form>
  ]

  return (
    <div className="max-w-md mx-auto p-6">
      <AnimatePresence mode="wait">
        {steps[step]}
      </AnimatePresence>
    </div>
  )
}

