import PostModel from '../../models/post';

export const getAllPost = async ({
    postModel,
}: {
    postModel: typeof PostModel;
}) => {
    const result = await postModel.find();
    return result;

};
