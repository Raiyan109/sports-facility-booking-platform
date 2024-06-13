import { z } from 'zod'

const createBookingValidationSchema = z.object({
    body: z.object({
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        user: z.string(),
        facility: z.string(),
        payableAmount: z.number(),
        isBooked: z.enum(['confirmed', 'unconfirmed', 'canceled'])
    })
})

export const BookingValidations = {
    createBookingValidationSchema
}