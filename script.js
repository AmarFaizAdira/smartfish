/**
 * Smart Fish Farm – script.js
 * Handles: Navbar, Scroll Animations, Hamburger, Form, etc.
 */

/* ============================================================
   NAVBAR – Sticky + Scroll Effect
   ============================================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ============================================================
   ACTIVE NAV LINK – highlight based on scroll position
   ============================================================ */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (navLink) {
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

/* ============================================================
   REVEAL ON SCROLL – Intersection Observer
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  }
);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ============================================================
   CONTACT FORM – Simulate submission
   ============================================================ */
const kontakForm = document.getElementById('kontakForm');
const formSuccess = document.getElementById('formSuccess');

if (kontakForm) {
  kontakForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = kontakForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    // Simulate async submission
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      formSuccess.classList.add('show');
      kontakForm.reset();

      // Hide success after 5 seconds
      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    }, 1500);
  });
}

/* ============================================================
   SMOOTH SCROLL for all anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   COUNTER ANIMATION – Hero stats
   ============================================================ */
function animateCounter(el, target, suffix = '', duration = 1800) {
  const isString = isNaN(parseInt(target));
  if (isString) { el.textContent = target; return; }

  let start = 0;
  const end = parseInt(target);
  const increment = end / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= end) {
      clearInterval(timer);
      el.textContent = end + suffix;
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

// Observe hero stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(num => {
        const text = num.textContent;
        if (text.includes('+')) {
          animateCounter(num, text.replace('+', ''), '+');
        } else if (text.includes('%')) {
          animateCounter(num, text.replace('%', ''), '%');
        }
        // "24/7" stays as-is
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ============================================================
   NAVBAR LOGO visibility fix
   ============================================================ */
// Ensure logo is always visible after scroll
window.addEventListener('DOMContentLoaded', () => {
  // Trigger initial check
  updateActiveNavLink();
});

/* ============================================================
   GALLERY ITEM – hover lightbox hint
   ============================================================ */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.02)';
    this.style.transition = 'transform 0.3s ease';
    this.style.zIndex = '2';
    this.style.position = 'relative';
  });
  item.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
    this.style.zIndex = '1';
  });
});

/* ============================================================
   PRODUCT CARDS – Tilt effect on hover (subtle)
   ============================================================ */
document.querySelectorAll('.produk-card, .service-card, .testi-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    this.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});

/* ============================================================
   IoT DIAGRAM – animate arrows
   ============================================================ */
const iotArrows = document.querySelectorAll('.iot-arrow');
iotArrows.forEach((arrow, i) => {
  arrow.style.animation = `arrowPulse 1.5s ease-in-out infinite ${i * 0.3}s`;
});

// Add keyframe via JS
const style = document.createElement('style');
style.textContent = `
  @keyframes arrowPulse {
    0%, 100% { opacity: 0.3; transform: translateX(0); }
    50% { opacity: 1; transform: translateX(4px); }
  }
`;
document.head.appendChild(style);

/* ============================================================
   PAGE LOAD – fade in
   ============================================================ */
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.4s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
