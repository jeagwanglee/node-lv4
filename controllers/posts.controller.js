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

  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAllPosts();

      res.status(200).json({ posts });
    } catch (error) {
      return res.status(400).json({ errorMessage: '게시글 조회에 실패했습니다.' });
    }
  };

  getOnePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const post = await this.postsService.getOnePost(postId);
      if (!post) {
        return res.status(400).json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }
      res.status(200).json({ post });
    } catch (error) {
      res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }
  };

  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    try {
      const post = await this.postsService.getOnePost(postId);

      if (!title || !content) {
        return res.status(412).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
      }

      if (!post) {
        return res.status(404).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return res.status(400).json({ errorMessage: '게시글 수정에 실패했습니다.' });
    }

    try {
      await this.postsService.updatePost(title, content, postId);
      res.status(200).json({ message: '게시글을 수정하였습니다.' });
    } catch (error) {
      res.status(401).json({ errorMessage: '게시글이 정상적으로 수정되지 않았습니다.' });
    }
  };

  deletePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const post = await this.postsService.getOnePost(postId);

      // 게시글이 존재하지 않을 경우 404
      if (!post) {
        return res.status(404).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return res.status(400).json({ errorMessage: '게시글 삭제에 실패했습니다.' });
    }
    try {
      await this.postsService.deletePost(postId);
      res.status(200).json({ message: '게시글을 삭제하였습니다.' });
    } catch (error) {
      res.status(401).json({ errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.' });
    }
  };
}

module.exports = PostsController;
