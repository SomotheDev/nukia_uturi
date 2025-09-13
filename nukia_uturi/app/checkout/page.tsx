"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "../contexts/CartContext"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PriceDisplay } from "../components/PriceDisplay"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Building2, Smartphone, Truck } from "lucide-react"
import { OrderConfirmationPopup } from "../components/OrderConfirmationPopup"
import { toast } from "react-hot-toast"
import { sendSMS } from "../actions/sendSMS"

export default function Checkout() {
  const router = useRouter()
  const { cart, getCartTotal, clearCart, getCartSubtotal, getShippingCost } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    streetAddress: "",
    city: "",
    phoneNumber: "",
  })
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [orderDetails, setOrderDetails] = useState({ id: "", total: 0 })
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(getCartSubtotal() * 0.1)
    } else {
      setDiscount(0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPaymentMethod) {
      toast.error("Tafadhali chagua njia ya malipo")
      return
    }
    const total = getCartTotal() - discount

    // Generate a random order ID (in a real app, this would come from the backend)
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase()

    // Set order details and open the confirmation pop-up
    setOrderDetails({ id: orderId, total })
    setIsConfirmationOpen(true)

    // Send SMS confirmation
    try {
      console.log("Sending SMS with details:", {
        phoneNumber: formData.phoneNumber,
        orderNumber: orderId,
        customerName: formData.name,
        totalAmount: total,
        paymentMethod: selectedPaymentMethod,
      })
      const result = await sendSMS(formData.phoneNumber, {
        orderNumber: orderId,
        customerName: formData.name,
        totalAmount: total,
        paymentMethod: selectedPaymentMethod,
      })
      console.log("SMS send result:", result)
      if (result.success) {
        toast.success("Uthibitisho wa oda umetumwa kwenye simu yako")
        console.log("Lipa Namba:", result.lipaNamba)
      } else {
        throw new Error(result.error || "Imeshindwa kutuma SMS")
      }
    } catch (error) {
      console.error("Error sending SMS confirmation:", error)
      toast.error("Imeshindwa kutuma uthibitisho wa oda kwa SMS. Tafadhali jaribu tena baadaye.")
    }

    // Clear the cart
    clearCart()
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 gap-6">
        <div className="order-1 mb-10">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-pink-500 text-pink-700">Shipping Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="Enter your street address"
                />
              </div>
              <div>
                <Label htmlFor="city">Town/City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="e.g. Dar es Salaam"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>
        <div className="order-2 mb-10">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-pink-500 text-pink-700">Your Order</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 relative mr-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">
                  <PriceDisplay price={item.price * item.quantity} />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Subtotal</span>
                <PriceDisplay price={getCartSubtotal()} className="font-medium" />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Shipping</span>
                <PriceDisplay price={getShippingCost()} className="font-medium" />
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>Discount</span>
                  <PriceDisplay price={discount} className="font-medium" />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
              <span>Total</span>
              <PriceDisplay price={getCartTotal() - discount} />
            </div>
            <div className="pt-4">
              <div className="relative">
                <Input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="pr-24"
                />
                <Button onClick={handleApplyCoupon} className="absolute right-0 top-0 bottom-0 rounded-l-none">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="order-3">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-pink-500 text-pink-700">Choose Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4 overflow-x-hidden">
              <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="grid gap-4">
                <div>
                  <RadioGroupItem value="bankTransfer" id="bankTransfer" className="peer sr-only" />
                  <Label
                    htmlFor="bankTransfer"
                    className="group flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4  hover:border-gray-300 transition-colors duration-200 peer-data-[state=checked]:bg-pink-600 peer-data-[state=checked]:border-pink-600 peer-data-[state=checked]:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-6 h-6 text-pink-600 group-data-[state=checked]:text-white" />
                      <div>
                        <p className="font-medium leading-none group-data-[state=checked]:text-white">Bank Transfer</p>
                        <p className="text-sm text-muted-foreground group-data-[state=checked]:text-white">
                          Pay via bank transfer
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="lipaNamba" id="lipaNamba" className="peer sr-only" />
                  <Label
                    htmlFor="lipaNamba"
                    className="group flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-gray-300 transition-colors duration-200 peer-data-[state=checked]:bg-pink-600 peer-data-[state=checked]:border-pink-600 peer-data-[state=checked]:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-6 h-6 text-pink-600 group-data-[state=checked]:text-white" />
                      <div>
                        <p className="font-medium leading-none">Lipa Namba</p>
                        <p className="text-sm text-muted-foreground group-data-[state=checked]:text-white">
                          Pay using mobile money
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
                {formData.city.toLowerCase() === "tanga" && (
                  <div>
                    <RadioGroupItem value="cashOnDelivery" id="cashOnDelivery" className="peer sr-only" />
                    <Label
                      htmlFor="cashOnDelivery"
                      className="group flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-gray-300 transition-colors duration-200 peer-data-[state=checked]:bg-pink-600 peer-data-[state=checked]:border-pink-600 peer-data-[state=checked]:text-white"
                    >
                      <div className="flex items-center gap-3">
                        <Truck className="w-6 h-6 text-pink-600 group-data-[state=checked]:text-white" />
                        <div>
                          <p className="font-medium leading-none">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground group-data-[state=checked]:text-white">
                            Pay when you receive
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                )}
              </RadioGroup>
            </div>
            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Place Order
            </Button>
          </form>
        </div>
      </div>
      <OrderConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        orderId={orderDetails.id}
        totalAmount={orderDetails.total}
      />
    </div>
  )
}

