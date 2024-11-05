"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityModel = void 0;
const mongoose_1 = require("mongoose");
const facilitySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    ratings: [
        {
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, required: true },
        }
    ]
});
exports.FacilityModel = (0, mongoose_1.model)('Facility', facilitySchema);
