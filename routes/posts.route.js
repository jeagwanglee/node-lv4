const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.post('/', authMiddleware, postsController.createPost);
router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getOnePost);
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete('/:postId', authMiddleware, postsController.deletePost);

module.exports = router;
