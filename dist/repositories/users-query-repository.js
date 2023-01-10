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
exports.usersQueryRepo = void 0;
const users_repository_1 = require("./users-repository");
function sort(sortDirection) {
    return (sortDirection === 'desc') ? -1 : 1;
}
function skipped(pageNumber, pageSize) {
    return (+pageNumber - 1) * (+pageSize);
}
exports.usersQueryRepo = {
    getAllUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            let usersCount = yield users_repository_1.usersCollection.countDocuments({ $or: [{ login: new RegExp(searchLoginTerm, "gi") }, { email: new RegExp(searchEmailTerm, "gi") }] });
            //let usersCount = await usersCollection.countDocuments({})
            let users = yield users_repository_1.usersCollection.find({ $or: [{ login: new RegExp(searchLoginTerm, "gi") }, { email: new RegExp(searchEmailTerm, "gi") }] })
                //let users = await usersCollection.find({})
                .sort({ [sortBy]: sort(sortDirection) })
                .skip(skipped(pageNumber, pageSize))
                .limit(+pageSize)
                .toArray();
            let outUsers = users.map((users) => {
                return {
                    id: users._id.toString(),
                    login: users.login,
                    email: users.email,
                    createdAt: users.createdAt
                };
            });
            let pageCount = Math.ceil(usersCount / +pageSize);
            let outputUsers = {
                pagesCount: pageCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: usersCount,
                items: outUsers
            };
            return outputUsers;
        });
    }
};
