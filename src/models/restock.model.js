const pool = require('../configs/db.config');

class Restock {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS restocks (
        id INT PRIMARY KEY AUTO_INCREMENT,
        total_price DECIMAL(10, 2) NOT NULL,
        total_stock INT NOT NULL,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `;
    await pool.query(query);
  }
}

module.exports = Restock;