"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    }
});
exports.BookingModel = (0, mongoose_1.model)('Booking', bookingSchema);
