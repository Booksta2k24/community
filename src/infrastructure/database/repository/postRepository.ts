import { IPost } from "../../../domain/post";
import { IPostRepository } from "../../../usecase/usecase/interface/repository/IpostRepository";
import PostModel from "../models/post";
import {addPost, deletePost, editPost, findById} from './post'


export class PostRepository implements IPostRepository {
    
    constructor(
        private readonly postModel: typeof PostModel
    ){}

    addPost(postData: IPost){
        return addPost(postData, this.postModel);
    }
    
    editPost(postData: IPost){
        return editPost(postData, this.postModel);
    }

    deletePost(postId: string){
        return deletePost(postId, this.postModel);
    }

    findById(postId:string){
        return findById({postId, postModel: this.postModel})
    }

}