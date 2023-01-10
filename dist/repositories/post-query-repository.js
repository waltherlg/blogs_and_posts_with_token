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
exports.postsQueryRepo = void 0;
const posts_repository_1 = require("./posts-repository");
function sort(sortDirection) {
    return (sortDirection === 'desc') ? -1 : 1;
}
function skipped(pageNumber, pageSize) {
    return (+pageNumber - 1) * (+pageSize);
}
exports.postsQueryRepo = {
    getAllPosts(sortBy, sortDirection, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let postsCount = yield posts_repository_1.postCollection.countDocuments({});
            let posts = yield posts_repository_1.postCollection.find({})
                .sort({ [sortBy]: sort(sortDirection) })
                .skip(skipped(pageNumber, pageSize))
                .limit(+pageSize)
                .toArray();
            let outPosts = posts.map((posts) => {
                return {
                    id: posts._id.toString(),
                    title: posts.title,
                    shortDescription: posts.shortDescription,
                    content: posts.content,
                    blogId: posts.blogId,
                    blogName: posts.blogName,
                    createdAt: posts.createdAt
                };
            });
            let pageCount = Math.ceil(+postsCount / +pageSize);
            let outputPosts = {
                pagesCount: pageCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: postsCount,
                items: outPosts
            };
            return outputPosts;
        });
    },
    getAllPostsByBlogsID(blogId, sortBy, sortDirection, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let posts = yield posts_repository_1.postCollection.find({ "blogId": blogId })
                .skip(skipped(pageNumber, pageSize))
                .limit(+pageSize)
                .sort({ [sortBy]: sort(sortDirection) })
                .toArray();
            let outPosts = posts.map((posts) => {
                return {
                    id: posts._id.toString(),
                    title: posts.title,
                    shortDescription: posts.shortDescription,
                    content: posts.content,
                    blogId: posts.blogId,
                    blogName: posts.blogName,
                    createdAt: posts.createdAt
                };
            });
            let postsCount = yield posts_repository_1.postCollection.countDocuments({ "blogId": blogId });
            let pageCount = Math.ceil(+postsCount / +pageSize);
            let outputPosts = {
                pagesCount: pageCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: postsCount,
                items: outPosts
            };
            return outputPosts;
        });
    }
};
