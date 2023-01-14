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
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_service_1 = require("../domain/blogs-service");
const posts_service_1 = require("../domain/posts-service");
exports.blogsRouter = (0, express_1.Router)({});
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const input_validation_middleware_2 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const basic_auth_middleware_1 = require("../middlewares/basic-auth.middleware");
const input_validation_middleware_3 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const input_validation_middleware_4 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const blog_query_repository_1 = require("../repositories/blog-query-repository");
const post_query_repository_1 = require("../repositories/post-query-repository");
// GET Returns All blogs
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm : '';
        let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
        let sortDirection = req.query.sortDirection ? req.query.sortDirection : 'desc';
        let pageNumber = req.query.pageNumber ? req.query.pageNumber : '1';
        let pageSize = req.query.pageSize ? req.query.pageSize : '10';
        const allBlogs = yield blog_query_repository_1.blogsQueryRepo.getAllBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize);
        res.status(200).send(allBlogs);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
// POST add blogs
exports.blogsRouter.post('/', basic_auth_middleware_1.basicAuthMiddleware, input_validation_middleware_1.nameValidation, input_validation_middleware_3.descriptionValidation, input_validation_middleware_4.websiteUrlValidation, input_validation_middleware_2.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blogs_service_1.blogsService.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(newBlog);
}));
// POST create post for specific blog
exports.blogsRouter.post('/:blogId/posts', basic_auth_middleware_1.basicAuthMiddleware, input_validation_middleware_1.titleValidation, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.contentValidation, input_validation_middleware_2.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundBlog = yield blogs_service_1.blogsService.getBlogByID(req.params.blogId.toString());
    if (!foundBlog) {
        res.sendStatus(404);
    }
    else {
        const newPost = yield posts_service_1.postsService.createPostByBlogId(req.body.title, req.body.shortDescription, req.body.content, req.params.blogId.toString());
        res.status(201).send(newPost);
    }
}));
//GET blog buy id
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundBlog = yield blogs_service_1.blogsService.getBlogByID(req.params.id.toString());
    if (foundBlog) {
        res.status(200).send(foundBlog);
    }
    else {
        res.sendStatus(404);
    }
}));
//GET all posts by blogs id
exports.blogsRouter.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundBlog = yield blogs_service_1.blogsService.getBlogByID(req.params.id.toString());
    if (!foundBlog) {
        res.sendStatus(404);
    }
    else {
        try {
            let blogId = req.params.id.toString();
            let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
            let sortDirection = req.query.sortDirection ? req.query.sortDirection : 'desc';
            let pageNumber = req.query.pageNumber ? req.query.pageNumber : '1';
            let pageSize = req.query.pageSize ? req.query.pageSize : '10';
            let foundPosts = yield post_query_repository_1.postsQueryRepo.getAllPostsByBlogsID(blogId, sortBy, sortDirection, pageNumber, pageSize);
            if (foundPosts) {
                res.status(200).send(foundPosts);
            }
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
}));
// DELETE blog video by id
exports.blogsRouter.delete('/:id', basic_auth_middleware_1.basicAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield blogs_service_1.blogsService.deleteBlog(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
// PUT update blogs by id
exports.blogsRouter.put('/:id', basic_auth_middleware_1.basicAuthMiddleware, input_validation_middleware_1.nameValidation, input_validation_middleware_3.descriptionValidation, input_validation_middleware_4.websiteUrlValidation, input_validation_middleware_2.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBlog = yield blogs_service_1.blogsService.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (updateBlog) {
        const blog = blogs_service_1.blogsService.getBlogByID(req.params.id);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
