// backend/testOrderCreation.js
// Run this to test if order creation works
const mongoose = require('mongoose');
const Order = require('./models/Order');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

console.log('🧪 Testing Order Creation...\n');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Get a test user (admin or any user)
    let testUser = await User.findOne();
    if (!testUser) {
        console.log('❌ No users found! Please create a user first.');
        process.exit(1);
    }
    console.log(`👤 Using test user: ${testUser.name} (${testUser.email})`);
    
    // Get a test product
    let testProduct = await Product.findOne();
    if (!testProduct) {
        console.log('❌ No products found! Please add products first.');
        process.exit(1);
    }
    console.log(`📦 Using test product: ${testProduct.name} (₹${testProduct.price})`);
    
    // Create test order
    const orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
    
    const orderData = {
        user: testUser._id,
        orderNumber: orderNumber,
        products: [{
            product: testProduct._id,
            name: testProduct.name,
            price: testProduct.price,
            quantity: 2,
            image: testProduct.images[0] || ''
        }],
        totalAmount: testProduct.price * 2,
        shippingAddress: {
            name: testUser.name,
            phone: testUser.phone,
            address: testUser.address?.street || 'Test Street',
            city: testUser.address?.city || 'Test City',
            state: testUser.address?.state || 'Test State',
            pincode: testUser.address?.pincode || '123456'
        },
        paymentMethod: 'COD',
        paymentStatus: 'Pending',
        orderStatus: 'Pending'
    };
    
    console.log('\n📝 Creating order with data:');
    console.log(JSON.stringify(orderData, null, 2));
    
    const order = new Order(orderData);
    await order.save();
    
    console.log('\n✅ Order created successfully!');
    console.log('═══════════════════════════════════════');
    console.log(`Order Number: ${order.orderNumber}`);
    console.log(`Order ID: ${order._id}`);
    console.log(`Total Amount: ₹${order.totalAmount}`);
    console.log(`Status: ${order.orderStatus}`);
    console.log('═══════════════════════════════════════');
    
    // Verify order can be retrieved
    const savedOrder = await Order.findById(order._id)
        .populate('user', 'name email')
        .populate('products.product', 'name');
    
    console.log('\n✅ Order verified in database:');
    console.log(`   Customer: ${savedOrder.user.name}`);
    console.log(`   Products: ${savedOrder.products.length} items`);
    
    // Count total orders
    const totalOrders = await Order.countDocuments();
    console.log(`\n📊 Total orders in database: ${totalOrders}`);
    
    console.log('\n🌐 Now check admin panel at: http://localhost:5000/admin.html');
    console.log('   Go to Orders section - you should see this order!');
    
    process.exit(0);
})
.catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});