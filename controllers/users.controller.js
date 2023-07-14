const UsersService = require('../services/users.service');
const nicknamePattern = /^[a-zA-Z0-9]+$/;

class UsersController {
  usersService = new UsersService();

  signup = async (req, res, next) => {
    const { nickname, password, confirm } = req.body;

    try {
      await this.usersService.findOrCreateUser(nickname, password, confirm);
      res.status(201).json({ message: '회원가입에 성공하였습니다.' });
    } catch (e) {
      if (e.errorCode) return res.status(e.errorCode).json(e.message);

      res.status(500).json({ message: '회원가입에 실패했습니다.' });
    }
  };
}

module.exports = UsersController;
