// ═══════════════════════════════════════════════════════════
// PRASHANT KUMAR — PORTFOLIO ANIMATION.JS
// Complete & Fixed Version
// ═══════════════════════════════════════════════════════════

// ── 1. SCROLL PROGRESS BAR ──────────────────────────────────
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (scrollTop / docHeight * 100) + '%';
});

// ── 2. NAVBAR SCROLL EFFECT ─────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── 3. ACTIVE NAV HIGHLIGHT ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) link.classList.add('active');
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

// ── 4. HAMBURGER MENU ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

function closeMobileMenu() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    if (!mobileMenu.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

// ── 5. THEME TOGGLE ─────────────────────────────────────────
// FIX: Unified system — sets BOTH data-theme on <html> AND
// body.light-mode class so ALL CSS rules fire correctly.
// Persists preference to localStorage.
(function initTheme() {
  const btn     = document.getElementById('themeToggleBtn');
  const html    = document.documentElement;
  const circle  = document.getElementById('themeCircle');
  const iconMoon = document.querySelector('.icon-moon');
  const iconSun  = document.querySelector('.icon-sun');

  // Apply theme — sets BOTH systems
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('pk-theme', theme);

    // Update icons
    if (iconMoon && iconSun) {
      iconMoon.style.display = theme === 'dark'  ? 'block' : 'none';
      iconSun.style.display  = theme === 'light' ? 'block' : 'none';
    }
  }

  // Load saved preference (default dark)
  const saved = localStorage.getItem('pk-theme') || 'dark';
  applyTheme(saved);

  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const next    = current === 'dark' ? 'light' : 'dark';

    // Circle reveal animation
    if (circle) {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2.8;

      circle.style.transition = 'none';
      circle.style.width      = '0px';
      circle.style.height     = '0px';
      circle.style.left       = cx + 'px';
      circle.style.top        = cy + 'px';
      circle.style.background = next === 'light' ? '#f5f5f7' : '#08080f';
      circle.style.zIndex     = '99999';

      void circle.offsetWidth; // force reflow

      circle.style.transition = 'width 0.65s ease, height 0.65s ease';
      circle.style.width      = maxDim + 'px';
      circle.style.height     = maxDim + 'px';

      // Apply theme at midpoint so it's seamless
      setTimeout(() => applyTheme(next), 300);

      // Collapse circle after animation
      setTimeout(() => {
        circle.style.transition = 'none';
        circle.style.width      = '0px';
        circle.style.height     = '0px';
      }, 720);
    } else {
      applyTheme(next);
    }
  });
})();

// ── 6. TYPING ANIMATION ─────────────────────────────────────
// FIX: Looks up #typing-text INSIDE the function every call,
// not cached at load time. Hero "I'm an ___" sentence format.
const typingRoles = [
  'AI & ML Engineer.',
  'Python Developer.',
  'Deep Learning Builder.',
  'Problem Solver.',
  'Final Year B.Tech Student.'
];
let roleIndex    = 0;
let charIndex    = 0;
let isDeleting   = false;
let typingActive = false;

function typeRole() {
  const el = document.getElementById('typing-text');
  if (!el) {
    // Element not ready yet — keep retrying
    setTimeout(typeRole, 200);
    return;
  }
  const cur  = typingRoles[roleIndex];
  el.textContent = isDeleting
    ? cur.substring(0, charIndex - 1)
    : cur.substring(0, charIndex + 1);

  isDeleting ? charIndex-- : charIndex++;

  let speed = isDeleting ? 55 : 95;
  if (!isDeleting && charIndex === cur.length) {
    speed      = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % typingRoles.length;
    speed      = 500;
  }
  setTimeout(typeRole, speed);
}

// Start typing — three triggers to ensure it fires regardless of load order
function startTyping() {
  if (typingActive) return;
  typingActive = true;
  typeRole();
}
setTimeout(startTyping, 800);
document.addEventListener('DOMContentLoaded', () => setTimeout(startTyping, 400));
window.addEventListener('load', () => setTimeout(startTyping, 200));

// ── 7. BACK TO TOP ──────────────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (!backToTopBtn) return;
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
});
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── 8. ANIMATED STAT COUNTERS ───────────────────────────────
function animateCounter(el, target, duration = 1200) {
  const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
  let start    = 0;
  const step   = target / (duration / 16);
  const timer  = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.innerHTML = Math.floor(start) + suffix;
  }, 16);
}

const statsSection = document.getElementById('about-stats');
let statsAnimated  = false;
if (statsSection) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.stat-num[data-count]').forEach(el => {
          animateCounter(el, parseInt(el.getAttribute('data-count')));
        });
      }
    });
  }, { threshold: 0.5 }).observe(statsSection);
}

// ── 9. LIVE AGE COUNTER ─────────────────────────────────────
// UPDATE your actual birthdate below
function updateAge() {
  const el  = document.getElementById('age-counter');
  if (!el) return;
  const dob  = new Date('2004-01-13T00:00:00');
  const diff = (new Date() - dob) / (1000 * 60 * 60 * 24 * 365.25);
  el.textContent = diff.toFixed(6);
}
updateAge();
setInterval(updateAge, 100);

// ── 10. COPY EMAIL ──────────────────────────────────────────
function copyEmail(e, email) {
  e.preventDefault();
  e.stopPropagation();
  navigator.clipboard.writeText(email).then(() => {
    const btn = e.currentTarget;
    btn.classList.add('copied');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
    }, 2000);
  });
}

// ── 11. GITHUB STATS ────────────────────────────────────────
async function fetchGitHubStats() {
  const username  = 'Prashant-core';
  const loadingEl = document.getElementById('gh-loading');
  const statsRow  = document.getElementById('gh-stats-row');
  const langsEl   = document.getElementById('gh-langs');

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!userRes.ok) throw new Error('GitHub API failed: ' + userRes.status);
    const user = await userRes.json();
    if (!user.login) throw new Error('Invalid user');

    const reposEl     = document.getElementById('gh-repos');
    const followersEl = document.getElementById('gh-followers');
    const followingEl = document.getElementById('gh-following');
    const starsEl     = document.getElementById('gh-stars');

    if (reposEl)     reposEl.textContent     = user.public_repos || 0;
    if (followersEl) followersEl.textContent = user.followers    || 0;
    if (followingEl) followingEl.textContent = user.following    || 0;

    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );
    const repos = await reposRes.json();

    if (Array.isArray(repos)) {
      const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      if (starsEl) starsEl.textContent = totalStars;

      // Language breakdown
      const langColors = {
        'Python': '#3572A5', 'JavaScript': '#f1e05a', 'HTML': '#e34c26',
        'CSS': '#563d7c', 'Java': '#b07219', 'TypeScript': '#2b7489',
        'Jupyter Notebook': '#DA5B0B', 'Shell': '#89e051',
      };
      const langCount = {};
      repos.forEach(r => {
        if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
      });
      const sorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
      const total  = sorted.reduce((a, b) => a + b[1], 0);

      if (langsEl && sorted.length > 0) {
        const barHtml = sorted.map(([lang, count]) => {
          const pct = ((count / total) * 100).toFixed(1);
          const col = langColors[lang] || '#a78bfa';
          return `<div class="gh-lang-bar-seg" style="width:${pct}%;background:${col}" title="${lang}: ${pct}%"></div>`;
        }).join('');
        const labelsHtml = sorted.map(([lang, count]) => {
          const pct = ((count / total) * 100).toFixed(1);
          const col = langColors[lang] || '#a78bfa';
          return `<div class="gh-lang-label">
            <span class="gh-lang-dot" style="background:${col}"></span>
            <span class="gh-lang-name">${lang}</span>
            <span class="gh-lang-pct">${pct}%</span>
          </div>`;
        }).join('');
        langsEl.innerHTML = `<div class="gh-lang-bar">${barHtml}</div><div class="gh-lang-labels">${labelsHtml}</div>`;
      }
    }

    if (loadingEl) loadingEl.style.display = 'none';
    if (statsRow)  statsRow.style.opacity  = '1';

  } catch (err) {
    if (loadingEl) loadingEl.innerHTML = `<span style="color:#666;font-size:13px">
      Could not load — <a href="https://github.com/Prashant-core" target="_blank" style="color:#7c3aed">Visit GitHub ↗</a>
    </span>`;
    console.warn('GitHub API error:', err);
  }
}

const ghSection = document.querySelector('.github-stats');
if (ghSection) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { fetchGitHubStats(); }
    });
  }, { threshold: 0.1 }).observe(ghSection);
}

// ── 12. HERO CANVAS PARTICLES ───────────────────────────────
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height, particles = [];
  let mouse = { x: null, y: null };

  function resizeCanvas() {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x       = Math.random() * width;
      this.y       = Math.random() * height;
      this.z       = Math.random() * 2 + 0.5;
      this.size    = Math.random() * 2 + 0.5;
      this.speedX  = (Math.random() - 0.5) * 0.4 * this.z;
      this.speedY  = (Math.random() - 0.5) * 0.4 * this.z;
      this.opacity = Math.random() * 0.6 + 0.2;
      const colors = ['#7c3aed', '#ec4899', '#f97316', '#a78bfa', '#fb7185'];
      this.color   = colors[Math.floor(Math.random() * colors.length)];
      this.pulse   = Math.random() * Math.PI * 2;
    }
    update() {
      this.pulse += 0.02;
      this.x     += this.speedX;
      this.y     += this.speedY;
      if (mouse.x && mouse.y) {
        const dx   = this.x - mouse.x, dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { this.x += (dx / dist) * 1.5; this.y += (dy / dist) * 1.5; }
      }
      if (this.x < 0 || this.x > width)  this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
      const s = this.size + Math.sin(this.pulse) * 0.5;
      ctx.save();
      ctx.globalAlpha  = this.opacity;
      ctx.fillStyle    = this.color;
      ctx.shadowBlur   = 10;
      ctx.shadowColor  = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, s, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 130) * 0.15;
          ctx.strokeStyle = '#7c3aed';
          ctx.lineWidth   = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  const orbs = [
    { x: 0.2, y: 0.3, r: 250, color: '#7c3aed', speed: 0.0008 },
    { x: 0.8, y: 0.2, r: 200, color: '#ec4899', speed: 0.001  },
    { x: 0.6, y: 0.8, r: 180, color: '#f97316', speed: 0.0012 },
  ];
  let orbTime = 0;

  function drawOrbs() {
    orbTime += 0.01;
    orbs.forEach((orb, i) => {
      const x    = (orb.x + Math.sin(orbTime * orb.speed * 1000 + i) * 0.05) * width;
      const y    = (orb.y + Math.cos(orbTime * orb.speed * 1000 + i) * 0.05) * height;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
      grad.addColorStop(0, orb.color + '22');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, orb.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 12000);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  initParticles();

  function animate() {
    ctx.clearRect(0, 0, width, height);
    drawOrbs();
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// ── 13. SCROLL REVEAL ───────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const w = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('[data-aos]').forEach(el => revealObserver.observe(el));
document.querySelectorAll('.skills').forEach(el => revealObserver.observe(el));

// ── 14. CONTACT FORM ────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn     = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled    = true;
    try {
      const res  = await fetch('/contact', { method: 'POST', body: new FormData(contactForm) });
      const json = await res.json();
      if (json.status === 'success') {
        if (formStatus) formStatus.innerHTML = '<p class="form-success">Message sent! I\'ll get back to you soon.</p>';
        contactForm.reset();
      } else {
        if (formStatus) formStatus.innerHTML = '<p class="form-error">Something went wrong. Please email me directly.</p>';
      }
    } catch {
      if (formStatus) formStatus.innerHTML = '<p class="form-error">Network error. Try again.</p>';
    }
    btn.textContent = 'Send Message';
    btn.disabled    = false;
  });
}

// ── 15. CURSOR GLOW ─────────────────────────────────────────
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = 'position:fixed;width:300px;height:300px;background:radial-gradient(circle,rgba(124,58,237,0.06) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:left 0.1s ease,top 0.1s ease;';
document.body.appendChild(cursorGlow);
window.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ── 16. LEAFLET MAP ─────────────────────────────────────────
window.addEventListener('load', () => {
  const mapEl = document.getElementById('bento-map');
  if (mapEl && typeof L !== 'undefined') {
    const map = L.map('bento-map', {
      zoomControl: false, scrollWheelZoom: false,
      dragging: false, attributionControl: false
    }).setView([28.5355, 77.3910], 11);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
    L.circleMarker([28.5355, 77.3910], {
      color: '#14b8a6', fillColor: '#14b8a6', fillOpacity: 0.7, radius: 8
    }).addTo(map);
  }
});

// ── 17. PAGE FADE IN ────────────────────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});

// ── 18. LIVE VIEW COUNTER ───────────────────────────────────
(async function fetchViewCount() {
  const viewEl = document.getElementById('view-count');
  if (!viewEl) return;
  try {
    const res  = await fetch('https://api.counterapi.dev/v1/prashant-portfolio-pk/views/up');
    const data = await res.json();
    if (data && data.count !== undefined) {
      const target  = data.count;
      let   current = Math.max(0, target - 20);
      const timer   = setInterval(() => {
        current += 1;
        if (current >= target) { current = target; clearInterval(timer); }
        viewEl.textContent = current.toLocaleString();
      }, 40);
    }
  } catch {
    const el = document.getElementById('view-count');
    if (el) el.textContent = '—';
  }
})();

// ── 19. FOOTER YEAR ─────────────────────────────────────────
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();