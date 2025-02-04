const pool = require('../configs/db.config');

class Client {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS clients (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        whatsapp_number VARCHAR(100) NOT NULL,
        vehicle_brand VARCHAR(255) NOT NULL,
        vehicle_model VARCHAR(255) NOT NULL,
        vehicle_number varchar(100) NOT NULL,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `;
    await pool.query(query);
  }
}

module.exports = Client;