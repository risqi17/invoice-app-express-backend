const pool = require('../configs/db.config');

class AuthService {
  static async create(userData) {
    const { username, email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result.insertId;
  }
}

module.exports = AuthService;