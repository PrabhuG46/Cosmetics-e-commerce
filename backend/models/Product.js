const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    oldPrice: {
        type: Number
    },
    category: {
        type: String,
        required: true
    },
    sizes: [{
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL']
    }],
    images: [{
        type: String
    }],
    stock: {
        type: Number,
        default: 100
    },
    featured: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);