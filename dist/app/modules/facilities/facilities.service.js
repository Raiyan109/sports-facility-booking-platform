"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const facilities_model_1 = require("./facilities.model");
const createFacilityIntoDB = (facility) => __awaiter(void 0, void 0, void 0, function* () {
    const isFacilityExists = yield facilities_model_1.FacilityModel.findOne({ name: facility.name });
    if (isFacilityExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This facility is already exists!');
    }
    const result = yield facilities_model_1.FacilityModel.create(facility);
    return result;
});
const getAllFacilitiesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_model_1.FacilityModel.find();
    return result;
});
const getSingleFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_model_1.FacilityModel.findById(id);
    return result;
});
const getAverageRatingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const facilities = yield facilities_model_1.FacilityModel.find();
    const calculateRatingsAverage = () => {
        const allFacilities = facilities.map((facility) => {
            const ratings = (facility === null || facility === void 0 ? void 0 : facility.ratings) || [];
            if (!ratings || (ratings === null || ratings === void 0 ? void 0 : ratings.length) === 0) {
                // If there are no ratings, return "0" as a string
                return {
                    name: facility.name,
                    averageRating: "0", // No ratings, so average is 0
                };
            }
            // Calculate the average rating safely
            const total = ratings.reduce((acc, rating) => {
                return acc + (rating.rating || 0); // Default rating to 0 if undefined
            }, 0);
            const average = total / (ratings === null || ratings === void 0 ? void 0 : ratings.length);
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
});
const updateFacilityIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedFacilityInfo = yield facilities_model_1.FacilityModel.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
            //   session,
        });
        if (!updatedFacilityInfo) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update facility');
        }
        return updatedFacilityInfo;
    }
    catch (err) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update facility');
    }
});
const deleteFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_model_1.FacilityModel.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
const addRatingIntoFacility = (facilityId, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const facility = yield facilities_model_1.FacilityModel.findById(facilityId);
    if (!facility) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This facility does not exists!');
    }
    const ratingData = {
        user: userId,
        rating: payload,
    };
    (_a = facility.ratings) === null || _a === void 0 ? void 0 : _a.push(ratingData);
    const result = yield facility.save();
    return result;
});
exports.FacilityServices = {
    createFacilityIntoDB,
    getAllFacilitiesFromDB,
    getSingleFacilityFromDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB,
    addRatingIntoFacility,
    getAverageRatingsFromDB
};
