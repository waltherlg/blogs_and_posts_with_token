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
exports.postsRepository = exports.postCollection = void 0;
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
exports.postCollection = db_1.client.db("blogsAndPosts").collection("post");
exports.postsRepository = {
    getPostByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return null;
            }
            let _id = new mongodb_1.ObjectId(id);
            const post = yield exports.postCollection.findOne({ _id: _id });
            if (!post) {
                return null;
            }
            return {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            };
        });
    },
    getPostByBlogsID(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield exports.postCollection.findOne({ blogId: blogId });
            if (!post) {
                return null;
            }
            return {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            };
        });
    },
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            let outPosts = yield exports.postCollection.find({}).toArray();
            return outPosts.map((posts) => ({
                id: posts._id.toString(),
                title: posts.title,
                shortDescription: posts.shortDescription,
                content: posts.content,
                blogId: posts.blogId,
                blogName: posts.blogName,
                createdAt: posts.createdAt
            }));
        });
    },
    createPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.postCollection.insertOne(newPost);
            let createdPost = {
                id: newPost._id.toString(),
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: newPost.blogName,
                createdAt: newPost.createdAt
            };
            return createdPost;
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(id)) {
                let _id = new mongodb_1.ObjectId(id);
                const result = yield exports.postCollection
                    .updateOne({ _id: _id }, { $set: {
                        title: title,
                        shortDescription: shortDescription,
                        content: content,
                        blogId: blogId,
                    } });
                return result.matchedCount === 1;
            }
            else
                return false;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(id)) {
                let _id = new mongodb_1.ObjectId(id);
                const result = yield exports.postCollection.deleteOne({ _id: _id });
                return result.deletedCount === 1;
            }
            else
                return false;
        });
    },
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.postCollection.deleteMany({});
            return true;
        });
    },
};
