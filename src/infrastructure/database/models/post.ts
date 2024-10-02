// src/infrastructure/models/post.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "../../../domain/post";


const ImageObjSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
});

// Define the main post schema
const postSchema: Schema<IPost & Document> = new Schema<IPost & Document>({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
    },
    content: {
        type: Schema.Types.Mixed,
        required: true
    },
    images: {
        type: [ImageObjSchema],
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


// Create a new Model for the Post schema
const PostModel = mongoose.model<IPost & Document>("Post", postSchema);

// Export the PostModel
export default PostModel;
