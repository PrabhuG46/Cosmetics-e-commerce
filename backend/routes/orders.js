const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create Order (No auth required for now)
router.post('/', orderController.createOrder);

// Get All Orders
router.get('/', orderController.getUserOrders);

// Get Single Order
router.get('/:id', orderController.getOrder);

module.exports = router;