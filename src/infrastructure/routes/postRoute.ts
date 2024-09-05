import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { postAdapter } from './injections/injections';
import { auth } from '../middleware/auth';
import upload from '../middleware/uploadImage';

const postRouter = express.Router();

postRouter.post("/add-post", auth, upload, (req: Request, res:Response, next:NextFunction) => {       
    postAdapter.addPost(req, res, next);
});

postRouter.patch("/:postId/like",auth,(req: Request, res:Response, next:NextFunction) => {       
    postAdapter.likePost(req, res);
})


postRouter.patch("/:postId/unlike",auth,(req: Request, res:Response, next:NextFunction) => {       
    postAdapter.unLikePost(req, res);
})

postRouter.post("/:postId/comment",auth,(req: Request, res:Response, next:NextFunction) => {       
    postAdapter.addComment(req, res);
})


postRouter.get("/:postId/comments",auth,(req: Request, res:Response, next:NextFunction) => {       
    postAdapter.getComments(req, res);
})

postRouter.delete("/:postId/comment/:commentId",auth,(req: Request, res:Response, next:NextFunction) => {       
    postAdapter.deleteComment(req, res);
})
postRouter.put("/:postId/comment/:commentId",auth,(req: Request, res:Response, next:NextFunction) => {       
    postAdapter.updateComment(req, res);
})



export default postRouter;