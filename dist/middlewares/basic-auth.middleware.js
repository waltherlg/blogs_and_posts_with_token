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
exports.authMiddleware = exports.basicAuthMiddleware = void 0;
const users_service_1 = require("../domain/users-service");
const jwt_service_1 = require("../application/jwt-service");
const basicAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Unauthorized");
    }
    const authType = authHeader.split(' ')[0];
    if (authType !== 'Basic')
        return res.sendStatus(401);
    let auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    let user = auth[0];
    let pass = auth[1];
    if (!(user == 'admin' && pass == 'qwerty')) {
        return res.status(401).send("Unauthorized");
    }
    return next();
};
exports.basicAuthMiddleware = basicAuthMiddleware;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const userId = yield jwt_service_1.jwtService.getUserByIdToken(token);
    if (userId) {
        req.user = yield users_service_1.usersService.findUserById(userId);
        next();
        return;
    }
    res.sendStatus(401);
});
exports.authMiddleware = authMiddleware;
