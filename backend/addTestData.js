// backend/addTestData.js
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');
require('dotenv').config();

console.log('🔄 Adding test data to database...\n');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    console.log('✅ Connected to MongoDB');
    console.log('\n📦 Creating test products...');
    const products = await Product.insertMany([
        {
            name: 'Organic Hair Oil',
            description: 'Natural coconut-based hair oil enriched with herbs for healthy, shiny hair',
            price: 299,
            oldPrice: 399,
            category: 'Hair Care',
            stock: 50,
            images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300'],
            featured: true,
            discount: 25
        },
        {
            name: 'Anti-Aging Face Cream',
            description: 'Premium moisturizing face cream with anti-aging properties',
            price: 799,
            oldPrice: 999,
            category: 'Skin Care',
            stock: 30,
            images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300'],
            featured: true,
            discount: 20
        },
        {
            name: 'Gentle Shampoo',
            description: 'Sulfate-free shampoo suitable for all hair types',
            price: 249,
            oldPrice: 299,
            category: 'Hair Care',
            stock: 100,
            images: ['https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300'],
            featured: false,
            discount: 17
        },
        {
            name: 'Vitamin C Serum',
            description: 'Brightening serum with pure vitamin C for radiant skin',
            price: 599,
            oldPrice: 799,
            category: 'Skin Care',
            stock: 25,
            images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300'],
            featured: true,
            discount: 25
        },
        {
            name: 'Lip Balm',
            description: 'Moisturizing lip balm with SPF protection',
            price: 99,
            category: 'Lip Care',
            stock: 150,
            images: ['https://images.unsplash.com/photo-1590439471364-192aa70c2a1a?w=300'],
            featured: false
        }
    ]);
    
    console.log(`✅ Created ${products.length} test products:`);
    products.forEach(p => console.log(`   - ${p.name} (₹${p.price})`));
    
    // Get admin or any user
    let testUser = await User.findOne({ role: 'admin' });
    if (!testUser) {
        testUser = await User.findOne();
    }
    
    if (testUser) {
        // Create test orders
        console.log('\n📋 Creating test orders...');
        const orders = await Order.insertMany([
            {
                user: testUser._id,
                orderNumber: 'ORD' + Date.now() + '001',
                products: [
                    {
                        product: products[0]._id,
                        name: products[0].name,
                        price: products[0].price,
                        quantity: 2,
                        image: products[0].images[0]
                    },
                    {
                        product: products[1]._id,
                        name: products[1].name,
                        price: products[1].price,
                        quantity: 1,
                        image: products[1].images[0]
                    }
                ],
                totalAmount: (products[0].price * 2) + products[1].price,
                shippingAddress: {
                    name: 'John Doe',
                    phone: '9876543210',
                    address: '123 Beauty Street',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400001'
                },
                paymentMethod: 'COD',
                paymentStatus: 'Pending',
                orderStatus: 'Pending'
            },
            {
                user: testUser._id,
                orderNumber: 'ORD' + Date.now() + '002',
                products: [
                    {
                        product: products[3]._id,
                        name: products[3].name,
                        price: products[3].price,
                        quantity: 1,
                        image: products[3].images[0]
                    }
                ],
                totalAmount: products[3].price,
                shippingAddress: {
                    name: 'Jane Smith',
                    phone: '8765432109',
                    address: '456 Spa Avenue',
                    city: 'Delhi',
                    state: 'Delhi',
                    pincode: '110001'
                },
                paymentMethod: 'Online',
                paymentStatus: 'Paid',
                orderStatus: 'Delivered'
            }
        ]);
        
        console.log(`✅ Created ${orders.length} test orders`);
    } else {
        console.log('⚠️  No users found. Skipping order creation.');
    }
    
    // Summary
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    
    console.log('\n═══════════════════════════════════════');
    console.log('📊 DATABASE SUMMARY');
    console.log('═══════════════════════════════════════');
    console.log(`Total Products: ${totalProducts}`);
    console.log(`Total Orders:   ${totalOrders}`);
    console.log(`Total Users:    ${totalUsers}`);
    console.log('═══════════════════════════════════════');
    
    console.log('\n✅ Test data added successfully!');
    console.log('\n🌐 Now test your application:');
    console.log('   User Website: http://localhost:5000/index.html');
    console.log('   Admin Panel:  http://localhost:5000/admin.html');
    console.log('\n💡 Products should now appear on both interfaces!');
    
    process.exit(0);
})
.catch(err => {
    console.error('❌ Error:', err.message);
    console.error(err);
    process.exit(1);
});