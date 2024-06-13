import { z } from 'zod'

const createBookingValidationSchema = z.object({
    body: z.object({
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        user: z.string().optional(),
        facility: z.string(),
        payableAmount: z.number().optional(),
        isBooked: z.enum(['confirmed', 'unconfirmed', 'canceled']).optional()
    })
})

export const BookingValidations = {
    createBookingValidationSchema
}