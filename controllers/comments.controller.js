const CommentsService = require('../services/comments.service');

class CommentsController {
  commentsService = new CommentsService();

  createComment = async (req, res) => {
    const { userId, nickname } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;

    try {
      await this.commentsService.createComment(userId, postId, comment, nickname);
      res.status(201).json({ message: '댓글을 작성하였습니다.' });
    } catch (e) {
      if (e.errorCode) return res.status(e.errorCode).json(e.message);
      res.status(500).json({ message: '댓글 작성에 실패하였습니다.' });
    }
  };

  getComments = async (req, res) => {
    const { postId } = req.params;

    try {
      const comments = await this.commentsService.findComments(postId);
      res.status(200).json({ comments });
    } catch (e) {
      if (e.errorCode) return res.status(e.errorCode).json(e.message);
      res.status(500).json({ message: '댓글 조회에 실패하였습니다.' });
    }
  };

  updateComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const { comment } = req.body;

    try {
      await this.commentsService.updateComment(userId, postId, commentId, comment);

      res.status(200).json({ message: '댓글을 수정하였습니다.' });
    } catch (e) {
      if (e.errorCode) return res.status(e.errorCode).json(e.message);
      res.status(500).json({ message: '댓글 수정에 실패하였습니다.' });
    }
  };

  deleteComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;

    try {
      const { status, data } = await this.commentsService.deleteComment(userId, postId, commentId);

      res.status(200).json({ message: '댓글을 삭제하였습니다.' });
    } catch (e) {
      if (e.errorCode) return res.status(e.errorCode).json(e.message);
      res.status(500).json({ message: '댓글 삭제에 실패하였습니다.' });
    }
  };
}

module.exports = CommentsController;
