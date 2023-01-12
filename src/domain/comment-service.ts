import {ObjectId} from "mongodb";
import {commentType, commentTypeOutput} from "../models/types";
import {commentsRepository} from "../repositories/comments-repository";

export const commentService = {

    async createComment(content: string, userId: string, userLogin: string,): Promise<commentTypeOutput> {
        const newComment: commentType = {
            "_id": new ObjectId(),
            "content":	content,
            "userId": userId,
            "userLogin": userLogin,
            "createdAt": new Date().toString()
        }
        const createdComment = await commentsRepository.createComment(newComment)
        return createdComment
    }
}