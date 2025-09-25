// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 65, 0.1)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat-item, .contact-method');
  animateElements.forEach(el => observer.observe(el));
});

// Typing effect for hero section
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

// Typing effect for multiple titles
const titles = [
  'Full Stack Engineer',
  'Web Developer',
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Mobile Developer'
];

let currentTitleIndex = 0;
let isDeleting = false;
let currentText = '';
let typeSpeed = 100;

function typeMultipleTitles() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const currentTitle = titles[currentTitleIndex];

  if (isDeleting) {
    currentText = currentTitle.substring(0, currentText.length - 1);
    typeSpeed = 50;
  } else {
    currentText = currentTitle.substring(0, currentText.length + 1);
    typeSpeed = 100;
  }

  typingElement.textContent = currentText;

  if (!isDeleting && currentText === currentTitle) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && currentText === '') {
    isDeleting = false;
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
    typeSpeed = 500; // Pause before next title
  }

  setTimeout(typeMultipleTitles, typeSpeed);
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title .glow-text');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
  }

  // Start the multiple titles typing effect
  setTimeout(typeMultipleTitles, 2000);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Glow effect on hover for interactive elements
document.addEventListener('DOMContentLoaded', () => {
  const glowElements = document.querySelectorAll('.btn, .skill-item, .project-card, .social-link');

  glowElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.8)';
    });

    element.addEventListener('mouseleave', () => {
      element.style.boxShadow = '';
    });
  });
});

// Initialize EmailJS
(function () {
  emailjs.init("NBTUjQdg6m3Wj2jau"); // Ganti dengan Public Key Anda
})();

// Contact form handling with EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show loading notification
    showNotification('Sending message...', 'info');

    // Get form data
    const formData = new FormData(contactForm);
    const templateParams = {
      from_name: formData.get('from_name'),
      from_email: formData.get('from_email'),
      phone: formData.get('phone_number'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      to_email: 'akhmadfauzan114@gmail.com' // Email tujuan
    };

    // Send email using EmailJS
    emailjs.send('service_rs9eyk1', 'template_8yl536l', templateParams)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
      }, function (error) {
        console.log('FAILED...', error);
        showNotification('Failed to send message. Please try again.', 'error');
      });
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-green)' : type === 'error' ? '#ff4757' : 'var(--accent-black)'};
        color: ${type === 'success' ? 'var(--primary-black)' : 'var(--text-white)'};
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--glow-green);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Skill items hover effect with glow
document.addEventListener('DOMContentLoaded', () => {
  const skillItems = document.querySelectorAll('.skill-item');

  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.05) translateY(-5px)';
      item.style.boxShadow = '0 10px 30px rgba(0, 255, 65, 0.5)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.boxShadow = '';
    });
  });
});

// Project cards 3D tilt effect
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
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

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-green) !important;
        text-shadow: var(--glow-green) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Particle effect for hero section
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-green);
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: var(--glow-green);
        `;
    hero.appendChild(particle);
  }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles when page loads
window.addEventListener('load', createParticles);

// Scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, var(--primary-green), var(--accent-green));
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: var(--glow-green);
    `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Performance Optimizations
// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => img.classList.add('loaded'));
  }
}

// Debounce function for scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 65, 0.1)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    navbar.style.boxShadow = 'none';
  }
}, 10);

// Replace the existing scroll event listener
window.removeEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 65, 0.1)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical resources
function preloadCriticalResources() {
  const criticalImages = [
    'my-photo.png',
    'clients/bnpb-logo.png',
    'clients/kredivo-logo.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Optimize animations based on user preference
function optimizeAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--glow-green', 'none');
    document.documentElement.style.setProperty('--glow-green-strong', 'none');
  }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  initLazyLoading();
  preloadCriticalResources();
  optimizeAnimations();
});

// Service Worker registration for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Internationalization (i18n) functionality
let currentLanguage = localStorage.getItem('language') || 'en';

// Language data
const translations = {
  en: {
    'About Me': 'About Me',
    'I\'m a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications that solve real-world problems.': 'I\'m a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications that solve real-world problems.',
    'With a strong foundation in both frontend and backend development, I bring ideas to life through clean code and innovative solutions.': 'With a strong foundation in both frontend and backend development, I bring ideas to life through clean code and innovative solutions.',
    'Years Experience': 'Years Experience',
    'Projects Completed': 'Projects Completed',
    'Skills & Technologies': 'Skills & Technologies',
    'Frontend': 'Frontend',
    'Backend': 'Backend',
    'Tools & Others': 'Tools & Others',
    'Featured Projects': 'Featured Projects',
    'Delivered Projects': 'Delivered Projects',
    'Trusted by leading organizations and companies': 'Trusted by leading organizations and companies',
    'Get In Touch': 'Get In Touch',
    'Let\'s work together!': 'Let\'s work together!',
    'I\'m always interested in new opportunities and exciting projects. Feel free to reach out if you\'d like to collaborate.': 'I\'m always interested in new opportunities and exciting projects. Feel free to reach out if you\'d like to collaborate.',
    'Send Message': 'Send Message',
    'Your Name': 'Your Name',
    'Your Email': 'Your Email',
    'Your Phone Number': 'Your Phone Number',
    'Subject': 'Subject',
    'Your Message': 'Your Message'
  },
  id: {
    'About Me': 'Tentang Saya',
    'I\'m a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications that solve real-world problems.': 'Saya adalah developer full-stack yang berpassion dengan keahlian dalam teknologi web modern. Saya suka menciptakan aplikasi yang efisien, scalable, dan user-friendly yang menyelesaikan masalah dunia nyata.',
    'With a strong foundation in both frontend and backend development, I bring ideas to life through clean code and innovative solutions.': 'Dengan fondasi yang kuat dalam pengembangan frontend dan backend, saya mewujudkan ide-ide melalui kode yang bersih dan solusi inovatif.',
    'Years Experience': 'Tahun Pengalaman',
    'Projects Completed': 'Proyek Selesai',
    'Skills & Technologies': 'Keahlian & Teknologi',
    'Frontend': 'Frontend',
    'Backend': 'Backend',
    'Tools & Others': 'Tools & Lainnya',
    'Featured Projects': 'Proyek Unggulan',
    'Delivered Projects': 'Proyek yang Diselesaikan',
    'Trusted by leading organizations and companies': 'Dipercaya oleh organisasi dan perusahaan terkemuka',
    'Get In Touch': 'Hubungi Saya',
    'Let\'s work together!': 'Mari bekerja sama!',
    'I\'m always interested in new opportunities and exciting projects. Feel free to reach out if you\'d like to collaborate.': 'Saya selalu tertarik dengan peluang baru dan proyek yang menarik. Jangan ragu untuk menghubungi saya jika Anda ingin berkolaborasi.',
    'Send Message': 'Kirim Pesan',
    'Your Name': 'Nama Anda',
    'Your Email': 'Email Anda',
    'Your Phone Number': 'Nomor Telepon Anda',
    'Subject': 'Subjek',
    'Your Message': 'Pesan Anda'
  }
};

// Function to update content based on current language
function updateContent() {
  // First, update elements with data attributes (this is the primary method)
  const elements = document.querySelectorAll('[data-en], [data-id]');

  elements.forEach(element => {
    const enText = element.getAttribute('data-en');
    const idText = element.getAttribute('data-id');

    if (currentLanguage === 'id' && idText) {
      element.textContent = idText;
    } else if (currentLanguage === 'en' && enText) {
      element.textContent = enText;
    }
  });

  // Update form placeholders using data attributes
  const formInputs = document.querySelectorAll('input[data-placeholder-en], textarea[data-placeholder-en]');
  formInputs.forEach(input => {
    const enPlaceholder = input.getAttribute('data-placeholder-en');
    const idPlaceholder = input.getAttribute('data-placeholder-id');

    if (currentLanguage === 'id' && idPlaceholder) {
      input.setAttribute('placeholder', idPlaceholder);
    } else if (currentLanguage === 'en' && enPlaceholder) {
      input.setAttribute('placeholder', enPlaceholder);
    }
  });

  // Update section titles using data attributes
  const sectionTitles = document.querySelectorAll('.section-title .glow-text[data-en], .section-title .glow-text[data-id]');
  sectionTitles.forEach(title => {
    const enText = title.getAttribute('data-en');
    const idText = title.getAttribute('data-id');

    if (currentLanguage === 'id' && idText) {
      title.textContent = idText;
    } else if (currentLanguage === 'en' && enText) {
      title.textContent = enText;
    }
  });

  // Update navigation links using data attributes
  const navLinks = document.querySelectorAll('.nav-link[data-en], .nav-link[data-id]');
  navLinks.forEach(link => {
    const enText = link.getAttribute('data-en');
    const idText = link.getAttribute('data-id');

    if (currentLanguage === 'id' && idText) {
      link.textContent = idText;
    } else if (currentLanguage === 'en' && enText) {
      link.textContent = enText;
    }
  });

  // Update hero buttons using data attributes
  const heroButtons = document.querySelectorAll('.hero-buttons a[data-en], .hero-buttons a[data-id]');
  heroButtons.forEach(button => {
    const enText = button.getAttribute('data-en');
    const idText = button.getAttribute('data-id');

    if (currentLanguage === 'id' && idText) {
      button.textContent = idText;
    } else if (currentLanguage === 'en' && enText) {
      button.textContent = enText;
    }
  });
}

// Language switcher functionality
document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      langButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Update current language
      currentLanguage = button.getAttribute('data-lang');
      localStorage.setItem('language', currentLanguage);

      // Update content
      updateContent();
    });
  });

  // Set initial language
  const savedLang = localStorage.getItem('language') || 'en';
  const activeButton = document.querySelector(`[data-lang="${savedLang}"]`);
  if (activeButton) {
    langButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
    currentLanguage = savedLang;
  }

  // Update content on page load
  updateContent();
});

// Pricing cards expand/collapse functionality
document.addEventListener('DOMContentLoaded', function () {
  const expandButtons = document.querySelectorAll('.expand-btn');

  expandButtons.forEach(button => {
    button.addEventListener('click', function () {
      const pricingCard = this.closest('.pricing-card');
      const features = pricingCard.querySelector('.pricing-features');
      const icon = this.querySelector('.expand-icon');
      const text = this.querySelector('.expand-text');

      // Toggle expanded state
      if (features.classList.contains('collapsed')) {
        features.classList.remove('collapsed');
        features.classList.add('expanded');
        this.classList.add('expanded');
        icon.style.transform = 'rotate(180deg)';
        text.textContent = text.getAttribute('data-en') === 'View Details' ? 'Hide Details' : 'Sembunyikan Detail';
      } else {
        features.classList.remove('expanded');
        features.classList.add('collapsed');
        this.classList.remove('expanded');
        icon.style.transform = 'rotate(0deg)';
        text.textContent = text.getAttribute('data-en') === 'View Details' ? 'View Details' : 'Lihat Detail';
      }
    });
  });
});
