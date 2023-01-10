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
exports.usersRouter = void 0;
const express_1 = require("express");
const users_service_1 = require("../domain/users-service");
const basic_auth_middleware_1 = require("../middlewares/basic-auth.middleware");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const users_query_repository_1 = require("../repositories/users-query-repository");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter.post('/', basic_auth_middleware_1.basicAuthMiddleware, input_validation_middleware_1.loginValidation, input_validation_middleware_1.passwordValidation, input_validation_middleware_1.emailValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield users_service_1.usersService.createUser(req.body.login, req.body.password, req.body.email);
    res.status(201).send(newUser);
}));
exports.usersRouter.delete('/:id', basic_auth_middleware_1.basicAuthMiddleware, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserDeleted = yield users_service_1.usersService.deleteUser(req.params.id);
    if (isUserDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.usersRouter.get('/', basic_auth_middleware_1.basicAuthMiddleware, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
        let sortDirection = req.query.sortDirection ? req.query.sortDirection : 'desc';
        let pageNumber = req.query.pageNumber ? req.query.pageNumber : '1';
        let pageSize = req.query.pageSize ? req.query.pageSize : '10';
        let searchLoginTerm = req.query.searchLoginTerm ? req.query.searchLoginTerm : '';
        let searchEmailTerm = req.query.searchEmailTerm ? req.query.searchEmailTerm : '';
        const allUsers = yield users_query_repository_1.usersQueryRepo.getAllUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm);
        res.status(200).send(allUsers);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
