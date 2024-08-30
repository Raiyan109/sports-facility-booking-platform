import { Request, Response } from "express";
import { PaymentServices } from "./payment.service";

export const confirmationController = async (req: Request, res: Response) => {
    const { transactionId, status } = req.query;

    const result = await PaymentServices.confirmationService(transactionId as string, status as string);
    res.send(result)
};

export const paymentController = {
    confirmationController
}