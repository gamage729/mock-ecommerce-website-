// Basket Page Functions

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadBasketItems();
    loadBasketCount();
});

// Load basket items count for the header
function loadBasketCount() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const count = basket.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('basket-count').textContent = count;
}

// Load and display basket items
function loadBasketItems() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const cartContent = document.getElementById('cart-content');
    
    if (basket.length === 0) {
        // Show empty cart message
        cartContent.innerHTML = `
            <div class="cart-empty">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any products to your cart yet.</p>
                <br>
                <button class="btn" onclick="window.location.href='index.html'">Start Shopping</button>
            </div>
        `;
        return;
    }
    
    // Calculate cart totals
    const subtotal = basket.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = subtotal >= 50 ? 0 : 5.99;
    const total = subtotal + deliveryFee;
    
    // Create cart layout with items and summary
    cartContent.innerHTML = `
        <div class="cart-layout">
            <div class="cart-items">
                ${basket.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.onerror=null; this.src='images/fallback.png';">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                        </div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeItem(${item.id})">×</button>
                    </div>
                `).join('')}
            </div>
            
            <div class="cart-summary">
                <h2>Order Summary</h2>
                <div class="summary-item">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-item">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee === 0 ? 'FREE' : '$' + deliveryFee.toFixed(2)}</span>
                </div>
                <div class="summary-item summary-total">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                ${deliveryFee > 0 ? `
                    <p class="delivery-note">Add $${(50 - subtotal).toFixed(2)} more to get free delivery!</p>
                ` : ''}
                <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
            </div>
        </div>
    `;
}

// Update item quantity
function updateQuantity(productId, change) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const itemIndex = basket.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        // Update quantity, ensuring it doesn't go below 1
        basket[itemIndex].quantity = Math.max(1, basket[itemIndex].quantity + change);
        
        // Save updated basket
        localStorage.setItem('basket', JSON.stringify(basket));
        
        // Reload basket display
        loadBasketItems();
        loadBasketCount();
    }
}

// Remove item from basket
function removeItem(productId) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    
    // Filter out the removed item
    basket = basket.filter(item => item.id !== productId);
    
    // Save updated basket
    localStorage.setItem('basket', JSON.stringify(basket));
    
    // Reload basket display
    loadBasketItems();
    loadBasketCount();
}

// Clear the entire cart
function clearCart() {
    localStorage.setItem('basket', JSON.stringify([]));
    loadBasketItems();
    loadBasketCount();
}



// Proceed to checkout function
function proceedToCheckout() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    
    if (basket.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }
    
    // Calculate totals
    const subtotal = basket.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = subtotal >= 50 ? 0 : 5.99;
    const total = subtotal + deliveryFee;
    
    // Display the checkout modal
    const checkoutModal = document.getElementById('checkout-modal');
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-delivery').textContent = deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
    
    // Show the modal
    checkoutModal.style.display = 'flex';
}

// Close the checkout modal
function closeCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// Handle checkout form submission
function submitCheckout(event) {
    event.preventDefault();
    
    // In a real application, you would send the form data to a server
    // For this demo, we'll just show a success message and clear the cart
    
    // Show success message
    document.getElementById('checkout-form-container').innerHTML = `
        <div class="checkout-success">
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order. A confirmation email has been sent to your inbox.</p>
            <p>Order #: ORD-${Math.floor(100000 + Math.random() * 900000)}</p>
            <button class="btn" onclick="completeCheckout()">Continue Shopping</button>
        </div>
    `;
}

// Complete the checkout process
function completeCheckout() {
    // Clear the cart
    clearCart();
    
    // Close the modal
    closeCheckoutModal();
    
    // Redirect to home page
    window.location.href = 'index.html';
}