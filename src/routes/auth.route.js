const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.post('/', AuthController.register);

module.exports = router;