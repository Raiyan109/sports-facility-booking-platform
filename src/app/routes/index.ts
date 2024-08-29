import { Router } from 'express';
import { FacilityRoutes } from '../modules/facilities/facilities.route';
import { UserRoutes } from '../modules/user/user.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { CheckAvailabilityRoutes } from '../modules/checkAvailability/checkAvailability.route';
import { PaymentRoutes } from '../modules/payment/payment.route';


const router = Router();

const moduleRoutes = [
    {
        path: '/facility',
        route: FacilityRoutes,
    },
    {
        path: '/auth',
        route: UserRoutes,
    },
    {
        path: '/bookings',
        route: BookingRoutes,
    },
    {
        path: '/check-availability',
        route: CheckAvailabilityRoutes,
    },
    {
        path: '/payment',
        route: PaymentRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;