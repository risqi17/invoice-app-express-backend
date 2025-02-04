const pool = require('../configs/db.config');

class TransactionDetail {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS transaction_details (
        id INT PRIMARY KEY AUTO_INCREMENT,
        transaction_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (transaction_id) REFERENCES transactions(id)
      )
    `;
    await pool.query(query);
  }
}

module.exports = TransactionDetail;