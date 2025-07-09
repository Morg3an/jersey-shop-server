const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getAllOrders,
  getOrderById
} = require('../controllers/orderController');

// POST a new order
router.post('/', placeOrder);

// GET all orders
router.get('/', getAllOrders);

// GET a single order by ID
router.get('/:id', getOrderById);

module.exports = router;