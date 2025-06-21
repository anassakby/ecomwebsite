// Shopping cart management class
class CartManager {
    constructor() {
        this.cart = this.loadCartFromStorage();
        this.updateCartUI();
        this.initializeEventListeners();
    }

    loadCartFromStorage() {
        const savedCart = localStorage.getItem('ecommerce_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCartToStorage() {
        localStorage.setItem('ecommerce_cart', JSON.stringify(this.cart));
    }

    initializeEventListeners() {
        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.checkout();
        });
    }

    addToCart(id, title, price, image) {
        const existingItem = this.cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id,
                title,
                price,
                image,
                quantity: 1
            });
        }

        this.saveCartToStorage();
        this.updateCartUI();
        this.showAddToCartAnimation();
        window.ecommerceApp.showToast(`${title} added to cart!`, 'success');
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCartToStorage();
        this.updateCartUI();
        window.ecommerceApp.showToast('Item removed from cart', 'success');
    }

    updateQuantity(id, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(id);
            return;
        }

        const item = this.cart.find(item => item.id === id);
        if (item) {
            item.quantity = newQuantity;
            this.saveCartToStorage();
            this.updateCartUI();
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartUI() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
        this.updateCheckoutButton();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const count = this.getCartItemCount();
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'block' : 'none';
    }

    updateCartItems() {
        const cartItems = document.getElementById('cartItems');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Your cart is empty</p>
                    <button class="btn btn-outline-primary" data-bs-dismiss="offcanvas">
                        Continue Shopping
                    </button>
                </div>
            `;
            return;
        }

        const itemsHTML = this.cart.map(item => this.createCartItemHTML(item)).join('');
        cartItems.innerHTML = itemsHTML;
    }

    createCartItemHTML(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="row align-items-center">
                    <div class="col-3">
                        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    </div>
                    <div class="col-6">
                        <h6 class="text-light mb-1">${item.title}</h6>
                        <p class="text-primary mb-0 fw-bold">${formatPrice(item.price)}</p>
                    </div>
                    <div class="col-3">
                        <div class="quantity-controls mb-2">
                            <button class="quantity-btn" onclick="window.cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="text-light mx-2">${item.quantity}</span>
                            <button class="quantity-btn" onclick="window.cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="btn btn-outline-danger btn-sm w-100" onclick="window.cartManager.removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    updateCartTotal() {
        const cartTotal = document.getElementById('cartTotal');
        cartTotal.textContent = formatPrice(this.getCartTotal());
    }

    updateCheckoutButton() {
        const checkoutBtn = document.getElementById('checkoutBtn');
        checkoutBtn.disabled = this.cart.length === 0;
    }

    showAddToCartAnimation() {
        const cartBtn = document.querySelector('.cart-btn');
<<<<<<< HEAD
        const cartIcon = cartBtn.querySelector('i');
        
        // Add shake animation to cart button
        cartBtn.classList.add('cart-shake');
        
        // Create floating notification
        this.createFloatingNotification(cartBtn);
        
        // Create particle burst effect
        this.createParticleBurst(cartBtn);
        
        // Animate cart icon
        cartIcon.style.animation = 'cartIconPulse 0.6s ease-out';
        
        setTimeout(() => {
            cartBtn.classList.remove('cart-shake');
            cartIcon.style.animation = '';
        }, 600);
    }

    createFloatingNotification(cartBtn) {
        const rect = cartBtn.getBoundingClientRect();
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = '<i class="fas fa-check"></i> Added!';
        notification.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top - 10}px;
            background: var(--primary-color);
            color: var(--dark-bg);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.8rem;
            z-index: 9999;
            pointer-events: none;
            animation: floatUp 1.5s ease-out forwards;
            transform: translateX(-50%);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 1500);
    }

    createParticleBurst(cartBtn) {
        const rect = cartBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'cart-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 6px;
                height: 6px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                animation: particleBurst${i} 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
=======
        cartBtn.classList.add('animate__animated', 'animate__pulse');
        
        setTimeout(() => {
            cartBtn.classList.remove('animate__animated', 'animate__pulse');
        }, 1000);
>>>>>>> 2c34d30 (Enhance website with improved animations, authentication and product filtering)
    }

    checkout() {
        if (this.cart.length === 0) {
            window.ecommerceApp.showToast('Your cart is empty!', 'error');
            return;
        }

        // Show checkout confirmation modal
        this.showCheckoutModal();
    }

    showCheckoutModal() {
        const modalHTML = `
            <div class="modal fade" id="checkoutModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content glass-modal">
                        <div class="modal-header border-bottom border-secondary">
                            <h5 class="modal-title text-light">
                                <i class="fas fa-credit-card me-2"></i>Order Confirmation
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="order-summary mb-4">
                                <h6 class="text-light mb-3">Order Summary:</h6>
                                <div class="order-items">
                                    ${this.cart.map(item => `
                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                            <span class="text-light">${item.title} x${item.quantity}</span>
                                            <span class="text-primary">${formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                <hr class="border-secondary">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-light fw-bold">Total:</span>
                                    <span class="text-primary fw-bold fs-5">${formatPrice(this.getCartTotal())}</span>
                                </div>
                            </div>
                            
                            <div class="payment-options">
                                <h6 class="text-light mb-3">Payment Method:</h6>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="payment-option glass-container p-3 rounded-3 text-center mb-2">
                                            <i class="fas fa-credit-card fa-2x text-primary mb-2"></i>
                                            <p class="text-light mb-0">Credit Card</p>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="payment-option glass-container p-3 rounded-3 text-center mb-2">
                                            <i class="fab fa-paypal fa-2x text-primary mb-2"></i>
                                            <p class="text-light mb-0">PayPal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-top border-secondary">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="window.cartManager.confirmOrder()">
                                <i class="fas fa-check me-2"></i>Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('checkoutModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add new modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
        modal.show();

        // Add click handlers for payment options
        document.querySelectorAll('.payment-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.payment-option').forEach(opt => {
                    opt.classList.remove('border-primary');
                });
                option.classList.add('border-primary');
            });
        });
    }

    confirmOrder() {
        // Simulate order processing
        const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
        modal.hide();

        // Show success message
        window.ecommerceApp.showToast('Order confirmed successfully! 🎉', 'success');

        // Clear cart
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartUI();

        // Close cart offcanvas
        const cartOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
        if (cartOffcanvas) {
            cartOffcanvas.hide();
        }

        // Show order success animation
        setTimeout(() => {
            this.showOrderSuccessAnimation();
        }, 500);
    }

    showOrderSuccessAnimation() {
        const successHTML = `
            <div class="order-success-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style="z-index: 9999; background: rgba(0, 0, 0, 0.8);">
                <div class="text-center">
                    <div class="success-checkmark mb-4">
                        <div class="check-icon">
                            <span class="icon-line line-tip"></span>
                            <span class="icon-line line-long"></span>
                            <div class="icon-circle"></div>
                            <div class="icon-fix"></div>
                        </div>
                    </div>
                    <h2 class="text-light mb-3">Order Placed Successfully!</h2>
                    <p class="text-muted">Thank you for your purchase. You will receive a confirmation email shortly.</p>
                    <button class="btn btn-primary mt-3" onclick="this.parentElement.parentElement.remove()">
                        Continue Shopping
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', successHTML);

        // Auto remove after 5 seconds
        setTimeout(() => {
            const overlay = document.querySelector('.order-success-overlay');
            if (overlay) {
                overlay.remove();
            }
        }, 5000);
    }
}

// Add CSS for success animation
const successCSS = `
    <style>
        .success-checkmark {
            width: 80px;
            height: 80px;
            margin: 0 auto;
        }
        
        .check-icon {
            width: 80px;
            height: 80px;
            position: relative;
            border-radius: 50%;
            box-sizing: content-box;
            border: 4px solid var(--primary-color);
        }
        
        .check-icon::before {
            top: 3px;
            left: -2px;
            width: 30px;
            transform-origin: 100% 50%;
            border-radius: 100px 0 0 100px;
        }
        
        .check-icon::after {
            top: 0;
            left: 30px;
            width: 60px;
            transform-origin: 0 50%;
            border-radius: 0 100px 100px 0;
            animation: rotate-circle 4.25s ease-in;
        }
        
        .check-icon::before, .check-icon::after {
            content: '';
            height: 100px;
            position: absolute;
            background: var(--dark-bg);
            transform: rotate(-45deg);
        }
        
        .icon-line {
            height: 5px;
            background-color: var(--primary-color);
            display: block;
            border-radius: 2px;
            position: absolute;
            z-index: 10;
        }
        
        .icon-line.line-tip {
            top: 46px;
            left: 14px;
            width: 25px;
            transform: rotate(45deg);
            animation: icon-line-tip 0.75s;
        }
        
        .icon-line.line-long {
            top: 38px;
            right: 8px;
            width: 47px;
            transform: rotate(-45deg);
            animation: icon-line-long 0.75s;
        }
        
        .icon-circle {
            top: -4px;
            left: -4px;
            z-index: 10;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            position: absolute;
            box-sizing: content-box;
            border: 4px solid rgba(0, 255, 171, 0.5);
        }
        
        .icon-fix {
            top: 8px;
            width: 5px;
            left: 26px;
            z-index: 1;
            height: 85px;
            position: absolute;
            transform: rotate(-45deg);
            background-color: var(--dark-bg);
        }
        
        @keyframes rotate-circle {
            0% { transform: rotate(-45deg); }
            5% { transform: rotate(-45deg); }
            12% { transform: rotate(-405deg); }
            100% { transform: rotate(-405deg); }
        }
        
        @keyframes icon-line-tip {
            0% { width: 0; left: 1px; top: 19px; }
            54% { width: 0; left: 1px; top: 19px; }
            70% { width: 50px; left: -8px; top: 37px; }
            84% { width: 17px; left: 21px; top: 48px; }
            100% { width: 25px; left: 14px; top: 45px; }
        }
        
        @keyframes icon-line-long {
            0% { width: 0; right: 46px; top: 54px; }
            65% { width: 0; right: 46px; top: 54px; }
            84% { width: 55px; right: 0px; top: 35px; }
            100% { width: 47px; right: 8px; top: 38px; }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', successCSS);
