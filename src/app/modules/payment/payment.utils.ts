// payment.utils.ts
import axios from "axios"
import dotenv from 'dotenv'

dotenv.config()



export const initialPayment = async (paymentData: any) => {
    const response = await axios.post(process.env.PAYMENT_URL!, {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        tran_id: paymentData.transactionId,
        success_url: "http://localhost:5000/api/payment/confirmation",
        fail_url: "http://www.merchantdomain.com/faile dpage.html",
        cancel_url: "http://www.merchantdomain.com/can cellpage.html",
        amount: paymentData.payableAmount,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_add1: paymentData.customerAddress,
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: "N/A",
        cus_country: "N/A",
        cus_phone: paymentData.customerPhone,
        type: "json"
    })
    console.log(response);
    return response.data
}