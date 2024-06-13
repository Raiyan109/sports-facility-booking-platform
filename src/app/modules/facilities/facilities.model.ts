import { Schema, model } from "mongoose";
import { TFacility } from "./facilities.interface";

const facilitySchema = new Schema<TFacility>({
    name: {
        type: String,
        required: true,
        unique: true
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
    }
})

export const FacilityModel = model<TFacility>('Facility', facilitySchema)