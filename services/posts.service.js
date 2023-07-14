const PostsRepository = require('../repositories/posts.repository');

class PostsService {
  postsRepository = new PostsRepository();

  createPost = async (UserId, nickname, title, content) => {
    await this.postsRepository.createPost(UserId, nickname, title, content);
  };

  findAllPosts = async () => {
    try {
      const posts = await this.postsRepository.findAllPosts();
      return posts;
    } catch (error) {
      throw new Error('게시글 조회에 실패했습니다.');
    }
  };

  getOnePost = async (postId) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);
      if (!post) {
        return { status: 404, data: { errorMessage: '게시글 조회에 실패하였습니다.' } };
      }
      return { post };
    } catch (error) {
      throw new Error('게시글 조회에 실패했습니다.');
    }
  };

  updatePost = async (title, content, postId) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);

      if (!title || !content) {
        return { status: 412, data: { errorMessage: '데이터 형식이 올바르지 않습니다.' } };
      }

      if (!post) {
        return { status: 404, data: { errorMessage: '게시글 조회에 실패하였습니다.' } };
      }
      await this.postsRepository.updatePost(title, content, postId);
      return { status: 200, data: { errorMessage: '게시글을 수정하였습니다.' } };
    } catch (error) {
      throw new Error('게시글 수정에 실패했습니다.');
    }
  };

  deletePost = async (postId) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);

      if (!post) {
        return { status: 404, data: { errorMessage: '게시글 조회에 실패하였습니다.' } };
      }
      await this.postsRepository.deletePost(postId);
      return { status: 200, data: { errorMessage: '게시글을 삭제하였습니다.' } };
    } catch (error) {
      throw new Error('게시글 삭제에 실패했습니다.');
    }
  };
}

module.exports = PostsService;
