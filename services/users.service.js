const UsersRepository = require('../repositories/users.repository');
const nicknamePattern = /^[a-zA-Z0-9]+$/;

class UsersService {
  usersRepository = new UsersRepository();

  findOrCreateUser = async (nickname, password, confirm) => {
    if (nickname.length < 3 || !nicknamePattern.test(nickname)) {
      throw { errorCode: 412, message: '닉네임의 형식이 일치하지 않습니다.' };
    }

    if (password.length < 4) {
      throw { errorCode: 412, message: '패스워드 형식이 일치하지 않습니다.' };
    }

    if (password.includes(nickname)) {
      throw { errorCode: 412, message: '패스워드에 닉네임이 포함되어 있습니다.' };
    }

    if (password !== confirm) {
      throw { errorCode: 412, message: '패스워드가 일치하지 않습니다.' };
    }

    const existNickname = await this.usersRepository.findOrCreateUser(nickname, password);
    if (!existNickname) throw { errorCode: 412, message: '중복된 닉네임입니다.' };
  };
}
module.exports = UsersService;
