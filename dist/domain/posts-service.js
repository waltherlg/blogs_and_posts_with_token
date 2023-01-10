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
exports.postsService = void 0;
const posts_repository_1 = require("../repositories/posts-repository");
const mongodb_1 = require("mongodb");
exports.postsService = {
    getPostByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.getPostByID(id);
        });
    },
    getPostByBlogsID(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.getPostByBlogsID(blogId);
        });
    },
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.getAllPosts();
        });
    },
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                "_id": new mongodb_1.ObjectId(),
                "title": title,
                "shortDescription": shortDescription,
                "content": content,
                "blogId": blogId,
                "blogName": title,
                "createdAt": new Date().toISOString()
            };
            const createdPost = yield posts_repository_1.postsRepository.createPost(newPost);
            return createdPost;
        });
    },
    createPostByBlogId(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                "_id": new mongodb_1.ObjectId(),
                "title": title,
                "shortDescription": shortDescription,
                "content": content,
                "blogId": blogId,
                "blogName": title,
                "createdAt": new Date().toISOString()
            };
            const createdPost = yield posts_repository_1.postsRepository.createPost(newPost);
            return createdPost;
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.updatePost(id, title, shortDescription, content, blogId);
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.deletePost(id);
        });
    },
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.deleteAllPosts();
        });
    },
};
