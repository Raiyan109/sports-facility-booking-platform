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

router.post(
    '/:facilityId/rating',
    auth('user', 'admin'),
    FacilityControllers.addRating,
);

router.put(
    '/:id',
    auth('admin'),
    validateRequest(FacilityValidations.updateFacilityValidationSchema),
    FacilityControllers.updateFacility,
);

router.delete('/:id', auth('admin'), FacilityControllers.deleteFacility);

router.get(
    '/:id',
    // auth('user', 'admin'),
    FacilityControllers.getSingleFacility,
);

router.get(
    '/',
    // auth('user', 'admin'),
    FacilityControllers.getAllFacilities,
);





export const FacilityRoutes = router;