import express from 'express';
import { CheckAvailabilityControllers } from './checkAvailability.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
    '/',
    auth('admin', 'user'),
    CheckAvailabilityControllers.checkAvailability
);

export const CheckAvailabilityRoutes = router;