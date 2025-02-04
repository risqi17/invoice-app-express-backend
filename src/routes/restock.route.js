const express = require('express');
const router = express.Router();
const RestockController = require('../controllers/restock.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.post('/', authenticateToken, RestockController.create);
router.get('/', authenticateToken, RestockController.getAll);
router.get('/:id', authenticateToken, RestockController.getById);
router.put('/:id', authenticateToken, RestockController.update);
router.delete('/:id', authenticateToken, RestockController.delete);

module.exports = router;