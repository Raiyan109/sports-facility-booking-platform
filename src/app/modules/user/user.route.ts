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



export const UserRoutes = router;