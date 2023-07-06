const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.route.js');
const usersRouter = require('./users.route.js');
const authRouter = require('./auth.js');
const commentRouter = require('./comments.route.js');

router.use('/posts', postsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/comments', commentRouter);

module.exports = router;
