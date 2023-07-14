const PostsRepository = require('../repositories/posts.repository');

class PostsService {
  postsRepository = new PostsRepository();

  createPost = async (UserId, nickname, title, content) => {
    try {
      if (!title || !content) throw { errorCode: 412, message: '데이터 형식이 올바르지 않습니다.' };

      await this.postsRepository.createPost(UserId, nickname, title, content);
    } catch (error) {
      throw { errorCode: 400, message: '게시물 작성에 실패했습니다.' };
    }
  };

  findAllPosts = async () => {
    try {
      const posts = await this.postsRepository.findAllPosts();
      if (!posts) throw { errorCode: 404, message: '게시물이 존재하지 않습니다.' };

      return posts;
    } catch (error) {
      throw { errorCode: 400, message: '게시글 목록 조회에 실패했습니다.' };
    }
  };

  getOnePost = async (postId) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);
      if (!post) throw { errorCode: 404, message: '게시물이 존재하지 않습니다.' };

      return post;
    } catch (error) {
      throw { errorCode: 400, message: '게시글 조회에 실패했습니다.' };
    }
  };

  updatePost = async (title, content, postId) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);

      if (!title || !content) throw { errorCode: 412, message: '데이터 형식이 올바르지 않습니다.' };
      if (!post) throw { errorCode: 404, message: '게시물이 존재하지 않습니다.' };

      await this.postsRepository.updatePost(title, content, postId);
    } catch (error) {
      throw { errorCode: 400, message: '게시글 수정에 실패했습니다.' };
    }
  };

  deletePost = async (postId) => {
    try {
      const post = await this.postsRepository.getOnePost(postId);
      if (!post) throw { errorCode: 404, message: '게시물이 존재하지 않습니다.' };

      await this.postsRepository.deletePost(postId);
    } catch (error) {
      throw { errorCode: 400, message: '게시글 삭제에 실패했습니다.' };
    }
  };
}

module.exports = PostsService;
