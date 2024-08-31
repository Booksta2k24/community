import PostModel from '../../models/post';

export const findById = async ({
    postId,
    postModel,
}: {
    postId: string;
    postModel: typeof PostModel;
}) => {
    return await postModel.findOne({ _id: postId });
};
