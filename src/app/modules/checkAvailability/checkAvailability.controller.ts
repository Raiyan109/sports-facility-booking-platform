import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CheckAvailabilityServices } from "./checkAvailability.service";
import { TSchedule } from "../booking/booking.interface";


const checkAvailability = catchAsync(async (req, res) => {
    const searchByDate = req.query.date as string || ''
    const searchByFacility = req.query.facility as string || ''
    const query = {
        date: searchByDate,
        facility: searchByFacility
    }


    const todayDate = new Date().getDate()
    if (searchByDate !== '' && searchByFacility !== '') {
        query.date = searchByDate
        query.facility = searchByFacility
    }
    else {
        query.date = todayDate.toString()
    }

    const result = await CheckAvailabilityServices.checkAvailabilityIntoDB(query);

    // Check if the database collection is empty or no matching data is found
    // if (!result || result.length === 0) {
    //     return sendResponse(res, {
    //         success: false,
    //         statusCode: httpStatus.NOT_FOUND,
    //         message: 'No data found.',
    //         data: [],
    //     });
    // }

    const totalAvailableTime: TSchedule[] = [
        { startTime: "08:00", endTime: "18:00" }
    ];

    const availableTimeSlots = findAvailableTimeSlots(totalAvailableTime, result);
    console.log(availableTimeSlots, 'from check controller');


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Availability checked successfully',
        data: availableTimeSlots,
    });
});

const findAvailableTimeSlots = (totalAvailableTime: any, bookings: any) => {

    const availableSlots = [];

    let start = "10:00";

    for (let i = 0; i < bookings.length; i++) {
        const { startTime, endTime } = bookings[i];

        if (start < startTime) {
            availableSlots.push({ startTime: start, endTime: startTime });
        }

        start = endTime;
    }

    if (start < "18:00") {
        availableSlots.push({ startTime: start, endTime: "18:00" });
    }

    return availableSlots;
};

export const CheckAvailabilityControllers = {
    checkAvailability
}