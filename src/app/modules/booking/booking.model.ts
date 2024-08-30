import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";


const bookingSchema = new Schema<TBooking>({
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    facility: {
        type: Schema.Types.ObjectId,
        ref: 'Facility',
        required: true
    },
    payableAmount: {
        type: Number,
        default: 90,
        // required: true
    },
    isBooked: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
        default: 'confirmed',
        // required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    transactionId: {
        type: String,
        required: true
    },
})

export const BookingModel = model<TBooking>('Booking', bookingSchema)