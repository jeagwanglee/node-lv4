const UsersRepository = require('../repositories/users.repository');
const nicknamePattern = /^[a-zA-Z0-9]+$/;

class UsersService {
  usersRepository = new UsersRepository();

  findOrCreateUser = async (nickname, password, confirm) => {
    try {
      if (nickname.length < 3 || !nicknamePattern.test(nickname)) {
        return { status: 412, data: { errorMessage: '닉네임의 형식이 일치하지 않습니다.' } };
      }

      if (password.length < 4) {
        return { status: 412, data: { errorMessage: '패스워드 형식이 일치하지 않습니다.' } };
      }

      if (password.includes(nickname)) {
        return { status: 412, data: { errorMessage: '패스워드에 닉네임이 포함되어 있습니다.' } };
      }

      if (password !== confirm) {
        return { status: 412, data: { errorMessage: '패스워드가 일치하지 않습니다.' } };
      }

      const existNickname = await this.usersRepository.findOrCreateUser(nickname, password);

      if (!existNickname) {
        return { status: 412, data: { errorMessage: '중복된 닉네임입니다.' } };
      }

      return { status: 201, data: { message: '회원가입에 성공하였습니다.' } };
    } catch (error) {
      return { status: 400, data: { errorMessage: '회원가입에 실패했습니다.' } };
    }
  };
}
module.exports = UsersService;
