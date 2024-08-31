
import CommentModel from '../../models/comments';

export const getComments = async ({
    limit,
    page,
    postId,
    parentId,
    commentModel,
}: {
    page: number;
    limit: number;
    postId: string;
    parentId: string | null;
    commentModel: typeof CommentModel;
}) => {
    const sortOrder = parentId ? 1 : -1;
    const commentsPromise = commentModel
        .find({
            postId,
            parentId,
        })
        .sort({ createdAt: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit);

    const totalCommentsPromise = commentModel.countDocuments({
        postId,
        parentId: parentId,
    });

    const [comments, totalComments] = await Promise.all([
        commentsPromise,
        totalCommentsPromise,
    ]);

    return { comments, totalComments };
};
