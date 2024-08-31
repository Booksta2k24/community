import { HttpStatusCode } from "../../../../domain/types/httpStatusCodes";
import ErrorResponse from "../../../handler/errorResponse";
import { ICommentRepository } from "../../interface/repository/ICommentRepository";


export const deleteComment = async ({
    commetnRepository,
    commentId,
    userId
}: {
    commetnRepository:ICommentRepository,
    commentId:string,
    userId:string
}) => {
   

    const res = await commetnRepository.deleteComment({commentId,userId});
    if(!res) throw ErrorResponse.badRequest('invalid request');

    return {
        status: HttpStatusCode.OK,
        success: true,
        message: "Comment deleted successfully",
        data: res
    } 

};
 