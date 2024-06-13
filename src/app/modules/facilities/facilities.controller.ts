import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityModel } from "./facilities.model";
import { FacilityServices } from "./facilities.service";

const createFacility = catchAsync(async (req, res) => {
    const result = await FacilityServices.createFacilityIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Facility added successfully',
        data: result,
    });
});

export const FacilityControllers = {
    createFacility
}