// Living Elements System - Makes everything truly alive
class LivingElementsSystem {
    constructor() {
        this.breathingElements = new Set();
        this.pulsingElements = new Set();
        this.morphingElements = new Set();
        this.reactiveElements = new Map();
        this.activeAnimations = new Map();
        
        this.init();
    }

    init() {
        this.setupLivingBackground();
        this.setupReactiveText();
        this.setupDynamicColors();
        this.setupInteractiveShapes();
        this.setupLivingCards();
        this.setupPulsatingButtons();
        this.setupMorphingBorders();
        this.setupEnergyFlow();
        this.startLifeCycle();
    }

    setupLivingBackground() {
        // Create energy particles that react to user interaction
        const energyField = document.createElement('div');
        energyField.className = 'energy-field';
        energyField.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(energyField);

        // Create flowing energy lines
        for (let i = 0; i < 15; i++) {
            const energyLine = document.createElement('div');
            energyLine.className = 'energy-line';
            energyLine.style.cssText = `
                position: absolute;
                width: 2px;
                height: 100vh;
                background: linear-gradient(180deg, 
                    transparent 0%, 
                    var(--primary-color) 30%, 
                    var(--secondary-color) 70%, 
                    transparent 100%);
                left: ${Math.random() * 100}%;
                opacity: 0.1;
                animation: energyFlow ${Math.random() * 10 + 15}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            energyField.appendChild(energyLine);
        }

        // Create pulsating energy nodes
        for (let i = 0; i < 8; i++) {
            const node = document.createElement('div');
            node.className = 'energy-node';
            node.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 20px var(--primary-color);
                animation: energyPulse ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            energyField.appendChild(node);
        }
    }

    setupReactiveText() {
        // Make text react to mouse proximity
        document.querySelectorAll('h1, h2, h3, h4, h5, .feature-title, .product-title').forEach(text => {
            text.addEventListener('mouseenter', () => {
                this.animateTextReveal(text);
            });
            
            text.addEventListener('mouseleave', () => {
                this.resetTextAnimation(text);
            });
        });
    }

    animateTextReveal(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(20px) rotateX(90deg);
                animation: charReveal 0.6s ease-out forwards;
                animation-delay: ${index * 0.05}s;
            `;
            element.appendChild(span);
        });
    }

    resetTextAnimation(element) {
        setTimeout(() => {
            const originalText = Array.from(element.children)
                .map(span => span.textContent)
                .join('')
                .replace(/\u00A0/g, ' ');
            element.textContent = originalText;
        }, 1000);
    }

    setupDynamicColors() {
        // Create color waves that flow through the interface
        let colorTime = 0;
        
        const updateColors = () => {
            colorTime += 0.01;
            
            // Primary color wave
            const hue1 = (Math.sin(colorTime) * 30 + 170) % 360;
            const hue2 = (Math.sin(colorTime + Math.PI/3) * 30 + 200) % 360;
            const hue3 = (Math.sin(colorTime + Math.PI/2) * 30 + 230) % 360;
            
            document.documentElement.style.setProperty('--dynamic-primary', `hsl(${hue1}, 70%, 60%)`);
            document.documentElement.style.setProperty('--dynamic-secondary', `hsl(${hue2}, 70%, 60%)`);
            document.documentElement.style.setProperty('--dynamic-accent', `hsl(${hue3}, 70%, 60%)`);
            
            requestAnimationFrame(updateColors);
        };
        
        updateColors();
    }

    setupInteractiveShapes() {
        document.querySelectorAll('.floating-shape').forEach((shape, index) => {
            // Add interactive behavior
            shape.addEventListener('mouseenter', () => {
                shape.style.animation = 'none';
                shape.style.transform = 'scale(1.5) rotate(180deg)';
                shape.style.opacity = '0.4';
                shape.style.filter = 'blur(0px)';
            });
            
            shape.addEventListener('mouseleave', () => {
                shape.style.animation = `complexFloat ${25 + index * 5}s infinite ease-in-out`;
                shape.style.transform = '';
                shape.style.opacity = '';
                shape.style.filter = '';
            });

            // Add click interaction
            shape.addEventListener('click', () => {
                this.createShapeExplosion(shape);
            });
            
            shape.style.cursor = 'pointer';
            shape.style.pointerEvents = 'auto';
        });
    }

    createShapeExplosion(shape) {
        const rect = shape.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create explosion particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: var(--primary-color);
                border-radius: 50%;
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                z-index: 9999;
                animation: explodeParticle${i} 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
        
        // Shake the shape
        shape.style.animation = 'shapeShake 0.5s ease-out';
        setTimeout(() => {
            shape.style.animation = '';
        }, 500);
    }

    setupLivingCards() {
        document.querySelectorAll('.product-card, .feature-card').forEach(card => {
            // Add heartbeat effect
            this.addHeartbeat(card);
            
            // Add energy field around card
            this.addCardEnergyField(card);
            
            // Add reactive borders
            this.addReactiveBorder(card);
        });
    }

    addHeartbeat(element) {
        let heartbeatInterval;
        
        element.addEventListener('mouseenter', () => {
            heartbeatInterval = setInterval(() => {
                element.style.animation = 'heartbeat 0.8s ease-in-out';
                setTimeout(() => {
                    element.style.animation = '';
                }, 800);
            }, 1500);
        });
        
        element.addEventListener('mouseleave', () => {
            clearInterval(heartbeatInterval);
            element.style.animation = '';
        });
    }

    addCardEnergyField(card) {
        const energyField = document.createElement('div');
        energyField.className = 'card-energy-field';
        energyField.style.cssText = `
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            border: 2px solid var(--primary-color);
            border-radius: inherit;
            opacity: 0;
            animation: energyFieldPulse 2s ease-in-out infinite;
            pointer-events: none;
        `;
        
        card.style.position = 'relative';
        card.appendChild(energyField);
        
        card.addEventListener('mouseenter', () => {
            energyField.style.opacity = '0.3';
        });
        
        card.addEventListener('mouseleave', () => {
            energyField.style.opacity = '0';
        });
    }

    addReactiveBorder(card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.background = `
                radial-gradient(circle at ${x}% ${y}%, 
                    var(--dynamic-primary) 0%, 
                    transparent 50%),
                var(--glass-bg)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    }

    setupPulsatingButtons() {
        document.querySelectorAll('.btn').forEach(btn => {
            // Add energy pulse effect
            const pulse = document.createElement('div');
            pulse.className = 'button-pulse';
            pulse.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: var(--primary-color);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
                pointer-events: none;
            `;
            
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(pulse);
            
            btn.addEventListener('mouseenter', () => {
                pulse.style.animation = 'buttonPulseExpand 0.6s ease-out';
            });
            
            btn.addEventListener('click', () => {
                pulse.style.animation = 'buttonPulseExpand 0.3s ease-out';
            });
        });
    }

    setupMorphingBorders() {
        document.querySelectorAll('.glass-container, .product-card, .feature-card').forEach(element => {
            let morphInterval;
            
            element.addEventListener('mouseenter', () => {
                morphInterval = setInterval(() => {
                    const randomRadius = () => Math.random() * 30 + 10;
                    element.style.borderRadius = `
                        ${randomRadius()}px ${randomRadius()}px 
                        ${randomRadius()}px ${randomRadius()}px
                    `;
                }, 200);
            });
            
            element.addEventListener('mouseleave', () => {
                clearInterval(morphInterval);
                element.style.borderRadius = '';
            });
        });
    }

    setupEnergyFlow() {
        // Create energy connections between elements
        const connectElements = () => {
            const cards = document.querySelectorAll('.product-card, .feature-card');
            const connections = [];
            
            cards.forEach((card, index) => {
                if (index < cards.length - 1) {
                    const connection = this.createEnergyConnection(card, cards[index + 1]);
                    connections.push(connection);
                }
            });
            
            return connections;
        };
        
        // Update connections on scroll
        let lastScrollY = 0;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollDiff = Math.abs(currentScrollY - lastScrollY);
            
            if (scrollDiff > 5) {
                this.triggerEnergyWave(scrollDiff);
                lastScrollY = currentScrollY;
            }
        }, { passive: true });
    }

    createEnergyConnection(element1, element2) {
        const connection = document.createElement('div');
        connection.className = 'energy-connection';
        connection.style.cssText = `
            position: absolute;
            width: 2px;
            background: linear-gradient(45deg, var(--primary-color), transparent);
            opacity: 0.2;
            pointer-events: none;
            z-index: 1;
            animation: energyFlow 2s linear infinite;
        `;
        
        document.body.appendChild(connection);
        this.updateConnectionPosition(connection, element1, element2);
        
        return connection;
    }

    updateConnectionPosition(connection, element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;
        
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        connection.style.cssText += `
            left: ${x1}px;
            top: ${y1}px;
            height: ${length}px;
            transform: rotate(${angle + 90}deg);
            transform-origin: 0 0;
        `;
    }

    triggerEnergyWave(intensity) {
        const wave = document.createElement('div');
        wave.className = 'energy-wave';
        wave.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
            opacity: ${Math.min(intensity * 0.01, 0.3)};
            pointer-events: none;
            z-index: 9998;
            animation: waveExpand 1s ease-out forwards;
        `;
        
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 1000);
    }

    startLifeCycle() {
        // Global life pulse - makes everything breathe together
        let lifeTime = 0;
        
        const lifePulse = () => {
            lifeTime += 0.02;
            
            // Synchronize all breathing elements
            const breatheScale = 1 + Math.sin(lifeTime) * 0.02;
            document.querySelectorAll('.floating-shape, .hero-graphic').forEach(el => {
                el.style.transform += ` scale(${breatheScale})`;
            });
            
            // Pulse energy nodes
            const pulseOpacity = 0.1 + Math.sin(lifeTime * 2) * 0.05;
            document.querySelectorAll('.energy-node').forEach(node => {
                node.style.opacity = pulseOpacity;
            });
            
            requestAnimationFrame(lifePulse);
        };
        
        lifePulse();
    }
}

// Enhanced CSS for living elements
const livingElementsCSS = `
    <style>
        @keyframes energyFlow {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 100%; }
        }

        @keyframes energyPulse {
            0%, 100% {
                transform: scale(1);
                opacity: 0.3;
                box-shadow: 0 0 20px var(--primary-color);
            }
            50% {
                transform: scale(1.5);
                opacity: 0.8;
                box-shadow: 0 0 40px var(--primary-color);
            }
        }

        @keyframes charReveal {
            0% {
                opacity: 0;
                transform: translateY(20px) rotateX(90deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        }

        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.02); }
            50% { transform: scale(1.05); }
            75% { transform: scale(1.02); }
        }

        @keyframes energyFieldPulse {
            0%, 100% {
                transform: scale(1);
                opacity: 0;
            }
            50% {
                transform: scale(1.1);
                opacity: 0.3;
            }
        }

        @keyframes buttonPulseExpand {
            0% {
                width: 0;
                height: 0;
                opacity: 0.8;
            }
            100% {
                width: 200%;
                height: 200%;
                opacity: 0;
            }
        }

        @keyframes shapeShake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes waveExpand {
            0% {
                transform: scale(0);
                opacity: 0.3;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }

        /* Explosion particles */
        @keyframes explodeParticle0 { 100% { transform: translate(50px, -50px); opacity: 0; } }
        @keyframes explodeParticle1 { 100% { transform: translate(-50px, -50px); opacity: 0; } }
        @keyframes explodeParticle2 { 100% { transform: translate(50px, 50px); opacity: 0; } }
        @keyframes explodeParticle3 { 100% { transform: translate(-50px, 50px); opacity: 0; } }
        @keyframes explodeParticle4 { 100% { transform: translate(70px, 0px); opacity: 0; } }
        @keyframes explodeParticle5 { 100% { transform: translate(-70px, 0px); opacity: 0; } }
        @keyframes explodeParticle6 { 100% { transform: translate(0px, -70px); opacity: 0; } }
        @keyframes explodeParticle7 { 100% { transform: translate(0px, 70px); opacity: 0; } }
        @keyframes explodeParticle8 { 100% { transform: translate(35px, -35px); opacity: 0; } }
        @keyframes explodeParticle9 { 100% { transform: translate(-35px, -35px); opacity: 0; } }
        @keyframes explodeParticle10 { 100% { transform: translate(35px, 35px); opacity: 0; } }
        @keyframes explodeParticle11 { 100% { transform: translate(-35px, 35px); opacity: 0; } }

        .energy-line {
            background-size: 100% 20px;
            animation: energyFlow 15s linear infinite;
        }

        .floating-shape {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card-energy-field {
            transition: opacity 0.3s ease;
        }

        .energy-connection {
            background-size: 100% 10px;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', livingElementsCSS);

// Initialize the living elements system
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.livingElementsSystem = new LivingElementsSystem();
    }, 1000);
});