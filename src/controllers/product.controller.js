const ProductService = require('../services/product.service');
const ResponseUtil = require('../utils/response.util');

class ProductController {
  static async create(req, res, next) {
    try {
      const productId = await ProductService.create(req.body);
      const product = await ProductService.findById(productId);
      res.status(201).json(ResponseUtil.success(product, 'Product created successfully'));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const products = await ProductService.findAll();
      res.json(ResponseUtil.success(products));
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const product = await ProductService.findById(req.params.id);
      if (!product) {
        return res.status(404).json(ResponseUtil.fail('Product not found'));
      }
      res.json(ResponseUtil.success(product));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const affectedRows = await ProductService.update(req.params.id, req.body);
      if (!affectedRows) {
        return res.status(404).json(ResponseUtil.fail('Product not found'));
      }
      const product = await ProductService.findById(req.params.id);
      res.json(ResponseUtil.success(product, 'Product updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const affectedRows = await ProductService.delete(req.params.id);
      if (!affectedRows) {
        return res.status(404).json(ResponseUtil.fail('Product not found'));
      }
      res.json(ResponseUtil.success(null, 'Product deleted successfully'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;