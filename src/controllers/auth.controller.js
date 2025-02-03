const AuthService = require('../services/auth.service');
const ResponseUtil = require('../utils/response.util');

class AuthController {
  static async register(req, res, next) {
    try {
      const userId = await AuthService.create(req.body);
      const user = await AuthService.findById(userId);
      res.status(201).json(ResponseUtil.success(user, 'Registered successfully'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;