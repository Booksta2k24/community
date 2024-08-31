
import mongoose, { Schema, Document } from "mongoose";

// Interface for PostLikes
interface IPostLikes extends Document {
    postId: string;
    userId: string;
}

// Define schema for PostLikes
const postLikesSchema = new Schema<IPostLikes>({
    postId: {
        type: String,
        ref: "Post",
        required: true,
        index: true // Index for efficient queries
    },
    userId: {
        type: String,
        ref: "User",
        required: true,
    },
},{
    timestamps: true
});


// Create a model for the PostLikes schema
const PostLikesModel = mongoose.model<IPostLikes>("PostLikes", postLikesSchema);

export default PostLikesModel;
