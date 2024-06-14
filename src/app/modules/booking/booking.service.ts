import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { hasTimeConflict } from "./booking.utils";


const createBookingIntoDB = async (booking: TBooking) => {
    // const isFacilityExists = await BookingModel.findOne({ booking })
    // if (isFacilityExists) {
    //     throw new AppError(httpStatus.CONFLICT, 'This facility is already exists!');
    // }
    const { date, endTime, facility, isBooked, startTime, user, payableAmount } = booking

    const timeSchedules = await BookingModel.find({
        facility,
        user,
        date: { $in: date }
    }).select('date startTime endTime')

    const newTimeSchedule = { date, startTime, endTime }
    if (hasTimeConflict(timeSchedules, newTimeSchedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            `This facility is not available to book at that time ! Choose other time or date`,
        );
    }

    const result = await BookingModel.create(booking)
    return result
    // return null
}

const getAllBookingsFromDB = async () => {
    const result = await BookingModel.find().populate('user').populate('facility')
    return result;
};

const getBookingsByUserFromDB = async (userId: string) => {

    const result = await BookingModel.find({ user: userId }).populate('facility')
    return result;
};



const cancelBooking = async (id: string) => {
    const result = await BookingModel.findByIdAndUpdate(
        id,
        { isBooked: "canceled" },
        {
            new: true,
        },
    ).populate('facility');
    return result;
};


export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getBookingsByUserFromDB,
    cancelBooking
}