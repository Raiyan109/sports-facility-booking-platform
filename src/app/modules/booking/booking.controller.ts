import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";


const createBooking = catchAsync(async (req, res) => {

    const result = await BookingServices.createBookingIntoDB(req.body);
    console.log(req.user, 'from create facility');

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Facility added successfully',
        data: result,
    });
});

const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Facilities retrieved successfully',
        data: result,
    });
});

const getBookingsByUser = catchAsync(async (req, res) => {

});

const cancelBooking = catchAsync(async (req, res) => {

});

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getBookingsByUser,
    cancelBooking
}