// Authentication management class
class AuthManager {
    constructor() {
        this.isSignIn = true;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Auth form submission
        document.getElementById('authForm').addEventListener('submit', (e) => {
            this.handleAuthSubmit(e);
        });

        // Toggle between sign in and sign up
        document.getElementById('toggleAuthMode').addEventListener('click', () => {
            this.toggleAuthMode();
        });

        // Modal event listeners
        const authModal = document.getElementById('authModal');
        authModal.addEventListener('show.bs.modal', (e) => {
            const mode = e.relatedTarget.getAttribute('data-mode');
            this.setAuthMode(mode);
        });

        authModal.addEventListener('hidden.bs.modal', () => {
            this.resetForm();
        });
    }

    setAuthMode(mode) {
        this.isSignIn = mode === 'signin';
        this.updateModalContent();
    }

    toggleAuthMode() {
        this.isSignIn = !this.isSignIn;
        this.updateModalContent();
    }

    updateModalContent() {
        const modalTitle = document.getElementById('authModalTitle');
        const submitBtn = document.getElementById('authSubmitBtn');
        const toggleBtn = document.getElementById('toggleAuthMode');
        const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');

        if (this.isSignIn) {
            modalTitle.textContent = 'Sign In';
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i>Sign In';
            toggleBtn.textContent = "Don't have an account? Sign Up";
            confirmPasswordGroup.style.display = 'none';
            document.getElementById('confirmPassword').required = false;
        } else {
            modalTitle.textContent = 'Sign Up';
            submitBtn.innerHTML = '<i class="fas fa-user-plus me-2"></i>Sign Up';
            toggleBtn.textContent = "Already have an account? Sign In";
            confirmPasswordGroup.style.display = 'block';
            document.getElementById('confirmPassword').required = true;
        }

        // Reset form validation
        this.resetForm();
    }

    handleAuthSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Basic validation
        if (!this.validateForm(email, password, confirmPassword)) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        // Simulate API call delay
        setTimeout(() => {
            this.processAuth(email, password);
        }, 1500);
    }

    validateForm(email, password, confirmPassword) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showFormError('Please enter a valid email address');
            return false;
        }

        // Password validation
        if (password.length < 6) {
            this.showFormError('Password must be at least 6 characters long');
            return false;
        }

        // Confirm password validation (for sign up)
        if (!this.isSignIn && password !== confirmPassword) {
            this.showFormError('Passwords do not match');
            return false;
        }

        return true;
    }

    processAuth(email, password) {
        // Simulate authentication process
        const action = this.isSignIn ? 'signed in' : 'signed up';
        
        // Hide modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        modal.hide();

        // Show success message
        window.ecommerceApp.showToast(`Successfully ${action}!`, 'success');

        // Reset loading state
        this.setLoadingState(false);

        // Show welcome animation
        setTimeout(() => {
            this.showWelcomeAnimation(email);
        }, 500);
    }

    showFormError(message) {
        // Remove existing error
        const existingError = document.querySelector('.auth-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorHTML = `
            <div class="alert alert-danger auth-error mt-3" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>${message}
            </div>
        `;
        
        document.getElementById('authForm').insertAdjacentHTML('afterend', errorHTML);

        // Auto remove error after 5 seconds
        setTimeout(() => {
            const error = document.querySelector('.auth-error');
            if (error) {
                error.remove();
            }
        }, 5000);
    }

    setLoadingState(loading) {
        const submitBtn = document.getElementById('authSubmitBtn');
        const formInputs = document.querySelectorAll('#authForm input');

        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
            `;
            formInputs.forEach(input => input.disabled = true);
        } else {
            submitBtn.disabled = false;
            formInputs.forEach(input => input.disabled = false);
            this.updateModalContent(); // Reset button text
        }
    }

    resetForm() {
        const form = document.getElementById('authForm');
        form.reset();
        
        // Remove any error messages
        const error = document.querySelector('.auth-error');
        if (error) {
            error.remove();
        }

        // Reset loading state
        this.setLoadingState(false);
    }

    showWelcomeAnimation(email) {
        const welcomeHTML = `
            <div class="welcome-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style="z-index: 9999; background: rgba(0, 0, 0, 0.9);">
                <div class="text-center welcome-content">
                    <div class="welcome-icon mb-4">
                        <i class="fas fa-user-check fa-4x text-primary"></i>
                    </div>
                    <h2 class="text-light mb-3">Welcome to E-commerce!</h2>
                    <p class="text-muted mb-4">Welcome ${email.split('@')[0]}! Start exploring our premium collection.</p>
                    <div class="welcome-features mb-4">
                        <div class="feature-badge">
                            <i class="fas fa-shield-alt text-primary me-2"></i>
                            <span class="text-light">Secure Shopping</span>
                        </div>
                        <div class="feature-badge">
                            <i class="fas fa-shipping-fast text-primary me-2"></i>
                            <span class="text-light">Fast Delivery</span>
                        </div>
                        <div class="feature-badge">
                            <i class="fas fa-star text-primary me-2"></i>
                            <span class="text-light">Premium Quality</span>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-lg" onclick="this.closest('.welcome-overlay').remove()">
                        Start Shopping <i class="fas fa-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', welcomeHTML);

        // Add animation classes
        setTimeout(() => {
            const content = document.querySelector('.welcome-content');
            if (content) {
                content.style.animation = 'fadeInUp 0.8s ease-out';
            }
        }, 100);

        // Auto remove after 8 seconds
        setTimeout(() => {
            const overlay = document.querySelector('.welcome-overlay');
            if (overlay) {
                overlay.style.animation = 'fadeOut 0.5s ease-out';
                setTimeout(() => overlay.remove(), 500);
            }
        }, 8000);
    }
}

// Add CSS for welcome animation
const welcomeCSS = `
    <style>
        .welcome-content {
            transform: translateY(30px);
            opacity: 0;
        }
        
        .welcome-icon {
            animation: bounceIn 1s ease-out 0.3s both;
        }
        
        .feature-badge {
            display: inline-block;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: 25px;
            padding: 0.5rem 1rem;
            margin: 0.25rem;
            transition: var(--transition);
        }
        
        .feature-badge:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 171, 0.2);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', welcomeCSS);
