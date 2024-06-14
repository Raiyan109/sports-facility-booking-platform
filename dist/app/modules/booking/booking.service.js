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
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const booking_model_1 = require("./booking.model");
const booking_utils_1 = require("./booking.utils");
const createBookingIntoDB = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    // const isFacilityExists = await BookingModel.findOne({ booking })
    // if (isFacilityExists) {
    //     throw new AppError(httpStatus.CONFLICT, 'This facility is already exists!');
    // }
    const { date, endTime, facility, isBooked, startTime, user, payableAmount } = booking;
    const timeSchedules = yield booking_model_1.BookingModel.find({
        facility,
        user,
        date: { $in: date }
    }).select('date startTime endTime');
    const newTimeSchedule = { date, startTime, endTime };
    if ((0, booking_utils_1.hasTimeConflict)(timeSchedules, newTimeSchedule)) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, `This facility is not available to book at that time ! Choose other time or date`);
    }
    const result = yield booking_model_1.BookingModel.create(booking);
    return result;
    // return null
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.find().populate('user').populate('facility');
    return result;
});
const getBookingsByUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.find({ user: userId }).populate('facility');
    return result;
});
const cancelBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.findByIdAndUpdate(id, { isBooked: "canceled" }, {
        new: true,
    }).populate('facility');
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getBookingsByUserFromDB,
    cancelBooking
};
