const pool = require('../configs/db.config');

class Transaction {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS transactions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        client_id INT NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id),
        FOREIGN KEY (client_id) REFERENCES clients(id)
      )
    `;
    await pool.query(query);
  }
}

module.exports = Transaction;