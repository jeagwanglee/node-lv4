const PostsRepository = require('../repositories/posts.repository');

class PostsService {
  postsRepository = new PostsRepository();

  createPost = async (UserId, nickname, title, content) => {
    await this.postsRepository.createPost(UserId, nickname, title, content);
  };

  findAllPosts = async () => {
    const result = await this.postsRepository.findAllPosts();
    return result;
  };

  getOnePost = async (postId) => {
    const post = await this.postsRepository.getOnePost(postId);
    return post;
  };

  updatePost = async (title, content, postId) => {
    await this.postsRepository.updatePost(title, content, postId);
  };
  deletePost = async (postId) => {
    await this.postsRepository.deletePost(postId);
  };
}

module.exports = PostsService;
