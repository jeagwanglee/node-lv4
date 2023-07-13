const PostsService = require('../services/posts.service');

class PostsController {
  postsService = new PostsService();

  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const { userId: UserId, nickname } = res.locals.user;

    try {
      if (!title || !content) {
        return res.status(412).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
      }
      await this.postsService.createPost(UserId, nickname, title, content);
      res.status(201).json({ message: '게시글 작성에 성공했습니다.' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: '게시글 작성에 실패했습니다.' });
    }
  };

  getAllPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAllPosts();
      res.status(200).json({ posts });
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  getOnePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const { post, status, data } = await this.postsService.getOnePost(postId);
      if (!post) return res.status(status).json(data);

      res.status(200).json({ post });
    } catch (error) {
      console.log('🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴');
      console.log('/컨트롤러');
      console.log(error);
      console.log('🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴');
      res.status(400).json(error.message);
    }
  };

  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    try {
      const { status, data } = await this.postsService.updatePost(title, content, postId);
      res.status(status).json(data);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  deletePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const { status, data } = await this.postsService.deletePost(postId);
      res.status(status).json(data);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
}

module.exports = PostsController;
