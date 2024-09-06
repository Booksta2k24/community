import { IPost } from "../../../../domain/post";
import PostModel from "../../models/post";


export const deletePost = async(
    postId: string,
    postModel: typeof PostModel
):Promise<boolean> => {
    try {
        const post = await postModel.deleteOne({_id: postId});

        if (post.deletedCount == 1) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        throw error;
    }
}