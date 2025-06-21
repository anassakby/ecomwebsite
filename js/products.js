// Products management class
class ProductsManager {
    constructor() {
        this.allProducts = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.currentCategory = 'all';
        this.currentSort = 'default';
        this.currentPriceFilter = 'all';
        this.currentRatingFilter = 'all';
        this.currentSearch = '';
        
        this.loadProducts();
    }

    async loadProducts() {
        try {
            this.showLoading(true);
<<<<<<< HEAD
            const response = await fetch('https://dummyjson.com/products?limit=0');
=======
            const response = await fetch('https://dummyjson.com/products?limit=100');
>>>>>>> 2c34d30 (Enhance website with improved animations, authentication and product filtering)
            const data = await response.json();
            
            this.allProducts = data.products;
            this.filteredProducts = [...this.allProducts];
            this.renderProducts();
            this.renderPagination();
        } catch (error) {
            console.error('Error loading products:', error);
            this.showError('Failed to load products. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    showLoading(show) {
        const loadingContainer = document.getElementById('loadingContainer');
        const productsGrid = document.getElementById('productsGrid');
        
        if (show) {
            loadingContainer.style.display = 'block';
            // Create skeleton cards
            productsGrid.innerHTML = this.createSkeletonCards();
        } else {
            loadingContainer.style.display = 'none';
        }
    }

    createSkeletonCards() {
        let skeletonHTML = '';
        for (let i = 0; i < 8; i++) {
            skeletonHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="product-card">
                        <div class="skeleton" style="height: 250px; border-radius: 20px 20px 0 0;"></div>
                        <div class="product-info">
                            <div class="skeleton" style="height: 20px; margin-bottom: 10px; border-radius: 10px;"></div>
                            <div class="skeleton" style="height: 15px; margin-bottom: 10px; border-radius: 10px; width: 80%;"></div>
                            <div class="skeleton" style="height: 25px; margin-bottom: 10px; border-radius: 10px; width: 60%;"></div>
                            <div class="skeleton" style="height: 40px; border-radius: 15px;"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        return skeletonHTML;
    }

    showError(message) {
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h4 class="text-light">${message}</h4>
                <button class="btn btn-primary mt-3" onclick="window.productsManager.loadProducts()">
                    <i class="fas fa-redo me-2"></i>Try Again
                </button>
            </div>
        `;
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1;
        this.applyFilters();
    }

    searchProducts(query) {
        this.currentSearch = query.toLowerCase();
        this.currentPage = 1;
        this.applyFilters();
    }

    setSortBy(sortBy) {
        this.currentSort = sortBy;
        this.applyFilters();
    }

    setPriceFilter(priceRange) {
        this.currentPriceFilter = priceRange;
        this.currentPage = 1;
        this.applyFilters();
    }

    setRatingFilter(rating) {
        this.currentRatingFilter = rating;
        this.currentPage = 1;
        this.applyFilters();
    }

    clearAllFilters() {
        this.currentCategory = 'all';
        this.currentSort = 'default';
        this.currentPriceFilter = 'all';
        this.currentRatingFilter = 'all';
        this.currentSearch = '';
        this.currentPage = 1;
        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.allProducts];

        // Apply category filter
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(product => 
                product.category.toLowerCase().replace(/\s+/g, '-') === this.currentCategory
            );
        }

        // Apply search filter
        if (this.currentSearch) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(this.currentSearch) ||
                product.description.toLowerCase().includes(this.currentSearch) ||
                product.category.toLowerCase().includes(this.currentSearch)
            );
        }

        // Apply price filter
        if (this.currentPriceFilter !== 'all') {
            filtered = filtered.filter(product => {
                const price = product.price;
                switch (this.currentPriceFilter) {
                    case '0-50':
                        return price <= 50;
                    case '50-100':
                        return price > 50 && price <= 100;
                    case '100-500':
                        return price > 100 && price <= 500;
                    case '500+':
                        return price > 500;
                    default:
                        return true;
                }
            });
        }

        // Apply rating filter
        if (this.currentRatingFilter !== 'all') {
            const minRating = parseFloat(this.currentRatingFilter);
            filtered = filtered.filter(product => product.rating >= minRating);
        }

        // Apply sorting
        if (this.currentSort !== 'default') {
            filtered.sort((a, b) => {
                switch (this.currentSort) {
                    case 'price-low':
                        return a.price - b.price;
                    case 'price-high':
                        return b.price - a.price;
                    case 'rating':
                        return b.rating - a.rating;
                    case 'title':
                        return a.title.localeCompare(b.title);
                    default:
                        return 0;
                }
            });
        }

        this.filteredProducts = filtered;
        this.renderProducts();
        this.renderPagination();
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
<<<<<<< HEAD
        const productsCount = document.getElementById('productsCount');
=======
>>>>>>> 2c34d30 (Enhance website with improved animations, authentication and product filtering)
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const currentProducts = this.filteredProducts.slice(startIndex, endIndex);

<<<<<<< HEAD
        // Update products count
        if (productsCount) {
            productsCount.innerHTML = `<span class="fw-bold">${this.filteredProducts.length} Products</span>`;
        }

=======
>>>>>>> 2c34d30 (Enhance website with improved animations, authentication and product filtering)
        if (currentProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-light">No products found</h4>
                    <p class="text-muted">Try adjusting your filters or search terms</p>
                    <button class="btn btn-outline-primary" onclick="window.ecommerceApp.clearAllFilters()">
                        Clear All Filters
                    </button>
                </div>
            `;
            return;
        }

        const productsHTML = currentProducts.map(product => this.createProductCard(product)).join('');
        productsGrid.innerHTML = productsHTML;

        // Re-initialize AOS for new elements
        AOS.refresh();
    }

    createProductCard(product) {
        const discountedPrice = product.price * (1 - product.discountPercentage / 100);
        
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4" data-aos="fade-up" data-aos-delay="100">
                <div class="product-card h-100">
                    <div class="position-relative overflow-hidden">
                        <img src="${product.thumbnail}" alt="${product.title}" class="product-image w-100">
                        ${product.discountPercentage > 0 ? `
                            <div class="position-absolute top-0 end-0 m-3">
                                <span class="badge bg-danger">-${Math.round(product.discountPercentage)}%</span>
                            </div>
                        ` : ''}
                    </div>
                    <div class="product-info d-flex flex-column">
                        <h5 class="product-title">${product.title}</h5>
                        <p class="product-description flex-grow-1">${product.description}</p>
                        
                        <div class="product-rating mb-2">
                            <div class="stars">${generateStars(product.rating)}</div>
                            <span class="rating-text">(${product.rating})</span>
                        </div>
                        
                        <div class="price-section mb-3">
                            <span class="product-price">${formatPrice(discountedPrice)}</span>
                            ${product.discountPercentage > 0 ? `
                                <span class="text-muted text-decoration-line-through ms-2">${formatPrice(product.price)}</span>
                            ` : ''}
                        </div>
                        
                        <button class="btn btn-primary add-to-cart-btn mt-auto" 
                                onclick="window.cartManager.addToCart(${product.id}, '${product.title}', ${discountedPrice}, '${product.thumbnail}')">
                            <i class="fas fa-cart-plus me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderPagination() {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="window.productsManager.goToPage(${this.currentPage - 1})">
                        <i class="fas fa-chevron-left"></i>
                    </a>
                </li>
            `;
        }

        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);

        if (startPage > 1) {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="window.productsManager.goToPage(1)">1</a>
                </li>
            `;
            if (startPage > 2) {
                paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="window.productsManager.goToPage(${i})">${i}</a>
                </li>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
            }
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="window.productsManager.goToPage(${totalPages})">${totalPages}</a>
                </li>
            `;
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="window.productsManager.goToPage(${this.currentPage + 1})">
                        <i class="fas fa-chevron-right"></i>
                    </a>
                </li>
            `;
        }

        pagination.innerHTML = paginationHTML;
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderProducts();
        this.renderPagination();
        
        // Scroll to products section
        document.getElementById('products').scrollIntoView({
            behavior: 'smooth'
        });
    }
}
