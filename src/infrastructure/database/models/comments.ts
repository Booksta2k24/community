// src/domain/comments/comments.model.ts

import mongoose, { Schema, Document } from "mongoose";
import { IComment } from "../../../domain/comments";



// Define schema for IComment
const commentSchema: Schema<IComment & Document> = new Schema<IComment & Document>({
    
    text:{
        type:String,
        required:true
    },
    parentId:{
        type: String || null,
        default:null,
        ref:'Comment'
    },
    postId:{
        type:String,
        required:true,
        ref:'Post'
    },
    userId:{
        type:String,
        required:true,
        ref:'User'
    },
    replys:{
        type:Number,
        default:0
    }
}, {
    timestamps: true 
});

// Create a model for the PostComment schema
const CommentModel = mongoose.model<IComment & Document>("Comment", commentSchema);

// Export the PostCommentModel
export default CommentModel;
