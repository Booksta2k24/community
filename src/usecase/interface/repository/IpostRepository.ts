import { IPost } from "../../../domain/post";


export interface IPostRepository {

    //add new post 
    addPost(postData:IPost): Promise<IPost | null>;
    
}