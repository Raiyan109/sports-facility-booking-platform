import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CheckAvailabilityServices } from "./checkAvailability.service";


const checkAvailability = catchAsync(async (req, res) => {
    const search = req.query.date as string || ''
    const query = {
        date: search
    }
    const todayDate = new Date().getDate()
    if (search !== '') {
        query.date = search
    }
    else {
        query.date = todayDate.toString()
    }

    const result = await CheckAvailabilityServices.checkAvailabilityIntoDB(query);

    // Check if the database collection is empty or no matching data is found
    if (!result || result.length === 0) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'No data found.',
            data: [],
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Availability checked successfully',
        data: result,
    });
});

export const CheckAvailabilityControllers = {
    checkAvailability
}