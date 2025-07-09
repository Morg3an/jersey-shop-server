const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById
} = require('../controllers/productController');

// POST a new product
router.post('/', createProduct);

// GET all products
router.get('/', getAllProducts);

// GET a product by ID
router.get('/:id', getProductById);

module.exports = router;