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

const getAverageRatingsFromDB = async () => {
    const facilities = await FacilityModel.find();

    const calculateRatingsAverage = () => {
        const allFacilities = facilities.map((facility) => {
            const ratings = facility?.ratings || [];
            if (!ratings || ratings?.length === 0) {
                // If there are no ratings, return "0" as a string
                return {
                    name: facility.name,
                    averageRating: 0, // No ratings, so average is 0
                };
            }

            // Calculate the average rating safely
            const total = ratings.reduce((acc, rating) => {
                return acc + (rating.rating || 0); // Default rating to 0 if undefined
            }, 0);

            const average = total / ratings?.length;
            return {
                name: facility.name,
                averageRating: average > 0 ? parseFloat(average.toFixed(1)) : 0
            };
        });

        // Remove any undefined values in case there are any left
        return allFacilities.filter(rating => rating !== undefined);
    };

    const averageRatings = calculateRatingsAverage();
    console.log(averageRatings);

    return averageRatings;
};


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

const addRatingIntoFacility = async (facilityId: string, userId: string, payload: number) => {
    const facility = await FacilityModel.findById(facilityId)

    if (!facility) {
        throw new AppError(httpStatus.FORBIDDEN, 'This facility does not exists!');
    }


    const ratingData = {
        user: userId,
        rating: payload,
    };

    facility.ratings?.push(ratingData)


    const result = await facility.save();

    return result;
};


export const FacilityServices = {
    createFacilityIntoDB,
    getAllFacilitiesFromDB,
    getSingleFacilityFromDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB,
    addRatingIntoFacility,
    getAverageRatingsFromDB
}