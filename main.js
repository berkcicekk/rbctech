// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLL NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
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
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 100}ms`;
    observer.observe(card);
});

// Observe reference items
document.querySelectorAll('.reference-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 50}ms`;
    observer.observe(item);
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
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ===================================
// PREVENT SCROLL WHEN MOBILE MENU IS OPEN
// ===================================
const body = document.body;
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

if (navMenu) {
    navMenuObserver.observe(navMenu, { attributes: true });
}

// ===================================
// SERVICE CARD HOVER GLOW EFFECT
// ===================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.boxShadow = '';
    });
});

// ===================================
// SMOOTH PAGE LOAD
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===================================
// PERFORMANCE: REDUCE MOTION FOR ACCESSIBILITY
// ===================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '1';
    });
}
