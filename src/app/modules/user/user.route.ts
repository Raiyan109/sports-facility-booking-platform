import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';


const router = express.Router();

router.post(
    '/signup',
    validateRequest(UserValidations.userValidationSchema),
    UserControllers.signUp,
);

router.post(
    '/login',
    validateRequest(UserValidations.loginValidationSchema),
    UserControllers.loginUser,
);

router.get('/user', UserControllers.getUser)

export const UserRoutes = router;