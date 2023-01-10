import {userType} from "../models/types";
import {ObjectId} from "mongodb";
import jwt from 'jsonwebtoken'
import {settings} from "../settings";

export const jwtService = {
    async createJWT(user: userType) {
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: '1h'})
        return token
    },
}