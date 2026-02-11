// ===================================
// APPLE-STYLE SMOOTH MOMENTUM SCROLLING
// ===================================
class SmoothScroll {
    constructor() {
        this.currentScroll = 0;
        this.targetScroll = 0;
        this.ease = 0.1; // Smoothness factor (lower = smoother but slower)
        this.isScrolling = false;
        this.init();
    }

    init() {
        // Update target scroll on wheel/touch
        window.addEventListener('scroll', () => {
            this.targetScroll = window.pageYOffset;
        });

        // Start animation loop
        this.animate();
    }

    animate() {
        // Smooth interpolation
        this.currentScroll += (this.targetScroll - this.currentScroll) * this.ease;

        // Round to avoid sub-pixel rendering
        const rounded = Math.round(this.currentScroll * 100) / 100;

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize smooth scroll (optional - can be disabled for native behavior)
// const smoothScroll = new SmoothScroll();

// ===================================
// ENHANCED SMOOTH SCROLL WITH MOMENTUM
// ===================================
function smoothScrollTo(target, duration = 1400) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - 80;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Apple-style easing function
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// ===================================
// NAVBAR SCROLL EFFECT WITH RAF
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    lastScroll = window.pageYOffset;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (lastScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            ticking = false;
        });
        ticking = true;
    }
});

// ===================================
// SMOOTH SCROLL NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const target = document.querySelector(targetId);

        if (target) {
            smoothScrollTo(target, 1400);

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                toggleMenuIcon();
            }
        }
    });
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        toggleMenuIcon();
    });
}

function toggleMenuIcon() {
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ===================================
// PARALLAX SCROLL EFFECT FOR HERO
// ===================================
const heroSection = document.querySelector('.hero');
const heroBgImage = document.querySelector('.hero-bg-image');

if (heroSection && heroBgImage) {
    let parallaxTicking = false;

    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.4;

                if (scrolled < window.innerHeight) {
                    heroBgImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                }
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    });
}

// ===================================
// INTERSECTION OBSERVER - OPTIMIZED
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards with stagger
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 150}ms`;
    fadeInObserver.observe(card);
});

// Observe reference items with stagger
document.querySelectorAll('.reference-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 80}ms`;
    fadeInObserver.observe(item);
});

// Observe section titles
document.querySelectorAll('.section-title').forEach(title => {
    fadeInObserver.observe(title);
});

// ===================================
// SERVICE CARD ENHANCED HOVER
// ===================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// ===================================
// DYNAMIC YEAR IN FOOTER
// ===================================
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===================================
// CLOSE MOBILE MENU ON RESIZE
// ===================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }, 250);
});

// ===================================
// PREVENT SCROLL WHEN MOBILE MENU IS OPEN
// ===================================
const body = document.body;
if (navMenu) {
    const navMenuObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (navMenu.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            }
        });
    });
    navMenuObserver.observe(navMenu, { attributes: true });
}

// ===================================
// SMOOTH PAGE LOAD
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    // Trigger hero animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    }
});

// ===================================
// PERFORMANCE: REDUCE MOTION
// ===================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '1';
    });

    // Disable parallax
    if (heroBgImage) {
        heroBgImage.style.transform = 'none';
    }

    // Disable smooth scroll
    document.documentElement.style.scrollBehavior = 'auto';
}

// ===================================
// SCROLL PROGRESS TRACKING
// ===================================
let scrollTicking = false;

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // Optional: Add progress bar element
    // const progressBar = document.getElementById('scrollProgress');
    // if (progressBar) progressBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            updateScrollProgress();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// ===================================
// APPLE-STYLE INERTIA SCROLLING (ADVANCED)
// ===================================
class InertiaScroll {
    constructor() {
        this.velocity = 0;
        this.friction = 0.92;
        this.isInertia = false;
        this.lastY = 0;
        this.lastTime = Date.now();

        this.initWheel();
    }

    initWheel() {
        let wheelTimeout;

        window.addEventListener('wheel', (e) => {
            clearTimeout(wheelTimeout);

            const currentTime = Date.now();
            const deltaTime = currentTime - this.lastTime;

            // Calculate velocity
            this.velocity = e.deltaY / deltaTime;
            this.lastTime = currentTime;

            // Start inertia after wheel stops
            wheelTimeout = setTimeout(() => {
                this.startInertia();
            }, 50);
        }, { passive: true });
    }

    startInertia() {
        if (Math.abs(this.velocity) > 0.1) {
            this.isInertia = true;
            this.applyInertia();
        }
    }

    applyInertia() {
        if (!this.isInertia) return;

        // Apply friction
        this.velocity *= this.friction;

        // Stop if velocity is too low
        if (Math.abs(this.velocity) < 0.1) {
            this.isInertia = false;
            return;
        }

        // Continue animation
        requestAnimationFrame(() => this.applyInertia());
    }
}

// Initialize inertia scroll (optional - for extra smoothness)
// const inertiaScroll = new InertiaScroll();
