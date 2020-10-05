import { Injectable } from '@nestjs/common';
import User from '../models/user.model';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS: number = 10;
const SECRET_KEY: string = "A16R03I1999"

@Injectable()
export class AuthService {
    async signUp(body): Promise<any> {
        const { login, password } = body;
        try {
            const userExist = await User.findOne({ login });
            if (userExist) {
                return {
                    status: 409,
                    success: false,
                    message: 'User already exist',
                };
            }

            const hash = await bcrypt.hash(password, SALT_ROUNDS);

            const user = new User({
                login,
                password: hash,
            });

            const newUser = await user.save();

            return {
                status: 201,
                success: true,
                message: 'User Successfully created',
                data: newUser,
            };

        } catch (err) {
            return {
                status: 500,
                success: false,
                message: err.toString()
            };
        }
    }

    async signIn(body): Promise<any> {
        const { login, password } = body;
        try {
            const user = await User.findOne({ login });
            if (!user) {
                return {
                    status: 401,
                    success: false,
                    message: 'Wrong email or password',
                };
            }

            const matchPasswords = await bcrypt.compare(password, user.password);
            if (!matchPasswords) {
                return {
                    status: 401,
                    success: false,
                    message: 'Wrong email or password',
                };
            }

            const accessToken = jwt.sign({ login }, SECRET_KEY);

            const date = new Date();
            const tokenExpiresIn = date.getTime() + 720000;


            return {
                status: 200,
                success: true,
                message: 'Token generated Successfully',
                data: { "accessToken": accessToken, "tokenExpiresIn": tokenExpiresIn, "user": user }
            };

        } catch (err) {
            return {
                status: 500,
                success: false,
                message: err.toString()
            };
        }
    }
}
