const ProductService = require('../services/product.service');
const RestockService = require('../services/restock.service');
const ResponseUtil = require('../utils/response.util');

class RestockController {
  static async create(req, res, next) {
    try {
      const restockId = await RestockService.createRestock(0, 0, req.user.id);

      if (restockId) {
        const restockDetail = await RestockService.createRestockDetail(restockId, req.body);

        res.status(201).json(ResponseUtil.success({"restock" : restockDetail}, 'Restock created successfully'));
      }
      return res.status(404).json(ResponseUtil.fail('Restock not created'));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const products = await ProductService.findAll();
      res.json(ResponseUtil.success({"products" : products}));
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
      res.json(ResponseUtil.success({"products" : product}));
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
      res.json(ResponseUtil.success({"products" : product}, 'Product updated successfully'));
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

module.exports = RestockController;