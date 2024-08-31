import { IPostLikeRepository } from "../../../usecase/usecase/interface/repository/IpostLikeRepository";
import PostLikesModel from "../models/postLikes";
import {like,unLike} from './like'


export class PostLikeRepository implements IPostLikeRepository {
    
    constructor(
        private readonly postLikeModel: typeof PostLikesModel
    ){}

    like({ postId, userId }: { postId: string; userId: string; }) {
        return like({postId, userId, postLikesModel:this.postLikeModel})
    }
    unLike({ postId, userId }: { postId: string; userId: string; }) {
        return unLike({postId, userId, postLikesModel:this.postLikeModel})
        
    }
}