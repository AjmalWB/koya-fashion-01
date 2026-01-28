  
        // 3D Banner Animation
        function animate3DBanner() {
            const banner = document.getElementById('banner3d');

            const images = [
                'images/m1.png',
                'images/w1.png',
                'images/k7.png',
                'images/m11.png',
                'images/k1.png',
                'images/w2.png'
            ];

            let index = 0;

            // Set first image
            banner.style.backgroundImage = `url(${images[index]})`;

            setInterval(() => {
                index = (index + 1) % images.length;

                // Optional 3D animation
                banner.style.transform = 'rotateY(90deg)';

                setTimeout(() => {
                    banner.style.backgroundImage = `url(${images[index]})`;
                    banner.style.transform = 'rotateY(0deg)';
                }, 500);

            }, 3000);
        }

        animate3DBanner();

        // Render Rotating Cards
        function renderRotatingCards() {
            const container = document.getElementById('rotatingCards');
            const doubledCollections = [...collections, ...collections];
            
            container.innerHTML = doubledCollections.map(col => `
                <div class="rotating-card" style="background: ${col.gradient}">
                    <div>
                        <h3 style="font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 10px;">${col.title}</h3>
                        <p style="font-size: 1.1rem; opacity: 0.9;">${col.subtitle}</p>
                    </div>
                    <button class="btn-premium" style="background: white; color: #1a1a1a;">Explore Now</button>
                </div>
            `).join('');
        }

         // Render Products
        function renderProducts(filter = 'all', searchTerm = '') {
            let filtered = products;
            
            if (filter !== 'all') {
                filtered = products.filter(p => p.category === filter);
            }
            
            if (searchTerm) {
                filtered = filtered.filter(p => 
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            
            const grid = document.getElementById('productGrid');
            grid.innerHTML = filtered.map(product => createProductCard(product)).join('');
            
            // Render category pages
            renderCategoryProducts('men');
            renderCategoryProducts('women');
            renderCategoryProducts('kids');
            renderCategoryProducts('accessories');
        }

        // Render Category Products
        function renderCategoryProducts(category) {
            const filtered = products.filter(p => p.category === category);
            const grid = document.getElementById(`${category}Products`);
            if (grid) {
                grid.innerHTML = filtered.map(product => createProductCard(product)).join('');
            }
        }

        // Create Product Card
        function createProductCard(product) {
            const isFavorite = favorites.some(f => f.id === product.id);
            return `
                <div class="product-card">
                    <div class="product-image" onclick="showProductDetail(${product.id})">
                        <span>${product.icon}</span>
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                            <i class="fas fa-heart" ></i>
                        </button>
                    </div>
                    <div class="product-info">
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">${product.price}</div>
                        <div class="product-rating">
                            ${'<i class="fas fa-star star"></i>'.repeat(product.rating)}
                            ${'<i class="far fa-star star"></i>'.repeat(5 - product.rating)}
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
        }

        // Show Product Detail
        function showProductDetail(id) {
            const product = products.find(p => p.id === id);
            const modal = document.getElementById('productModal');
            const content = document.getElementById('productDetailContent');
            
            content.innerHTML = `
                <div class="detail-image">${product.icon}</div>
                <div class="detail-info">
                    <div class="product-brand">${product.brand}</div>
                    <h2>${product.name}</h2>
                    <div class="detail-price">${product.price}</div>
                    <div class="product-rating mb-3">
                        ${'<i class="fas fa-star star"></i>'.repeat(product.rating)}
                        ${'<i class="far fa-star star"></i>'.repeat(5 - product.rating)}
                        <span class="ms-2">(${product.rating}.0)</span>
                    </div>
                    <p>Premium quality ${product.name.toLowerCase()} from ${product.brand}. Crafted with the finest materials for ultimate comfort and style.</p>
                    
                    <div class="size-selector">
                        <span class="selector-label">Select Size:</span><br>
                        <span class="size-option" onclick="selectOption(this)">XS</span>
                        <span class="size-option" onclick="selectOption(this)">S</span>
                        <span class="size-option selected" onclick="selectOption(this)">M</span>
                        <span class="size-option" onclick="selectOption(this)">L</span>
                        <span class="size-option" onclick="selectOption(this)">XL</span>
                    </div>
                    
                    <div class="color-selector">
                        <span class="selector-label">Select Color:</span><br>
                        <span class="color-option selected" onclick="selectOption(this)">Black</span>
                        <span class="color-option" onclick="selectOption(this)">White</span>
                        <span class="color-option" onclick="selectOption(this)">Navy</span>
                        <span class="color-option" onclick="selectOption(this)">Gray</span>
                    </div>
                    
                    <button class="add-to-cart" onclick="addToCart(${product.id}); closeModal();">
                        <i class="fas fa-shopping-cart"></i> Add to Cart - ${product.price}
                    </button>
                </div>
            `;
            
            modal.classList.add('active');
        }

        function closeModal() {
            document.getElementById('productModal').classList.remove('active');
        }

        function selectOption(element) {
            const siblings = element.parentElement.querySelectorAll('.size-option, .color-option');
            siblings.forEach(s => s.classList.remove('selected'));
            element.classList.add('selected');
        }

       // Favorites
        function toggleFavorite(id) {
            const index = favorites.findIndex(f => f.id === id);
            if (index > -1) {
                favorites.splice(index, 1);
            } else {
                const product = products.find(p => p.id === id);
                favorites.push(product);
            }
            renderProducts(currentFilter);
            renderFavorites();
            updateBadges();
        }

        function renderFavorites() {
            const grid = document.getElementById('favoritesGrid');
            if (favorites.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state col-12">
                        <i class="fas fa-heart"></i>
                        <h3>No Favorites Yet</h3>
                        <p>Start adding items to your favorites!</p>
                        <button class="btn-premium mt-3" onclick="showPage('home')">Continue Shopping</button>
                    </div>
                `;
            } else {
                grid.innerHTML = favorites.map(product => createProductCard(product)).join('');
            }
        }

        // Cart Functions
        function addToCart(id) {
            const product = products.find(p => p.id === id);
            const existing = cart.find(item => item.id === id);
            
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateBadges();
            renderCart();
            
            // Show notification
            alert(`${product.name} added to cart!`);
        }

        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            renderCart();
            updateBadges();
        }

        function updateQuantity(id, change) {
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(id);
                } else {
                    renderCart();
                }
            }
        }

        function renderCart() {
            const container = document.getElementById('cartItems');
            const checkoutContainer = document.getElementById('checkoutItems');
            
            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Your Cart is Empty</h3>
                        <p>Add some items to get started!</p>
                        <button class="btn-premium mt-3" onclick="showPage('home')">Start Shopping</button>
                    </div>
                `;
            } else {
                container.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">${item.icon}</div>
                        <div class="flex-grow-1">
                            <div class="product-brand">${item.brand}</div>
                            <h4>${item.name}</h4>
                            <div class="product-price">${item.price}</div>
                        </div>
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span style="font-weight: 600; font-size: 1.1rem;">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <div style="text-align: right;">
                            <div class="product-price mb-2">${item.price * item.quantity}</div>
                            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                `).join('');
                
                // Update checkout items
                if (checkoutContainer) {
                    checkoutContainer.innerHTML = cart.map(item => `
                        <div class="d-flex justify-content-between mb-2">
                            <span>${item.name} x${item.quantity}</span>
                            <span>${item.price * item.quantity}</span>
                        </div>
                    `).join('');
                }
            }
            
            updateCartSummary();
        }

        function updateCartSummary() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * 0.1;
            const total = subtotal + tax + 20;
            
            document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)}`;
            document.getElementById('tax').textContent = `${tax.toFixed(2)}`;
            document.getElementById('total').textContent = `${total.toFixed(2)}`;
            
            const checkoutSubtotal = document.getElementById('checkoutSubtotal');
            const checkoutTax = document.getElementById('checkoutTax');
            const checkoutTotal = document.getElementById('checkoutTotal');
            
            if (checkoutSubtotal) checkoutSubtotal.textContent = `${subtotal.toFixed(2)}`;
            if (checkoutTax) checkoutTax.textContent = `${tax.toFixed(2)}`;
            if (checkoutTotal) checkoutTotal.textContent = `${total.toFixed(2)}`;
        }

        // Render Brands
        function renderBrands() {
            const grids = [document.getElementById('brandsGrid'), document.getElementById('allBrands')];
            const html = brands.map(brand => `
                <div class="brand-card">
                    <div class="brand-logo">${brand.icon}</div>
                    <div class="brand-name">${brand.name}</div>
                </div>
            `).join('');
            
            grids.forEach(grid => {
                if (grid) grid.innerHTML = html;
            });
        }

        // Filter Products
        function filterProducts(category) {
            currentFilter = category;
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            renderProducts(category);
        }

        // Search
        function initializeSearch() {
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', (e) => {
                renderProducts(currentFilter, e.target.value);
            });
        }

        // Page Navigation
        function showPage(pageName) {
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById(pageName + 'Page').classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            if (pageName === 'favorites') renderFavorites();
            if (pageName === 'cart') renderCart();
            if (pageName === 'checkout') {
                renderCart();
                updateCartSummary();
            }
        }

        // Update Badges
        function updateBadges() {
            document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('favCount').textContent = favorites.length;
        }

        // Place Order
        function placeOrder() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            alert('Thank you for your order! Your order has been placed successfully.');
            cart = [];
            updateBadges();
            showPage('home');
        }

         // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Close modal on outside click
        window.addEventListener('click', function(e) {
            const modal = document.getElementById('productModal');
            if (e.target === modal) {
                closeModal();
            }
        });


/* orbitwrapper========================================== */


       // Fashion Items Data
            const fashionItems = [
                {
                    id: 0,
                    name: "Summer Floral Dress",
                    price: "$89.99",
                    image: "images/w1.png",
                    description: "Embrace the warmth of summer with this stunning floral dress. Crafted from breathable cotton blend fabric, featuring a flattering A-line silhouette and vibrant botanical prints. Perfect for garden parties, beach outings, or casual summer gatherings.",
                    features: [
                        "100% Premium Cotton Blend",
                        "Adjustable Waist Tie",
                        "Side Pockets",
                        "Machine Washable",
                        "Available in Multiple Colors",
                        "Lightweight & Breathable"
                    ]
                },
                {
                    id: 1,
                    name: "Classic Denim Jacket",
                    price: "$129.99",
                    image: "images/m1.png",
                    description: "A timeless wardrobe essential that never goes out of style. This classic denim jacket features premium quality fabric with authentic distressing, brass button closures, and a comfortable relaxed fit. Layer it over any outfit for instant cool factor.",
                    features: [
                        "Premium Denim Fabric",
                        "Vintage Wash Finish",
                        "Multiple Pockets",
                        "Brass Button Closure",
                        "Adjustable Button Cuffs",
                        "Durable Construction"
                    ]
                },
                {
                    id: 2,
                    name: "Elegant Evening Gown",
                    price: "$199.99",
                    image: "images/k5.png",
                    description: "Make a grand entrance in this sophisticated evening gown. Featuring luxurious satin fabric, elegant draping, and a flattering floor-length design. The perfect choice for formal events, galas, and special celebrations.",
                    features: [
                        "Luxurious Satin Fabric",
                        "Floor-Length Design",
                        "Hidden Back Zipper",
                        "Built-in Bust Support",
                        "Dry Clean Only",
                        "Imported"
                    ]
                },
                {
                    id: 3,
                    name: "Casual Chic Outfit",
                    price: "$79.99",
                    image: "images/m9.png",
                    description: "Effortlessly stylish and comfortable, this casual chic ensemble is perfect for everyday wear. Combines modern design with practical functionality, featuring soft fabrics and a relaxed fit that works for both work and leisure.",
                    features: [
                        "Soft Cotton Blend",
                        "Relaxed Fit",
                        "Versatile Styling",
                        "Easy Care Fabric",
                        "Comfortable All-Day Wear",
                        "Modern Design"
                    ]
                },
                {
                    id: 4,
                    name: "Designer Handbag",
                    price: "$249.99",
                    image: "images/tshirt01.webp",
                    description: "Elevate your accessory game with this exquisite designer handbag. Crafted from premium leather with meticulous attention to detail, featuring gold-tone hardware and a spacious interior. A statement piece that complements any outfit.",
                    features: [
                        "Genuine Leather",
                        "Gold-Tone Hardware",
                        "Multiple Compartments",
                        "Adjustable Strap",
                        "Interior Zip Pocket",
                        "Dust Bag Included"
                    ]
                }
            ];

            // Carousel Functionality
            const fashionCards = document.querySelectorAll('.boz');
            let fashionCurrent = 2; // center index
            let fashionAutoRotateInterval;

            function updateFashionCards() {
                fashionCards.forEach((boz, index) => {
                    boz.classList.remove('active');
                    const offset = index - fashionCurrent;
                    boz.style.setProperty('--i', offset);
                });
                fashionCards[fashionCurrent].classList.add('active');
            }

            // Auto rotate function
            function startFashionAutoRotate() {
                fashionAutoRotateInterval = setInterval(() => {
                    fashionCurrent = (fashionCurrent + 1) % fashionCards.length;
                    updateFashionCards();
                }, 3000);
            }

            // Stop auto rotate
            function stopFashionAutoRotate() {
                clearInterval(fashionAutoRotateInterval);
            }

            // Click interaction
            fashionCards.forEach((boz, index) => {
                boz.addEventListener('click', () => {
                    const fashionItemId = parseInt(boz.getAttribute('data-fashion-item'));
                    openFashionModal(fashionItemId);
                });
            });

            // Initialize carousel
            updateFashionCards();
            startFashionAutoRotate();

            // Pause auto-rotate on hover
            const orbitWrapper = document.querySelector('.orbit-wrapper');
            if (orbitWrapper) {
                orbitWrapper.addEventListener('mouseenter', stopFashionAutoRotate);
                orbitWrapper.addEventListener('mouseleave', startFashionAutoRotate);
            }

            // Modal Functionality
            const fashionModal = document.getElementById('fashionDetailModal');
            const closeFashionModalBtn = document.getElementById('closeFashionModal');
            const fashionModalBackdrop = document.querySelector('.fashion-modal-backdrop');

            function openFashionModal(itemId) {
                const fashionItem = fashionItems[itemId];
                
                // Populate modal with fashion item data
                document.getElementById('fashionItemImage').src = fashionItem.image;
                document.getElementById('fashionItemTitle').textContent = fashionItem.name;
                document.getElementById('fashionItemCost').textContent = fashionItem.price;
                document.getElementById('fashionItemText').textContent = fashionItem.description;
                
                // Populate features
                const highlightsList = document.getElementById('fashionItemHighlights');
                highlightsList.innerHTML = '';
                fashionItem.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    highlightsList.appendChild(li);
                });
                
                // Show modal
                fashionModal.classList.add('fashion-active');
                document.body.style.overflow = 'hidden';
                
                // Stop auto-rotate when modal is open
                stopFashionAutoRotate();
            }

            function closeFashionModal() {
                fashionModal.classList.remove('fashion-active');
                document.body.style.overflow = 'auto';
                
                // Resume auto-rotate when modal is closed
                startFashionAutoRotate();
            }

            // Close modal events
            if (closeFashionModalBtn) {
                closeFashionModalBtn.addEventListener('click', closeFashionModal);
            }

            if (fashionModalBackdrop) {
                fashionModalBackdrop.addEventListener('click', closeFashionModal);
            }

            // Close modal with ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && fashionModal && fashionModal.classList.contains('fashion-active')) {
                    closeFashionModal();
                }
            });

            // Size selection
            const fashionSizeButtons = document.querySelectorAll('.fashion-size-choice');
            fashionSizeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    fashionSizeButtons.forEach(b => b.classList.remove('fashion-selected'));
                    btn.classList.add('fashion-selected');
                });
            });

            // Quantity selector
            const fashionQuantityInput = document.getElementById('fashionQuantity');
            const fashionDecreaseBtn = document.getElementById('fashionDecreaseQty');
            const fashionIncreaseBtn = document.getElementById('fashionIncreaseQty');

            if (fashionDecreaseBtn) {
                fashionDecreaseBtn.addEventListener('click', () => {
                    const currentValue = parseInt(fashionQuantityInput.value);
                    if (currentValue > 1) {
                        fashionQuantityInput.value = currentValue - 1;
                    }
                });
            }

            if (fashionIncreaseBtn) {
                fashionIncreaseBtn.addEventListener('click', () => {
                    const currentValue = parseInt(fashionQuantityInput.value);
                    if (currentValue < 10) {
                        fashionQuantityInput.value = currentValue + 1;
                    }
                });
            }

            // Add to Cart functionality
            const fashionAddToCartBtn = document.querySelector('.fashion-btn-add-bag');
            if (fashionAddToCartBtn) {
                fashionAddToCartBtn.addEventListener('click', () => {
                    const itemName = document.getElementById('fashionItemTitle').textContent;
                    const quantity = document.getElementById('fashionQuantity').value;
                    const selectedSize = document.querySelector('.fashion-size-choice.fashion-selected').textContent;
                    
                    alert(`Added to cart:\n${itemName}\nSize: ${selectedSize}\nQuantity: ${quantity}`);
                });
            }

            // Buy Now functionality
            const fashionBuyNowBtn = document.querySelector('.fashion-btn-purchase');
            if (fashionBuyNowBtn) {
                fashionBuyNowBtn.addEventListener('click', () => {
                    const itemName = document.getElementById('fashionItemTitle').textContent;
                    const quantity = document.getElementById('fashionQuantity').value;
                    const selectedSize = document.querySelector('.fashion-size-choice.fashion-selected').textContent;
                    
                    alert(`Proceeding to checkout:\n${itemName}\nSize: ${selectedSize}\nQuantity: ${quantity}`);
                });
            }


 // =============================================================

 // Horizontal scroll functionality with working buttons
                document.addEventListener('DOMContentLoaded', function() {
                    const scrollContainer = document.getElementById('productScroll');
                    const scrollLeftBtn = document.getElementById('scrollLeft');
                    const scrollRightBtn = document.getElementById('scrollRight');
                    
                    if (!scrollContainer || !scrollLeftBtn || !scrollRightBtn) {
                        console.error('Scroll elements not found');
                        return;
                    }

                    // Scroll amount (adjust based on your card width + gap)
                    const scrollAmount = 320;

                    // Scroll left button
                    scrollLeftBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        scrollContainer.scrollBy({
                            left: -scrollAmount,
                            behavior: 'smooth'
                        });
                    });

                    // Scroll right button
                    scrollRightBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        scrollContainer.scrollBy({
                            left: scrollAmount,
                            behavior: 'smooth'
                        });
                    });

                    // Update button states based on scroll position
                    function updateButtonStates() {
                        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                        const currentScroll = scrollContainer.scrollLeft;

                        // Disable left button at start
                        if (currentScroll <= 0) {
                            scrollLeftBtn.disabled = true;
                            scrollLeftBtn.style.opacity = '0.3';
                        } else {
                            scrollLeftBtn.disabled = false;
                            scrollLeftBtn.style.opacity = '1';
                        }

                        // Disable right button at end
                        if (currentScroll >= maxScroll - 1) {
                            scrollRightBtn.disabled = true;
                            scrollRightBtn.style.opacity = '0.3';
                        } else {
                            scrollRightBtn.disabled = false;
                            scrollRightBtn.style.opacity = '1';
                        }
                    }

                    // Initial button state check
                    updateButtonStates();

                    // Update button states on scroll
                    scrollContainer.addEventListener('scroll', updateButtonStates);

                    // Update button states on window resize
                    window.addEventListener('resize', updateButtonStates);
                });


// ==========================================================================================                

           
      

    



                