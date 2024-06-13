import { TFacility } from "./facilities.interface"
import { FacilityModel } from "./facilities.model"

const createFacilityIntoDB = async (facility: TFacility) => {
    const result = await FacilityModel.create(facility)
    return result
}

export const FacilityServices = {
    createFacilityIntoDB,
}