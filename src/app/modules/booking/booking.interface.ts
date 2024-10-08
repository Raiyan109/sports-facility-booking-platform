import { Types } from "mongoose";

export type TBooking = {
    date: string;
    startTime: string;
    endTime: string;
    user: Types.ObjectId;
    facility: Types.ObjectId;
    payableAmount?: number;
    isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
    status: string;
    paymentStatus: string;
    transactionId: string;
}

export type TSchedule = {
    date?: string;
    startTime: string;
    endTime: string;
};