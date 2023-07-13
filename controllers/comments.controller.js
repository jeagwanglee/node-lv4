const CommentsService = require('../services/comments.service');

class CommentsController {
  commentsService = new CommentsService();

  createComment = async (req, res) => {
    const { userId, nickname } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;

    try {
      const { status, data } = await this.commentsService.createComment(userId, postId, comment, nickname);
      res.status(status).json(data);
    } catch (error) {
      res.status(400).json({ errorMessage: '댓글 작성에 실패하였습니다.' });
    }
  };

  getComments = async (req, res) => {
    const { postId } = req.params;

    try {
      const { status, data } = await this.commentsService.findComments(postId);
      res.status(status).json(data);
    } catch (error) {
      res.status(400).json({ errorMessage: '댓글 조회에 실패하였습니다.' });
    }
  };

  updateComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const { comment } = req.body;

    try {
      const { status, data } = await this.commentsService.updateComment(userId, postId, commentId, comment);
      res.status(status).json(data);
    } catch (error) {
      res.status(400).json({ errorMessage: '댓글 수정에 실패하였습니다.' });
    }
  };

  deleteComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;

    try {
      const { status, data } = await this.commentsService.deleteComment(userId, postId, commentId);
      res.status(status).json(data);
    } catch (error) {
      res.status(400).json({ errorMessage: '댓글 삭제에 실패하였습니다.' });
    }
  };
}

module.exports = CommentsController;
