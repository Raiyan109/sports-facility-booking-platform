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

const getAllFacilities = catchAsync(async (req, res) => {
    const result = await FacilityServices.getAllFacilitiesFromDB();

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
        message: 'Facilities retrieved successfully',
        data: result,
    });
});

const getSingleFacility = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacilityServices.getSingleFacilityFromDB(id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Single Facility retrieved successfully',
        data: result,
    });
})


const getAverageRatings = catchAsync(async (req, res) => {
    const result = await FacilityServices.getAverageRatingsFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Average ratings retrieved successfully',
        data: result,
    });
})

const getPopularFacilities = catchAsync(async (req, res) => {
    const result = await FacilityServices.getPopularFacilitiesFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Popular Facilities data retrieved successfully',
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

const addRating = catchAsync(async (req, res) => {
    const userId = req.user?.userId?._id
    const { facilityId } = req.params;
    const { rating } = req.body
    console.log(req.body, 'req body from controlller');


    const result = await FacilityServices.addRatingIntoFacility(facilityId, userId, rating);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Rating added successfully',
        data: result,
    });
})

export const FacilityControllers = {
    createFacility,
    getAllFacilities,
    getSingleFacility,
    updateFacility,
    deleteFacility,
    addRating,
    getAverageRatings,
    getPopularFacilities
}