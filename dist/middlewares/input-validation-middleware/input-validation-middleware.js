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
exports.existParamBlogIdValidation = exports.existBlogIdValidation = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = exports.websiteUrlValidation = exports.descriptionValidation = exports.nameValidation = exports.emailValidation = exports.passwordValidation = exports.loginValidation = exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
const blogs_service_1 = require("../../domain/blogs-service");
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let errorsMessages = { errorsMessages: errors.array().map(x => {
                return x.msg;
            }) };
        return res.status(400).send(errorsMessages);
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
// validation for user
exports.loginValidation = (0, express_validator_1.body)('login')
    .exists({ checkFalsy: true, checkNull: true }).bail().withMessage({ "message": "write your login", "field": "login" })
    .notEmpty().bail().withMessage({ "message": "login is empty", "field": "login" })
    .trim().bail().withMessage({ "message": "login is not string", "field": "login" })
    .isLength({ min: 3, max: 10 }).bail().withMessage({ "message": "wrong length login", "field": "login" })
    .matches('^[a-zA-Z0-9_-]*$').bail().withMessage({ "message": "wrong symbols in login", "field": "login" });
exports.passwordValidation = (0, express_validator_1.body)('password')
    .exists({ checkFalsy: true, checkNull: true }).bail().withMessage({ "message": "write your password", "field": "password" })
    .notEmpty().bail().withMessage({ "message": "password is empty", "field": "password" })
    .trim().bail().withMessage({ "message": "password is not string", "field": "password" })
    .isLength({ min: 6, max: 20 }).bail().withMessage({ "message": "wrong length password", "field": "password" });
exports.emailValidation = (0, express_validator_1.body)('email')
    .exists({ checkFalsy: true, checkNull: true }).bail().withMessage({ "message": "write your email", "field": "email" })
    .notEmpty().bail().withMessage({ "message": "email is empty", "field": "email" })
    .trim().bail().withMessage({ "message": "email is not string", "field": "email" })
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).bail().withMessage({ "message": "wrong symbols in email", "field": "email" });
// validation for blog
exports.nameValidation = (0, express_validator_1.body)('name')
    .exists({ checkFalsy: true, checkNull: true }).bail().withMessage({ "message": "name not exist", "field": "name" })
    .notEmpty().bail().withMessage({ "message": "name is empty", "field": "name" })
    .trim().bail().withMessage({ "message": "name is not string", "field": "name" })
    .isLength({ min: 1, max: 15 }).bail().withMessage({ "message": "wrong length name", "field": "name" });
exports.descriptionValidation = (0, express_validator_1.body)('description')
    .exists().bail().withMessage({ "message": "description not exist", "field": "description" })
    .trim().bail().withMessage({ "message": "description is not string", "field": "description" })
    .isLength({ max: 500 }).withMessage({ "message": "wrong length description", "field": "description" });
exports.websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .exists().bail().withMessage({ "message": "websiteUrl not exist", "field": "websiteUrl" })
    .trim().bail().withMessage({ "message": "websiteUrl is not string", "field": "websiteUrl" })
    .isLength({ min: 1, max: 100 }).bail().withMessage({ "message": "wrong length websiteUrl", "field": "websiteUrl" })
    .isURL().bail().withMessage({ "message": "wrong websiteUrl", "field": "websiteUrl" });
// validations for post
exports.titleValidation = (0, express_validator_1.body)('title')
    .exists().bail().withMessage({ message: "title not exist", field: "title" })
    .trim().bail().withMessage({ message: "title is not string", field: "title" })
    .isLength({ min: 1, max: 30 }).bail().withMessage({ message: "title wrong length", field: "title" });
exports.shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .exists().bail().withMessage({ message: "shortDescription not exist", field: "shortDescription" })
    .trim().bail().withMessage({ message: "shortDescription is not string", field: "shortDescription" })
    .isLength({ min: 1, max: 100 }).bail().withMessage({ message: "shortDescription wrong length", field: "shortDescription" });
exports.contentValidation = (0, express_validator_1.body)('content')
    .exists().bail().withMessage({ message: "content not exist", field: "content" })
    .trim().bail().withMessage({ message: "content is not string", field: "content" })
    .isLength({ min: 1, max: 1000 }).bail().withMessage({ message: "wrong content", field: "content" });
exports.existBlogIdValidation = (0, express_validator_1.body)('blogId')
    .exists().bail().withMessage({ message: "is not a string", field: "blogId" })
    .trim().bail().withMessage({ message: "wrong blogId", field: "blogId" })
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogIdExist = yield blogs_service_1.blogsService.getBlogByID(value);
    if (!isBlogIdExist)
        throw new Error;
    return true;
})).withMessage({ "message": "blogId not exist", "field": "blogId" });
exports.existParamBlogIdValidation = (0, express_validator_2.param)('blogId')
    .exists().bail().withMessage({ message: "is not a string", field: "blogId" })
    .trim().bail().withMessage({ message: "wrong blogId", field: "blogId" })
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogIdExist = yield blogs_service_1.blogsService.getBlogByID(value);
    if (!isBlogIdExist)
        throw new Error;
    return true;
})).withMessage({ "message": "blogId not exist", "field": "blogId" });
