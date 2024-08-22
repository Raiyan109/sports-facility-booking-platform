import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TFacility } from "./facilities.interface"
import { FacilityModel } from "./facilities.model"

const createFacilityIntoDB = async (facility: TFacility) => {
    const isFacilityExists = await FacilityModel.findOne({ name: facility.name })
    if (isFacilityExists) {
        throw new AppError(httpStatus.CONFLICT, 'This facility is already exists!');
    }
    const result = await FacilityModel.create(facility)
    return result
}

const getAllFacilitiesFromDB = async () => {
    const result = await FacilityModel.find()
    return result;
};

const getSingleFacilityFromDB = async (id: string) => {
    const result = await FacilityModel.findById(id)
    return result
}

const updateFacilityIntoDB = async (id: string, payload: Partial<TFacility>) => {
    try {
        const updatedFacilityInfo = await FacilityModel.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
                runValidators: true,
                //   session,
            },
        );

        if (!updatedFacilityInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update facility');
        }

        return updatedFacilityInfo;
    } catch (err) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update facility');
    }
};

const deleteFacilityFromDB = async (id: string) => {
    const result = await FacilityModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};


export const FacilityServices = {
    createFacilityIntoDB,
    getAllFacilitiesFromDB,
    getSingleFacilityFromDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB
}