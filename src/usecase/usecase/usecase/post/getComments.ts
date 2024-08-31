import { HttpStatusCode } from "../../../../domain/types/httpStatusCodes";
import { ICommentRepository } from "../../interface/repository/ICommentRepository";


export const getComments = async ({
    page,
    limit,
    postId,
    parentId,
    commentRepository,

}: {
    page:number,
    limit:number,
    postId:string,
    parentId:string |null,
    commentRepository:ICommentRepository,
   
}) => {
    const res= await commentRepository.getComments({limit,page,postId,parentId});

    return {
        status: HttpStatusCode.OK,
        success: true,
        message: "Comments list",
        data: res
    }
};
 