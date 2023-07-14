const PostsService = require('../services/posts.service');

class PostsController {
  postsService = new PostsService();

  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const { userId: UserId, nickname } = res.locals.user;

    try {
      await this.postsService.createPost(UserId, nickname, title, content);
      res.status(201).json({ message: '게시글 작성에 성공했습니다.' });
    } catch (e) {
      if (e.errorCode) return res.status(e.errorCode).json(e.message);

      res.status(500).json({ message: '게시글 작성에 실패했습니다.' });
    }
  };

  getAllPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAllPosts();

      res.status(200).json({ posts });
    } catch (e) {
      if (e.errorCode) return res.status(e.errorCode).json(e.message);

      res.status(500).json({ message: '게시글 목록 조회에 실패했습니다.' });
    }
  };

  getOnePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const post = await this.postsService.getOnePost(postId);

      res.status(200).json({ post });
    } catch (error) {
      if (e.errorCode) return res.status(e.errorCode).json(e.message);

      res.status(500).json({ message: '게시글 조회에 실패했습니다.' });
    }
  };

  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    try {
      const { status, data } = await this.postsService.updatePost(title, content, postId);
      res.status(200).json({ message: '게시글을 수정하였습니다.' });
    } catch (e) {
      if (e.errorCode) return res.status(e.errorCode).json(e.message);

      res.status(500).json({ message: '게시글 수정에 실패했습니다.' });
    }
  };

  deletePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const { status, data } = await this.postsService.deletePost(postId);
      res.status(200).json({ message: '게시글을 삭제하였습니다.' });
    } catch (e) {
      if (e.errorCode) return res.status(e.errorCode).json(e.message);

      res.status(500).json({ message: '게시글 삭제에 실패했습니다.' });
    }
  };
}

module.exports = PostsController;
