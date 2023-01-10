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
exports.blogsQueryRepo = void 0;
const blogs_repository_1 = require("./blogs-repository");
function sort(sortDirection) {
    return (sortDirection === 'desc') ? -1 : 1;
}
function skipped(pageNumber, pageSize) {
    return (+pageNumber - 1) * (+pageSize);
}
exports.blogsQueryRepo = {
    getAllBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsCount = yield blogs_repository_1.blogCollection.countDocuments({ name: new RegExp(searchNameTerm, "gi") });
            let blogs;
            if (searchNameTerm !== 'null') {
                blogs = yield blogs_repository_1.blogCollection.find({ name: new RegExp(searchNameTerm, "gi") })
                    .skip(skipped(pageNumber, pageSize))
                    .limit(+pageSize)
                    .sort({ [sortBy]: sort(sortDirection) })
                    .toArray();
            }
            else {
                blogs = yield blogs_repository_1.blogCollection.find({})
                    .skip(skipped(pageNumber, pageSize))
                    .limit(+pageSize)
                    .sort({ [sortBy]: sort(sortDirection) })
                    .toArray();
            }
            let outBlogs = blogs.map((blogs) => {
                return {
                    id: blogs._id.toString(),
                    name: blogs.name,
                    description: blogs.description,
                    websiteUrl: blogs.websiteUrl,
                    createdAt: blogs.createdAt
                };
            });
            let pageCount = Math.ceil(blogsCount / +pageSize);
            let outputBlogs = {
                pagesCount: pageCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: blogsCount,
                items: outBlogs
            };
            return outputBlogs;
        });
    },
};
