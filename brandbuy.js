// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Sample product data (in real app, this would come from backend)
const productData = {
    1: {
        name: "Tommy Hilfiger",
        subtitle: "Men's Solid Casual Shirt Pure Cotton Denim Light Wash",
        price: 1251,
        originalPrice: 2599,
        discount: 51,
        rating: 4.2,
        reviews: 2,
        images: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&h=1000&fit=crop"
        ],
        colors: [
            { name: "Blue", hex: "#4169E1" },
            { name: "Black", hex: "#000000" },
            { name: "White", hex: "#ffffff" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
    }
};

// State
let selectedColor = "Blue";
let selectedSize = "XL";
let cartCount = 0;
let wishlistCount = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    if (productId && productData[productId]) {
        loadProductData(productData[productId]);
    }
    initializeColorSelector();
    initializeSizeSelector();
    initializeButtons();
    initializeWishlist();
});

// Load product data
function loadProductData(product) {
    document.getElementById('breadcrumbProduct').textContent = product.name;
    document.querySelector('.product-title').textContent = product.name;
    document.querySelector('.product-subtitle').textContent = product.subtitle;
}

// Change main image
function changeImage(thumbnail, imageUrl) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageUrl;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
    
    // Add fade animation
    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.style.opacity = '1';
    }, 100);
}

// Initialize color selector
function initializeColorSelector() {
    const colorButtons = document.querySelectorAll('.color-choice');
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active from all
            colorButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            selectedColor = this.dataset.color;
            
            console.log('Selected color:', selectedColor);
        });
    });
}

// Initialize size selector
function initializeSizeSelector() {
    const sizeButtons = document.querySelectorAll('.size-choice');
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active from all
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            selectedSize = this.dataset.size;
            
            console.log('Selected size:', selectedSize);
        });
    });
}

// Initialize action buttons
function initializeButtons() {
    // Add to bag button
    const buyButton = document.querySelector('.btn-buy');
    if (buyButton) {
        buyButton.addEventListener('click', function() {
            addToBag();
        });
    }

    // Wishlist button
    const wishlistButton = document.querySelector('.btn-wishlist');
    if (wishlistButton) {
        wishlistButton.addEventListener('click', function() {
            addToWishlist();
        });
    }

    // Large wishlist button
    const wishlistBtnLarge = document.querySelector('.wishlist-btn-large');
    if (wishlistBtnLarge) {
        wishlistBtnLarge.addEventListener('click', function() {
            addToWishlist();
        });
    }

    // Pincode check button
    const checkButton = document.querySelector('.check-btn');
    if (checkButton) {
        checkButton.addEventListener('click', function() {
            checkPincode();
        });
    }
}

// Add to bag functionality
function addToBag() {
    if (!selectedColor) {
        alert('Please select a color');
        return;
    }
    
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }

    cartCount++;
    updateCartBadge();
    
    // Show success message
    showNotification('Product added to bag!', 'success');
    
    // Add animation to button
    const button = document.querySelector('.btn-buy');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// Add to wishlist functionality
function addToWishlist() {
    wishlistCount++;
    updateWishlistBadge();
    
    // Show success message
    showNotification('Added to wishlist!', 'success');
    
    // Update wishlist button icon
    const wishlistBtns = document.querySelectorAll('.btn-wishlist, .wishlist-btn-large');
    wishlistBtns.forEach(btn => {
        btn.style.color = '#ff4757';
    });
}

// Initialize wishlist badge
function initializeWishlist() {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        const badge = wishlistBtn.querySelector('.badge');
        if (badge) {
            badge.textContent = wishlistCount;
        }
    }
}

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-btn .badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        
        // Add bounce animation
        cartBadge.style.animation = 'none';
        setTimeout(() => {
            cartBadge.style.animation = 'bounce 0.5s ease';
        }, 10);
    }
}

// Update wishlist badge
function updateWishlistBadge() {
    const wishlistBadge = document.querySelector('.wishlist-btn .badge');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlistCount;
        
        // Add bounce animation
        wishlistBadge.style.animation = 'none';
        setTimeout(() => {
            wishlistBadge.style.animation = 'bounce 0.5s ease';
        }, 10);
    }
}

// Check pincode functionality
function checkPincode() {
    const pincodeInput = document.querySelector('.pincode-input');
    const pincode = pincodeInput.value.trim();
    
    if (!pincode) {
        showNotification('Please enter a pincode', 'error');
        return;
    }
    
    if (pincode.length !== 6 || isNaN(pincode)) {
        showNotification('Please enter a valid 6-digit pincode', 'error');
        return;
    }
    
    // Simulate API call
    showNotification('Checking delivery availability...', 'info');
    
    setTimeout(() => {
        showNotification(`Delivery available to ${pincode}!`, 'success');
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#2ecc71',
        error: '#ff4757',
        info: '#3498db'
    };
    notification.style.background = colors[type] || colors.info;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Image gallery keyboard navigation
document.addEventListener('keydown', function(e) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const activeThumbnail = document.querySelector('.thumbnail.active');
    let currentIndex = Array.from(thumbnails).indexOf(activeThumbnail);
    
    if (e.key === 'ArrowRight' && currentIndex < thumbnails.length - 1) {
        thumbnails[currentIndex + 1].click();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        thumbnails[currentIndex - 1].click();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.3);
        }
    }
    
    .main-image img {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        console.log('Mobile menu clicked');
        // Add mobile menu functionality here
    });
}

// Size chart modal (placeholder)
const sizeChartLink = document.querySelector('.size-chart-link');
if (sizeChartLink) {
    sizeChartLink.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Size chart coming soon!', 'info');
    });
}

// Rate product button
const rateButton = document.querySelector('.reviews-header .btn-outline');
if (rateButton) {
    rateButton.addEventListener('click', function() {
        showNotification('Rating functionality coming soon!', 'info');
    });
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Track scroll position for sticky elements
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove shadow to header based on scroll
    const header = document.querySelector('.main-header');
    if (scrollTop > 10) {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});
