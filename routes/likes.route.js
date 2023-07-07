const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { Posts, Likes } = require('../models');

// 좋아요 등록, 삭제
router.put('/:postId', authMiddleware, async (req, res) => {
  const { userId: UserId } = res.locals.user;
  const { postId: PostId } = req.params;

  try {
    const post = await Posts.findOne({ where: { PostId } });
    const like = await Likes.findOne({ where: { UserId, PostId } });

    if (!post) {
      return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }

    if (like) {
      // 좋아요 데이터를 삭제
      await Likes.destroy({ where: { UserId, PostId } });
      return res.status(200).json({ message: '게시글의 좋아요를 취소하였습니다.' });
    }
    // 좋아요 데이터를 생성
    await Likes.create({ UserId, PostId });
    res.status(200).json({ message: '게시글의 좋아요를 등록하였습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
  }
});

module.exports = router;
