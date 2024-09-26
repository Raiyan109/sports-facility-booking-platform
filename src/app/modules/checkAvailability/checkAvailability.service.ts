import { FilterQuery } from "mongoose";
import { BookingModel } from "../booking/booking.model";
import { TSchedule } from "../booking/booking.interface";

const checkAvailabilityIntoDB = async (query: FilterQuery<TSchedule>) => {

    const result = await BookingModel.find({
        ...query,
        isBooked: { $ne: 'canceled' }
        // Exclude canceled bookings
    }).select('startTime endTime isBooked -_id')
    console.log(result, 'from service');

    return result
};


export const CheckAvailabilityServices = {
    checkAvailabilityIntoDB
}