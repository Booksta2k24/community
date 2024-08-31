import { IComment } from '../../../../domain/comments';
import { HttpStatusCode } from '../../../../domain/types/httpStatusCodes';
import ErrorResponse from '../../../handler/errorResponse';
import { ICommentRepository } from '../../interface/repository/ICommentRepository';
import { IPostRepository } from '../../interface/repository/IpostRepository';

export const addComment = async ({
    postRepository,
    commentRepository,
    text,
    postId,
    userId,
    parentId,
}: {
    postRepository: IPostRepository;
    commentRepository: ICommentRepository;
    text: string;
    postId: string;
    userId: string;
    parentId: string;
}) => {
    // Use Promise.all with conditional promise for parent comment
    const [post, parentComment] = await Promise.all([
        postRepository.findById(postId),
        parentId ? commentRepository.findById(parentId) : Promise.resolve(null),
    ]);

    if (!post) throw ErrorResponse.badRequest('Invalid post');

    if (parentId && !parentComment)
        throw ErrorResponse.badRequest('Invalid parent comment');

    const comment = {
        parentId,
        text,
        userId,
        postId,
    };

    const newComment = await commentRepository.createComment(comment);

    return {
        status: HttpStatusCode.OK,
        success: true,
        message: 'Comment added successfully',
        data: newComment,
    };
};
