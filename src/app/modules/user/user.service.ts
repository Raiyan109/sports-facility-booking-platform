import config from '../../config'
import { TLoginUser, TUser } from '../user/user.interface'
import { User } from './user.model'
import { createToken } from './user.utils'

const createUserIntoDB = async (payload: TUser) => {
    try {
        const user = await User.create(payload)
        return user
    } catch (error) {
        console.log(error);
    }
}

const login = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await User.isUserExistsByEmail(payload.email)
    //create token and sent to the  client

    const jwtPayload = {
        userId: user,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_secret as string,
        config.jwt_secret_expires_in as string,
    );

    // const refreshToken = createToken(
    //   jwtPayload,
    //   config.jwt_refresh_secret as string,
    //   config.jwt_refresh_expires_in as string,
    // );

    return {
        accessToken,
        user
        //   refreshToken,
    };
};
export const UserServices = {
    createUserIntoDB,
    login
}