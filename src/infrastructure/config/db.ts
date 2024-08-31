import mongoose from "mongoose";
import "dotenv/config";
import ErrorResponse from "../../usecase/handler/errorResponse";


// Define an async function to connect to the MongoDB database
export async function connectDB() {
    try {
        // Connect to the MongoDB database and store the connection in the conn variable
        const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "");
        // Return the connection
        return conn;
    } catch (error) {
        // Log the error to the console
        // Throw the error to be handled by the calling function
        throw ErrorResponse.internalError(`${error} database connection failed`)
    }
}