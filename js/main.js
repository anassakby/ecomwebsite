// Main application initialization
class EcommerceApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.initializeEventListeners();
        this.initializeAOS();
        this.loadCategories();
        this.initializeProducts();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'light') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        this.showToast('Theme switched to ' + newTheme + ' mode', 'success');
    }

    initializeEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.debounce(() => {
                window.productsManager.searchProducts(e.target.value);
            }, 300)();
        });

        // Filter change events
<<<<<<< HEAD
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            window.productsManager.filterByCategory(e.target.value);
        });

=======
>>>>>>> 2c34d30 (Enhance website with improved animations, authentication and product filtering)
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            window.productsManager.setSortBy(e.target.value);
        });

        document.getElementById('priceFilter').addEventListener('change', (e) => {
            window.productsManager.setPriceFilter(e.target.value);
        });

        document.getElementById('ratingFilter').addEventListener('change', (e) => {
            window.productsManager.setRatingFilter(e.target.value);
        });

        // Clear filters
        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearAllFilters();
        });
<<<<<<< HEAD
=======

        // Categories menu
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-category]')) {
                e.preventDefault();
                const category = e.target.getAttribute('data-category');
                window.productsManager.filterByCategory(category);
            }
        });
>>>>>>> 2c34d30 (Enhance website with improved animations, authentication and product filtering)
    }

    initializeAOS() {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    async loadCategories() {
        try {
            const response = await fetch('https://dummyjson.com/products/categories');
            const categories = await response.json();
            
<<<<<<< HEAD
            const categoryFilter = document.getElementById('categoryFilter');
            
            // Clear existing options except "All Categories"
            categoryFilter.innerHTML = '<option value="all">All Categories</option>';
            
            // Add categories
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.slug;
                option.textContent = category.name;
                categoryFilter.appendChild(option);
=======
            const categoriesMenu = document.getElementById('categoriesMenu');
            const allProductsItem = categoriesMenu.querySelector('[data-category="all"]').parentElement;
            
            // Clear existing items except "All Products"
            categoriesMenu.innerHTML = '';
            categoriesMenu.appendChild(allProductsItem);
            
            // Add categories
            categories.forEach(category => {
                const li = document.createElement('li');
                li.innerHTML = `<a class="dropdown-item" href="#" data-category="${category.slug}">${category.name}</a>`;
                categoriesMenu.appendChild(li);
>>>>>>> 2c34d30 (Enhance website with improved animations, authentication and product filtering)
            });
        } catch (error) {
            console.error('Error loading categories:', error);
            this.showToast('Error loading categories', 'error');
        }
    }

    initializeProducts() {
        // Initialize product manager
        window.productsManager = new ProductsManager();
        window.cartManager = new CartManager();
        window.authManager = new AuthManager();
    }

    clearAllFilters() {
        document.getElementById('searchInput').value = '';
<<<<<<< HEAD
        document.getElementById('categoryFilter').value = 'all';
=======
>>>>>>> 2c34d30 (Enhance website with improved animations, authentication and product filtering)
        document.getElementById('sortSelect').value = 'default';
        document.getElementById('priceFilter').value = 'all';
        document.getElementById('ratingFilter').value = 'all';
        
        window.productsManager.clearAllFilters();
        this.showToast('All filters cleared', 'success');
    }

    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toastId = 'toast-' + Date.now();
        
        const toastHTML = `
            <div class="toast toast-${type}" id="${toastId}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
        
        toast.show();
        
        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Utility functions
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ecommerceApp = new EcommerceApp();
});
