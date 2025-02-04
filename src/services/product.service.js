const pool = require('../configs/db.config');

class ProductService {
  static async create(productData) {
    const { name, description, price, stock } = productData;
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, productData) {
    const { name, description, price } = productData;
    const [result] = await pool.query(
      'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?',
      [name, description, price, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = ProductService;