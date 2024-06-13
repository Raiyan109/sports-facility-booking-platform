import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";


const createBookingIntoDB = async (booking: TBooking) => {
    // const isFacilityExists = await BookingModel.findOne({ booking })
    // if (isFacilityExists) {
    //     throw new AppError(httpStatus.CONFLICT, 'This facility is already exists!');
    // }
    const result = await BookingModel.create(booking)
    return result
}

const getAllBookingsFromDB = async () => {
    const result = await BookingModel.find()
    return result;
};

const getBookingsByUserFromDB = async () => {
    const result = await BookingModel.find()
    return result;
};



const cancelBooking = async (id: string) => {

};


export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getBookingsByUserFromDB,
    cancelBooking
}