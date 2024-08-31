import { IPostLikes } from "../../../../domain/likes";

export interface IPostLikeRepository {

    like({postId, userId}:{postId:string, userId:string}):Promise<IPostLikes>
    unLike({postId, userId}:{postId:string, userId:string}):Promise<IPostLikes | null> 
}