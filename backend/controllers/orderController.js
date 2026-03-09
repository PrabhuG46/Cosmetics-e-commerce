// backend/controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Create Order
exports.createOrder = async (req, res) => {
    try {
        console.log('📦 Creating new order...');
        console.log('Order data:', req.body);
        
        const {
            user,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentStatus
        } = req.body;

        // Generate unique order number
        const orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
        console.log('Generated order number:', orderNumber);

        // Create order
        const order = new Order({
            user,
            orderNumber,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentStatus: paymentStatus || 'Pending',
            orderStatus: 'Pending'
        });

        await order.save();
        console.log('✅ Order saved to database:', order._id);

        // Add order to user's orders array
        if (user) {
            await User.findByIdAndUpdate(user, {
                $push: { orders: order._id }
            });
            console.log('✅ Order added to user:', user);
        }

        // Update product stock
        for (const item of products) {
            if (item.product) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stock: -item.quantity }
                });
                console.log(`✅ Updated stock for product: ${item.product}`);
            }
        }

        console.log('✅ Order creation completed successfully');
        res.status(201).json({
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        console.error('❌ Order creation error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get User Orders
exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.query;
        console.log('📋 Fetching orders. User filter:', userId || 'ALL ORDERS');
        
        let query = {};
        if (userId) {
            query.user = userId;
        }

        const orders = await Order.find(query)
            .populate('user', 'name email phone')
            .populate('products.product', 'name price')
            .sort({ createdAt: -1 });

        console.log(`✅ Found ${orders.length} orders`);
        res.json(orders);
    } catch (error) {
        console.error('❌ Get orders error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Single Order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('products.product', 'name price images');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Order Status (Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, paymentStatus } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus, paymentStatus },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Cancel Order
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.orderStatus === 'Delivered') {
            return res.status(400).json({ message: 'Cannot cancel delivered order' });
        }

        order.orderStatus = 'Cancelled';
        await order.save();

        // Restore product stock
        for (const item of order.products) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity }
            });
        }

        res.json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};