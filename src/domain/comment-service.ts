import {ObjectId} from "mongodb";
import {commentType, commentTypeOutput} from "../models/types";
import {commentsRepository} from "../repositories/comments-repository";
import {jwtService} from "../application/jwt-service";
import {usersService} from "./users-service";

export const commentService = {

    async createComment(postId: string, content: string, authHeader: string): Promise<commentTypeOutput> {
        const token = authHeader.split(' ')[1]
        const userId = await jwtService.getUserByIdToken(token)
        const user = await usersService.findUserById(userId!)
        const userLogin = user!.login

        const newComment: commentType = {
            "_id": new ObjectId(),
            "content":	content,
            "userId": userId!,
            "userLogin": userLogin!,
            "createdAt": new Date().toISOString()
        }
        const createdComment = await commentsRepository.createComment(newComment)
        return createdComment
    }
}