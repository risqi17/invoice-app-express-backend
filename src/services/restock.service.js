const pool = require('../configs/db.config');

class RestockService {
  static async createRestock(totalPrice, totalStock, createdBy) {
    const [result] = await pool.query(
      'INSERT INTO restocks (total_price, total_stock, created_by) VALUES (?, ?, ?)',
      [totalPrice, totalStock, createdBy]
    );
    return result.insertId;
  }

  static async updateRestock(id, restockData) {
    const { totalPrice, totalStock } = restockData;
    const [result] = await pool.query(
      'UPDATE restocks SET total_price = ?, total_stock = ? WHERE id = ?',
      [totalPrice, totalStock, id]
    );
    return result.affectedRows;
  }

  static async createRestockDetail(restockId, restockData) {
    let totalPrice = 0;
    let totalStock = 0;
    for (let item in restockData) {
      const { product_id, quantity, price } = restockData[item];
      const [result] = await pool.query(
        'INSERT INTO restock_details (restock_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [restockId, product_id, quantity, price]
      );

      totalPrice += price * quantity;
      totalStock += quantity;
    }
    
    const [result] = await pool.query(
        'UPDATE restocks SET total_price = ?, total_stock = ? WHERE id = ?',
        [totalPrice, totalStock, restockId]
    );

    const [rows] = await pool.query('SELECT * FROM restocks WHERE id = ?', [restockId]);
    rows[0].restockDetails = await pool.query('SELECT * FROM restock_details WHERE restock_id = ?', [restockId]);
    
    return result.rows[0];
  }

  static async updateRestockDetail(id, restockData) {
    const { productId, quantity, price } = restockData;
    
    const [result] = await pool.query(
      'UPDATE restock_details SET product_id = ?, quantity = ?, price = ? WHERE id = ?',
      [productId, quantity, price, id]
    );
    return result.affectedRows;
  }

  static async findAllRestock() {
    const [rows] = await pool.query('SELECT * FROM restocks');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM restocks WHERE id = ?', [id]);
    return rows[0];
  }

}

module.exports = RestockService;