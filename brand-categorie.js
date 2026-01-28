// Sample product data
const products = [
    {
        id: 1,
        name: "Tommy Hilfiger Men's Classic Belt",
        brand: "Tommy Hilfiger",
        category: "belts",
        price: 89.99,
        originalPrice: 129.99,
        discount: 31,
        rating: 4.5,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1624222247344-67d38ab94900?w=400&h=500&fit=crop",
        badge: "Sale"
    },
    {
        id: 2,
        name: "Classic Denim Shirt - Light Blue",
        brand: "Tommy Hilfiger",
        category: "shirts",
        price: 79.99,
        originalPrice: 119.99,
        discount: 33,
        rating: 4.7,
        reviews: 456,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
        badge: "Trending"
    },
    {
        id: 3,
        name: "Leather Bi-Fold Wallet - Brown",
        brand: "Tommy Hilfiger",
        category: "wallets",
        price: 65.99,
        originalPrice: 89.99,
        discount: 27,
        rating: 4.3,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=500&fit=crop",
        badge: "New"
    },
    {
        id: 4,
        name: "Premium Leather Belt - Black",
        brand: "Tommy Hilfiger",
        category: "belts",
        price: 95.99,
        originalPrice: 139.99,
        discount: 31,
        rating: 4.6,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
        badge: ""
    },
    {
        id: 5,
        name: "Casual Cotton Shorts - Beige",
        brand: "Nike",
        category: "shorts",
        price: 49.99,
        originalPrice: 69.99,
        discount: 29,
        rating: 4.4,
        reviews: 278,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop",
        badge: "Sale"
    },
    {
        id: 6,
        name: "Classic Oxford Shoes - Brown",
        brand: "Adidas",
        category: "shoes",
        price: 129.99,
        originalPrice: 189.99,
        discount: 32,
        rating: 4.8,
        reviews: 523,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=500&fit=crop",
        badge: "Bestseller"
    },
    {
        id: 7,
        name: "Reversible Leather Belt",
        brand: "Tommy Hilfiger",
        category: "belts",
        price: 99.99,
        originalPrice: 149.99,
        discount: 33,
        rating: 4.5,
        reviews: 267,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
        badge: ""
    },
    {
        id: 8,
        name: "Classic Polo Shirt - Navy",
        brand: "Tommy Hilfiger",
        category: "shirts",
        price: 59.99,
        originalPrice: 89.99,
        discount: 33,
        rating: 4.6,
        reviews: 445,
        image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=500&fit=crop",
        badge: "Trending"
    },
    {
        id: 9,
        name: "Genuine Leather Wallet - Black",
        brand: "Tommy Hilfiger",
        category: "wallets",
        price: 75.99,
        originalPrice: 109.99,
        discount: 31,
        rating: 4.7,
        reviews: 398,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=500&fit=crop",
        badge: "New"
    },
    {
        id: 10,
        name: "Casual Summer Shorts",
        brand: "Puma",
        category: "shorts",
        price: 45.99,
        originalPrice: 65.99,
        discount: 30,
        rating: 4.3,
        reviews: 198,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop",
        badge: ""
    },
    {
        id: 11,
        name: "Formal Dress Belt - Brown",
        brand: "Tommy Hilfiger",
        category: "belts",
        price: 85.99,
        originalPrice: 119.99,
        discount: 28,
        rating: 4.4,
        reviews: 223,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
        badge: ""
    },
    {
        id: 12,
        name: "Slim Fit Dress Shirt",
        brand: "Tommy Hilfiger",
        category: "shirts",
        price: 69.99,
        originalPrice: 99.99,
        discount: 30,
        rating: 4.5,
        reviews: 367,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
        badge: "Sale"
    }
];

// State
let currentProducts = [...products];
let selectedFilters = {
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    priceMax: 500,
    discount: null
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(currentProducts);
    initializeFilters();
    initializeMobileMenu();
    initializeSidebar();
});

// Render products
function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    
    if (productsToRender.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="font-size: 1.2rem; color: var(--text-secondary);">No products found matching your filters.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = productsToRender.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.05}s;" onclick="goToProduct(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <button class="product-wishlist" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    <span class="discount">${product.discount}% OFF</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '★'.repeat(fullStars);
    if (halfStar) stars += '☆';
    stars += '☆'.repeat(emptyStars);
    
    return stars;
}

// Navigate to product page
function goToProduct(productId) {
    window.location.href = `brandbuy.html?id=${productId}`;
}

// Toggle wishlist
function toggleWishlist(productId) {
    console.log('Toggled wishlist for product:', productId);
    // Add wishlist logic here
}

// Initialize filters
function initializeFilters() {
    // Category filters
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedFilters.categories.push(this.value);
            } else {
                selectedFilters.categories = selectedFilters.categories.filter(c => c !== this.value);
            }
            applyFilters();
        });
    });

    // Brand filters
    document.querySelectorAll('input[name="brand"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedFilters.brands.push(this.value);
            } else {
                selectedFilters.brands = selectedFilters.brands.filter(b => b !== this.value);
            }
            applyFilters();
        });
    });

    // Price slider
    const priceSlider = document.getElementById('priceSlider');
    const maxPrice = document.getElementById('maxPrice');
    
    priceSlider.addEventListener('input', function() {
        selectedFilters.priceMax = parseInt(this.value);
        maxPrice.textContent = `$${this.value}`;
        applyFilters();
    });

    // Color options
    document.querySelectorAll('.color-option').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const color = this.dataset.color;
            
            if (this.classList.contains('active')) {
                selectedFilters.colors.push(color);
            } else {
                selectedFilters.colors = selectedFilters.colors.filter(c => c !== color);
            }
            applyFilters();
        });
    });

    // Size options
    document.querySelectorAll('.size-option').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const size = this.textContent;
            
            if (this.classList.contains('active')) {
                selectedFilters.sizes.push(size);
            } else {
                selectedFilters.sizes = selectedFilters.sizes.filter(s => s !== size);
            }
            applyFilters();
        });
    });

    // Discount filters
    document.querySelectorAll('input[name="discount"]').forEach(radio => {
        radio.addEventListener('change', function() {
            selectedFilters.discount = parseInt(this.value);
            applyFilters();
        });
    });

    // Clear filters
    document.querySelector('.clear-filters').addEventListener('click', clearAllFilters);

    // Sort dropdown
    document.getElementById('sortSelect').addEventListener('change', function() {
        sortProducts(this.value);
    });
}

// Apply filters
function applyFilters() {
    currentProducts = products.filter(product => {
        // Category filter
        if (selectedFilters.categories.length > 0 && 
            !selectedFilters.categories.includes('all') && 
            !selectedFilters.categories.includes(product.category)) {
            return false;
        }

        // Brand filter
        if (selectedFilters.brands.length > 0 && 
            !selectedFilters.brands.some(brand => product.brand.toLowerCase().includes(brand))) {
            return false;
        }

        // Price filter
        if (product.price > selectedFilters.priceMax) {
            return false;
        }

        // Discount filter
        if (selectedFilters.discount && product.discount < selectedFilters.discount) {
            return false;
        }

        return true;
    });

    renderProducts(currentProducts);
    updateItemCount();
}

// Sort products
function sortProducts(sortBy) {
    switch(sortBy) {
        case 'price-low':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            currentProducts.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
            currentProducts.sort((a, b) => b.reviews - a.reviews);
            break;
        default:
            currentProducts = [...products];
    }
    renderProducts(currentProducts);
}

// Clear all filters
function clearAllFilters() {
    selectedFilters = {
        categories: [],
        brands: [],
        colors: [],
        sizes: [],
        priceMax: 500,
        discount: null
    };

    // Reset UI
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('active'));
    document.getElementById('priceSlider').value = 500;
    document.getElementById('maxPrice').textContent = '$500';

    currentProducts = [...products];
    renderProducts(currentProducts);
    updateItemCount();
}

// Update item count
function updateItemCount() {
    const count = currentProducts.length;
    document.querySelector('.item-count').textContent = `- ${count} Items`;
}

// Initialize mobile menu
function initializeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            // Add mobile menu functionality here
            console.log('Mobile menu clicked');
        });
    }
}

// Initialize sidebar toggle for mobile
function initializeSidebar() {
    const filterBtn = document.querySelector('.filter-toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    body.appendChild(overlay);

    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}

// Search functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        currentProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
        
        renderProducts(currentProducts);
        updateItemCount();
    });
}

// Pagination functionality
document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.disabled) return;
        
        document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
