// Ultra-Interactive Effects System
class InteractiveEffectsSystem {
    constructor() {
        this.isInitialized = false;
        this.mousePosition = { x: 0, y: 0 };
        this.lastMousePosition = { x: 0, y: 0 };
        this.mouseVelocity = { x: 0, y: 0 };
        this.elements = new Map();
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.setupAdvancedMouseTracking();
        this.createFloatingElements();
        this.setupElementInteractions();
        this.createDynamicCursor();
        this.setupScrollAnimations();
        this.createInteractiveParticles();
        this.setupHoverSounds();
        this.createMorphingElements();
        this.startAdvancedAnimationLoop();
        this.isInitialized = true;
    }

    setupAdvancedMouseTracking() {
        let mouseTimeout;
        
        document.addEventListener('mousemove', (e) => {
            this.lastMousePosition = { ...this.mousePosition };
            this.mousePosition = { x: e.clientX, y: e.clientY };
            
            // Calculate velocity
            this.mouseVelocity.x = this.mousePosition.x - this.lastMousePosition.x;
            this.mouseVelocity.y = this.mousePosition.y - this.lastMousePosition.y;
            
            // Create velocity-based effects
            this.createVelocityEffects();
            
            // Update floating elements
            this.updateFloatingElements();
            
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                this.mouseVelocity = { x: 0, y: 0 };
            }, 100);
        });

        // Touch support
        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            this.mousePosition = { x: touch.clientX, y: touch.clientY };
            this.updateFloatingElements();
        });
    }

    createVelocityEffects() {
        const speed = Math.sqrt(this.mouseVelocity.x ** 2 + this.mouseVelocity.y ** 2);
        
        if (speed > 10) {
            // Create motion blur effect
            this.createMotionTrail();
            
            // Influence floating shapes
            this.influenceShapes(speed);
        }
    }

    createMotionTrail() {
        if (Math.random() > 0.7) {
            const trail = document.createElement('div');
            trail.className = 'motion-trail';
            trail.style.cssText = `
                position: fixed;
                left: ${this.mousePosition.x}px;
                top: ${this.mousePosition.y}px;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, var(--primary-color), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: trailExpand 0.8s ease-out forwards;
            `;
            
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 800);
        }
    }

    influenceShapes(speed) {
        document.querySelectorAll('.floating-shape').forEach((shape, index) => {
            const rect = shape.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                (this.mousePosition.x - centerX) ** 2 + 
                (this.mousePosition.y - centerY) ** 2
            );
            
            if (distance < 200) {
                const influence = Math.max(0, (200 - distance) / 200);
                const scale = 1 + influence * 0.3;
                const rotation = influence * speed * 2;
                
                shape.style.transform += ` scale(${scale}) rotate(${rotation}deg)`;
            }
        });
    }

    createFloatingElements() {
        // Create floating icons
        const icons = ['💎', '⚡', '🚀', '🌟', '✨', '🔥', '💫', '🎨'];
        
        for (let i = 0; i < 12; i++) {
            const element = document.createElement('div');
            element.className = 'floating-icon';
            element.innerHTML = icons[Math.floor(Math.random() * icons.length)];
            element.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                pointer-events: none;
                z-index: 1;
                opacity: 0.3;
                animation: floatRandomly ${Math.random() * 10 + 15}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            document.body.appendChild(element);
            this.elements.set(`floating-icon-${i}`, element);
        }
    }

    updateFloatingElements() {
        this.elements.forEach((element, key) => {
            if (key.includes('floating-icon')) {
                const rect = element.getBoundingClientRect();
                const distance = Math.sqrt(
                    (this.mousePosition.x - rect.left) ** 2 + 
                    (this.mousePosition.y - rect.top) ** 2
                );
                
                if (distance < 150) {
                    const repulsion = Math.max(0, (150 - distance) / 150);
                    const moveX = (rect.left - this.mousePosition.x) * repulsion * 0.3;
                    const moveY = (rect.top - this.mousePosition.y) * repulsion * 0.3;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + repulsion * 0.5})`;
                } else {
                    element.style.transform = '';
                }
            }
        });
    }

    setupElementInteractions() {
        // Magnetic buttons
        document.querySelectorAll('.btn').forEach(btn => {
            this.addMagneticEffect(btn, 0.15);
        });

        // Tilting cards
        document.querySelectorAll('.product-card, .feature-card').forEach(card => {
            this.addTiltEffect(card);
            this.addGlowEffect(card);
        });

        // Interactive navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            this.addElasticEffect(link);
        });

        // Pulsing elements
        document.querySelectorAll('.cart-btn, .theme-toggle').forEach(el => {
            this.addPulseEffect(el);
        });
    }

    addMagneticEffect(element, strength = 0.1) {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
        });

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.05)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    }

    addTiltEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);
            
            const rotateX = deltaY * -10;
            const rotateY = deltaX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    }

    addGlowEffect(element) {
        element.addEventListener('mouseenter', () => {
            const glow = document.createElement('div');
            glow.className = 'element-glow';
            glow.style.cssText = `
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
                opacity: 0;
                pointer-events: none;
                border-radius: inherit;
                animation: glowPulse 2s ease-in-out infinite;
            `;
            
            element.style.position = 'relative';
            element.appendChild(glow);
        });

        element.addEventListener('mouseleave', () => {
            const glow = element.querySelector('.element-glow');
            if (glow) glow.remove();
        });
    }

    addElasticEffect(element) {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'elasticIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });

        element.addEventListener('animationend', () => {
            element.style.animation = '';
        });
    }

    addPulseEffect(element) {
        setInterval(() => {
            if (element.matches(':hover')) {
                element.style.animation = 'quickPulse 0.4s ease-out';
                setTimeout(() => {
                    element.style.animation = '';
                }, 400);
            }
        }, 2000);
    }

    createDynamicCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'dynamic-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            opacity: 0.6;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            mix-blend-mode: difference;
        `;
        
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Cursor interactions
        document.querySelectorAll('button, a, .product-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.backgroundColor = 'var(--accent-orange)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'var(--primary-color)';
            });
        });
    }

    setupScrollAnimations() {
        let scrollY = 0;
        let currentScrollY = 0;

        const updateScroll = () => {
            currentScrollY = window.scrollY;
            const diff = currentScrollY - scrollY;
            scrollY = currentScrollY;

            // Parallax effects
            document.querySelectorAll('.floating-shape').forEach((shape, index) => {
                const speed = 0.2 + index * 0.1;
                const yPos = currentScrollY * speed;
                shape.style.transform += ` translateY(${yPos}px)`;
            });

            // Section reveals with stagger
            this.revealSectionsOnScroll();
        };

        window.addEventListener('scroll', updateScroll, { passive: true });
    }

    revealSectionsOnScroll() {
        const sections = document.querySelectorAll('section, .product-card, .feature-card');
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !section.classList.contains('revealed')) {
                section.classList.add('revealed');
                section.style.animation = `revealStagger 0.8s ease-out ${index * 0.1}s forwards`;
            }
        });
    }

    createInteractiveParticles() {
        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'interactive-particle';
            particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                opacity: 0.5;
            `;
            
            document.body.appendChild(particle);
            
            particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: Math.random() * 100 + 50
            });
        }

        this.animateInteractiveParticles(particles);
    }

    animateInteractiveParticles(particles) {
        const animate = () => {
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Mouse interaction
                const distance = Math.sqrt(
                    (this.mousePosition.x - particle.x) ** 2 + 
                    (this.mousePosition.y - particle.y) ** 2
                );

                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    const angle = Math.atan2(particle.y - this.mousePosition.y, particle.x - this.mousePosition.x);
                    particle.vx += Math.cos(angle) * force * 0.1;
                    particle.vy += Math.sin(angle) * force * 0.1;
                }

                // Boundary collision
                if (particle.x <= 0 || particle.x >= window.innerWidth) particle.vx *= -1;
                if (particle.y <= 0 || particle.y >= window.innerHeight) particle.vy *= -1;

                // Keep in bounds
                particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
                particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));

                // Update DOM
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';

                // Life cycle
                particle.life--;
                if (particle.life <= 0) {
                    particle.x = Math.random() * window.innerWidth;
                    particle.y = Math.random() * window.innerHeight;
                    particle.life = Math.random() * 100 + 50;
                }
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    setupHoverSounds() {
        // Web Audio API for interactive sounds
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const playHoverSound = (frequency = 800, duration = 0.1) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        };

        // Add sound to interactive elements
        document.querySelectorAll('.btn, .product-card, .nav-link').forEach(el => {
            el.addEventListener('mouseenter', () => {
                playHoverSound(Math.random() * 200 + 600, 0.1);
            });
        });
    }

    createMorphingElements() {
        // Create morphing background elements
        for (let i = 0; i < 5; i++) {
            const morph = document.createElement('div');
            morph.className = 'morphing-element';
            morph.style.cssText = `
                position: fixed;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: radial-gradient(circle, var(--primary-color), transparent);
                border-radius: 50%;
                opacity: 0.1;
                pointer-events: none;
                z-index: 0;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                animation: morphShape ${Math.random() * 20 + 15}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            document.body.appendChild(morph);
        }
    }

    startAdvancedAnimationLoop() {
        const animate = () => {
            // Update dynamic effects
            this.updateDynamicEffects();
            
            // Continue loop
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    updateDynamicEffects() {
        // Breathing effect for hero elements
        const time = Date.now() * 0.001;
        const breatheElements = document.querySelectorAll('.hero-graphic, .floating-card');
        
        breatheElements.forEach((el, index) => {
            const scale = 1 + Math.sin(time + index) * 0.02;
            el.style.transform += ` scale(${scale})`;
        });

        // Color shifting for primary elements
        const hue = (time * 10) % 360;
        document.documentElement.style.setProperty('--dynamic-hue', hue);
    }
}

// Enhanced CSS for new effects
const interactiveCSS = `
    <style>
        @keyframes trailExpand {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(3);
                opacity: 0;
            }
        }

        @keyframes floatRandomly {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(20px, -30px) rotate(90deg);
            }
            50% {
                transform: translate(-15px, -20px) rotate(180deg);
            }
            75% {
                transform: translate(-25px, 10px) rotate(270deg);
            }
        }

        @keyframes glowPulse {
            0%, 100% {
                opacity: 0;
                transform: scale(0.8);
            }
            50% {
                opacity: 0.3;
                transform: scale(1.2);
            }
        }

        @keyframes elasticIn {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.15);
            }
            100% {
                transform: scale(1);
            }
        }

        @keyframes revealStagger {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes morphShape {
            0%, 100% {
                border-radius: 50%;
                transform: rotate(0deg) scale(1);
            }
            25% {
                border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                transform: rotate(90deg) scale(1.2);
            }
            50% {
                border-radius: 20% 80% 20% 80% / 20% 80% 20% 80%;
                transform: rotate(180deg) scale(0.8);
            }
            75% {
                border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
                transform: rotate(270deg) scale(1.1);
            }
        }

        .dynamic-cursor {
            will-change: transform;
        }

        .motion-trail {
            will-change: transform, opacity;
        }

        .floating-icon {
            will-change: transform;
            user-select: none;
        }

        .interactive-particle {
            will-change: transform;
        }

        .morphing-element {
            will-change: transform;
        }

        /* Hide cursor on interactive elements */
        .btn, .product-card, a {
            cursor: none;
        }

        /* Enhanced performance */
        .floating-shape, .feature-card, .product-card {
            will-change: transform;
            backface-visibility: hidden;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', interactiveCSS);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all other systems are loaded
    setTimeout(() => {
        window.interactiveEffectsSystem = new InteractiveEffectsSystem();
    }, 500);
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.interactiveEffectsSystem && window.interactiveEffectsSystem.isInitialized) {
        // Restart system on resize
        window.interactiveEffectsSystem = new InteractiveEffectsSystem();
    }
});