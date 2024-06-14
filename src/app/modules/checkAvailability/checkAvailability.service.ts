import { FilterQuery } from "mongoose";
import { BookingModel } from "../booking/booking.model";
import { TSchedule } from "../booking/booking.interface";

const checkAvailabilityIntoDB = async (query: FilterQuery<TSchedule>) => {

    const result = await BookingModel.find(query).select('startTime endTime')
    return result
};


export const CheckAvailabilityServices = {
    checkAvailabilityIntoDB
}