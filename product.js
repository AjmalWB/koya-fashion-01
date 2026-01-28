// Data Storage
let products = [];
let cart = [];
let favorites = [];
let currentFilter = 'all';

// Icon fallbacks for each category
const categoryIcons = {
    men: '🤵',
    women: '👗',
    kids: '👶',
    accessories: '👜'
};

// Brands Data
const brands = [
    { name: "ARMANI", icon: "👔" },
    { name: "GUCCI", icon: "👜" },
    { name: "PRADA", icon: "👠" },
    { name: "CHANEL", icon: "💄" },
    { name: "VERSACE", icon: "👗" },
    { name: "DIOR", icon: "💍" },
    { name: "BURBERRY", icon: "🧥" },
    { name: "ROLEX", icon: "⌚" }
];

// Initialize Products with Local Images
function initializeProducts() {
    products = [
        // Men's Collection
        { id: 1, name: "Classic Suit", brand: "ARMANI", price: 48, category: "men", image: "images/m1.png", rating: 5, badge: "NEW" },
        { id: 2, name: "Leather Jacket", brand: "BOSS", price: 69, category: "men", image: "images/m2.png", rating: 5, badge: "HOT" },
        { id: 3, name: "Casual Shirt", brand: "POLO", price: 29, category: "men", image: "images/m9.png", rating: 4 },
        { id: 4, name: "Denim Jeans", brand: "LEVI'S", price: 59, category: "men", image: "images/m4.png", rating: 5 },
        { id: 5, name: "Sneakers", brand: "NIKE", price: 89, category: "men", image: "images/m10.png", rating: 4, badge: "SALE" },
        { id: 6, name: "Winter Coat", brand: "BURBERRY", price: 129, category: "men", image: "images/m11.png", rating: 5, badge: "NEW" },
        
        // Women's Collection
        { id: 7, name: "Evening Dress", brand: "CHANEL", price: 159, category: "women", image: "images/w1.png", rating: 5, badge: "NEW" },
        { id: 8, name: "Handbag", brand: "GUCCI", price: 249, category: "women", image: "images/w2.png", rating: 5, badge: "HOT" },
        { id: 9, name: "High Heels", brand: "PRADA", price: 79, category: "women", image: "images/wmn01.1.webp", rating: 5 },
        { id: 10, name: "Blazer", brand: "VERSACE", price: 89, category: "women", image: "images/w4.png", rating: 4 },
        { id: 11, name: "Skirt", brand: "DIOR", price: 49, category: "women", image: "images/wmnpnt01.webp", rating: 4, badge: "SALE" },
        { id: 12, name: "Blouse", brand: "VALENTINO", price: 39, category: "women", image: "images/w3.png", rating: 5 },
        
        // Kids Collection
        { id: 13, name: "Kids Jacket", brand: "GAP KIDS", price: 39, category: "kids", image: "images/k1.png", rating: 4, badge: "NEW" },
        { id: 14, name: "School Uniform", brand: "TOMMY", price: 29, category: "kids", image: "images/k7.png", rating: 4 },
        { id: 15, name: "Sneakers", brand: "ADIDAS KIDS", price: 49, category: "kids", image: "images/k5.png", rating: 5 },
        { id: 16, name: "Dress", brand: "H&M KIDS", price: 25, category: "kids", image: "images/k4.png", rating: 4, badge: "SALE" },
        { id: 17, name: "Jeans", brand: "ZARA KIDS", price: 35, category: "kids", image: "images/k3.png", rating: 4 },
        { id: 18, name: "Winter Coat", brand: "COLUMBIA", price: 59, category: "kids", image: "images/k6.png", rating: 5 },
        
        // Accessories
        { id: 19, name: "Sunglasses", brand: "RAY-BAN", price: 99, category: "accessories", image: "images/sunglass01.webp", rating: 5, badge: "HOT" },
        { id: 20, name: "Watch", brand: "ROLEX", price: 899, category: "accessories", image: "images/a2.jpg", rating: 5, badge: "NEW" },
        { id: 21, name: "Belt", brand: "HERMÈS", price: 49, category: "accessories", image: "images/a3.jpg", rating: 4 },
        { id: 22, name: "Wallet", brand: "LV", price: 79, category: "accessories", image: "images/a4.jpg", rating: 5 },
        { id: 23, name: "Hat", brand: "BURBERRY", price: 39, category: "accessories", image: "images/a5.webp", rating: 4 },
        { id: 24, name: "Scarf", brand: "GUCCI", price: 59, category: "accessories", image: "images/a6.jpg", rating: 5, badge: "SALE" }
    ];
}

// Handle image load error
function handleImageError(img, category) {
    const container = img.parentElement;
    container.classList.add('has-error');
    img.style.display = 'none';
    
    const placeholder = container.querySelector('.placeholder');
    if (placeholder) {
        placeholder.style.display = 'block';
    }
}

// Render Products
function renderProducts(productsToRender, targetId = 'productGrid') {
    const grid = document.getElementById(targetId);
    if (!grid) return;
    
    grid.innerHTML = '';

    productsToRender.forEach(product => {
        const isFavorite = favorites.some(fav => fav.id === product.id);
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const fallbackIcon = categoryIcons[product.category] || '🛍️';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="handleImageError(this, '${product.category}')">
                <div class="placeholder">${fallbackIcon}</div>
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id}, event)">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">
                    ${'<i class="fas fa-star star"></i>'.repeat(product.rating)}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        
        card.querySelector('.product-image').addEventListener('click', () => showProductDetail(product.id));
        grid.appendChild(card);
    });
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    renderProducts(filtered);
}

// Toggle Favorite
function toggleFavorite(productId, event) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);
    const index = favorites.findIndex(fav => fav.id === productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(product);
    }
    
    updateBadges();
    
    // Re-render current view
    if (document.getElementById('favoritesPage').classList.contains('active')) {
        renderFavorites();
    } else {
        const filtered = currentFilter === 'all' 
            ? products 
            : products.filter(p => p.category === currentFilter);
        renderProducts(filtered);
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateBadges();
    updateCart();
    
    // Show success message
    showNotification(`${product.name} added to cart!`);
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Show Product Detail
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const content = document.getElementById('productDetailContent');
    
    const fallbackIcon = categoryIcons[product.category] || '🛍️';
    
    content.innerHTML = `
        <div class="detail-image">
            <img src="${product.image}" 
                 alt="${product.name}"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div class="placeholder" style="display: none;">${fallbackIcon}</div>
        </div>
        <div class="detail-info">
            <div class="product-brand">${product.brand}</div>
            <h2>${product.name}</h2>
            <div class="detail-price">$${product.price}</div>
            <div class="product-rating mb-3">
                ${'<i class="fas fa-star star"></i>'.repeat(product.rating)}
            </div>
            <p class="mb-4">Premium quality ${product.name.toLowerCase()} from ${product.brand}. Perfect for any occasion. Made with the finest materials and crafted with attention to detail.</p>
            <button class="add-to-cart" onclick="addToCart(${product.id}); closeModal();">
                Add to Cart - $${product.price}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

// Close Modal
function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        if (emptyCart) emptyCart.style.display = 'block';
        updateCartSummary();
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/120'">
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.brand}</p>
                <p class="text-muted">$${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span style="font-weight: 600; min-width: 30px; text-align: center;">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total">
                <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            updateBadges();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    updateBadges();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 20 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    const elements = {
        subtotal: document.getElementById('subtotal'),
        shipping: document.getElementById('shipping'),
        tax: document.getElementById('tax'),
        total: document.getElementById('total'),
        checkoutSubtotal: document.getElementById('checkoutSubtotal'),
        checkoutTax: document.getElementById('checkoutTax'),
        checkoutTotal: document.getElementById('checkoutTotal'),
        checkoutItems: document.getElementById('checkoutItems')
    };
    
    if (elements.subtotal) elements.subtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (elements.shipping) elements.shipping.textContent = `$${shipping.toFixed(2)}`;
    if (elements.tax) elements.tax.textContent = `$${tax.toFixed(2)}`;
    if (elements.total) elements.total.textContent = `$${total.toFixed(2)}`;
    if (elements.checkoutSubtotal) elements.checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (elements.checkoutTax) elements.checkoutTax.textContent = `$${tax.toFixed(2)}`;
    if (elements.checkoutTotal) elements.checkoutTotal.textContent = `$${total.toFixed(2)}`;
    
    if (elements.checkoutItems) {
        elements.checkoutItems.innerHTML = cart.map(item => `
            <div class="d-flex justify-content-between mb-2">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
    }
}

// Render Favorites
function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    const emptyMessage = document.getElementById('emptyFavorites');
    
    if (favorites.length === 0) {
        grid.innerHTML = '';
        if (emptyMessage) emptyMessage.style.display = 'block';
        return;
    }
    
    if (emptyMessage) emptyMessage.style.display = 'none';
    renderProducts(favorites, 'favoritesGrid');
}

// Render Brands
function renderBrands() {
    const grid = document.getElementById('brandsGrid');
    if (!grid) return;
    
    grid.innerHTML = brands.map(brand => `
        <div class="brand-card">
            <div class="brand-logo">${brand.icon}</div>
            <div class="brand-name">${brand.name}</div>
        </div>
    `).join('');
}

// Update Badges
function updateBadges() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const favCount = favorites.length;
    
    const cartBadge = document.getElementById('cartCount');
    const favBadge = document.getElementById('favCount');
    
    if (cartBadge) cartBadge.textContent = cartCount;
    if (favBadge) favBadge.textContent = favCount;
}

// Show Page
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const page = document.getElementById(pageName + 'Page');
    if (page) {
        page.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link-custom').forEach(link => {
        link.classList.remove('active');
    });
    
    // Render appropriate content
    switch(pageName) {
        case 'home':
            renderProducts(products);
            renderBrands();
            break;
        case 'men':
            renderProducts(products.filter(p => p.category === 'men'), 'menProducts');
            break;
        case 'women':
            renderProducts(products.filter(p => p.category === 'women'), 'womenProducts');
            break;
        case 'kids':
            renderProducts(products.filter(p => p.category === 'kids'), 'kidsProducts');
            break;
        case 'accessories':
            renderProducts(products.filter(p => p.category === 'accessories'), 'accessoriesProducts');
            break;
        case 'favorites':
            renderFavorites();
            break;
        case 'cart':
            updateCart();
            break;
        case 'checkout':
            updateCartSummary();
            break;
    }
}

// Place Order
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Simulate order placement
    alert('Order placed successfully! Thank you for shopping with KOYA Fashion.');
    cart = [];
    updateBadges();
    showPage('home');
}

// Mobile Menu Close Function
function closeMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
    if (menuToggle) {
        menuToggle.classList.remove('active');
    }
}

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    closeMenu();
                }
            }
        });
        
        // Prevent menu from closing when clicking inside it
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Close modal on outside click
    const modal = document.getElementById('productModal');
    if (modal) {
        document.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});

// Initialize everything on window load
window.addEventListener('load', function() {
    initializeProducts();
    renderProducts(products);
    renderBrands();
    updateBadges();
});

// Close menu on window resize if width > 991px
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    }, 250);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);