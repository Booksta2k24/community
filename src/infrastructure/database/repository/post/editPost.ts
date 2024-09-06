import { IPost } from "../../../../domain/post";
import PostModel from "../../models/post";

export const editPost = async (
    postData: IPost,
    postModel: typeof PostModel
): Promise<IPost | null> => {
    try {

        console.log(postData.id);
        
        // Check if postData.id exists and is valid
        if (!postData.id) {
            throw new Error("Post ID is required");
        }

        const updatedPost = await postModel.findByIdAndUpdate(
            postData.id,
            {
                title: postData.title,
                description: postData.description,
                content: postData.content,
            },
            { new: true } // Returns the updated document
        );

        // Check if the post was updated
        if (!updatedPost) {
            throw new Error("Post not found or not updated");
        }

        return updatedPost as IPost; // Return the updated post

    } catch (error) {
        console.error(error); 
        throw error; 
    }
};
