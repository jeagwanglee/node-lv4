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
      return res.status(412).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }

    await Comments.create({ UserId: userId, PostId: postId, comment, nickname });
    res.status(201).json({ message: '댓글을 작성하였습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '댓글 작성에 실패하였습니다.' });
  }
});

module.exports = router;
