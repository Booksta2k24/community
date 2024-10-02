import { ImageObj } from "./types/imageObj";

export interface Timestamps {
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPost extends Timestamps {
    id?: string; 
    userId?: string,
    title: string;
    content?: string;
    images?: ImageObj[];
    description: string;
}

