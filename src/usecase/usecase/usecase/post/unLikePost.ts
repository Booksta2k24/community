import { HttpStatusCode } from '../../../../domain/types/httpStatusCodes';
import ErrorResponse from '../../../handler/errorResponse';
import { IPostLikeRepository } from '../../interface/repository/IpostLikeRepository';
import { IPostRepository } from '../../interface/repository/IpostRepository';

export const unLikePost = async ({
    postId,
    userId,
    postRepository,
    postLikeRepository
}: {
    postId: string;
    userId: string;
    postRepository: IPostRepository;
    postLikeRepository: IPostLikeRepository;
}) => {
    const post = await postRepository.findById(postId);
    if (!post) {
        throw ErrorResponse.badRequest('Invalid post');
    }

    await postLikeRepository.unLike({ postId, userId });

    return {
        status: HttpStatusCode.OK,
        success: true,
        message: 'Unliked post successfully',
        data: post,
    };
};
