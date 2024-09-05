import { ImageObj } from "../../../domain/types/imageObj";

export interface ICloudinary {
    uploadImage(buffer: Buffer, folder: string): Promise<ImageObj> 
    uploadMultipleImages(buffers: Buffer[], folder: string): Promise<ImageObj[]>
    deleteImage(publicId: string): Promise<void>;
}