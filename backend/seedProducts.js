const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    oldPrice: Number,
    category: String,
    sizes: [String],
    images: [String],
    stock: Number,
    featured: Boolean,
    discount: Number,
    rating: Number,
    reviews: Number
});

const Product = mongoose.model('Product', productSchema);

const products = [
    {
        name: "Harmony Tree Graphic Streetwear T-Shirt",
        description: "Premium oversized tee with unique harmony tree design. 100% cotton, ultra-soft fabric. Perfect for casual streetwear. Limited edition design.",
        price: 599,
        oldPrice: 2500,
        category: "Graphic",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt1.jpg"],
        stock: 100,
        featured: true,
        discount: 76,
        rating: 4.8,
        reviews: 234
    },
    {
        name: "Spartan Warrior Battle Tee",
        description: "Bold warrior design for champions. Premium quality fabric with vibrant colors. Stand out in the crowd with this powerful design.",
        price: 599,
        oldPrice: 2500,
        category: "Graphic",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt2.jpg"],
        stock: 100,
        featured: true,
        discount: 76,
        rating: 4.9,
        reviews: 189
    },
    {
        name: "Racing Car Edition Speedster",
        description: "High-octane car design for speed lovers. Perfect for automotive enthusiasts. Premium print quality guaranteed.",
        price: 599,
        oldPrice: 2500,
        category: "Automotive",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt3.jpg"],
        stock: 100,
        featured: true,
        discount: 76,
        rating: 4.7,
        reviews: 156
    },
    {
        name: "Faith Over Fear Motivational",
        description: "Inspirational message tee. Spread positivity wherever you go. Bold typography on premium fabric.",
        price: 999,
        oldPrice: 2500,
        category: "Typography",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt4.jpg"],
        stock: 100,
        featured: true,
        discount: 60,
        rating: 4.9,
        reviews: 267
    },
    {
        name: "Mustang Black Edition Pro",
        description: "Iconic Mustang design on premium black. Car enthusiasts dream tee. Limited stock available!",
        price: 999,
        oldPrice: 2500,
        category: "Automotive",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt5.jpg"],
        stock: 100,
        featured: true,
        discount: 60,
        rating: 5.0,
        reviews: 312
    },
    {
        name: "Dragon Fire Japanese Art",
        description: "Traditional Japanese dragon with modern twist. Detailed artwork on premium cotton. Exclusive design.",
        price: 599,
        oldPrice: 2500,
        category: "Asian",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt6.jpg"],
        stock: 100,
        featured: true,
        discount: 76,
        rating: 4.8,
        reviews: 198
    },
    {
        name: "Abstract Modern Art Fusion",
        description: "Contemporary abstract design. Perfect for art lovers. Unique pattern that stands out.",
        price: 799,
        oldPrice: 2500,
        category: "Abstract",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt7.jpg"],
        stock: 100,
        featured: false,
        discount: 68,
        rating: 4.6,
        reviews: 143
    },
    {
        name: "Urban Legend Street Style",
        description: "Bold urban design with street vibes. Express your individuality. Premium quality guaranteed.",
        price: 699,
        oldPrice: 2500,
        category: "Urban",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt8.jpg"],
        stock: 100,
        featured: false,
        discount: 72,
        rating: 4.7,
        reviews: 167
    },
    {
        name: "Neon Nights Cyberpunk",
        description: "Futuristic neon design. Inspired by cyberpunk culture. Glow in style with this unique tee.",
        price: 649,
        oldPrice: 2500,
        category: "Neon",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt9.jpg"],
        stock: 100,
        featured: false,
        discount: 74,
        rating: 4.8,
        reviews: 178
    },
    {
        name: "Skull & Roses Gothic Dark",
        description: "Dark gothic masterpiece. Skull and roses design for alternative fashion lovers. Premium dark fabric.",
        price: 899,
        oldPrice: 2500,
        category: "Gothic",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt10.jpg"],
        stock: 100,
        featured: false,
        discount: 64,
        rating: 4.9,
        reviews: 223
    },
    {
        name: "Retro Wave 80s Nostalgia",
        description: "Classic 80s retro design. Vibrant colors and nostalgic vibes. Bring back the golden era.",
        price: 649,
        oldPrice: 2500,
        category: "Retro",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt11.jpg"],
        stock: 100,
        featured: false,
        discount: 74,
        rating: 4.7,
        reviews: 189
    },
    {
        name: "Galaxy Space Cosmic Explorer",
        description: "Stunning cosmic galaxy design. Explore the universe in style. Out of this world quality!",
        price: 799,
        oldPrice: 2500,
        category: "Space",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt12.jpg"],
        stock: 100,
        featured: false,
        discount: 68,
        rating: 4.8,
        reviews: 201
    },
    {
        name: "Mountain Adventure Wanderlust",
        description: "Nature-inspired mountain design. For adventure seekers and outdoor lovers. Embrace the wild!",
        price: 599,
        oldPrice: 2500,
        category: "Nature",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt13.jpg"],
        stock: 100,
        featured: false,
        discount: 76,
        rating: 4.6,
        reviews: 134
    },
    {
        name: "Japanese Kanji Warrior Spirit",
        description: "Traditional Japanese kanji characters. Warrior spirit design. Cultural statement piece.",
        price: 849,
        oldPrice: 2500,
        category: "Japanese",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt14.jpg"],
        stock: 100,
        featured: false,
        discount: 66,
        rating: 4.8,
        reviews: 167
    },
    {
        name: "Skateboard Culture Pro",
        description: "Street skateboard culture design. For skaters and street enthusiasts. Ride in style!",
        price: 699,
        oldPrice: 2500,
        category: "Skate",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt15.jpg"],
        stock: 100,
        featured: false,
        discount: 72,
        rating: 4.7,
        reviews: 145
    },
    {
        name: "Tie Dye Rainbow Hippie",
        description: "Colorful tie-dye pattern. Spread love and peace. Unique pattern on every piece!",
        price: 729,
        oldPrice: 2500,
        category: "TieDye",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt16.jpg"],
        stock: 100,
        featured: false,
        discount: 71,
        rating: 4.5,
        reviews: 123
    },
    {
        name: "Camouflage Military Tactical",
        description: "Military-style camo pattern. Tactical and trendy. Perfect for outdoor adventures.",
        price: 679,
        oldPrice: 2500,
        category: "Military",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt17.jpg"],
        stock: 100,
        featured: false,
        discount: 73,
        rating: 4.6,
        reviews: 134
    },
    {
        name: "Psychedelic Art Trippy",
        description: "Mind-bending psychedelic artwork. Vibrant and colorful. Trip in style!",
        price: 899,
        oldPrice: 2500,
        category: "Psychedelic",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt18.jpg"],
        stock: 100,
        featured: false,
        discount: 64,
        rating: 4.8,
        reviews: 212
    },
    {
        name: "Minimal Classic Black Essential",
        description: "Clean minimalist design. Timeless elegance in classic black. Versatile wardrobe essential.",
        price: 499,
        oldPrice: 2500,
        category: "Minimal",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt19.jpg"],
        stock: 100,
        featured: false,
        discount: 80,
        rating: 4.7,
        reviews: 289
    },
    {
        name: "Summer Beach Sunset Paradise",
        description: "Tropical beach sunset vibes. Summer all year round. Feel the ocean breeze!",
        price: 629,
        oldPrice: 2500,
        category: "Summer",
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/tshirt20.jpg"],
        stock: 100,
        featured: false,
        discount: 75,
        rating: 4.6,
        reviews: 178
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully!');

        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        await Product.insertMany(products);
        console.log('✅ Successfully added 20 products!');
        console.log('📊 Total products:', products.length);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

seedDatabase();