import {client} from "./db";
import {ObjectId} from "mongodb";
import {commentType} from "../models/types";
import {commentTypeOutput} from "../models/types";

export const commentsCollection = client.db("blogsAndPosts").collection<commentType>("comments")

export const commentsRepository = {

    async createComment(newComment: commentType): Promise<commentTypeOutput> {
        const result = await commentsCollection.insertOne(newComment)
        let createdComment = {
            id: newComment._id.toString(),
            content: newComment.content,
            userId: newComment.userId,
            userLogin: newComment.userLogin,
            createdAt: newComment.createdAt,
        }
        return createdComment
    }
}