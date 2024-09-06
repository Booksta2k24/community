import { IPost } from '../../../../domain/post';
import PostModel from '../../models/post';

export const findById = async ({
    postId,
    postModel,
}: {
    postId: string;
    postModel: typeof PostModel;
}) => {
    const result = await postModel.findOne({ _id: postId });
    return result;
    
};
