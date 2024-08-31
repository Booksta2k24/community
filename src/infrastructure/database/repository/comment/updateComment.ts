import CommentModel from "../../models/comments";

export const updateComment = async ({
    commentId,
    postId,
    text,
    commentModel,
}: {
    commentId: string;
    postId:string;
    text:string;
    commentModel: typeof CommentModel;
})=> {
    return await commentModel.findOneAndUpdate({ _id: commentId, postId: postId }, { $set: { text: text } },{new:true});
};
