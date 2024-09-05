import { Next, Req, Res } from '../types/expressTypes';
import "dotenv/config";
import ErrorResponse from '../../usecase/handler/errorResponse';
import { GenerateToken } from '../services/jwt';

export async function auth(req: Req, res: Res, next: Next) {
    // Instantiate the GenerateToken service
    const tokenService = new GenerateToken();        
    
    // Getting the token from the request header
    const token = req.header("Authorization")?.split(' ')[1];

    // If no token is found, return an unauthorized error
    if (!token) {
        throw ErrorResponse.unauthorized("Unauthorized access, not token");
    }

    try {
        // Verify the token using the token service
        const userId = await tokenService.verifyJWT(token, "access");   
        
        if(!userId) {
            throw ErrorResponse.unauthorized("Unauthorized access, user not found");
        }

        // Attach the user ID to the request object for use in the next middleware or route handler
        req.userId = userId;

        // Call the next middleware
        next();

    } catch (error) {
        // If there is an error (e.g., invalid token), return an unauthorized error
        throw ErrorResponse.unauthorized("Unauthorized access, token auth error");
        
    } finally{
        console.log("token auth completed...")
    }
}
