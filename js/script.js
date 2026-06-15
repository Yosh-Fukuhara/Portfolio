// Custom Cursor
const cursor = document.getElementById('cursor');
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && cursor) {
    let cursorX = 0, cursorY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function animateCursor() {
        currentX += (cursorX - currentX) * 0.15;
        currentY += (cursorY - currentY) * 0.15;
        cursor.style.transform = `translate(${currentX - 5}px, ${currentY - 5}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, .nav-link, .contact-row, .skill-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
} else if (cursor) {
    cursor.style.display = 'none';
}

// Mobile Nav
function toggleMobileNav() {
    const nav = document.getElementById('mobileNav');
    nav.classList.toggle('active');
}

function closeMobileNav() {
    const nav = document.getElementById('mobileNav');
    nav.classList.remove('active');
}

// Nav scroll effect and theme switch
const nav = document.getElementById('nav');
const heroMarquee = document.querySelector('.hero-top-marquee');
const heroPortrait = document.querySelector('.hero-portrait');

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const heroHeight = window.innerHeight;
    
    if (currentScroll <= heroHeight) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Subtle parallax effect
    const scrollRatio = Math.min(currentScroll / heroHeight, 1);
    const marqueeY = scrollRatio * 20;
    const portraitY = scrollRatio * 10;

    if (heroMarquee) {
        heroMarquee.style.transform = `translateY(-50%) translateY(${marqueeY}px)`;
    }
    if (heroPortrait) {
        heroPortrait.style.transform = `translateY(${portraitY}px)`;
    }
});

// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));
