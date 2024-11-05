import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';


const router = express.Router();

router.get('/bookingTrends', auth('admin'), BookingControllers.getBookingTrends);

router.post(
    '/',
    auth('user'),
    validateRequest(BookingValidations.createBookingValidationSchema),
    BookingControllers.createBooking,
);


router.get(
    '/user',
    auth('user'),
    BookingControllers.getBookingsByUser,
);

router.get(
    '/:id',
    // auth('user', 'admin'),
    BookingControllers.getSingleBooking,
);



router.get(
    '/',
    auth('admin'),
    BookingControllers.getAllBookings,
);



router.delete(
    '/:id',
    auth('user'),
    BookingControllers.cancelBooking,
);





export const BookingRoutes = router;