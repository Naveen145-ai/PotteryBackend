const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// Place order
router.post('/place', orderController.createOrder);

// Get orders for a user
router.get('/:userId', orderController.getUserOrders);

// Delete specific item from an order
router.delete('/:orderId/item/:itemId', orderController.deleteOrderItem);

module.exports = router;
