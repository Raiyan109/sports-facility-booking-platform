"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facilities_route_1 = require("../modules/facilities/facilities.route");
const user_route_1 = require("../modules/user/user.route");
const booking_route_1 = require("../modules/booking/booking.route");
const checkAvailability_route_1 = require("../modules/checkAvailability/checkAvailability.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/facility',
        route: facilities_route_1.FacilityRoutes,
    },
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/check-availability',
        route: checkAvailability_route_1.CheckAvailabilityRoutes,
    },
    {
        path: '/payment',
        route: payment_route_1.PaymentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
