import { IPost } from "../../../../domain/post";
import { File } from "../../../../domain/types/file";
import { HttpStatusCode } from "../../../../domain/types/httpStatusCodes";
import { ImageObj } from "../../../../domain/types/imageObj";
import ErrorResponse from "../../../handler/errorResponse";
import { IPostRepository } from "../../interface/repository/IpostRepository";
import { ICloudinary } from "../../interface/services/ICloudinary";
import { IResponse } from "../../interface/services/IResponse";

export const editPost = async(
    postData: IPost,
    postImages: File[],
    postId: string,
    postRepository: IPostRepository,
    cloudinary: ICloudinary
): Promise<IResponse> => {
    try {

        const existPost = await postRepository.findById(postId);

        if (!existPost) {
            throw ErrorResponse.notFound("Post not found")
        }

        //delete all existing images
        if (existPost && existPost.content) {
            if (Array.isArray(existPost.content)) {
                for (let i = 0; i < existPost.content.length; i++) {
                    cloudinary.deleteImage(existPost.content[i].publicId); 
                }
            } 
        }

        //add newly received images
        if (Object.values(postImages).length > 0) {    
            
            const imageUploadPromises = Object.values(postImages).flat().map(file => {

                if (!file.buffer) {

                    console.log('File buffer is undefined for:', file.originalname);
                    throw new Error('File buffer is undefined');
                }

                console.log('Uploading file:', file.originalname);
                return cloudinary.uploadImage(file.buffer, 'booksta-user-posts');

            });
            
            const uploadedImages: ImageObj[] = await Promise.all(imageUploadPromises);

            // Add image data to postData
            postData.images = uploadedImages.map(image => image);
        } 

        //adding post id to post data
        postData.id = postId;
        const response = await postRepository.editPost(postData);        
        
        if (response) {
            return {
                status: HttpStatusCode.OK,
                success: true,
                message: "Post edited successfully",
                data: response
            }
        } else {
            throw ErrorResponse.internalError;
        }

    } catch (error) {
        throw error;
    }
}