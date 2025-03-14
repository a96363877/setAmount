"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"
import Image from "next/image"

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [country, setCountry] = useState("الأردن")

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 text-right" dir="rtl">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">رقم البطاقة</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              className="pl-12 text-left ltr"
              dir="ltr"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Image src="/visa.svg" alt="Visa" width={24} height={16} className="h-4 w-auto" />
              <Image
                src="/mastercard.svg"
                alt="Mastercard"
                width={24}
                height={16}
                className="h-4 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">تاريخ الانتهاء</label>
            <Input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              maxLength={5}
              className="text-left ltr"
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">رمز الأمان</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                maxLength={3}
                className="text-left ltr"
                dir="ltr"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50"
                title="رمز الأمان الموجود على ظهر البطاقة"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">الدولة</label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الدولة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الأردن">الأردن</SelectItem>
              <SelectItem value="الإمارات">الإمارات</SelectItem>
              <SelectItem value="السعودية">السعودية</SelectItem>
              <SelectItem value="مصر">مصر</SelectItem>
              <SelectItem value="الكويت">الكويت</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

    

      <div className="flex justify-between items-center pt-4">
        <Button variant="ghost" className="text-gray-600">
          إلغاء
        </Button>
        <Button className="bg-black text-white hover:bg-gray-800">إضافة البطاقة والدفع</Button>
      </div>
    </div>
  )
}

