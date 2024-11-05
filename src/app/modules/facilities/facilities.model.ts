import { Schema, model } from "mongoose";
import { TFacility } from "./facilities.interface";

const facilitySchema = new Schema<TFacility>({
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
            user: { type: Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, required: true },
        }
    ]
})

export const FacilityModel = model<TFacility>('Facility', facilitySchema)