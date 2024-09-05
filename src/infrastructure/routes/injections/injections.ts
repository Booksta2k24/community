import { PostAdapter } from '../../../controller/postAdapter';
import { PostUsecase } from '../../../usecase/usecase/usecase/postUsecase';
import CommentModel from '../../database/models/comments';
import PostModel from '../../database/models/post';
import PostLikesModel from '../../database/models/postLikes';
import { CommentRepository } from '../../database/repository/commentRepository';
import { PostLikeRepository } from '../../database/repository/postLikeRepository';
import { PostRepository } from '../../database/repository/postRepository';
import { CloudinaryService } from '../../services/cloudinary';

const postRepository = new PostRepository(PostModel);
const postLikeRepository = new PostLikeRepository(PostLikesModel);
const commentRepository = new CommentRepository(CommentModel)

const cloudinary = new CloudinaryService();

const postUsecase = new PostUsecase({
    postRepository,
    cloudinary,
    postLikeRepository,
    commentRepository
});

const postAdapter = new PostAdapter(postUsecase);

export { postAdapter, postRepository };

