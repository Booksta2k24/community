import { IPost } from '../../../domain/post';
import { ICommentRepository } from '../interface/repository/ICommentRepository';
import { IPostLikeRepository } from '../interface/repository/IpostLikeRepository';
import { IPostRepository } from '../interface/repository/IpostRepository';
import { ICloudinary } from '../interface/services/ICloudinary';
import {
    addComment,
    addPost,
    deleteComment,
    getComments,
    likePost,
    unLikePost,
    updateComment,
} from './post';

export class PostUsecase {
    private readonly _postRepository: IPostRepository;
    private readonly _postLikeRepository: IPostLikeRepository;
    private readonly _cloudinary: ICloudinary;
    private readonly _commentRepository: ICommentRepository;

    constructor({
        postRepository,
        postLikeRepository,
        cloudinary,
        commentRepository,
    }: {
        postRepository: IPostRepository;
        postLikeRepository: IPostLikeRepository;
        cloudinary: ICloudinary;
        commentRepository: ICommentRepository;
    }) {
        this._postRepository = postRepository;
        this._postLikeRepository = postLikeRepository;
        this._cloudinary = cloudinary;
        this._commentRepository = commentRepository;
    }

    addPost(postData: IPost, postImages: Express.Multer.File[]) {
        return addPost(
            postData,
            postImages,
            this._postRepository,
            this._cloudinary
        );
    }
    async likePost({ postId, userId }: { postId: string; userId: string }) {
        return await likePost({
            postId,
            userId,
            postRepository: this._postRepository,
            postLikeRepository: this._postLikeRepository,
        });
    }

    async unLIkePost({ postId, userId }: { postId: string; userId: string }) {
        return await unLikePost({
            postId,
            userId,
            postRepository: this._postRepository,
            postLikeRepository: this._postLikeRepository,
        });
    }

    async addComment({
        postId,
        userId,
        text,
        parentId,
    }: {
        postId: string;
        userId: string;
        text: string;
        parentId: string;
    }) {
        return await addComment({
            postRepository: this._postRepository,
            commentRepository: this._commentRepository,
            text,
            postId,
            userId,
            parentId,
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
            commetnRepository: this._commentRepository,
            commentId,
            userId,
        });
    }

    async getComments({
        page,
        limit,
        postId,
        parentId,
    }: {
        page: number;
        limit: number;
        postId: string;
        parentId: string | null;
    }) {
        return await getComments({
            page,
            limit,
            postId,
            commentRepository: this._commentRepository,
            parentId,
        });
    }

    async updateComment({
        postId,
        commentId,
        userId,
        text,
    }: {
        postId: string;
        commentId: string;
        userId: string;
        text: string;
    }) {
        return await updateComment({
            postId,
            commentId,
            userId,
            text,
            commentRepository: this._commentRepository,
        });
    }
}
