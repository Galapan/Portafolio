// Smooth scroll and navigation animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const animatedElements = new Set();
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.7 && rect.bottom >= 0;
    }

    // Update active nav link
    function updateActiveNav() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                const sectionId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('text-purple-300', link.getAttribute('href') === `#${sectionId}`);
                    link.classList.toggle('text-white', link.getAttribute('href') !== `#${sectionId}`);
                });
            }
        });
    }

    // Smooth scroll on nav click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(link.getAttribute('href').slice(1));
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Animate elements on scroll
    window.addEventListener('scroll', () => {
        updateActiveNav();

        sections.forEach(section => {
            if (isInViewport(section)) {
                const elementsToAnimate = section.querySelectorAll('.project-card, .service-card, .value-item, h1, h2');
                elementsToAnimate.forEach(el => {
                    if (!animatedElements.has(el)) {
                        animatedElements.add(el);
                        el.classList.add('animated');
                        el.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    }
                });
            }
        });

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling DOWN - ocultar navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling UP - mostrar navbar
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Update nav on load
    updateActiveNav();

    // Animación suave
    navbar.style.transition = 'transform 0.3s ease-in-out';
});