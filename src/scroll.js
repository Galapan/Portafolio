// Smooth scroll and navigation animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 0.5 &&
            rect.bottom >= window.innerHeight * 0.5
        );
    }

    // Update active nav link based on scroll position
    function updateActiveNav() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                const sectionId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('text-purple-300');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-purple-300');
                    }
                });
            }
        });
    }

    // Smooth scroll with animation on click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Add animation class to all elements in target section
                const elements = targetSection.querySelectorAll('h1, h2, p, button, div');
                elements.forEach((el, index) => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s forwards`;
                    el.style.opacity = '0';
                });

                // Scroll to section
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Listen to scroll events
    window.addEventListener('scroll', () => {
        updateActiveNav();

        // Trigger animations when sections come into view
        sections.forEach(section => {
            if (isInViewport(section)) {
                const cards = section.querySelectorAll('.project-card, .service-card, .value-item');
                cards.forEach(card => {
                    if (!card.classList.contains('animated')) {
                        card.classList.add('animated');
                        card.style.animation = `fadeInUp 0.6s ease-out forwards`;
                    }
                });
            }
        });
    });

    // Initial call to update nav
    updateActiveNav();

    // Button animations
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});