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
exports.postsRepository = void 0;
let posts = [
    {
        "id": "firspost",
        "title": "music",
        "shortDescription": "post of music",
        "content": "content1",
        "blogId": "blogId1",
        "blogName": "Bob's trambon"
    },
    {
        "id": "2",
        "title": "title2",
        "shortDescription": "shortDescription2",
        "content": "content2",
        "blogId": "blogId2",
        "blogName": "blogName2"
    },
    {
        "id": "3",
        "title": "title3",
        "shortDescription": "shortDescription2",
        "content": "content3",
        "blogId": "blogId3",
        "blogName": "blogName3"
    },
];
exports.postsRepository = {
    getPostByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = posts.find(p => p.id === id);
            return post;
        });
    },
    getPostByBlogsID(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = posts.find(p => p.blogId === blogId);
            return post;
        });
    },
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return posts;
        });
    },
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                "id": (+(new Date())).toString(),
                "title": title,
                "shortDescription": shortDescription,
                "content": content,
                "blogId": blogId,
                "blogName": content + " " + title
            };
            posts.push(newPost);
            return newPost;
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = posts.find(p => p.id === id);
            if (post) {
                post.title = title;
                post.shortDescription = shortDescription;
                post.content = content;
                post.blogId = blogId;
                return true;
            }
            else {
                return false;
            }
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].id === id) {
                    posts.splice(i, 1);
                    return true;
                }
            }
            return false;
        });
    },
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            posts.splice(0);
            return true;
        });
    },
};
