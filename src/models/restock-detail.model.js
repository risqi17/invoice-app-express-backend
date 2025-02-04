const pool = require('../configs/db.config');

class RestockDetail {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS restock_details (
        id INT PRIMARY KEY AUTO_INCREMENT,
        restock_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (restock_id) REFERENCES restocks(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `;
    await pool.query(query);
  }
}

module.exports = RestockDetail;