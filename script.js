// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
const hoverElements = document.querySelectorAll('a, button, .project-card, .service-card, .skill-highlight, .testimonial-card, .stat-item');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Animated Counter
const counters = document.querySelectorAll('.stat-number');
let countersAnimated = false;

const animateCounters = () => {
  if (countersAnimated) return;
  
  const statsSection = document.querySelector('.stats');
  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  
  if (sectionTop < windowHeight * 0.8) {
    countersAnimated = true;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      let current = 0;
      const increment = target / 100;
      const duration = 2000; // 2 seconds
      const stepTime = duration / 100;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, stepTime);
        } else {
          counter.textContent = target + '+';
        }
      };
      
      updateCounter();
    });
  }
};

window.addEventListener('scroll', animateCounters);
animateCounters(); // Initial check

// Parallax Effect for Hero Image
const heroImage = document.querySelector('.hero-image .image-wrapper');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
});

// Sticky Navbar & Active Section Highlight
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Sticky navbar
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active section highlight
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinksContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Typing Effect
const typingTexts = ['Frontend Developer', 'React Developer', 'UI/UX Developer', 'Web Designer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();

// Skill Progress Bars Animation
const skillProgress = document.querySelectorAll('.skill-progress');
const skillsSection = document.getElementById('skills');

const animateSkills = () => {
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.8) {
        skillProgress.forEach(progress => {
            const progressValue = progress.getAttribute('data-progress');
            progress.style.width = progressValue + '%';
        });
        window.removeEventListener('scroll', animateSkills);
    }
};

window.addEventListener('scroll', animateSkills);

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check
