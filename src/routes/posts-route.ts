import {Request, Response, Router} from "express";
import {body} from "express-validator";



import {postsService} from "../domain/posts-service";
import {blogsService} from "../domain/blogs-service";
import {commentService} from "../domain/comment-service";

import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithParamsAndQuery,
    RequestWithQuery
} from "../models/types";
import {
    createCommentModel,
    createPostModel,
    requestPostsQueryModel,
    updatePostModel, URIParamsCommentModel,
    URIParamsGetPostByBlogIdModel,
    URIParamsPostModel
} from "../models/models";

export const postsRouter = Router({})

import {inputValidationMiddleware} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {authMiddleware, basicAuthMiddleware} from "../middlewares/basic-auth.middleware";
import {titleValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {shortDescriptionValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {contentValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {existBlogIdValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {postsQueryRepo} from "../repositories/post-query-repository";

// GET Returns All posts
postsRouter.get('/', async (req: RequestWithQuery<requestPostsQueryModel>, res: Response) => {
    try {
        let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
        let sortDirection = req.query.sortDirection ? req.query.sortDirection : 'desc'
        let pageNumber = req.query.pageNumber ? req.query.pageNumber : '1'
        let pageSize = req.query.pageSize ? req.query.pageSize : '10'
        const allPosts = await postsQueryRepo.getAllPosts(sortBy, sortDirection, pageNumber, pageSize)
        res.status(200).send(allPosts);
    }
    catch (e){
        res.status(500).send(e)
    }
})

//GET return post by id
postsRouter.get('/:id', async (req: RequestWithParams<URIParamsPostModel>, res) => {
    let foundPost = await postsService.getPostByID(req.params.id.toString())
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.sendStatus(404)
    }
})

//GET return post by blog id
postsRouter.get('/blogid/:blogId', async (req: RequestWithParams<URIParamsGetPostByBlogIdModel>, res) => {
    let foundPost = await postsService.getPostByBlogsID(req.params.blogId.toString())
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.sendStatus(404)
    }
})

// POST add post
postsRouter.post('/',
    basicAuthMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    existBlogIdValidation,
    inputValidationMiddleware,
    async (req: RequestWithBody<createPostModel>, res: Response) => {
        const newPost = await postsService.createPost(
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.blogId)
        res.status(201).send(newPost)
    })

// POST add comment by post id

postsRouter.post('/:postId/comments',
    //basicAuthMiddleware,
    authMiddleware,
    inputValidationMiddleware,
    //async (req: RequestWithParamsAndBody<URIParamsCommentModel, createCommentModel>, res: Response) => {
    async (req: RequestWithParamsAndBody<URIParamsCommentModel, createCommentModel>, res: Response) => {
    const newComment = await commentService.createComment(
        req.params.postId,
        req.body.content,
        req.headers.authorization!)
        res.status(201).send(newComment)
    })

// PUT update post
postsRouter.put('/:id',
    basicAuthMiddleware,
    existBlogIdValidation,
    shortDescriptionValidation,
    titleValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: RequestWithParamsAndBody<URIParamsPostModel, updatePostModel>, res: Response) => {
        const updatePost = await postsService.updatePost(
            req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.blogId)
        if (updatePost) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

// DELETE post
postsRouter.delete('/:id',
    basicAuthMiddleware,
    async (req: RequestWithParams<URIParamsPostModel>, res: Response) => {
        const isDeleted = await postsService.deletePost(req.params.id)
        if (isDeleted) {
            return res.sendStatus(204)
        } else {
            res.sendStatus(404);
        }
    })

