import { IComment } from '../../../domain/comments';
import { ICommentRepository } from '../../../usecase/usecase/interface/repository/ICommentRepository';
import CommentModel from '../models/comments';
import {
    createComment,
    deleteComment,
    updateComment,
    getComments,
    findById,
} from './comment';

export class CommentRepository implements ICommentRepository {
    constructor(private readonly commentModel: typeof CommentModel) {}

    async createComment(newComment: IComment) {
        return await createComment({
            newComment,
            commentModel: this.commentModel,
        });
    }
    async deleteComment({
        commentId,
        userId,
    }: {
        commentId: string;
        userId: string;
    }) {
        return await deleteComment({
            userId,
            commentId,
            commentModel: this.commentModel,
        });
    }
    async updateComment({
        postId,
        commentId,
        text,
    }: {
        postId: string;
        commentId: string;
        text: string;
    }) {
        return await updateComment({
            postId,
            commentId,
            text,
            commentModel: this.commentModel,
        });
    }

    async getComments({
        limit,
        page,
        postId,
        parentId,
    }: {
        limit: number;
        page: number;
        postId: string;
        parentId: string | null;
    }) {
        return await getComments({
            limit,
            page,
            postId,
            parentId,
            commentModel: this.commentModel,
        });
    }
    async findById(commentId: string) {
        return await findById({
            commentId,
            commentModel: this.commentModel,
        });
    }
}
