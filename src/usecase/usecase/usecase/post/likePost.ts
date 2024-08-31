import { HttpStatusCode } from '../../../../domain/types/httpStatusCodes';
import ErrorResponse from '../../../handler/errorResponse';
import { IPostLikeRepository } from '../../interface/repository/IpostLikeRepository';
import { IPostRepository } from '../../interface/repository/IpostRepository';

export const likePost = async ({
    postId,
    userId,
    postLikeRepository,
    postRepository,
}: {
    postId: string;
    userId: string;
    postLikeRepository: IPostLikeRepository;
    postRepository: IPostRepository;
}) => {
    const post = await postRepository.findById(postId);
    
    if (!post) {
        throw ErrorResponse.badRequest('Invalid post');
    }

    await postLikeRepository.like({ postId, userId });

    return {
        status: HttpStatusCode.OK,
        success: true,
        message: 'Liked post successfully',
        data: post,
    };
};
