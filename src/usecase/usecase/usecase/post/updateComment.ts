import { HttpStatusCode } from "../../../../domain/types/httpStatusCodes";
import ErrorResponse from "../../../handler/errorResponse";
import { ICommentRepository } from "../../interface/repository/ICommentRepository";

export const updateComment = async ({
    commentRepository,
    postId,
    commentId,
    text,
    userId,
}: {
    commentRepository: ICommentRepository;
    postId: string;
    commentId: string;
    text: string;
    userId: string;
}) => {

    const comment = await commentRepository.findById(commentId);
    
    if(!comment || comment.userId.toString()!==userId) throw ErrorResponse.badRequest('access denied');

    const res  = await commentRepository.updateComment({
        postId,
        commentId,
        text,
    });
    return {
        status: HttpStatusCode.OK,
        success: true,
        message: 'Liked post successfully',
        data: res,
    };
};
