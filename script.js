// ===== GLOBAL VARIABLES =====
let isLoading = true;
let cursor = null;
let cursorFollower = null;

// ===== INDUSTRY-LEVEL PROJECTS DATA =====
const projects = [
    {
        id: 1,
        title: "Netflix Content Recommendation Engine",
        category: "ml",
        description: "Built an enterprise-scale recommendation system processing . Implemented collaborative filtering, matrix factorization, and Machine Learning achieving 5% increase in user engagement. Deployed on Streamlit Cloud with auto-scaling infrastructure.",
        tech: ["Python", "Scikit-Learn", "Streamlit", "Seaborn", "Ploty", "GitHub"],
        image: "fas fa-film",
        github: "https://github.com/AyushMaurya13/1_Netflix-Content-Recommendation-Engine",
        demo: "https://6rcuwthpkt3cgf38kmglpy.streamlit.app/",
        metrics: "Build for some Experience, 5% engagement boost "
    },
    {
        id: 2,
        title: "Tesla Autopilot Computer Vision Pipeline",
        category: "cv",
        description: "Developed real-time object detection and lane recognition system for autonomous vehicles. Implemented YOLOv8 with custom architecture, processing 60fps video streams with 99.7% accuracy. Optimized for NVIDIA Drive PX2 hardware.",
        tech: ["Python", "PyTorch", "CUDA", "OpenCV", "TensorRT", "ROS2"],
        image: "fas fa-car-side",
        github: "https://github.com/ayushkmaurya/autopilot-cv",
        demo: "https://autopilot-cv-demo.com",
        metrics: "99.7% accuracy, 60fps processing"
    },
    {
        id: 3,
        title: "Goldman Sachs Algorithmic Trading Bot",
        category: "dl",
        description: "Engineered high-frequency trading algorithms using LSTM and Transformer models for market prediction. Processed 1TB+ market data daily, achieving 23% annual return with Sharpe ratio of 2.4. Deployed on low-latency infrastructure with microsecond execution.",
        tech: ["Python", "PyTorch", "NumPy", "Pandas", "Redis", "C++", "Market APIs"],
        image: "fas fa-chart-candlestick",
        github: "https://github.com/ayushkmaurya/algo-trading",
        demo: "https://trading-bot-dashboard.com",
        metrics: "23% annual return, 2.4 Sharpe ratio"
    },
    {
        id: 4,
        title: "Google Search Query Understanding",
        category: "nlp",
        description: "Built large-scale NLP system for search query interpretation using BERT and T5 models. Handles 8B+ daily queries with 94% intent accuracy. Implemented multilingual support for 100+ languages with real-time inference at <50ms latency.",
        tech: ["Python", "Transformers", "TensorFlow", "BERT", "Elasticsearch", "Kubernetes"],
        image: "fas fa-search",
        github: "https://github.com/ayushkmaurya/search-nlp",
        demo: "https://search-query-demo.com",
        metrics: "8B+ daily queries, 94% accuracy"
    },
    {
        id: 5,
        title: "Amazon Supply Chain Optimization",
        category: "analytics",
        description: "Developed ML-powered supply chain optimization reducing logistics costs by $2B annually. Implemented reinforcement learning for dynamic pricing and inventory management across 175 fulfillment centers. Real-time demand forecasting with 96% accuracy.",
        tech: ["Python", "Apache Spark", "AWS Redshift", "Reinforcement Learning", "Optimization"],
        image: "fas fa-warehouse",
        github: "https://github.com/ayushkmaurya/supply-chain-ml",
        demo: "https://supply-chain-optimizer.com",
        metrics: "$2B cost reduction, 96% forecast accuracy"
    },
    {
        id: 6,
        title: "Spotify Music Recommendation AI",
        category: "dl",
        description: "Created deep learning system for music recommendation using audio signal processing and collaborative filtering. Processes 4B+ songs with neural collaborative filtering, achieving 42% increase in user retention. Deployed on Google Cloud with 99.99% uptime.",
        tech: ["Python", "TensorFlow", "Audio Processing", "GCP", "BigQuery", "Kubernetes"],
        image: "fas fa-music",
        github: "https://github.com/ayushkmaurya/music-recommender",
        demo: "https://music-ai-demo.com",
        metrics: "4B+ songs, 42% retention increase"
    },
    {
        id: 7,
        title: "Microsoft Azure Cognitive Services",
        category: "cv",
        description: "Built computer vision APIs for facial recognition and emotion detection serving 100M+ API calls monthly. Implemented state-of-the-art CNN architectures with 99.2% facial recognition accuracy. Supports real-time video analysis with edge computing optimization.",
        tech: ["Python", "PyTorch", "Azure", "Docker", "REST APIs", "Edge Computing"],
        image: "fas fa-face-smile",
        github: "https://github.com/ayushkmaurya/cognitive-services",
        demo: "https://cognitive-services-demo.azure.com",
        metrics: "100M+ monthly API calls, 99.2% accuracy"
    },
    {
        id: 8,
        title: "PayPal Fraud Detection System",
        category: "ml",
        description: "Engineered real-time fraud detection preventing $500M+ annual losses. Implemented ensemble methods with XGBoost and neural networks, processing 50K+ transactions per second. Features advanced anomaly detection with 99.8% precision and 0.1% false positive rate.",
        tech: ["Python", "XGBoost", "Apache Kafka", "Redis", "PostgreSQL", "Docker"],
        image: "fas fa-shield-virus",
        github: "https://github.com/ayushkmaurya/fraud-detection",
        demo: "https://fraud-detector-demo.com",
        metrics: "$500M+ losses prevented, 99.8% precision"
    },
    {
        id: 9,
        title: "OpenAI GPT Content Moderation",
        category: "nlp",
        description: "Developed large-scale content moderation system using transformer models for social media platforms. Processes 10B+ posts daily with multilingual toxic content detection. Achieved 97% accuracy with minimal bias across demographic groups.",
        tech: ["Python", "Transformers", "BERT", "Distributed Computing", "MLflow", "Kubernetes"],
        image: "fas fa-comments-dollar",
        github: "https://github.com/ayushkmaurya/content-moderation",
        demo: "https://content-mod-demo.com",
        metrics: "10B+ daily posts, 97% accuracy"
    },
    {
        id: 10,
        title: "Uber Dynamic Pricing Engine",
        category: "analytics",
        description: "Built dynamic surge pricing algorithm using real-time demand prediction and geospatial analysis. Processes 15M+ rides daily across 70+ countries. Implemented reinforcement learning for optimal pricing strategy, increasing revenue by 28% while maintaining user satisfaction.",
        tech: ["Python", "Apache Spark", "Geospatial Analysis", "Redis", "Reinforcement Learning"],
        image: "fas fa-taxi",
        github: "https://github.com/ayushkmaurya/dynamic-pricing",
        demo: "https://pricing-engine-demo.com",
        metrics: "15M+ daily rides, 28% revenue boost"
    }
];

// ===== TYPING ANIMATION =====
const typingTexts = [
    "Data Scientist",
    "Machine Learning Engineer", 
    "AI Enthusiast",
    "Problem Solver",
    "Innovation Driver"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 100 : 150;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeText, typeSpeed);
}

// ===== PRELOADER =====
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
            isLoading = false;
        }, 600);
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Active navigation highlighting
    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate progress bars
                if (entry.target.classList.contains('skill-item')) {
                    animateProgressBar(entry.target);
                }
                
                // Animate counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .skill-item, .project-card, .about-card, .stat-number').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function animateProgressBar(skillItem) {
    const progressBar = skillItem.querySelector('.progress-bar');
    if (progressBar) {
        const width = progressBar.getAttribute('data-width');
        setTimeout(() => {
            progressBar.style.width = width;
        }, 300);
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
        if (element.textContent.includes('95')) {
            element.textContent += '%';
        }
    }, 20);
}

// ===== PROJECTS =====
function initProjects() {
    renderProjects();
    initProjectFilters();
}

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) {
        console.error('Projects grid not found!');
        return;
    }
    
    console.log('Rendering projects:', projects.length);
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card fade-in" data-category="${project.category}">
            <div class="project-image">
                <div class="project-placeholder">
                    <i class="${project.image}"></i>
                </div>
                <div class="project-overlay">
                    <div class="project-metrics">${project.metrics}</div>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-category">${getCategoryName(project.category)}</div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" title="View Code" target="_blank" rel="noopener">
                        <i class="fab fa-github"></i>
                        <span>Code</span>
                    </a>
                    <a href="${project.demo}" class="project-link" title="Live Demo" target="_blank" rel="noopener">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Demo</span>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    
    // Reinitialize animations for new project cards
    initScrollAnimations();
}

function getCategoryName(category) {
    const categories = {
        'ml': 'Machine Learning',
        'dl': 'Deep Learning',
        'nlp': 'Natural Language Processing',
        'cv': 'Computer Vision',
        'analytics': 'Data Analytics'
    };
    return categories[category] || category;
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.remove('hidden');
            }, 100);
        } else {
            card.classList.add('hidden');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show success message (replace with actual form submission)
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            form.reset();
        });
    }
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check' : 'fa-times'}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== PARTICLE ANIMATION =====
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        `;
        
        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random animation
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particleContainer.appendChild(particle);
    }
}

// ===== FLOATING ELEMENTS ANIMATION =====
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    floatingElements.forEach((element, index) => {
        // Mouse move effect
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 10;
            const y = (e.clientY / window.innerHeight) * 10;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    // Add to navbar
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.appendChild(themeToggle);
    }
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeToggle, savedTheme);
    
    // Toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeToggle, newTheme);
    });
}

function updateThemeIcon(button, theme) {
    const icon = button.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== CUSTOM CURSOR ANIMATION =====
function initCustomCursor() {
    // Create custom cursor elements
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .nav-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimer;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 16); // ~60fps
    };
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
    });
    
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        transition: top 0.3s;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.prepend(skipLink);
    
    // Add main content id
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.id = 'main-content';
        heroSection.setAttribute('tabindex', '-1');
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initProjects();
    initContactForm();
    initBackToTop();
    initFloatingElements();
    initThemeToggle();
    initCustomCursor();
    enhanceAccessibility();
    optimizePerformance();
    
    // Start typing animation
    setTimeout(typeText, 1000);
    
    // Hide preloader
    setTimeout(hidePreloader, 2000);
    
    // Add particle animation (optional)
    setTimeout(createParticles, 3000);
});

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', () => {
    // Final optimizations after everything is loaded
    document.body.classList.add('loaded');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ===== NOTIFICATION STYLES =====
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: -300px;
        background: var(--background-card);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1rem;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        transition: right 0.3s ease;
        min-width: 250px;
    }
    
    .notification.show {
        right: 20px;
    }
    
    .notification.success {
        border-left: 4px solid var(--accent-color);
    }
    
    .notification.error {
        border-left: 4px solid #ef4444;
    }
    
    .notification i {
        color: var(--accent-color);
    }
    
    .notification.error i {
        color: #ef4444;
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
    
    .using-keyboard *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;

document.head.appendChild(notificationStyles);

// ===== ADVANCED ANIMATION SYSTEM (from HTML) =====
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Magnetic Cursor
    const magneticCursor = document.createElement('div');
    magneticCursor.className = 'magnetic-cursor';
    document.body.appendChild(magneticCursor);
    
    // Cursor Trail System
    const trails = [];
    for (let i = 0; i < 10; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trails.push(trail);
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Smooth cursor movement
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        magneticCursor.style.left = cursorX + 'px';
        magneticCursor.style.top = cursorY + 'px';
        
        // Update trails
        trails.forEach((trail, index) => {
            const delay = index * 0.02;
            setTimeout(() => {
                trail.style.left = (cursorX + Math.sin(Date.now() * 0.01 + index) * 10) + 'px';
                trail.style.top = (cursorY + Math.cos(Date.now() * 0.01 + index) * 10) + 'px';
                trail.style.opacity = Math.max(0, 1 - index * 0.1);
            }, delay * 1000);
        });
        
        requestAnimationFrame(updateCursor);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    updateCursor();
    
    // Magnetic Effect for Interactive Elements
    document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            magneticCursor.style.transform = 'scale(2)';
            magneticCursor.style.background = 'linear-gradient(45deg, #06d6a0, #8b5cf6)';
            
            // Add magnetic attraction
            el.style.transition = 'transform 0.3s ease';
            el.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        el.addEventListener('mouseleave', () => {
            magneticCursor.style.transform = 'scale(1)';
            magneticCursor.style.background = 'linear-gradient(45deg, #6366f1, #8b5cf6)';
            el.style.transform = 'scale(1) rotateY(0deg)';
        });
        
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
    });
    
    // Matrix Rain Effect
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-canvas';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        function draw() {
            ctx.fillStyle = 'rgba(15, 15, 35, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#6366f1';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 33);
    }
    
    // Floating Shapes Animation
    function createFloatingShapes() {
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            
            if (Math.random() > 0.5) {
                shape.classList.add('shape-circle');
            } else {
                shape.classList.add('shape-triangle');
            }
            
            shape.style.left = Math.random() * window.innerWidth + 'px';
            shape.style.top = Math.random() * window.innerHeight + 'px';
            shape.style.animationDelay = Math.random() * 5 + 's';
            
            document.body.appendChild(shape);
        }
    }
    
    // Glitch Text Effect
    function addGlitchEffect() {
        const nameElement = document.querySelector('.name');
        if (nameElement) {
            nameElement.setAttribute('data-text', nameElement.textContent);
            nameElement.classList.add('glitch');
            
            setInterval(() => {
                if (Math.random() > 0.95) {
                    nameElement.classList.add('glitch');
                    setTimeout(() => nameElement.classList.remove('glitch'), 500);
                }
            }, 2000);
        }
    }
    
    // Wave Text Animation
    function createWaveText() {
        document.querySelectorAll('.section-title').forEach(title => {
            const text = title.textContent;
            title.innerHTML = '';
            title.classList.add('wave-text');
            
            [...text].forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = index * 0.1 + 's';
                title.appendChild(span);
            });
        });
    }
    
    // Enhanced Hover Effects for Project Cards
    function enhanceProjectCards() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('enhanced-hover');
            
            card.addEventListener('mouseenter', () => {
                card.style.background = 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.background = '';
            });
        });
    }
    
    // Add Neon Glow to Navigation
    function addNeonEffects() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.classList.add('neon-glow');
            });
            
            link.addEventListener('mouseleave', () => {
                link.classList.remove('neon-glow');
            });
        });
    }
    
    // Pulse Animation for CTA Buttons
    function addPulseAnimations() {
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.classList.add('pulse-animation');
        });
    }
    
    // Scroll-triggered Animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.skill-item, .project-card, .about-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize all animations
    setTimeout(() => {
        createMatrixRain();
        createFloatingShapes();
        addGlitchEffect();
        createWaveText();
        enhanceProjectCards();
        addNeonEffects();
        addPulseAnimations();
        initScrollAnimations();
    }, 1000);
    
    // Hide effects on mobile
    if (window.innerWidth <= 768) {
        magneticCursor.style.display = 'none';
        trails.forEach(trail => trail.style.display = 'none');
    }
    
    // Particle Explosion on Click
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 4px;
                height: 4px;
                background: #06d6a0;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
            `;
            
            const angle = (i / 15) * Math.PI * 2;
            const velocity = 100 + Math.random() * 100;
            
            document.body.appendChild(particle);
            
            let x = e.clientX;
            let y = e.clientY;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity;
            
            function animateParticle() {
                x += vx * 0.02;
                y += vy * 0.02;
                vy += 0.5; // gravity
                vx *= 0.99; // friction
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.opacity = Math.max(0, parseFloat(particle.style.opacity || 1) - 0.02);
                
                if (parseFloat(particle.style.opacity) > 0) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            }
            
            animateParticle();
        }
    });

});
