// Smooth scroll and navigation animations
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");
  const animatedElements = new Set();
  const navbar = document.querySelector("nav");
  let lastScrollTop = 0;

  // Throttle function para optimizar performance
  function throttle(func, wait) {
    let timeout;
    let lastRan;
    return function executedFunction(...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (Date.now() - lastRan >= wait) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, wait - (Date.now() - lastRan));
      }
    };
  }

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.7 && rect.bottom >= 0;
  }

  // Update active nav link
  function updateActiveNav() {
    sections.forEach((section) => {
      if (isInViewport(section)) {
        const sectionId = section.getAttribute("id");
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${sectionId}`;
          link.classList.toggle("text-purple-300", isActive);
          link.classList.toggle("text-white", !isActive);
        });
      }
    });
  }

  // Smooth scroll on nav click
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Animate elements on scroll (throttled)
  const handleScroll = throttle(() => {
    updateActiveNav();

    sections.forEach((section) => {
      if (isInViewport(section)) {
        const elementsToAnimate = section.querySelectorAll(
          ".project-card, .service-card, .value-item, h1, h2"
        );
        elementsToAnimate.forEach((el) => {
          if (!animatedElements.has(el)) {
            animatedElements.add(el);
            el.classList.add("animated");
            el.style.animation = "fadeInUp 0.6s ease-out forwards";
          }
        });
      }
    });

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide/show navbar based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, 100); // Throttle a 100ms

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Update nav on load
  updateActiveNav();

  // Animación suave del navbar
  navbar.style.transition = "transform 0.3s ease-in-out";
});
