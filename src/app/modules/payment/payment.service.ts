import { BookingModel } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";
import { join } from "path";
import { readFileSync } from "fs";

const confirmationService = async (transactionId: string, status: string) => {
    const verifyResponse = await verifyPayment(transactionId);

    let result;
    let message = "";

    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        result = await BookingModel.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid'
        });
        message = "Successfully Paid!"
    }
    else {
        message = "Payment Failed!"
    }

    const filePath = join(__dirname, '../../../../public/confirmation.html');
    let template = readFileSync(filePath, 'utf-8')

    template = template.replace('{{message}}', message)

    return template;
}

export const PaymentServices = {
    confirmationService
}