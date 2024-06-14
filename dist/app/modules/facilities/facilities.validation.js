"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityValidations = void 0;
const zod_1 = require("zod");
const createFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        pricePerHour: zod_1.z.number(),
        location: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
const updateFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
exports.FacilityValidations = {
    createFacilityValidationSchema,
    updateFacilityValidationSchema
};
