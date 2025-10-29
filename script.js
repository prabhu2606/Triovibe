// ============================================
// Navigation
// ============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
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

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const bars = navToggle.querySelectorAll('.bar');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.service-card, .project-card, .contact-info, .contact-form');
animatedElements.forEach(el => observer.observe(el));

// ============================================
// Staggered Animation for Service Cards
// ============================================

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`;
});

// ============================================
// Staggered Animation for Project Cards
// ============================================

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`;
});

// ============================================
// Form Handling
// ============================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Add smooth loading animation
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Simulate form submission
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Here you would normally send the data to a server
        // For demo purposes, we'll simulate a delay
        setTimeout(() => {
            submitButton.textContent = '✓ Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// ============================================
// Parallax Effect for Hero
// ============================================

const heroContent = document.querySelector('.hero-content');
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (heroContent && scrolled < window.innerHeight) {
        // Subtle parallax effect
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
    
    // Move orbs slightly
    if (orbs.length > 0 && scrolled < window.innerHeight) {
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            orb.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.1}px)`;
        });
    }
});

// ============================================
// Cursor Trail Effect (Optional Enhancement)
// ============================================

let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Create a subtle trail effect for interactive elements
    const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
    
    if (hoveredElement && (hoveredElement.tagName === 'A' || hoveredElement.tagName === 'BUTTON' || hoveredElement.classList.contains('service-card') || hoveredElement.classList.contains('project-card'))) {
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'default';
    }
});

// ============================================
// Smooth Scroll Indicator Animation
// ============================================

window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator && window.pageYOffset > 100) {
        scrollIndicator.style.opacity = '0';
    }
});

// ============================================
// Lazy Loading for Images (if added later)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Add Active State to Current Section Link
// ============================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// Performance Optimization: Debounce Function
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations
}, 10);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// ============================================
// Page Load Animation
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) {
            heroButtons.style.opacity = '1';
        }
    }, 600);
});

// ============================================
// Easter Egg: Konami Code (Optional)
// ============================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Add fun animation
        document.body.style.animation = 'rainbow 5s infinite';
        console.log('🎉 Konami Code activated!');
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ============================================
// Logo click → Go to Home
// ============================================

const logoClickableElements = document.querySelectorAll('.nav-logo, .footer-logo, .logo-text');

logoClickableElements.forEach(el => {
	el.style.cursor = 'pointer';
	el.addEventListener('click', () => {
		const target = document.querySelector('#home');
		if (target) {
			const headerOffset = 80;
			const elementPosition = target.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		} else {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}

		// Close mobile menu if open
		navMenu && navMenu.classList.remove('active');
		navToggle && navToggle.classList.remove('active');
	});
});
