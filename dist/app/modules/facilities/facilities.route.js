"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facilities_validation_1 = require("./facilities.validation");
const facilities_controller_1 = require("./facilities.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(facilities_validation_1.FacilityValidations.createFacilityValidationSchema), facilities_controller_1.FacilityControllers.createFacility);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(facilities_validation_1.FacilityValidations.updateFacilityValidationSchema), facilities_controller_1.FacilityControllers.updateFacility);
router.delete('/:id', (0, auth_1.default)('admin'), facilities_controller_1.FacilityControllers.deleteFacility);
router.get('/', (0, auth_1.default)('user', 'admin'), facilities_controller_1.FacilityControllers.getAllFacilities);
exports.FacilityRoutes = router;
