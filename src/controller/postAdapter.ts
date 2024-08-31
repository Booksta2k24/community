
import { File } from './../domain/types/file';
import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { PostUsecase } from "../usecase/usecase/postUsecase";

// Class to handle the adding of a post
export class PostAdapter {
    // Private variable to store the PostUsecase
    private readonly _postUsecase: PostUsecase;

    // Constructor to initialize the PostUsecase
    constructor(
        postUsecase: PostUsecase
    ) {
        this._postUsecase = postUsecase
    }

    // Method to add a post
    async addPost(req:Req, res:Res, next:Next){
        try {           

            // Create a postData object with the userId and the body of the request
            const postData = { userId: req.userId, ...req.body};

            // Call the addPost method of the PostUsecase with the postData and the files
            const response = await this._postUsecase.addPost(postData, req.files as File[]);

            // Send the response back to the client
            res.status(response.status).json({
                message: response.message,
                data: response.data,
                success: response.success
            });

        } catch (error) {
            // If an error occurs, call the next middleware
            next(error);
        }
    }

    async likePost(req: Req, res: Res) {
        const { postId } = req.params;
        const { userId } = req as { userId: string };

        const response = await this._postUsecase.likePost({ postId, userId });

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }

    async unLikePost(req: Req, res: Res) {
        const { postId } = req.params;
        const { userId } = req as { userId: string };

        const response = await this._postUsecase.unLIkePost({ postId, userId });

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }

    async addComment(req: Req, res: Res) {
        const { postId } = req.params;
        const { userId } = req as { userId: string };
        const { text, parentId = null } = req.body;
        const response = await this._postUsecase.addComment({
            postId,
            userId,
            text,
            parentId,
        });

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }

    async deleteComment(req: Req, res: Res) {
        const { commentId } = req.params;
        const { userId } = req as { userId: string };
        
        const response = await this._postUsecase.deleteComment({ commentId, userId });

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }

    async getComments(req: Req, res: Res){
        const { postId } = req.params;
        const { page = 1, limit = 5, parentId = null } = req.query;

        const response = await this._postUsecase.getComments({
            page: Number(page),
            limit: Number(limit),
            postId,
            parentId: parentId as string | null,
        });


        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }

    async updateComment(req: Req, res: Res){
        const { postId,commentId } = req.params;
        const { userId } = req as { userId: string };
        const { text } = req.body;
        const response = await this._postUsecase.updateComment({
            postId,
            commentId,
            userId,
            text,
        });

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }
}

