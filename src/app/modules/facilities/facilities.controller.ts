import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityModel } from "./facilities.model";
import { FacilityServices } from "./facilities.service";

const createFacility = catchAsync(async (req, res) => {

    const result = await FacilityServices.createFacilityIntoDB(req.body);
    console.log(req.user, 'from create facility');

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Facility added successfully',
        data: result,
    });
});

const getAllFacilities = catchAsync(async (req, res) => {
    const result = await FacilityServices.getAllFacilitiesFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Facilities retrieved successfully',
        data: result,
    });
});

const updateFacility = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacilityServices.updateFacilityIntoDB(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Facility updated successfully',
        data: result,
    });
});

const deleteFacility = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacilityServices.deleteFacilityFromDB(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Facility deleted successfully',
        data: result,
    });
});

export const FacilityControllers = {
    createFacility,
    getAllFacilities,
    updateFacility,
    deleteFacility
}