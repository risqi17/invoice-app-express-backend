const pool = require('../configs/db.config');
const bcrypt = require('bcryptjs');

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

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }


  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async checkDuplicate(username, email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);

    if (rows.length > 0) {
      return true;
    } 
    return false;
  }
}

module.exports = AuthService;