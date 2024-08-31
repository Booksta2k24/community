import CommentModel from "../../models/comments";


export const deleteComment = async ({
    userId,
    commentId,
    commentModel,
}: {
    userId:string
    commentId: string;
    commentModel: typeof CommentModel;
}) => {
    const result = await commentModel.findByIdAndDelete({ _id: commentId, userId });
    
    if(result?.parentId){
        await commentModel.updateOne({_id:result.parentId},{$inc:{replys:1}});
    }else{
        await commentModel.deleteMany({parentId:result?._id});
    }

    return !!result;
};
