import { Router } from 'express';
import { FacilityRoutes } from '../modules/facilities/facilities.route';


const router = Router();

const moduleRoutes = [
    {
        path: '/facility',
        route: FacilityRoutes,
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;