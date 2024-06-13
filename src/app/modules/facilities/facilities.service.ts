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

export const FacilityServices = {
    createFacilityIntoDB,
}