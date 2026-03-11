const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Register (with OTP verification)
router.post("/register", authController.register);

// Login with phone + password
router.post("/login", authController.login);

// Send OTP (for registration phone verification)
router.post("/send-otp", authController.sendOTP);

// Verify OTP & Login (OTP-based login)
router.post("/verify-otp", authController.verifyOTP);

// Get Profile (Protected)
router.get("/profile", auth, authController.getProfile);

// Update Profile (Protected)
router.put("/profile", auth, authController.updateProfile);

// Toggle Wishlist (Protected)
router.post("/wishlist/toggle", auth, authController.toggleWishlist);

// Forgot Password — send OTP to registered email
router.post("/forgot-password", authController.forgotPassword);

// Reset Password — verify OTP + set new password
router.post("/reset-password", authController.resetPassword);

module.exports = router;

