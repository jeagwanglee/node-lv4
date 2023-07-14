const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

// 좋아요 등록, 삭제
router.put('/:postId/like', authMiddleware, likesController.postLike);

// 좋아요 게시글 조회
router.get('/like', authMiddleware, likesController.getLikedPosts);

module.exports = router;
