const { Users } = require('../models');

class UsersRepository {
  findOneUser = async (nickname) => {
    const existUser = await Users.findOne({
      where: {
        nickname,
      },
    });
    return existUser;
  };

  createUser = async (nickname, password) => {
    await Users.create({ nickname, password });
  };

  findOrCreateUser = async (nickname, password) => {
    const [user, created] = await Users.findOrCreate({
      where: { nickname },
      defaults: {
        password,
      },
    });
    return created;
  };
}
module.exports = UsersRepository;
