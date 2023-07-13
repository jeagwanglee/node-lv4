const AuthRepository = require('../repositories/auth.repository');
const jwt = require('jsonwebtoken');

class AuthService {
  authRepository = new AuthRepository();

  doLogin = async (nickname, password) => {
    try {
      const user = await this.authRepository.findOneByNickname(nickname);

      if (!user || password !== user.password) {
        return { status: 412, data: { errorMessage: '닉네임 또는 패스워드를 확인해주세요.' } };
      }
      const token = jwt.sign({ userId: user.userId }, process.env.TOKEN_KEY);

      return { token, status: 200, data: { message: '로그인 성공' } };
    } catch (error) {
      throw new Error('로그인에 실패했습니다.');
    }
  };
}
module.exports = AuthService;
