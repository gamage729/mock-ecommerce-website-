// Product data
const products = [
    {
        id: 1,
        name: "Ultra HD Smart TV",
        category: "electronics",
        price: 499.99,
        image: "images/p1.jpg",
        description: "Experience stunning picture quality with this 55-inch Ultra HD Smart TV. Features built-in streaming apps, voice control, and multiple HDMI ports for your gaming and entertainment needs."
    },
    {
        id: 2,
        name: "Wireless Noise-Cancelling Headphones",
        category: "electronics",
        price: 199.99,
        image: "images/p2.jpg",
        description: "Immerse yourself in your favorite music with these premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design."
    },
    {
        id: 3,
        name: "Professional Blender",
        category: "home",
        price: 89.99,
        image: "images/p3.jpg",
        description: "This high-powered blender makes smoothies, soups, and sauces with ease. Features variable speed control, pulse function, and a large capacity jar."
    },
    {
        id: 4,
        name: "Smartphone Stand & Wireless Charger",
        category: "electronics",
        price: 39.99,
        image: "images/p4.jpg",
        description: "Charge your phone while keeping it at a convenient viewing angle. Compatible with most smartphones, this wireless charger delivers fast charging while looking stylish on your desk."
    },
    {
        id: 5,
        name: "Classic Denim Jacket",
        category: "clothing",
        price: 59.99,
        image: "images/p5.jpg",
        description: "A timeless addition to any wardrobe, this denim jacket features a comfortable fit, stylish wash, and durable construction that will last for years."
    },
    {
        id: 6,
        name: "Cotton Casual T-Shirt",
        category: "clothing",
        price: 19.99,
        image: "images/p6.jpg",
        description: "Made from 100% premium cotton, this comfortable t-shirt is perfect for everyday wear. Available in multiple colors and features a classic fit."
    },
    {
        id: 7,
        name: "Stainless Steel Cookware Set",
        category: "home",
        price: 149.99,
        image: "images/p7.jpg",
        description: "Upgrade your kitchen with this 10-piece stainless steel cookware set. Includes pots and pans of various sizes, all with heat-resistant handles and durable construction."
    },
    {
        id: 8,
        name: "Shoes",
        category: "clothing",
        price: 79.99,
        image: "images/p8.jpg",
        description: "Designed for comfort and better looking, these lightweight shoes feature responsive cushioning, breathable mesh upper, and durable outsole for traction on various surfaces."
    },
    {
        id: 9,
        name: "Smart Home Assistant",
        category: "electronics",
        price: 119.99,
        image: "images/p9.jpg",
        description: "Control your smart home devices, play music, get information, and more with this voice-activated smart assistant. Features premium sound quality and far-field voice recognition."
    },
    {
        id: 10,
        name: "Luxury Bed Sheet Set",
        category: "home",
        price: 69.99,
        image: "images/p10.jpg",
        description: "Made from 100% Egyptian cotton with a 400 thread count, this luxurious sheet set includes a fitted sheet, flat sheet, and two pillowcases for the ultimate sleeping experience."
    },
   
];

document.addEventListener('DOMContentLoaded', function() {
    // Get the header height for offset calculations
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    // Current page URL for comparison
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Handle Home link specifically
    const homeLink = document.querySelector('nav ul li a.active');
    if (homeLink) {
      homeLink.addEventListener('click', function(e) {
        // If we're already on the homepage, just scroll to top
        if (currentPage === 'index.html' || currentPage === '') {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        // Otherwise the default behavior (navigate to index.html) will happen
      });
    }
    
    // Handle all section links (anchors with hash)
    document.querySelectorAll('nav ul li a[href^="#"]:not([href="#"])').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Calculate position accounting for header height
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          // Scroll to that position
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Check if there's a hash in the URL on page load (for direct links to sections)
    if (window.location.hash) {
      const targetId = window.location.hash;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Wait a moment for page to fully load before scrolling
        setTimeout(function() {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 300);
      }
    }
  });

// FIX: Only select valid href attributes that start with # and aren't just #
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerElement = document.querySelector('header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

// Initialize banner when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start rotation every 5 seconds
    setInterval(rotateBanner, 5000);
    
    // Ensure first slide is active initially
    const slides = document.querySelectorAll('.banner-slide');
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
});

// Initialize localStorage if not already set
function initializeLocalStorage() {
    // Clear existing data for testing purposes
    localStorage.removeItem('products');
    localStorage.removeItem('basket');
    
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    
    if (!localStorage.getItem('basket')) {
        localStorage.setItem('basket', JSON.stringify([]));
    }
}

// Load basket items count
function loadBasketCount() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const count = basket.reduce((total, item) => total + item.quantity, 0);
    const basketCountElement = document.getElementById('basket-count');
    if (basketCountElement) {
        basketCountElement.textContent = count;
    }
}

// Add item to basket
function addToBasket(productId) {
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const existingItem = basket.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        basket.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('basket', JSON.stringify(basket));
    loadBasketCount();
    
    // Show confirmation
    alert(`${product.name} added to your basket!`);
}

// FIX: Update active navigation link with error handling
function updateActiveNavLink(category) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to the appropriate link
    if (category === 'all') {
        // If showing all products, mark Home as active
        const homeLink = document.querySelector('nav ul li a[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    } else if (category === 'home') {
        // For Home & Kitchen category, use the home-kitchen-link
        const homeKitchenLink = document.querySelector('nav ul li a#home-kitchen-link');
        if (homeKitchenLink) {
            homeKitchenLink.classList.add('active');
        }
    } else if (category) {
        // Otherwise, find the link by its ID and mark it as active
        const targetLink = document.querySelector(`nav ul li a#${category}-link`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }
}

// Render products based on filter
function renderProducts(filter = 'all', searchTerm = '') {
    const productsContainer = document.getElementById('products');
    
    // If products container doesn't exist, return early
    if (!productsContainer) return;
    
    const products = JSON.parse(localStorage.getItem('products'));
    
    // Update active navigation link
    updateActiveNavLink(filter);
    
    // Filter products
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    // Search products
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(term) || 
            product.description.toLowerCase().includes(term)
        );
    }
    
    // Clear previous products
    productsContainer.innerHTML = '';
    
    // Show message if no products found
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-results">
                <p>No products found matching your criteria.</p>
                <button class="btn" onclick="renderProducts()">Show All Products</button>
            </div>
        `;
        return;
    }
    
    // Render products
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // FIX: Changed the way images are displayed
        // Using img element instead of background-image for better error handling
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='images/fallback.png';">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn" onclick="showProductDetail(${product.id})">View Details</button>
                    <button class="btn btn-accent" onclick="addToBasket(${product.id})">Add to Basket</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Show product detail modal
function showProductDetail(productId) {
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const productDetail = document.getElementById('product-detail');
    
    if (!modal || !productDetail) return;
    
    // FIX: Changed product detail image to use img tag too
    productDetail.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='images/fallback.png';">
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <div class="product-detail-category">${product.category}</div>
            <div class="product-detail-price">$${product.price.toFixed(2)}</div>
            <p class="product-detail-description">${product.description}</p>
            <button class="btn btn-accent" onclick="addToBasket(${product.id}); closeModal()">Add to Basket</button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeLocalStorage();
    loadBasketCount();
    
    // Make sure products container exists before rendering
    const productsContainer = document.getElementById('products');
    if (productsContainer) {
        renderProducts();
    }
    
    // Set up filter options
    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            filterOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            // Render products with selected filter
            renderProducts(this.dataset.filter);
        });
    });
    
    // Set up category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            // Update filter options
            filterOptions.forEach(opt => opt.classList.remove('active'));
            const targetFilterOption = document.querySelector(`.filter-option[data-filter="${category}"]`);
            if (targetFilterOption) {
                targetFilterOption.classList.add('active');
            }
            // Render products
            renderProducts(category);
        });
    });
    
    // Set up category links in nav - with checks for element existence
    const electronicsLink = document.getElementById('electronics-link');
    if (electronicsLink) {
        electronicsLink.addEventListener('click', function(e) {
            e.preventDefault();
            filterOptions.forEach(opt => opt.classList.remove('active'));
            const targetFilterOption = document.querySelector('.filter-option[data-filter="electronics"]');
            if (targetFilterOption) {
                targetFilterOption.classList.add('active');
            }
            renderProducts('electronics');
        });
    }
    
    const clothingLink = document.getElementById('clothing-link');
    if (clothingLink) {
        clothingLink.addEventListener('click', function(e) {
            e.preventDefault();
            filterOptions.forEach(opt => opt.classList.remove('active'));
            const targetFilterOption = document.querySelector('.filter-option[data-filter="clothing"]');
            if (targetFilterOption) {
                targetFilterOption.classList.add('active');
            }
            renderProducts('clothing');
        });
    }
    
    // Fix for Home & Kitchen link - Updated ID to match HTML
    const homeKitchenLink = document.getElementById('home-kitchen-link');
    if (homeKitchenLink) {
        homeKitchenLink.addEventListener('click', function(e) {
            e.preventDefault();
            filterOptions.forEach(opt => opt.classList.remove('active'));
            const targetFilterOption = document.querySelector('.filter-option[data-filter="home"]');
            if (targetFilterOption) {
                targetFilterOption.classList.add('active');
            }
            renderProducts('home');
        });
    }
    
    const sportsLink = document.getElementById('sports-link');
    if (sportsLink) {
        sportsLink.addEventListener('click', function(e) {
            e.preventDefault();
            filterOptions.forEach(opt => opt.classList.remove('active'));
            const targetFilterOption = document.querySelector('.filter-option[data-filter="sports"]');
            if (targetFilterOption) {
                targetFilterOption.classList.add('active');
            }
            renderProducts('sports');
        });
    }
    
    // Home link should show all products - with existence check
    const homeLink = document.querySelector('nav ul li a[href="index.html"]');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            filterOptions.forEach(opt => opt.classList.remove('active'));
            const allFilterOption = document.querySelector('.filter-option[data-filter="all"]');
            if (allFilterOption) {
                allFilterOption.classList.add('active');
            }
            renderProducts('all');
        });
    }
    
    // Set up search
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('search-input');
            if (!searchInput) return;
            
            const searchTerm = searchInput.value;
            const activeFilter = document.querySelector('.filter-option.active');
            
            if (activeFilter) {
                renderProducts(activeFilter.dataset.filter, searchTerm);
            } else {
                renderProducts('all', searchTerm);
            }
        });
    }
    
    // Close modal when clicking close button
    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside content
    const productModal = document.getElementById('product-modal');
    if (productModal) {
        productModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // Register popup handling
    const navRegisterBtn = document.getElementById('nav-register-btn');
    const closeRegisterBtn = document.getElementById('close-register');
    const registerPopup = document.getElementById('register-popup');
    
    if (navRegisterBtn && registerPopup) {
        navRegisterBtn.addEventListener('click', function (e) {
            e.preventDefault();
            registerPopup.style.display = 'block';
        });
    }
    
    if (closeRegisterBtn && registerPopup) {
        closeRegisterBtn.addEventListener('click', function () {
            registerPopup.style.display = 'none';
        });
    }
    
    // Optional: Close popup when clicking outside the container
    if (registerPopup) {
        window.addEventListener('click', function (e) {
            const container = document.querySelector('.register-container');
            if (e.target === registerPopup && container && !container.contains(e.target)) {
                registerPopup.style.display = 'none';
            }
        });
    }
});

// Banner rotation function
function rotateBanner() {
    const slides = document.querySelectorAll('.banner-slide');
    if (slides.length === 0) return;
    
    let currentActive = document.querySelector('.banner-slide.active');
    
    // Remove active class from current slide
    if (currentActive) {
        currentActive.classList.remove('active');
        
        // Get next slide or loop back to first
        let nextSlide = currentActive.nextElementSibling;
        if (!nextSlide || !nextSlide.classList.contains('banner-slide')) {
            nextSlide = document.querySelector('.banner-slide');
        }
        
        if (nextSlide) {
            nextSlide.classList.add('active');
        }
    } else {
        // If no active slide found, activate the first one
        slides[0].classList.add('active');
    }
}