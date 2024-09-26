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
exports.CheckAvailabilityControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const checkAvailability_service_1 = require("./checkAvailability.service");
const checkAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchByDate = req.query.date || '';
    const searchByFacility = req.query.facility || '';
    const query = {
        date: searchByDate,
        facility: searchByFacility
    };
    const todayDate = new Date().getDate();
    if (searchByDate !== '' && searchByFacility !== '') {
        query.date = searchByDate;
        query.facility = searchByFacility;
    }
    else {
        query.date = todayDate.toString();
    }
    const result = yield checkAvailability_service_1.CheckAvailabilityServices.checkAvailabilityIntoDB(query);
    console.log(result);
    // Check if the database collection is empty or no matching data is found
    // if (!result || result.length === 0) {
    //     return sendResponse(res, {
    //         success: false,
    //         statusCode: httpStatus.NOT_FOUND,
    //         message: 'No data found.',
    //         data: [],
    //     });
    // }
    const totalAvailableTime = [
        { startTime: "08:00", endTime: "18:00" }
    ];
    const availableTimeSlots = findAvailableTimeSlots(totalAvailableTime, result);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Availability checked successfully',
        data: availableTimeSlots,
    });
}));
const findAvailableTimeSlots = (totalAvailableTime, bookings) => {
    const availableSlots = [];
    let start = "08:00";
    for (let i = 0; i < bookings.length; i++) {
        const { startTime, endTime } = bookings[i];
        if (start < startTime) {
            availableSlots.push({ startTime: start, endTime: startTime });
        }
        start = endTime;
    }
    if (start < "18:00") {
        availableSlots.push({ startTime: start, endTime: "18:00" });
    }
    return availableSlots;
};
exports.CheckAvailabilityControllers = {
    checkAvailability
};
