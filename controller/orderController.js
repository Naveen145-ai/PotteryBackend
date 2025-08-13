const Order = require('../models/orderModel');

// Create new order
exports.createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }

        const totalAmount = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

        const order = new Order({
            userId,
            items,
            totalAmount,
            status: 'placed'
        });

        await order.save();
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get orders for a specific user
exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate('items.potId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an item from an order
exports.deleteOrderItem = async (req, res) => {
    try {
        const { orderId, itemId } = req.params;
        
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.items = order.items.filter(item => item._id.toString() !== itemId);
        order.totalAmount = order.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

        await order.save();
        res.json({ message: "Item removed", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
