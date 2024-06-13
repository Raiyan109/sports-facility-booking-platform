import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";
import { FacilityModel } from "../facilities/facilities.model";


const createBooking = catchAsync(async (req, res) => {
    const { date, startTime, endTime, user, facility, payableAmount, isBooked } = req.body;

    // Get the price of current facility
    const facilityPrice = await FacilityModel.findById(facility)
    const pricePerHour = facilityPrice?.pricePerHour

    // Function for time difference
    function diffTime(startTime: string, endTime: string) {
        var hour1 = startTime.split(':')[0];
        var hour2 = endTime.split(':')[0];
        var min1 = startTime.split(':')[1];
        var min2 = endTime.split(':')[1];

        var diff_hour = hour2 - hour1;
        var diff_min = min2 - min1;
        if (diff_hour < 0) {
            diff_hour += 24;
        }
        if (diff_min < 0) {
            diff_min += 60;
            diff_hour--;
        } else if (diff_min >= 60) {
            diff_min -= 60;
            diff_hour++;
        }
        return [diff_hour, diff_min]

    }

    const diff = diffTime(startTime, endTime)
    const mappedDiff = diff[0] - diff[1]
    console.log(mappedDiff, 'from diff');

    // Retrieve payable amount
    const currPayableAmount = mappedDiff * pricePerHour
    console.log(currPayableAmount);


    const result = await BookingServices.createBookingIntoDB({
        date,
        startTime,
        endTime,
        user: req.user?.userId?._id,
        facility,
        payableAmount: currPayableAmount,
        isBooked
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking created successfully',
        data: result,
    });
});

const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Bookings retrieved successfully',
        data: result,
    });
});

const getBookingsByUser = catchAsync(async (req, res) => {
    const userId = req.user?.userId?._id
    const result = await BookingServices.getBookingsByUserFromDB(userId);



    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Bookings retrieved successfully',
        data: result,
    });
});

const cancelBooking = catchAsync(async (req, res) => {

});

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getBookingsByUser,
    cancelBooking
}