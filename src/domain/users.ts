import { Timestamps } from "./post";
export interface IUser extends Timestamps{
    _id?:string;
    username?:string;
    email?:string;
    isBlock?:boolean;
    profileImage?:string;
    password?:string;
}