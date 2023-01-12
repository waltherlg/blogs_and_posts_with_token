import {ObjectId} from "mongodb";
import {userType, userTypeOutput} from "../models/types";
import {usersRepository} from "../repositories/users-repository";
import * as bcrypt from 'bcrypt'

export const usersService = {

    async createUser(login: string, password: string, email: string): Promise<userTypeOutput> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: userType = {
            "_id": new ObjectId(),
            "login": login,
            passwordHash,
            passwordSalt,
            "email": email,
            "createdAt": new Date().toISOString()
        }
        const createdUser = await usersRepository.createUser(newUser)
        return createdUser
    },

    async _generateHash(password: string, salt: string){
        const hash = await bcrypt.hash(password, salt)
        return hash
    },

    async checkCredentials (loginOrEmail: string, password: string){
        const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail)
        if (!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash){
            return false
        }
        return user
    },

    async findUserById(id: string): Promise<userType | null> {
        return await usersRepository.findUserById(id)

    },

    async deleteUser(id: string): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    },

    async deleteAllUsers(): Promise<boolean>{
        return await usersRepository.deleteAllUsers()
    }
}