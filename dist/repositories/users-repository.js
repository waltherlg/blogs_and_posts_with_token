"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepository = exports.usersCollection = void 0;
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
exports.usersCollection = db_1.client.db("blogsAndPosts").collection("users");
exports.usersRepository = {
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.usersCollection.insertOne(newUser);
            let createdUser = {
                id: newUser._id.toString(),
                login: newUser.login,
                email: newUser.email,
                createdAt: newUser.createdAt
            };
            return createdUser;
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(id)) {
                let _id = new mongodb_1.ObjectId(id);
                const result = yield exports.usersCollection.deleteOne({ _id: _id });
                return result.deletedCount === 1;
            }
            else
                return false;
        });
    },
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.usersCollection.deleteMany({});
            return true;
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return null;
            }
            let _id = new mongodb_1.ObjectId(id);
            const user = yield exports.usersCollection.findOne({ _id: _id });
            if (!user) {
                return null;
            }
            return user;
        });
    },
    findUserByLoginOrEmail(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield exports.usersCollection.findOne({ $or: [{ email: loginOrEmail }, { login: loginOrEmail }] });
            return user;
        });
    }
};
