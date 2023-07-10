const express = require('express');
const router = express.Router();
const { Posts, Comments } = require('../models');
const authMiddleware = require('../middlewares/auth-middleware.js');

router.post('/:postId', authMiddleware, async (req, res) => {
  const { userId, nickname } = res.locals.user;
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    const post = await Posts.findOne({ where: { postId } });
    if (!post) {
      return res.status(404).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }

    if (!comment) {
      return res.status(412).json({ errorMessage: '댓글 내용을 입력해주세요.' });
    }

    await Comments.create({ UserId: userId, PostId: postId, comment, nickname });
    res.status(201).json({ message: '댓글을 작성하였습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '댓글 작성에 실패하였습니다.' });
  }
});

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Posts.findOne({ where: { postId } });

    if (!post) {
      return res.status(404).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }

    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(400).json({ errorMessage: '댓글 조회에 실패하였습니다.' });
  }
});

router.put('/:postId/:commentId', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId, commentId } = req.params;
  const { comment } = req.body;

  try {
    const post = await Posts.findOne({ where: { postId } });
    const targetComment = await Comments.findOne({ where: { commentId } });

    if (!comment) {
      return res.status(412).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }

    if (!post) {
      return res.status(404).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }

    if (!targetComment) {
      return res.status(404).json({ errorMessage: '댓글 조회에 실패하였습니다.' });
    }

    if (userId !== targetComment.UserId) {
      return res.status(403).json({ errorMessage: '댓글 수정 권한이 없습니다.' });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: '댓글 수정에 실패하였습니다.' });
  }

  try {
    await Comments.update({ comment }, { where: { commentId } });
    res.status(200).json({ message: '댓글을 수정하였습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '댓글 수정이 정상적으로 처리되지 않았습니다.' });
  }
});

router.delete('/:postId/:commentId', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId, commentId } = req.params;

  try {
    const post = await Posts.findOne({ where: { postId } });
    const targetComment = await Comments.findOne({ where: { commentId } });

    if (!post) {
      return res.status(404).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }

    if (!targetComment) {
      return res.status(404).json({ errorMessage: '댓글 조회에 실패하였습니다.' });
    }

    if (userId !== targetComment.UserId) {
      return res.status(403).json({ errorMessage: '댓글 삭제 권한이 없습니다.' });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: '댓글 삭제에 실패하였습니다.' });
  }

  try {
    await Comments.destroy({ where: { commentId } });
    res.status(200).json({ message: '댓글을 삭제하였습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '댓글 삭제가 정상적으로 처리되지 않았습니다.' });
  }
});

module.exports = router;
