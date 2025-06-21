// Animation and visual effects management
class AnimationManager {
    constructor() {
        this.initializeAnimations();
        this.initializeParallax();
        this.initializeScrollEffects();
    }

    initializeAnimations() {
        // Floating shapes animation enhancement
        this.enhanceFloatingShapes();
        
        // Initialize hover effects
        this.initializeHoverEffects();
        
        // Initialize loading animations
        this.initializeLoadingAnimations();
    }

    enhanceFloatingShapes() {
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            // Add random movement
            this.addRandomMovement(shape, index);
            
            // Add pulsing effect
            this.addPulsingEffect(shape, index);
        });
    }

    addRandomMovement(shape, index) {
        const originalAnimation = shape.style.animation;
        
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 500));
    }

    addPulsingEffect(shape, index) {
        const pulseKeyframes = `
            @keyframes pulse-${index} {
                0%, 100% { opacity: 0.1; transform: scale(1); }
                50% { opacity: 0.2; transform: scale(1.1); }
            }
        `;
        
        // Add keyframes to stylesheet
        const style = document.createElement('style');
        style.textContent = pulseKeyframes;
        document.head.appendChild(style);
        
        // Apply animation
        shape.style.animation += `, pulse-${index} ${4 + index}s infinite`;
    }

    initializeHoverEffects() {
        // Product card hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.product-card')) {
                this.enhanceProductCardHover(e.target.closest('.product-card'));
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.product-card')) {
                this.resetProductCardHover(e.target.closest('.product-card'));
            }
        });

        // Button hover effects
        this.enhanceButtonHovers();
    }

    enhanceProductCardHover(card) {
        const image = card.querySelector('.product-image');
        const info = card.querySelector('.product-info');
<<<<<<< HEAD
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        
        // Add intense glow effect
        card.style.boxShadow = '0 25px 50px rgba(0, 255, 171, 0.4), 0 0 30px rgba(0, 255, 171, 0.2)';
        card.style.borderColor = 'var(--primary-color)';
        
        // Scale and rotate image slightly
        if (image) {
            image.style.transform = 'scale(1.15) rotate(2deg)';
            image.style.filter = 'brightness(1.1) contrast(1.05)';
        }
        
        // Enhance button
        if (addToCartBtn) {
            addToCartBtn.style.transform = 'translateY(-5px) scale(1.05)';
            addToCartBtn.style.boxShadow = '0 10px 20px rgba(0, 255, 171, 0.3)';
        }
        
        // Add dynamic background animation
        card.style.background = `
            linear-gradient(135deg, 
                rgba(0, 255, 171, 0.08) 0%, 
                rgba(0, 123, 255, 0.08) 50%,
                rgba(255, 193, 7, 0.05) 100%
            )
        `;
        
        // Add micro-interactions
        card.style.transform = 'translateY(-12px) scale(1.03) rotateX(2deg)';
=======
        
        // Add glow effect
        card.style.boxShadow = '0 20px 40px rgba(0, 255, 171, 0.3)';
        
        // Scale image
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
        
        // Add subtle background animation
        card.style.background = `
            linear-gradient(135deg, 
                rgba(0, 255, 171, 0.05) 0%, 
                rgba(0, 123, 255, 0.05) 100%
            )
        `;
>>>>>>> 2c34d30 (Enhance website with improved animations, authentication and product filtering)
    }

    resetProductCardHover(card) {
        const image = card.querySelector('.product-image');
<<<<<<< HEAD
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        
        // Reset all styles with smooth transition
        card.style.boxShadow = '';
        card.style.background = '';
        card.style.borderColor = '';
        card.style.transform = '';
        
        if (image) {
            image.style.transform = '';
            image.style.filter = '';
        }
        
        if (addToCartBtn) {
            addToCartBtn.style.transform = '';
            addToCartBtn.style.boxShadow = '';
=======
        
        // Reset styles
        card.style.boxShadow = '';
        card.style.background = '';
        
        if (image) {
            image.style.transform = '';
>>>>>>> 2c34d30 (Enhance website with improved animations, authentication and product filtering)
        }
    }

    enhanceButtonHovers() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.addButtonRipple(button);
            });
        });
    }

    addButtonRipple(button) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    initializeParallax() {
        window.addEventListener('scroll', () => {
            this.updateParallaxEffects();
        });
    }

    updateParallaxEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    }

    initializeScrollEffects() {
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            this.updateNavbarOnScroll();
        });

        // Scroll-to-top button
        this.createScrollToTopButton();
        
        // Section reveal on scroll
        this.initializeSectionReveal();
    }

    updateNavbarOnScroll() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top btn btn-primary position-fixed';
        scrollBtn.style.cssText = `
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initializeSectionReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealSection(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    revealSection(section) {
        section.style.animation = 'fadeInUp 0.8s ease-out forwards';
        
        // Stagger child elements
        const children = section.querySelectorAll('.col-lg-3, .col-md-4, .col-sm-6');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, index * 100);
        });
    }

    initializeLoadingAnimations() {
        // Custom loading spinner
        this.createCustomLoader();
        
        // Loading skeleton improvements
        this.enhanceSkeletonLoading();
    }

    createCustomLoader() {
        const loaderCSS = `
            <style>
                .custom-loader {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin: 20px auto;
                    background: conic-gradient(from 0deg, var(--primary-color), var(--secondary-color), var(--primary-color));
                    animation: spin 2s linear infinite;
                }
                
                .custom-loader::before {
                    content: '';
                    position: absolute;
                    inset: 5px;
                    background: var(--dark-bg);
                    border-radius: 50%;
                }
                
                .custom-loader::after {
                    content: '';
                    position: absolute;
                    inset: 15px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    animation: pulse 2s ease-in-out infinite;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', loaderCSS);
    }

    enhanceSkeletonLoading() {
        const skeletonCSS = `
            <style>
                .skeleton-shimmer {
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.05) 25%,
                        rgba(0, 255, 171, 0.1) 50%,
                        rgba(255, 255, 255, 0.05) 75%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', skeletonCSS);
    }
}

// Ripple effect CSS
const rippleCSS = `
    <style>
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', rippleCSS);

// Initialize animation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});

// Additional utility functions for animations
function createParticleEffect(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: particle-float 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add particle animation CSS
const particleCSS = `
    <style>
        @keyframes particle-float {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', particleCSS);

// Mouse trail effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) { // Only create particles occasionally
        createParticleEffect(e.clientX, e.clientY);
    }
});
