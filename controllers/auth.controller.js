const AuthService = require('../services/auth.service');

class AuthController {
  authService = new AuthService();

  doLogin = async (req, res) => {
    const { nickname, password } = req.body;

    try {
      const { token, status, data } = await this.authService.doLogin(nickname, password);

      if (token) res.cookie('Authorization', `Bearer ${token}`);

      res.status(status).json(data);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
}
module.exports = AuthController;
