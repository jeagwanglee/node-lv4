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

/**- 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 좋아요 게시글 조회 가능
    - 로그인 토큰에 해당하는 사용자가 좋아요 한 글에 한해서, 조회할 수 있게 하기
    - 제목, 작성자명(nickname), 작성 날짜, 좋아요 갯수를 조회하기
    - 제일 좋아요가 많은 게시글을 맨 위에 정렬하기 (내림차순) */

// 좋아요 게시글 조회
router.get('/', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;

  try {
    // userId가 좋아요를 누른 게시물들의 목록을 추출 : likedPostsList
    const likedPostsList = await Likes.findAll({ attributes: ['PostId'], where: { UserId: userId } });

    const posts = likedPostsList.map(async (likedPost) => {
      const PostId = likedPost.PostId;
      const post = await Posts.findOne({
        attributes: ['postId', 'UserId', 'nickname', 'title', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'DESC']],
        where: { postId: PostId },
      });
      const likes = await Likes.findAll({ where: { PostId } });
      post.dataValues.likes = likes.length;
      return post;
    });
    const resolvedPosts = await Promise.all(posts);
    // 게시글을 좋아요 개수가 많은 순으로 정렬
    resolvedPosts.sort((a, b) => {
      return b.dataValues.likes - a.dataValues.likes;
    });

    res.status(200).json({ posts: resolvedPosts });
  } catch (error) {
    res.status(400).json({ errorMessage: '좋아요 게시글 조회에 실패했습니다.' });
  }
});
module.exports = router;
