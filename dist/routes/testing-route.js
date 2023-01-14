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
exports.testingRouter = void 0;
const express_1 = require("express");
const posts_service_1 = require("../domain/posts-service");
const blogs_service_1 = require("../domain/blogs-service");
const users_service_1 = require("../domain/users-service");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const isPostsDeleted = yield posts_service_1.postsService.deleteAllPosts();
    const isBlogsDeleted = yield blogs_service_1.blogsService.deleteAllBlogs();
    const isUsersDeleted = yield users_service_1.usersService.deleteAllUsers();
    //const isCommentsDeleted = await commentService.
    if (isPostsDeleted && isBlogsDeleted && isUsersDeleted) {
        return res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
