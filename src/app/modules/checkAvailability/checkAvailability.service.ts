import { BookingModel } from "../booking/booking.model";
import { totalAvailableTimes } from "./checkAvailability.utils";

const checkAvailabilityIntoDB = async () => {
    const check = totalAvailableTimes.map(e => console.log(e)
    )
    const result = await BookingModel.find({ date: '2024-06-15' }, { startTime: 1, endTime: 1, _id: 0 })
    return result
};


export const CheckAvailabilityServices = {
    checkAvailabilityIntoDB
}