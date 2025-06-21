// Advanced Animation System
class AdvancedAnimationSystem {
    constructor() {
        this.particleSystem = null;
        this.waveSystem = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseMoving = false;
        this.mouseTimeout = null;
        
        this.init();
    }

    init() {
        this.setupCanvases();
        this.initParticleSystem();
        this.initWaveSystem();
        this.setupMouseTracking();
        this.setupInteractiveElements();
        this.startAnimationLoop();
        this.addMagneticEffects();
        this.enhancePageTransitions();
    }

    setupCanvases() {
        // Particle Canvas
        this.particleCanvas = document.getElementById('particleCanvas');
        this.particleCtx = this.particleCanvas.getContext('2d');
        
        // Wave Canvas
        this.waveCanvas = document.getElementById('waveCanvas');
        this.waveCtx = this.waveCanvas.getContext('2d');
        
        this.resizeCanvases();
        window.addEventListener('resize', () => this.resizeCanvases());
    }

    resizeCanvases() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        [this.particleCanvas, this.waveCanvas].forEach(canvas => {
            canvas.width = width;
            canvas.height = height;
        });
    }

    initParticleSystem() {
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                hue: Math.random() * 60 + 170, // Blue-green range
                life: Math.random() * 100 + 50
            });
        }
    }

    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse attraction
            if (this.isMouseMoving) {
                const dx = this.mouseX - particle.x;
                const dy = this.mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    particle.vx += dx * force * 0.0001;
                    particle.vy += dy * force * 0.0001;
                }
            }
            
            // Boundary checking
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
            
            // Update life
            particle.life--;
            if (particle.life <= 0) {
                this.resetParticle(particle);
            }
        });
    }

    resetParticle(particle) {
        particle.x = Math.random() * window.innerWidth;
        particle.y = Math.random() * window.innerHeight;
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
        particle.life = Math.random() * 100 + 50;
        particle.opacity = Math.random() * 0.5 + 0.1;
    }

    drawParticles() {
        this.particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        this.particles.forEach(particle => {
            this.particleCtx.save();
            this.particleCtx.globalAlpha = particle.opacity;
            this.particleCtx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
            this.particleCtx.shadowBlur = 10;
            this.particleCtx.shadowColor = `hsl(${particle.hue}, 70%, 60%)`;
            
            this.particleCtx.beginPath();
            this.particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.particleCtx.fill();
            this.particleCtx.restore();
        });
        
        // Draw connections
        this.drawConnections();
    }

    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.particleCtx.save();
                    this.particleCtx.globalAlpha = (100 - distance) / 100 * 0.2;
                    this.particleCtx.strokeStyle = '#00FFAB';
                    this.particleCtx.lineWidth = 1;
                    this.particleCtx.beginPath();
                    this.particleCtx.moveTo(particle.x, particle.y);
                    this.particleCtx.lineTo(otherParticle.x, otherParticle.y);
                    this.particleCtx.stroke();
                    this.particleCtx.restore();
                }
            });
        });
    }

    initWaveSystem() {
        this.waves = [];
        this.time = 0;
        
        // Create multiple wave layers
        for (let i = 0; i < 3; i++) {
            this.waves.push({
                amplitude: 30 + i * 15,
                frequency: 0.02 + i * 0.01,
                speed: 0.02 + i * 0.01,
                offset: i * Math.PI / 3,
                color: `hsla(${170 + i * 20}, 70%, 60%, ${0.1 - i * 0.02})`
            });
        }
    }

    drawWaves() {
        this.waveCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.time += 0.01;
        
        this.waves.forEach(wave => {
            this.waveCtx.save();
            this.waveCtx.strokeStyle = wave.color;
            this.waveCtx.lineWidth = 2;
            this.waveCtx.beginPath();
            
            for (let x = 0; x <= window.innerWidth; x += 5) {
                const y = window.innerHeight / 2 + 
                         Math.sin(x * wave.frequency + this.time * wave.speed + wave.offset) * wave.amplitude +
                         Math.sin(x * wave.frequency * 2 + this.time * wave.speed * 1.5) * wave.amplitude * 0.5;
                
                if (x === 0) {
                    this.waveCtx.moveTo(x, y);
                } else {
                    this.waveCtx.lineTo(x, y);
                }
            }
            
            this.waveCtx.stroke();
            this.waveCtx.restore();
        });
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isMouseMoving = true;
            
            // Create mouse trail particles
            if (Math.random() > 0.7) {
                this.createMouseTrailParticle(e.clientX, e.clientY);
            }
            
            clearTimeout(this.mouseTimeout);
            this.mouseTimeout = setTimeout(() => {
                this.isMouseMoving = false;
            }, 150);
        });
    }

    createMouseTrailParticle(x, y) {
        const trailParticle = document.createElement('div');
        trailParticle.className = 'mouse-trail-particle';
        trailParticle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #00FFAB, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: trailFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(trailParticle);
        
        setTimeout(() => {
            trailParticle.remove();
        }, 1000);
    }

    setupInteractiveElements() {
        // Add enhanced hover effects to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.add('btn-enhanced', 'pulse-on-hover');
        });
        
        // Add magnetic effect to cards
        document.querySelectorAll('.product-card, .feature-card').forEach(card => {
            card.classList.add('magnetic');
            this.addMagneticBehavior(card);
        });
        
        // Add breathing animation to hero elements
        document.querySelectorAll('.hero-graphic, .floating-card').forEach(el => {
            el.classList.add('breathe');
        });
        
        // Add stagger animation to feature cards
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.classList.add('stagger-animation', `stagger-${index + 1}`);
        });
    }

    addMagneticBehavior(element) {
        element.addEventListener('mouseenter', (e) => {
            element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    addMagneticEffects() {
        // Magnetic effect for navigation items
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translate(0, 0)';
            });
        });
    }

    enhancePageTransitions() {
        // Smooth scroll with easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
        
        // Page load animation
        this.animatePageLoad();
    }

    animatePageLoad() {
        // Fade in elements progressively
        const elements = document.querySelectorAll('.navbar, .hero-section > *, .feature-card');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100 + 300);
        });
    }

    startAnimationLoop() {
        const animate = () => {
            this.updateParticles();
            this.drawParticles();
            this.drawWaves();
            requestAnimationFrame(animate);
        };
        animate();
    }

    // Dynamic background color change based on scroll
    updateBackgroundOnScroll() {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const hue = 200 + scrollPercent * 60; // From blue to purple
        
        document.documentElement.style.setProperty('--scroll-hue', hue);
    }
}

// Enhanced trail effect CSS
const trailEffectCSS = `
    <style>
        @keyframes trailFade {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-20px);
            }
        }
        
        .mouse-trail-particle {
            animation: trailFade 1s ease-out forwards;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', trailEffectCSS);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.advancedAnimationSystem = new AdvancedAnimationSystem();
});

// Scroll-based background updates
window.addEventListener('scroll', () => {
    if (window.advancedAnimationSystem) {
        window.advancedAnimationSystem.updateBackgroundOnScroll();
    }
});