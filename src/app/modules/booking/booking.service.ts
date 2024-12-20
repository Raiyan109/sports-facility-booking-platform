import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { hasTimeConflict } from "./booking.utils";
import { initialPayment } from "../payment/payment.utils";
import { User } from "../user/user.model";


const createBookingIntoDB = async (booking: TBooking) => {
    // const isFacilityExists = await BookingModel.findOne({ booking })
    // if (isFacilityExists) {
    //     throw new AppError(httpStatus.CONFLICT, 'This facility is already exists!');
    // }
    const { date, endTime, facility, isBooked, startTime, user, payableAmount } = booking

    const userInfo = await User.findById(user)


    const timeSchedules = await BookingModel.find({
        facility,
        user,
        date: { $in: date },
        isBooked: { $ne: 'canceled' }
    }).select('date startTime endTime')

    const newTimeSchedule = { date, startTime, endTime }
    if (hasTimeConflict(timeSchedules, newTimeSchedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            `This facility is not available to book at that time ! Choose other time or date`,
        );
    }


    const transactionId = `TXN-${Date.now()}`;
    const result = await BookingModel.create({
        date,
        startTime,
        endTime,
        user,
        facility,
        payableAmount,
        isBooked,
        status: 'Pending',
        paymentStatus: 'Pending',
        transactionId
    })

    // payment 

    let paymentData;
    if (userInfo) {
        paymentData = {
            transactionId,
            payableAmount,
            customerName: userInfo.name,
            customerEmail: userInfo.email,
            customerPhone: userInfo.phone,
            customerAddress: userInfo.address,
        }
    }
    const paymentSession = await initialPayment(paymentData)



    // return result
    return {
        booking: result,
        paymentSession
    }
}

const getAllBookingsFromDB = async () => {
    const result = await BookingModel.find().populate('user').populate('facility')
    return result;
};

const getSingleBookingFromDB = async (id: string) => {
    const result = await BookingModel.findById(id).populate('user').populate('facility')
    return result
}

const getBookingsByUserFromDB = async (userId: string) => {

    const result = await BookingModel.find({ user: userId }).populate('facility')
    return result;
};

const getBookingTrendsFromDB = async () => {
    // Aggregate bookings by month and count them, converting string dates to Date type
    const bookingData = await BookingModel.aggregate([
        {
            $addFields: {
                dateAsDate: { $toDate: "$date" }  // Convert string to Date type
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$dateAsDate" },  // Use the converted Date field
                    month: { $month: "$dateAsDate" }
                },
                bookingCount: { $sum: 1 },
            },
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 },
        },
    ]);

    console.log(bookingData);

    // Optionally, format the data for output
    return bookingData.map(data => ({
        date: `${data._id.year}-${String(data._id.month).padStart(2, '0')}-01`,
        bookings: data.bookingCount,
    }));
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
    getSingleBookingFromDB,
    getBookingsByUserFromDB,
    cancelBooking,
    getBookingTrendsFromDB
}