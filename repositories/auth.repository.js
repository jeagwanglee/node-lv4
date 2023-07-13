const { Users } = require('../models');

class AuthRepository {
  findOneByNickname = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } });
    return user;
  };
}
module.exports = AuthRepository;
