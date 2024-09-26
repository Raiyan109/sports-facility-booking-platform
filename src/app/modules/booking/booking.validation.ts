import { z } from 'zod'

const timeStringSchema = z.string().refine(
    (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
        return regex.test(time);
    },
    {
        message: 'Invalid time format , expected "HH:MM" in 24 hours format',
    },
);

const createBookingValidationSchema = z.object({
    body: z.object({
        date: z.string(),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
        user: z.string().optional(),
        facility: z.string(),
        payableAmount: z.number().optional(),
        isBooked: z.enum(['confirmed', 'unconfirmed', 'canceled']).optional()
    })
    // .refine((body) => {

    //     const start = new Date(`1970-01-01T${body.startTime}:00`);
    //     const end = new Date(`1970-01-01T${body.endTime}:00`);

    //     return end > start;

    // }, {
    //     message: 'Start time should be before End time !  ',
    // })
    // startTime : 10:30  => 1970-01-01T10:30
    //endTime : 12:30  =>  1970-01-01T12:30

})

export const BookingValidations = {
    createBookingValidationSchema
}