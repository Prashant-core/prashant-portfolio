// ── SCROLL PROGRESS BAR ──
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  if (scrollProgress) scrollProgress.style.width = progress + '%';
});

// ── NAVBAR SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── ACTIVE NAV HIGHLIGHT ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));

// ── HAMBURGER MENU ──
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
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

// ── TYPING ANIMATION ──
const typingRoles = [
  'AI & ML Engineer',
  'Python Developer',
  'Deep Learning Builder',
  'Problem Solver',
  'Open to Opportunities'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeRole() {
  if (!typingEl) return;
  const currentRole = typingRoles[roleIndex];
  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % typingRoles.length;
    speed = 400;
  }
  setTimeout(typeRole, speed);
}
setTimeout(typeRole, 800);

// ── BACK TO TOP ──
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTopBtn) {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
});
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── ANIMATED STAT COUNTERS ──
function animateCounter(el, target, duration = 1200) {
  const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.innerHTML = Math.floor(start) + suffix;
  }, 16);
}

const statsSection = document.getElementById('about-stats');
let statsAnimated = false;
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.stat-num[data-count]').forEach(el => {
          const target = parseInt(el.getAttribute('data-count'));
          animateCounter(el, target);
        });
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

// ── COPY EMAIL BUTTON ──
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

// ── GITHUB STATS ──
async function fetchGitHubStats() {
  const username = 'Prashant-core';
  const loading = document.getElementById('gh-loading');
  const statsGrid = document.getElementById('gh-stats-grid');
  const langsEl = document.getElementById('gh-langs');

  try {
    // Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const user = await userRes.json();

    if (user.login) {
      document.getElementById('gh-repos').textContent = user.public_repos || 0;
      document.getElementById('gh-followers').textContent = user.followers || 0;
      document.getElementById('gh-following').textContent = user.following || 0;

      // Fetch repos to count stars + languages
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const repos = await reposRes.json();

      if (Array.isArray(repos)) {
        // Total stars
        const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
        document.getElementById('gh-stars').textContent = totalStars;

        // Language breakdown
        const langCount = {};
        repos.forEach(r => {
          if (r.language) {
            langCount[r.language] = (langCount[r.language] || 0) + 1;
          }
        });

        const langColors = {
          'Python': '#3572A5',
          'JavaScript': '#f1e05a',
          'HTML': '#e34c26',
          'CSS': '#563d7c',
          'Java': '#b07219',
          'TypeScript': '#2b7489',
          'Jupyter Notebook': '#DA5B0B',
          'Shell': '#89e051',
        };

        const sorted = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6);

        const total = sorted.reduce((a, b) => a + b[1], 0);

        if (langsEl && sorted.length > 0) {
          // Bar
          const barHtml = sorted.map(([lang, count]) => {
            const pct = ((count / total) * 100).toFixed(1);
            const color = langColors[lang] || '#a78bfa';
            return `<div class="gh-lang-bar-seg" style="width:${pct}%;background:${color}" title="${lang}: ${pct}%"></div>`;
          }).join('');

          // Labels
          const labelsHtml = sorted.map(([lang, count]) => {
            const pct = ((count / total) * 100).toFixed(1);
            const color = langColors[lang] || '#a78bfa';
            return `<div class="gh-lang-label">
              <span class="gh-lang-dot" style="background:${color}"></span>
              <span class="gh-lang-name">${lang}</span>
              <span class="gh-lang-pct">${pct}%</span>
            </div>`;
          }).join('');

          langsEl.innerHTML = `
            <div class="gh-lang-bar">${barHtml}</div>
            <div class="gh-lang-labels">${labelsHtml}</div>
          `;
        }
      }

      if (loading) loading.style.display = 'none';
      if (statsGrid) statsGrid.style.opacity = '1';
    }
  } catch (err) {
    if (loading) loading.innerHTML = '<span style="color:#888;font-size:13px">Could not load GitHub data</span>';
    console.error('GitHub API error:', err);
  }
}

// Fetch when GitHub section is visible
const ghSection = document.querySelector('.github-stats');
if (ghSection) {
  const ghObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchGitHubStats();
        ghObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });
  ghObserver.observe(ghSection);
}

// ── FOOTER YEAR ──
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// ── 3D PARTICLE CANVAS ANIMATION ──
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let width, height, particles = [];
let mouse = { x: null, y: null };

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.z = Math.random() * 2 + 0.5;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4 * this.z;
    this.speedY = (Math.random() - 0.5) * 0.4 * this.z;
    this.opacity = Math.random() * 0.6 + 0.2;
    const colors = ['#7c3aed', '#ec4899', '#f97316', '#a78bfa', '#fb7185'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.pulse = Math.random() * Math.PI * 2;
  }
  update() {
    this.pulse += 0.02;
    this.x += this.speedX;
    this.y += this.speedY;
    if (mouse.x && mouse.y) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x += (dx / dist) * 1.5;
        this.y += (dy / dist) * 1.5;
      }
    }
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }
  draw() {
    const pulsedSize = this.size + Math.sin(this.pulse) * 0.5;
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, pulsedSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 130) * 0.15;
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor((width * height) / 12000);
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();

const orbs = [
  { x: 0.2, y: 0.3, r: 250, color: '#7c3aed', speed: 0.0008 },
  { x: 0.8, y: 0.2, r: 200, color: '#ec4899', speed: 0.001 },
  { x: 0.6, y: 0.8, r: 180, color: '#f97316', speed: 0.0012 },
];
let orbTime = 0;

function drawOrbs() {
  orbTime += 0.01;
  orbs.forEach((orb, i) => {
    const x = (orb.x + Math.sin(orbTime * orb.speed * 1000 + i) * 0.05) * width;
    const y = (orb.y + Math.cos(orbTime * orb.speed * 1000 + i) * 0.05) * height;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
    grad.addColorStop(0, orb.color + '22');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, orb.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  drawOrbs();
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const bars = entry.target.querySelectorAll('.skill-bar-fill');
      bars.forEach(bar => {
        const w = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
document.querySelectorAll('.skills').forEach(el => observer.observe(el));

// ── CONTACT FORM ──
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    const data = new FormData(form);
    try {
      const res = await fetch('/contact', { method: 'POST', body: data });
      const json = await res.json();
      if (json.status === 'success') {
        status.innerHTML = '<p class="form-success">Message sent! I\'ll get back to you soon.</p>';
        form.reset();
      } else {
        status.innerHTML = '<p class="form-error">Something went wrong. Please email me directly.</p>';
      }
    } catch {
      status.innerHTML = '<p class="form-error">Network error. Try again.</p>';
    }
    btn.textContent = 'Send Message';
    btn.disabled = false;
  });
}

// ── SMOOTH REVEAL ON LOAD ──
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});

// ── CURSOR GLOW EFFECT ──
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed; width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
  border-radius: 50%; pointer-events: none; z-index: 0;
  transform: translate(-50%, -50%); transition: all 0.1s ease;
`;
document.body.appendChild(cursorGlow);
window.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});