const UsersService = require('../services/users.service');
const nicknamePattern = /^[a-zA-Z0-9]+$/;

class UsersController {
  usersService = new UsersService();

  signup = async (req, res, next) => {
    const { nickname, password, confirm } = req.body;

    try {
      const { status, data } = await this.usersService.findOrCreateUser(nickname, password, confirm);
      res.status(status).json(data);
    } catch (error) {
      res.status(400).json({ errorMessage: '회원가입에 실패했습니다.' });
      // 이곳의 에러 코드는 400? 500?
    }
  };
}

module.exports = UsersController;
