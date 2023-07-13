const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

// 로그인 API

router.post('/login', authController.doLogin);

module.exports = router;
