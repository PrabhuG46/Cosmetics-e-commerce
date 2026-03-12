// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const WORD_LIST = ["apple", "banana", "orange", "grape", "mango", "peach", "plum", "kiwi", "melon", "berry", "cherry", "lemon", "lime", "fig", "date", "ocean", "river", "mountain", "forest", "desert", "cloud", "rain", "snow", "wind", "storm", "star", "moon", "sun", "planet", "galaxy", "lion", "tiger", "bear", "wolf", "fox", "deer", "eagle", "hawk", "owl", "dove", "fish", "shark", "whale", "dolphin", "seal", "ruby", "jade", "pearl", "opal", "coral", "gold", "silver", "bronze", "iron", "steel", "happy", "brave", "calm", "eager", "proud", "swift", "clever", "wise", "bold", "kind", "red", "blue", "green", "yellow", "purple", "white", "black", "gray", "brown", "pink", "run", "jump", "swim", "fly", "walk", "dance", "sing", "read", "write", "draw", "play", "work", "sleep", "dream", "wake"];
// Store OTPs temporarily — keyed by EMAIL (in production, use Redis)
const otpStore = new Map();

// Register User (with OTP verification)
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, address, otp } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'Name, email, phone and password are required' });
        }

        // Verify OTP (keyed by email)
        if (!otp) {
            return res.status(400).json({ message: 'Words are required for registration' });
        }
        const storedOTP = otpStore.get(email);
        if (!storedOTP) {
            return res.status(400).json({ message: 'Words not found or expired. Please resend.' });
        }
        if (Date.now() > storedOTP.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ message: 'Words have expired. Please resend.' });
        }
        if (storedOTP.otp !== otp) {
            return res.status(400).json({ message: 'Invalid words. Please try again.' });
        }
        otpStore.delete(email); // Clear after successful verification

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email or phone' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Parse address
        const parsedAddress = typeof address === 'string'
            ? { street: address, city: '', state: '', pincode: '' }
            : address;

        // Create user
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            address: parsedAddress,
            role: 'user'
        });

        await user.save();

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Send OTP to email
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: 'Valid email address required' });
        }

        // Generate 6 random words
        const words = Array.from({length: 6}, () => WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]).join(' ');

        // Store OTP keyed by email (expires in 5 minutes)
        otpStore.set(email, {
            otp: words,
            expiresAt: Date.now() + 5 * 60 * 1000
        });

        // Always log to terminal for debugging
        console.log(`Secret Words for ${email}: ${words}`);

        res.json({
            message: `Secret words generated successfully.`,
            fallbackOtp: words
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Verify OTP & Login
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Check if OTP exists
    const storedOTP = otpStore.get(phone);
    if (!storedOTP) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    // Check if OTP is expired
    if (Date.now() > storedOTP.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ message: "OTP expired" });
    }

    // Verify OTP
    if (storedOTP.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete OTP
    otpStore.delete(phone);

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate({
        path: "orders",
        options: { sort: { createdAt: -1 } },
        populate: { path: "products.product", select: "name price images" }
      })
      .populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, email, phone, address },
      { new: true, runValidators: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Toggle Wishlist Item
exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
        return res.status(400).json({ message: "Product ID required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const index = user.wishlist.indexOf(productId);
    if (index > -1) {
        // Remove from wishlist
        user.wishlist.splice(index, 1);
    } else {
        // Add to wishlist
        user.wishlist.push(productId);
    }

    await user.save();
    
    // Populate before returning
    await user.populate("wishlist");

    res.json({
        message: index > -1 ? "Removed from wishlist" : "Added to wishlist",
        wishlist: user.wishlist
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login with Phone & Password
exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({ message: 'Phone and password are required' });
        }

        // Find user by phone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: 'No account found with this phone number' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// [DEVELOPMENT ONLY] Get test OTP for a phone number
exports.getTestOTP = (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ message: "Not available in production" });
  }

  const { phone } = req.query;
  if (!phone) {
    return res.status(400).json({ message: "Phone number required" });
  }

  const otpData = getTestOTP(phone);
  if (!otpData) {
    return res
      .status(404)
      .json({ message: "No OTP found for this phone. Request OTP first." });
  }

  res.json({
    phone,
    otp: otpData.otp,
    expiresAt: new Date(otpData.expiresAt),
  });
};

// ─── Forgot Password: Send OTP to registered email ───────────────────────────
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: 'Valid email address required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account found with this email address' });
        }
        const words = Array.from({length: 6}, () => WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]).join(' ');
        const storeKey = `reset:${email}`;
        otpStore.set(storeKey, { otp: words, expiresAt: Date.now() + 5 * 60 * 1000 });
        console.log(`Password Reset Words for ${email}: ${words}`);
        res.json({
            message: `Secret words for password reset configured.`,
            fallbackOtp: words
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ─── Reset Password: Verify OTP + save new password ──────────────────────────
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: 'Email, OTP and new password are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }
        const storeKey = `reset:${email}`;
        const stored = otpStore.get(storeKey);
        if (!stored) {
            return res.status(400).json({ message: 'Words not found or expired. Please request again.' });
        }
        if (Date.now() > stored.expiresAt) {
            otpStore.delete(storeKey);
            return res.status(400).json({ message: 'Words have expired. Please request again.' });
        }
        if (stored.otp !== otp) {
            return res.status(400).json({ message: 'Invalid words. Please try again.' });
        }
        otpStore.delete(storeKey);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Password reset successfully. Please sign in.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

