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
exports.BookingControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
const facilities_model_1 = require("../facilities/facilities.model");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { date, startTime, endTime, user, facility, payableAmount, isBooked } = req.body;
    // Get the price of current facility
    const facilityPrice = yield facilities_model_1.FacilityModel.findById(facility);
    const pricePerHour = facilityPrice === null || facilityPrice === void 0 ? void 0 : facilityPrice.pricePerHour;
    // Function for time difference
    function diffTime(startTime, endTime) {
        const hour1 = startTime.split(':')[0];
        const hour2 = endTime.split(':')[0];
        const min1 = startTime.split(':')[1];
        const min2 = endTime.split(':')[1];
        let diff_hour = hour2 - hour1;
        let diff_min = min2 - min1;
        if (diff_hour < 0) {
            diff_hour += 24;
        }
        if (diff_min < 0) {
            diff_min += 60;
            diff_hour--;
        }
        else if (diff_min >= 60) {
            diff_min -= 60;
            diff_hour++;
        }
        return [diff_hour, diff_min];
    }
    const diff = diffTime(startTime, endTime);
    const mappedDiff = diff[0] - diff[1];
    // Retrieve payable amount
    const currPayableAmount = mappedDiff * pricePerHour;
    const result = yield booking_service_1.BookingServices.createBookingIntoDB({
        date,
        startTime,
        endTime,
        user: (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b._id,
        facility,
        payableAmount: currPayableAmount,
        isBooked
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Booking created successfully',
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.getAllBookingsFromDB();
    // Check if the database collection is empty or no matching data is found
    if (!result || result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'No data found.',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bookings retrieved successfully',
        data: result,
    });
}));
const getBookingsByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const userId = (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId) === null || _d === void 0 ? void 0 : _d._id;
    const result = yield booking_service_1.BookingServices.getBookingsByUserFromDB(userId);
    // Check if the database collection is empty or no matching data is found
    if (!result || result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'No data found.',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bookings retrieved successfully',
        data: result,
    });
}));
const cancelBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.BookingServices.cancelBooking(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Booking cancelled successfully',
        data: result,
    });
}));
exports.BookingControllers = {
    createBooking,
    getAllBookings,
    getBookingsByUser,
    cancelBooking
};
