import { Timestamps } from "./post";



export interface IComment extends Timestamps {
    id?:string,
    text:string,
    userId:string,
    postId:string,
    replys?:number
    parentId:null|string
}