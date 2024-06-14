import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CheckAvailabilityServices } from "./checkAvailability.service";

const checkAvailability = catchAsync(async (req, res) => {
    const result = await CheckAvailabilityServices.checkAvailabilityIntoDB();

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