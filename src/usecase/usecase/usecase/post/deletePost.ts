import { IPost } from "../../../../domain/post";
import { File } from "../../../../domain/types/file";
import { HttpStatusCode } from "../../../../domain/types/httpStatusCodes";
import { ImageObj } from "../../../../domain/types/imageObj";
import ErrorResponse from "../../../handler/errorResponse";
import { IPostRepository } from "../../interface/repository/IpostRepository";
import { ICloudinary } from "../../interface/services/ICloudinary";
import { IResponse } from "../../interface/services/IResponse";

export const deletePost = async(
    postId: string,
    postRepository: IPostRepository,
    cloudinary: ICloudinary
): Promise<IResponse> => {
    try {

        const existPost = await postRepository.findById(postId);

        if (!existPost) {
            throw ErrorResponse.notFound("Post not found")
        }

        if (existPost && existPost.content) {
            if (Array.isArray(existPost.content)) {
                for (let i = 0; i < existPost.content.length; i++) {
                    cloudinary.deleteImage(existPost.content[i].publicId); 
                }
            } 
        }

        const response = await postRepository.deletePost(postId);
        
        if (response) {
            return {
                status: HttpStatusCode.OK,
                success: true,
                message: "Post deleted successfully",
            }
        } else {
            throw ErrorResponse.internalError;
        }

    } catch (error) {
        throw error;
    }
}