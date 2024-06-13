import { Router } from 'express';
import { FacilityRoutes } from '../modules/facilities/facilities.route';
import { UserRoutes } from '../modules/user/user.route';
import { BookingRoutes } from '../modules/booking/booking.route';


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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;