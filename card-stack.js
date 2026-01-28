/* ========================================
   ANIMATED CARD STACK SECTION JAVASCRIPT
   Add this to your existing JS file or create a new one
   ======================================== */

// Featured Products for Card Stack
const featuredProducts = [
    { id: 1, name: "Classic Suit", brand: "ARMANI", price: 48, category: "men",badge: "HOT", image: "images/m1.png", rating: 5, badge: "NEW" },
     { id: 2, name: "Evening Dress", brand: "CHANEL", price: 159, category: "women",badge: "HOT", image: "images/w1.png", rating: 5, badge: "HOT" },
    { id: 3, name: "Kids Jacket", brand: "GAP KIDS", price: 39, category: "kids", image: "images/k1.png", rating: 4, badge: "NEW" },
    { id: 4, name: "Sunglasses", brand: "RAY-BAN", price: 99, category: "accessories", image: "images/sunglass01.webp", rating: 5, badge: "HOT" },
     { id: 5, name: "Leather Jacket", brand: "BOSS", price: 69, category: "men", image: "images/m2.png", rating: 5, badge: "LIVE" },
     { id: 6, name: "Handbag", brand: "GUCCI", price: 249, category: "women", image: "images/w2.png", rating: 5, badge: "SALE" },
    { id: 7, name: "School Uniform", brand: "TOMMY", price: 29, category: "kids", image: "images/k7.png", rating: 4 },
    { id: 8, name: "Watch", brand: "ROLEX", price: 899, category: "accessories", image: "images/a2.jpg", rating: 5, badge: "NEW" },
];

// Card Stack State
let currentCardIndex = 0;
let autoPlayInterval;
let isAutoPlaying = true;
let cardStackFavorites = new Set();

// DOM Elements
const cardStack = document.getElementById('cardStack');
const navCircle = document.getElementById('navCircle');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const autoBtn = document.getElementById('autoBtn');
const progressDots = document.getElementById('progressDots');

// Initialize Card Stack
function initializeCardStack() {
    if (!cardStack) return; // Exit if element doesn't exist
    
    renderCards();
    createProgressDots();
    startAutoPlay();
    setupCardStackEventListeners();
}

// Render Cards
function renderCards() {
    if (!cardStack) return;
    
    const visibleCards = [
        featuredProducts[(currentCardIndex - 1 + featuredProducts.length) % featuredProducts.length],
        featuredProducts[(currentCardIndex + 1) % featuredProducts.length],
        featuredProducts[currentCardIndex]
    ];

    cardStack.innerHTML = visibleCards.map((product, index) => {
        const isFavorite = cardStackFavorites.has(product.id);
        return `
            <div class="product-card-stack" onclick="handleCardClick(${product.id})">
                <div class="card-image-wrapper" style="background: ${product.gradient}">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}" class="card-image">` : 
                        `<div class="card-emoji-fallback">${product.icon}</div>`
                    }
                    ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
                    <button class="card-favorite ${isFavorite ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleCardFavorite(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="card-info">
                    <div class="card-brand">${product.brand}</div>
                    <div class="card-name">${product.name}</div>
                    <div class="card-price">${product.price}</div>
                </div>
                <button class="card-add-cart" onclick="event.stopPropagation(); addCardToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        `;
    }).join('');

    updateProgressDots();
}

// Create Progress Dots
function createProgressDots() {
    if (!progressDots) return;
    
    progressDots.innerHTML = featuredProducts.map((_, index) => 
        `<div class="progress-dot ${index === currentCardIndex ? 'active' : ''}" 
              onclick="goToCardSlide(${index})"></div>`
    ).join('');
}

// Update Progress Dots
function updateProgressDots() {
    if (!progressDots) return;
    
    const dots = progressDots.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCardIndex);
    });
}

// Navigate to specific slide
function goToCardSlide(index) {
    currentCardIndex = index;
    renderCards();
    resetAutoPlay();
}

// Next slide
function nextCardSlide() {
    currentCardIndex = (currentCardIndex + 1) % featuredProducts.length;
    renderCards();
}

// Previous slide
function prevCardSlide() {
    currentCardIndex = (currentCardIndex - 1 + featuredProducts.length) % featuredProducts.length;
    renderCards();
}

// Toggle stack open/close
function toggleCardStack() {
    if (!cardStack || !navCircle) return;
    
    cardStack.classList.toggle('opened');
    navCircle.classList.toggle('opened');
}

// Auto play functions
function startAutoPlay() {
    if (isAutoPlaying) {
        autoPlayInterval = setInterval(nextCardSlide, 3000);
    }
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function toggleAutoPlay() {
    if (!autoBtn) return;
    
    isAutoPlaying = !isAutoPlaying;
    const icon = autoBtn.querySelector('i');
    
    if (isAutoPlaying) {
        icon.className = 'fas fa-play';
        autoBtn.classList.add('active');
        startAutoPlay();
    } else {
        icon.className = 'fas fa-pause';
        autoBtn.classList.remove('active');
        stopAutoPlay();
    }
}

function resetAutoPlay() {
    if (isAutoPlaying) {
        stopAutoPlay();
        startAutoPlay();
    }
}

// Event listeners setup
function setupCardStackEventListeners() {
    if (navCircle) {
        navCircle.addEventListener('click', toggleCardStack);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevCardSlide();
            resetAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextCardSlide();
            resetAutoPlay();
        });
    }
    
    if (autoBtn) {
        autoBtn.addEventListener('click', toggleAutoPlay);
    }
}

// Card interaction functions
function handleCardClick(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (!product) return;
    
    // If you have a product detail modal, show it here
    if (typeof showProductDetail === 'function') {
        // Find the product in your main products array
        const mainProduct = products.find(p => p.name === product.name);
        if (mainProduct) {
            showProductDetail(mainProduct.id);
        }
    } else {
        // Fallback: show alert with product info
        alert(`${product.name} - ${product.price}\n\nClick to view full details!`);
    }
}

function toggleCardFavorite(productId) {
    if (cardStackFavorites.has(productId)) {
        cardStackFavorites.delete(productId);
    } else {
        cardStackFavorites.add(productId);
    }
    
    // Sync with main favorites if the function exists
    if (typeof toggleFavorite === 'function') {
        const product = featuredProducts.find(p => p.id === productId);
        const mainProduct = products.find(p => p.name === product.name);
        if (mainProduct) {
            toggleFavorite(mainProduct.id);
        }
    }
    
    renderCards();
    console.log('Card Stack Favorites:', Array.from(cardStackFavorites));
}

function addCardToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (!product) return;
    
    // If you have an addToCart function, use it
    if (typeof addToCart === 'function') {
        const mainProduct = products.find(p => p.name === product.name);
        if (mainProduct) {
            addToCart(mainProduct.id);
        }
    } else {
        // Fallback: show alert
        alert(`${product.name} added to cart!`);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCardStack);
} else {
    initializeCardStack();
}

// If you're adding to existing window.onload, use this instead:
/*
const originalOnload = window.onload;
window.onload = function() {
    if (originalOnload) originalOnload();
    initializeCardStack();
};
*/