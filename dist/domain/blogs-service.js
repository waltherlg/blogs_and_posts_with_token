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
exports.blogsService = void 0;
const blogs_repository_1 = require("../repositories/blogs-repository");
const mongodb_1 = require("mongodb");
exports.blogsService = {
    getBlogByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return blogs_repository_1.blogsRepository.getBlogByID(id);
        });
    },
    // async getAllBlogs(): Promise<blogTypeOutput[]> {
    //     return blogsRepository.getAllBlogs()
    // },
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                "_id": new mongodb_1.ObjectId(),
                "name": name,
                "description": description,
                "websiteUrl": websiteUrl,
                "createdAt": new Date().toISOString()
            };
            const createdBlog = yield blogs_repository_1.blogsRepository.createBlog(newBlog);
            return createdBlog;
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_repository_1.blogsRepository.updateBlog(id, name, description, websiteUrl);
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_repository_1.blogsRepository.deleteBlog(id);
        });
    },
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_repository_1.blogsRepository.deleteAllBlogs();
        });
    },
};
