const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');

// Public
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected
router.post('/', protect, adminOnly, createProduct);

module.exports = router;