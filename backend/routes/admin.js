// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

// Admin Login (No auth required)
router.post("/login", adminController.adminLogin);

// Dashboard Stats (Admin only)
router.get("/dashboard", adminAuth, adminController.getDashboardStats);

// Product Management (Admin only)
router.get("/products", adminAuth, adminController.getAllProducts);
router.post("/products", adminAuth, adminController.createProduct);
router.put("/products/:id", adminAuth, adminController.updateProduct);
router.delete("/products/:id", adminAuth, adminController.deleteProduct);

// Order Management (Admin only)
router.get("/orders", adminAuth, adminController.getAllOrders);
router.put("/orders/:id", adminAuth, adminController.updateOrderStatus);

// User Management (Admin only)
router.get("/users", adminAuth, adminController.getAllUsers);
router.delete("/users/:id", adminAuth, adminController.deleteUser);
router.put(
  "/users/:id/password",
  adminAuth,
  adminController.updateUserPassword,
);

// Review Management (Admin only)
router.get("/reviews", adminAuth, adminController.getAllReviews);

module.exports = router;
