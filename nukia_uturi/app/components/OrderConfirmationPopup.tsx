import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, CreditCard } from 'lucide-react'
import { PriceDisplay } from './PriceDisplay'

interface OrderConfirmationPopupProps {
  isOpen: boolean
  onClose: () => void
  orderId: string
  totalAmount: number
}

export function OrderConfirmationPopup({ isOpen, onClose, orderId, totalAmount }: OrderConfirmationPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center text-2xl font-bold">
            Order Confirmed!
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center">
            <Package className="w-16 h-16 text-pink-600" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span className="font-semibold flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-pink-600" />
                Order Number:
              </span>
              <span className="text-pink-600 font-bold">{orderId}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span className="font-semibold">Total Amount:</span>
              <PriceDisplay price={totalAmount} className="text-lg" />
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            We've sent a confirmation message with all the details of your order to the phone number you provided. 
            If you have any questions, please don't hesitate to contact our customer support.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

