import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidations } from './facilities.validation';
import { FacilityControllers } from './facilities.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
    '/',
    auth('admin'),
    validateRequest(FacilityValidations.createFacilityValidationSchema),
    FacilityControllers.createFacility,
);



export const FacilityRoutes = router;