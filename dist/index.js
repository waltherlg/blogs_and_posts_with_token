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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogs_route_1 = require("./routes/blogs-route");
const posts_route_1 = require("./routes/posts-route");
const users_route_1 = require("./routes/users-route");
const testing_route_1 = require("./routes/testing-route");
const db_1 = require("./repositories/db");
const auth_route_1 = require("./routes/auth-route");
const comments_route_1 = require("./routes/comments-route");
const bodyParser = require('body-parser');
const fs = require("fs");
var path = require('path');
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use('/testing/all-data', testing_route_1.testingRouter);
app.use('/blogs', blogs_route_1.blogsRouter);
app.use('/posts', posts_route_1.postsRouter);
app.use('/users', users_route_1.usersRouter);
app.use('/auth', auth_route_1.authRouter);
app.use('/comments', comments_route_1.commentsRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
