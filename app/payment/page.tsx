"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PaymentForm() {
  const [cardholderName, setCardholderName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <button className="border border-gray-300 rounded-md px-3 py-1 text-sm font-medium text-amber-800">
            English
          </button>

          <div className="text-xl font-bold text-right text-gray-800">جمعية إيلاف الخيرية</div>

          <div className="h-10 w-10 relative">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Eelaf Charity Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        <div className="mb-4">
         
        </div>

        <div className="text-right mb-8 text-gray-700 text-sm">
          <span>العنصر 1</span>
          <span> | </span>
          <span>تنتهي خلال 2 يوم</span>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-700">إدخال بيانات البطاقة</span>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <Input
              className="text-right border-gray-300 rounded-md p-3"
              placeholder="اسم صاحب البطاقة"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>

          <div className="relative">
            <Input
              className="text-right border-gray-300 rounded-md p-3"
              placeholder="رقم البطاقة"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <div className="w-8 h-5 relative">
                <Image
                  src="/placeholder.svg?height=20&width=32"
                  alt="Mastercard"
                  width={32}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-5 relative">
                <Image
                  src="/placeholder.svg?height=20&width=32"
                  alt="Visa"
                  width={32}
                  height={20}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              className="text-right border-gray-300 rounded-md p-3"
              placeholder="رقم التحقق"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <Input
              className="text-right border-gray-300 rounded-md p-3"
              placeholder="شهر / سنة"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md" type="submit">
            ادفع الآن
          </Button>
        </form>

        <div className="mt-8 flex justify-center items-center">
          <span className="text-sm text-gray-500 ml-2">مدعوم من</span>
          <div className="h-6 w-24 relative">
            <Image
              src="/placeholder.svg?height=24&width=96"
              alt="MyAtoorah"
              width={96}
              height={24}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

