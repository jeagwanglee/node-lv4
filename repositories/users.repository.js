const { Users } = require('../models');

class UsersRepository {
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
