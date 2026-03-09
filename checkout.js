// Add this to your website's checkout page or main JavaScript file

// Get cart from localStorage
function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Get current user from localStorage
function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Calculate total amount
function calculateTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Place Order Function
async function placeOrder(paymentMethod = "COD") {
  try {
    console.log("🛒 Starting order placement...");

    // Get cart items
    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    console.log("Cart items:", cart);

    // Get current user
    const user = getCurrentUser();
    if (!user || !user.id) {
      alert("Please login to place an order!");
      window.location.href = "login.html"; // Redirect to login page
      return;
    }

    console.log("User:", user);

    // Get shipping address from form
    const shippingAddress = {
      name: document.getElementById("customerName")?.value || user.name,
      phone: document.getElementById("customerPhone")?.value || user.phone,
      address: document.getElementById("address")?.value || "",
      city: document.getElementById("city")?.value || "",
      state: document.getElementById("state")?.value || "",
      pincode: document.getElementById("pincode")?.value || "",
    };

    console.log("Shipping address:", shippingAddress);

    // Validate shipping address
    if (
      !shippingAddress.name ||
      !shippingAddress.phone ||
      !shippingAddress.address
    ) {
      alert("Please fill in all shipping details!");
      return;
    }

    // Format products for order
    const products = cart.map((item) => ({
      product: item.id || item._id, // Product MongoDB ID
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size || "M",
      image: item.image || item.images?.[0] || "",
    }));

    console.log("Formatted products:", products);

    // Calculate total
    const totalAmount = calculateTotal();

    // Create order object
    const orderData = {
      user: user.id, // User's MongoDB _id
      products: products,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod, // 'COD' or 'Online'
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
    };

    console.log("📦 Sending order data:", orderData);

    // Show loading indicator
    const confirmBtn = document.getElementById("confirmOrderBtn");
    if (confirmBtn) {
      confirmBtn.disabled = true;
      confirmBtn.textContent = "Placing Order...";
    }

    // Send order to backend
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    console.log("Order response:", result);

    if (response.ok) {
      console.log("✅ Order placed successfully!");
      console.log("Order details:", result.order);

      // Clear cart
      localStorage.removeItem("cart");

      // Show success message
      alert(`Order placed successfully! 
Order Number: ${result.order.orderNumber}
Total: ₹${result.order.totalAmount}
We'll deliver it soon!`);

      // Redirect to orders page or home
      window.location.href = "index.html";
    } else {
      console.error("❌ Order failed:", result);
      alert("Failed to place order: " + (result.message || "Unknown error"));

      // Re-enable button
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = "CONFIRM ORDER";
      }
    }
  } catch (error) {
    console.error("❌ Error placing order:", error);
    alert("Error placing order: " + error.message);

    // Re-enable button
    const confirmBtn = document.getElementById("confirmOrderBtn");
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.textContent = "CONFIRM ORDER";
    }
  }
}

// Handle payment method selection
function handlePaymentSelection(method) {
  console.log("Payment method selected:", method);

  // Remove active class from all payment cards
  document.querySelectorAll(".payment-card").forEach((card) => {
    card.classList.remove("active");
  });

  // Add active class to selected card
  const selectedCard = document.querySelector(`[data-payment="${method}"]`);
  if (selectedCard) {
    selectedCard.classList.add("active");
  }

  // Store selected payment method
  localStorage.setItem("selectedPayment", method);
}

// Confirm order button click handler
function setupConfirmOrderButton() {
  const confirmBtn = document.getElementById("confirmOrderBtn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", async () => {
      const paymentMethod = localStorage.getItem("selectedPayment") || "COD";
      console.log("Confirming order with payment method:", paymentMethod);
      await placeOrder(paymentMethod);
    });
  }
}

// Setup payment method cards click handlers
function setupPaymentCards() {
  // COD
  const codCard = document.querySelector('[data-payment="COD"]');
  if (codCard) {
    codCard.addEventListener("click", () => handlePaymentSelection("COD"));
  }

  // UPI
  const upiCard = document.querySelector('[data-payment="UPI"]');
  if (upiCard) {
    upiCard.addEventListener("click", () => handlePaymentSelection("Online"));
  }

  // Card
  const cardCard = document.querySelector('[data-payment="Card"]');
  if (cardCard) {
    cardCard.addEventListener("click", () => handlePaymentSelection("Online"));
  }

  // Net Banking
  const netBankingCard = document.querySelector('[data-payment="NetBanking"]');
  if (netBankingCard) {
    netBankingCard.addEventListener("click", () =>
      handlePaymentSelection("Online"),
    );
  }
}

// Display cart summary
function displayCartSummary() {
  const cart = getCart();
  const cartContainer = document.getElementById("cartSummary");
  const totalElement = document.getElementById("totalAmount");

  if (cartContainer) {
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty</p>";
    } else {
      cartContainer.innerHTML = cart
        .map(
          (item) => `
                <div class="cart-item">
                    <img src="${item.image || item.images?.[0] || "images/placeholder.jpg"}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</p>
                    </div>
                </div>
            `,
        )
        .join("");
    }
  }

  if (totalElement) {
    totalElement.textContent = `₹${calculateTotal()}`;
  }
}

// Pre-fill user details if logged in
function prefillUserDetails() {
  const user = getCurrentUser();
  if (user) {
    const nameField = document.getElementById("customerName");
    const phoneField = document.getElementById("customerPhone");
    const addressField = document.getElementById("address");
    const cityField = document.getElementById("city");
    const stateField = document.getElementById("state");
    const pincodeField = document.getElementById("pincode");

    if (nameField && user.name) nameField.value = user.name;
    if (phoneField && user.phone) phoneField.value = user.phone;
    if (addressField && user.address?.street)
      addressField.value = user.address.street;
    if (cityField && user.address?.city) cityField.value = user.address.city;
    if (stateField && user.address?.state)
      stateField.value = user.address.state;
    if (pincodeField && user.address?.pincode)
      pincodeField.value = user.address.pincode;
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Checkout page initialized");

  displayCartSummary();
  prefillUserDetails();
  setupPaymentCards();
  setupConfirmOrderButton();

  // Set COD as default payment method
  handlePaymentSelection("COD");
});

// Export functions for use in HTML onclick handlers
window.placeOrder = placeOrder;
window.handlePaymentSelection = handlePaymentSelection;
