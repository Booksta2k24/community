import { HttpStatusCode } from "../../../../domain/types/httpStatusCodes";
import { IPostRepository } from "../../interface/repository/IpostRepository";


export const getAllPost = async ({
    postRepository,
}: {
    postRepository:IPostRepository,
   
}) => {
    const res= await postRepository.getAllPost();

    return {
        status: HttpStatusCode.OK,
        success: true,
        message: "post list",
        data: res
    }
};
 