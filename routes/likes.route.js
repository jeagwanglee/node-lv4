const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

// 좋아요 등록, 삭제
router.put('/:postId', authMiddleware, likesController.postLike);
// async (req, res) => {
//   const { userId: UserId } = res.locals.user;
//   const { postId: PostId } = req.params;

//   try {
//     const post = await Posts.findOne({ where: { PostId } });
//     const like = await Likes.findOne({ where: { UserId, PostId } });

//     if (!post) {
//       return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
//     }

//     if (like) {
//       // 좋아요 데이터를 삭제
//       await Likes.destroy({ where: { UserId, PostId } });
//       return res.status(200).json({ message: '게시글의 좋아요를 취소하였습니다.' });
//     }
//     // 좋아요 데이터를 생성
//     await Likes.create({ UserId, PostId });
//     res.status(200).json({ message: '게시글의 좋아요를 등록하였습니다.' });
//   } catch (error) {
//     res.status(400).json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
//   }
// }

/**- 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 좋아요 게시글 조회 가능
    - 로그인 토큰에 해당하는 사용자가 좋아요 한 글에 한해서, 조회할 수 있게 하기
    - 제목, 작성자명(nickname), 작성 날짜, 좋아요 갯수를 조회하기
    - 제일 좋아요가 많은 게시글을 맨 위에 정렬하기 (내림차순) */

// 좋아요 게시글 조회
router.get('/', authMiddleware, likesController.getLikedPosts);
module.exports = router;
