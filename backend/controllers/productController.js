// backend/controllers/productController.js
const Product = require('../models/Product');

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const { category, featured, sort } = req.query;
        let query = {};

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by featured
        if (featured) {
            query.featured = featured === 'true';
        }

        let products = Product.find(query);

        // Sort products
        if (sort === 'price-low') {
            products = products.sort({ price: 1 });
        } else if (sort === 'price-high') {
            products = products.sort({ price: -1 });
        } else if (sort === 'newest') {
            products = products.sort({ createdAt: -1 });
        } else {
            products = products.sort({ createdAt: -1 });
        }

        const allProducts = await products;
        res.json(allProducts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Search Products
exports.searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ]
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Single Product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create Product (Admin only)
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Product (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Product (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};