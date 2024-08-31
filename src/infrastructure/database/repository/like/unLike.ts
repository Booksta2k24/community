
import { IPostLikes } from "../../../../domain/likes";
import PostLikesModel from "../../models/postLikes";


export const unLike = async({
    postId,
    postLikesModel,
    userId,
}:{
    postId: string,
    postLikesModel: typeof PostLikesModel,
    userId: string,
}): Promise<IPostLikes | null> => {
    // Find and delete the like entry
    return await postLikesModel.findOneAndDelete({ postId, userId });

}