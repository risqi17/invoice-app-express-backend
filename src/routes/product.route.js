const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.post('/', authenticateToken, ProductController.create);
router.get('/', authenticateToken, ProductController.getAll);
router.get('/:id', authenticateToken, ProductController.getById);
router.put('/:id', authenticateToken, ProductController.update);
router.delete('/:id', authenticateToken, ProductController.delete);



module.exports = router;