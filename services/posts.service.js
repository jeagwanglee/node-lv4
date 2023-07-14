const PostsRepository = require('../repositories/posts.repository');

class PostsService {
  postsRepository = new PostsRepository();

  createPost = async (UserId, nickname, title, content) => {
    if (!title || !content) throw { errorCode: 412, message: '데이터 형식이 올바르지 않습니다.' };

    await this.postsRepository.createPost(UserId, nickname, title, content);
  };

  findAllPosts = async () => {
    const posts = await this.postsRepository.findAllPosts();
    if (!posts) throw { errorCode: 404, message: '게시물이 존재하지 않습니다.' };

    return posts;
  };

  getOnePost = async (postId) => {
    const post = await this.postsRepository.getOnePost(postId);
    if (!post) throw { errorCode: 404, message: '게시물이 존재하지 않습니다.' };

    return post;
  };

  updatePost = async (title, content, postId) => {
    const post = await this.postsRepository.getOnePost(postId);

    if (!title || !content) throw { errorCode: 412, message: '데이터 형식이 올바르지 않습니다.' };
    if (!post) throw { errorCode: 404, message: '게시물이 존재하지 않습니다.' };

    await this.postsRepository.updatePost(title, content, postId);
  };

  deletePost = async (postId) => {
    const post = await this.postsRepository.getOnePost(postId);
    if (!post) throw { errorCode: 404, message: '게시물이 존재하지 않습니다.' };

    await this.postsRepository.deletePost(postId);
  };
}

module.exports = PostsService;
