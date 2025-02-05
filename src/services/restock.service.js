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

    // const [rows] = await pool.query('SELECT * FROM restocks WHERE id = ?', [restockId]);
    // const [detail] = await pool.query('DELETE FROM restock_details WHERE restock_id = ?', [restockId]);
    
    const query = `
      SELECT 
        r.*, 
        rd.id AS detail_id,
        rd.product_id,
        rd.quantity,
        rd.price,
        rd.created_at AS detail_created_at,
        rd.updated_at AS detail_updated_at
      FROM restocks r
      LEFT JOIN restock_details rd ON r.id = rd.restock_id
      WHERE r.id = ?
    `;

    const [results] = await pool.query(query, [restockId]);

    // Group details by restock_id
    const restocksMap = new Map();

    results.forEach((row) => {
      const restockId = row.id;
      if (!restocksMap.has(restockId)) {
        restocksMap.set(restockId, {
          id: restockId,
          total_price: row.total_price,
          total_stock: row.total_stock,
          created_by: row.created_by,
          created_at: row.created_at,
          updated_at: row.updated_at,
          restock_details: [],
        });
      }

      const restock = restocksMap.get(restockId);
      if (row.detail_id) {
        restock.restock_details.push({
          id: row.detail_id,
          restock_id: restockId,
          product_id: row.product_id,
          quantity: row.quantity,
          price: row.price,
          created_at: row.detail_created_at,
          updated_at: row.detail_updated_at,
        });
      }
    });

    const restocks = Array.from(restocksMap.values());

    return restocks;
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