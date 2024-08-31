import { Timestamps } from "./post";


export interface IPostLikes extends Timestamps {
    id?: string; 
    postId: string;

}