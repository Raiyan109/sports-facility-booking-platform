import { Model } from "mongoose";

export type TUser = {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    phone: string;
    address: string;
}

export type TLoginUser = {
    email: string;
    password: string;
};

export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByEmail(id: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
    // isJWTIssuedBeforePasswordChanged(
    //   passwordChangedTimestamp: Date,
    //   jwtIssuedTimestamp: number,
    // ): boolean;
}