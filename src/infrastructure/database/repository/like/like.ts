import { IPostLikes } from "../../../../domain/likes";
import PostLikesModel from "../../models/postLikes";



export const like = async({
    postId,
    postLikesModel,
    userId,
}:{
    postId:string,
    postLikesModel:typeof PostLikesModel,
    userId:string
}):Promise<IPostLikes>=> {
    // Try to find an existing like and create a new one if it doesn't exist
    const updatedLike = await postLikesModel.findOneAndUpdate(
        { postId, userId }, // Filter to check if the like already exists
        { $setOnInsert: { postId, userId } }, // Insert these values if no document is found
        { new: true, upsert: true } // Return the new document if inserted, or the existing one
    );

    // If the like already existed, `updatedLike` will be the existing one, otherwise it will be the new one.
    return updatedLike;
}