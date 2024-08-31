import { IComment } from '../../../../domain/comments';
import CommentModel from '../../models/comments';

export const createComment = async ({
    newComment,
    commentModel,
}: {
    newComment: IComment;
    commentModel: typeof CommentModel;
}) => {
    const comment = await commentModel.create(newComment);
    const res = await comment.save();
    if (res.parentId) {
        await commentModel.updateOne(
            { _id: res.parentId },
            { $inc: { replys: 1 } }
        );
    }

    return res;
};
