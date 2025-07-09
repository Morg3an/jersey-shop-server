// backend/controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendWhatsAppMessage } = require('../services/whatsappService');
const { sendSMS } = require('../services/smsService');
const { sendEmail } = require('../services/emailService');

const placeOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);

    const fullOrder = await Order.findById(newOrder._id).populate('product');
    if (!fullOrder || !fullOrder.product) {
      return res.status(400).json({ success: false, error: 'Product not found or failed to populate' });
    }

    try {
      await sendWhatsAppMessage(fullOrder);
    } catch (err) {
      console.error('❌ Failed to send WhatsApp message:', err.message);
    }

    try {
      await sendSMS(fullOrder);
    } catch (err) {
      console.error('❌ Failed to send SMS:', err.message);
    }

    try {
      await sendEmail(fullOrder);
    } catch (err) {
      console.error('❌ Failed to send customer email:', err.message);
    }

    /* @TODO: Uncomment when shop email functionality is implemented
    try {
      await sendEmailToShop(fullOrder);
    } catch (err) {
      console.error('❌ Failed to send shop email:', err.message);
    } */

    res.status(201).json({ success: true, order: fullOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById
};