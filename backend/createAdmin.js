// backend/createAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Delete existing admin if any
    await User.deleteOne({ email: 'admin@beautyparlour.com' });
    console.log('🗑️ Deleted old admin user if existed');
    
    // Create admin user (password will be hashed by the User model automatically)
    const admin = new User({
        name: 'Admin',
        email: 'admin@beautyparlour.com',
        phone: '1234567890',
        password: 'admin123', // Plain text - will be hashed by pre-save hook
        role: 'admin',
        address: {
            street: 'Admin Street',
            city: 'Admin City',
            state: 'Admin State',
            pincode: '000000'
        }
    });
    
    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@beautyparlour.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️ PLEASE CHANGE THIS PASSWORD AFTER FIRST LOGIN!');
    
    process.exit(0);
})
.catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});