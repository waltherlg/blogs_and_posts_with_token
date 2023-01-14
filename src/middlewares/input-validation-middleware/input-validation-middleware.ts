
import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {param} from "express-validator";
import {blogsService} from "../../domain/blogs-service";



export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const  errors = validationResult(req);
    if (!errors.isEmpty()){
        let errorsMessages = {errorsMessages: errors.array().map( x => {
                    return x.msg
        })};
        return res.status(400).send(errorsMessages);
    }
    else {
        next();
    }
}

// validation for user
export const loginValidation = body('login')
    .exists({checkFalsy: true, checkNull: true}).bail().withMessage({"message": "write your login", "field": "login" })
    .notEmpty().bail().withMessage({"message": "login is empty", "field": "login"})
    .trim().bail().withMessage({"message": "login is not string", "field": "login" })
    .isLength({min: 3, max: 10}).bail().withMessage({"message": "wrong length login", "field": "login" })
    .matches('^[a-zA-Z0-9_-]*$').bail().withMessage({"message": "wrong symbols in login", "field": "login" })

export const passwordValidation = body('password')
    .exists({checkFalsy: true, checkNull: true}).bail().withMessage({"message": "write your password", "field": "password" })
    .notEmpty().bail().withMessage({"message": "password is empty", "field": "password"})
    .trim().bail().withMessage({"message": "password is not string", "field": "password" })
    .isLength({min: 6, max: 20}).bail().withMessage({"message": "wrong length password", "field": "password" })

export const emailValidation = body('email')
    .exists({checkFalsy: true, checkNull: true}).bail().withMessage({"message": "write your email", "field": "email" })
    .notEmpty().bail().withMessage({"message": "email is empty", "field": "email"})
    .trim().bail().withMessage({"message": "email is not string", "field": "email" })
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).bail().withMessage({"message": "wrong symbols in email", "field": "email" })

// validation for blog
export const nameValidation = body('name')
    .exists({checkFalsy: true, checkNull: true}).bail().withMessage({"message": "name not exist", "field": "name" })
    .notEmpty().bail().withMessage({"message": "name is empty", "field": "name"})
    .trim().bail().withMessage({"message": "name is not string", "field": "name" })
    .isLength({min: 1, max: 15}).bail().withMessage({"message": "wrong length name", "field": "name" })

export const descriptionValidation = body('description')
    .exists().bail().withMessage({"message": "description not exist", "field": "description" })
    .trim().bail().withMessage({"message": "description is not string", "field": "description" })
    .isLength({max: 500}).withMessage({"message": "wrong length description", "field": "description" })

export const websiteUrlValidation = body('websiteUrl')
    .exists().bail().withMessage({"message": "websiteUrl not exist", "field": "websiteUrl" })
    .trim().bail().withMessage({"message": "websiteUrl is not string", "field": "websiteUrl" })
    .isLength({min: 1, max: 100}).bail().withMessage({"message": "wrong length websiteUrl", "field": "websiteUrl" })
    .isURL().bail().withMessage({"message": "wrong websiteUrl", "field": "websiteUrl" })

// validations for post
export const titleValidation = body('title')
    .exists().bail().withMessage({message: "title not exist", field: "title" })
    .trim().bail().withMessage({message: "title is not string", field: "title" })
    .isLength({min: 1, max: 30}).bail().withMessage({message: "title wrong length", field: "title" })

export const shortDescriptionValidation = body('shortDescription')
    .exists().bail().withMessage({message: "shortDescription not exist", field: "shortDescription" })
    .trim().bail().withMessage({message: "shortDescription is not string", field: "shortDescription" })
    .isLength({min: 1, max: 100}).bail().withMessage({message: "shortDescription wrong length", field: "shortDescription" })

export const contentValidation = body('content')
    .exists().bail().withMessage({message: "content not exist", field: "content" })
    .trim().bail().withMessage({message: "content is not string", field: "content" })
    .isLength({min: 1, max: 1000}).bail().withMessage({message: "wrong content", field: "content" })

export const existBlogIdValidation = body('blogId')
    .exists().bail().withMessage({message: "is not a string", field: "blogId" })
    .trim().bail().withMessage({message: "wrong blogId", field: "blogId" })
    .custom(async value => {
        const isBlogIdExist = await blogsService.getBlogByID(value)
        if (!isBlogIdExist) throw new Error
        return true
    }).withMessage({"message": "blogId not exist", "field": "blogId" })

export const existParamBlogIdValidation = param('blogId')
    .exists().bail().withMessage({message: "is not a string", field: "blogId" })
    .trim().bail().withMessage({message: "wrong blogId", field: "blogId" })
    .custom(async value => {
        const isBlogIdExist = await blogsService.getBlogByID(value)
        if (!isBlogIdExist) throw new Error
        return true
    }).withMessage({"message": "blogId not exist", "field": "blogId" })

export const commentContentValodation = body('content')
    .exists().bail().withMessage({message: "content not exist", field: "content" })
    .trim().bail().withMessage({message: "content is not string", field: "content" })
    .isLength({min: 20, max: 300}).bail().withMessage({message: "wrong content length", field: "content" })