import { TUser } from '../user/user.interface'
import { UserModel } from './user.model'

const createUserIntoDB = async (payload: TUser) => {
    try {
        const user = await UserModel.create(payload)
        return user
    } catch (error) {
        console.log(error);
    }
}
export const UserServices = {
    createUserIntoDB
}