import { IPost } from "../../../../domain/post";

export interface IResponse<T= IPost> {
    status:number,
    success:boolean,
    message?:string,
    data?:T,
    token?:string
}