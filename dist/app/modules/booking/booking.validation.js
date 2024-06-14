"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
}, {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
});
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string(),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
        user: zod_1.z.string().optional(),
        facility: zod_1.z.string(),
        payableAmount: zod_1.z.number().optional(),
        isBooked: zod_1.z.enum(['confirmed', 'unconfirmed', 'canceled']).optional()
    }).refine((body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: 'Start time should be before End time !  ',
    })
});
exports.BookingValidations = {
    createBookingValidationSchema
};
