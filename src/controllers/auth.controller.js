const AuthService = require('../services/auth.service');
const ResponseUtil = require('../utils/response.util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json(ResponseUtil.success(null, 'Email and password required'));

      }
  
      const users = await AuthService.findByEmail(email);

      if (users.length === 0) {
        res.status(401).json(ResponseUtil.fail(null, 'Invalid credentials'));

      }
      
      const validPassword = await bcrypt.compare(password, users.password);
      if (!validPassword) {
        res.status(401).json(ResponseUtil.fail(null, 'Invalid credentials'));
      }
      
      const token = jwt.sign(
        { id: users.id, email: users.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      const data = {
        "token": token
      }

      res.status(200).json(ResponseUtil.success(data, 'Login successfully'));

    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;