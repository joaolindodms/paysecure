
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.classList.toggle('active');
});

// Smooth scrolling for navigation links
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

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = formatNumber(target);
      clearInterval(timer);
    } else {
      element.textContent = formatNumber(Math.floor(start));
    }
  }, 16);
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      
      // Animate stats when they come into view
      if (entry.target.classList.contains('stats')) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          animateCounter(stat, target);
        });
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll(
    '.feature-card, .testimonial-card, .stat-card, .stats, .about, .hero-content'
  );
  
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
});

// Header background on scroll
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  }
  
  lastScrollTop = scrollTop;
});

// Form handlers for buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
  button.addEventListener('click', (e) => {
    if (button.textContent.includes('Experimentar') || 
        button.textContent.includes('Começar') || 
        button.textContent.includes('Teste')) {
      e.preventDefault();
      window.location.href = 'login.html';
    } else if (button.textContent.includes('Demonstração') || 
               button.textContent.includes('Especialista')) {
      e.preventDefault();
      window.location.href = 'login.html';
    }
  });
});


// Add loading animation to hero elements
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-buttons, .trust-indicators');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('fade-in-up');
    }, index * 200);
  });
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElement = document.querySelector('.dashboard-image');
  if (parallaxElement) {
    const speed = scrolled * 0.1;
    parallaxElement.style.transform = `perspective(1000px) rotateY(-10deg) rotateX(5deg) translateY(${speed}px)`;
  }
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Dynamic copyright year
document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.querySelector('.footer-bottom p');
  if (copyrightElement) {
    copyrightElement.innerHTML = `&copy; ${currentYear} PaySecure. Todos os direitos reservados.`;
  }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    // Uncomment the line below if you want the typing effect
    // typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ''), 50);
  }
});

// Add pulse animation to CTA buttons
setInterval(() => {
  const ctaButtons = document.querySelectorAll('.cta .btn-primary');
  ctaButtons.forEach(button => {
    button.style.transform = 'scale(1.05)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 200);
  });
}, 3000);

// Performance optimization: debounce scroll events
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

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
  // Scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);