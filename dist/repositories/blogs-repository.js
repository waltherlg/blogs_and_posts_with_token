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
exports.blogsRepository = exports.blogCollection = void 0;
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
exports.blogCollection = db_1.client.db("blogsAndPosts").collection("blog");
exports.blogsRepository = {
    getBlogByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return null;
            }
            let _id = new mongodb_1.ObjectId(id);
            const blog = yield exports.blogCollection.findOne({ _id: _id });
            if (!blog) {
                return null;
            }
            return {
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt
            };
        });
    },
    getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            let outBlogs = yield exports.blogCollection.find({}).toArray();
            return outBlogs.map((blogs) => ({
                id: blogs._id.toString(),
                name: blogs.name,
                description: blogs.description,
                websiteUrl: blogs.websiteUrl,
                createdAt: blogs.createdAt
            }));
        });
    },
    createBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.blogCollection.insertOne(newBlog);
            let createdBlog = {
                id: newBlog._id.toString(),
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: newBlog.createdAt
            };
            return createdBlog;
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(id)) {
                let _id = new mongodb_1.ObjectId(id);
                const result = yield exports.blogCollection
                    .updateOne({ _id: _id }, { $set: { name: name, description: description, websiteUrl: websiteUrl } });
                return result.matchedCount === 1;
            }
            else
                return false;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(id)) {
                let _id = new mongodb_1.ObjectId(id);
                const result = yield exports.blogCollection.deleteOne({ _id: _id });
                return result.deletedCount === 1;
            }
            else
                return false;
        });
    },
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.blogCollection
                .deleteMany({});
            return true;
        });
    },
};
