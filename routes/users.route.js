const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

// 회원가입 API
router.post('/signup', usersController.signup);

module.exports = router;
