import { IPost } from "../../../domain/post";
import { IPostRepository } from "../../../usecase/usecase/interface/repository/IpostRepository";
import PostModel from "../models/post";
import {addPost,findById} from './post'


export class PostRepository implements IPostRepository {
    
    constructor(
        private readonly postModel: typeof PostModel
    ){}

    addPost(postData: IPost){
        return addPost(postData, this.postModel);
    }

    findById(postId:string){
        return  findById({postId,postModel:this.postModel})
    }

}