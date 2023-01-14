import {Request, Response, Router} from "express";
import {postsService} from "../domain/posts-service";
import {blogsService} from "../domain/blogs-service";
import {usersRepository} from "../repositories/users-repository";
import {usersService} from "../domain/users-service";
import {authMiddleware} from "../middlewares/basic-auth.middleware";
import {commentService} from "../domain/comment-service";

export const testingRouter = Router({})

testingRouter.delete('/',
    async (req: Request, res: Response) => {
        console.log(req)
        const isPostsDeleted = await postsService.deleteAllPosts();
        const isBlogsDeleted = await blogsService.deleteAllBlogs();
        const isUsersDeleted = await usersService.deleteAllUsers();
        //const isCommentsDeleted = await commentService.
        if (isPostsDeleted && isBlogsDeleted && isUsersDeleted) {
            return res.sendStatus(204)
        } else {
            res.sendStatus(404);
        }


    })

