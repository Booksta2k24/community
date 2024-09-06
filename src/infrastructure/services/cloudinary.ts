import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { ImageObj } from '../../domain/types/imageObj';

export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: cloudinaryConfig.cloud_name,
            api_key: cloudinaryConfig.api_key,
            api_secret: cloudinaryConfig.api_secret,
        });
    }

    async uploadImage(buffer: Buffer, folder: string): Promise<ImageObj> {
                
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: folder },
                (error, result) => {
                    if (error) {
                        reject(new Error('Image upload failed'));
                    } else {
                        if(result)
                            resolve({ url: result.secure_url, publicId: result.public_id });
                    }
                }
            ).end(buffer);
        });
    }

    // Method to upload multiple buffers to Cloudinary
    async uploadMultipleImages(buffers: Buffer[], folder: string): Promise<ImageObj[]> {
        const uploadPromises = buffers.map(buffer => this.uploadImage(buffer, folder));
        return Promise.all(uploadPromises);
    }

    // Method to delete an image from Cloudinary
    async deleteImage(publicId: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            throw new Error('Image deletion failed');
        }
    }
}
