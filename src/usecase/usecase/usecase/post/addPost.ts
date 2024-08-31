import { IPost } from "../../../../domain/post";
import { HttpStatusCode } from "../../../../domain/types/httpStatusCodes";
import { ImageObj } from "../../../../domain/types/imageObj";
import ErrorResponse from "../../../handler/errorResponse";
import { IPostRepository } from "../../interface/repository/IpostRepository";
import { ICloudinary } from "../../interface/services/ICloudinary";
import { IResponse } from "../../interface/services/IResponse";

export const addPost = async(
    postData: IPost,
    postImages: Express.Multer.File[],
    postRepository: IPostRepository,
    cloudinary: ICloudinary
): Promise<IResponse> => {
    try {

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
            postData.content = uploadedImages.map(image => image);
        } 

        const response = await postRepository.addPost(postData);
        
        if (response) {
            return {
                status: HttpStatusCode.OK,
                success: true,
                message: "Post added successfully",
                data: response
            }
        } else {
            throw ErrorResponse.internalError;
        }

    } catch (error) {
        throw error;
    }
}