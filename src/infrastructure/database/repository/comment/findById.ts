import CommentModel from "../../models/comments";

export const findById = async ({
    commentId,
    commentModel,
}: {
    commentId: string;
    commentModel: typeof CommentModel;
}) => {
    
    return await commentModel.findById({_id:commentId});
    
};
