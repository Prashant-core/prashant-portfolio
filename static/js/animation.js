// ── HERO VIDEO FADE IN ──
const heroVideo = document.getElementById("hero-video");
if (heroVideo) {
  heroVideo.addEventListener("canplay", () => { heroVideo.classList.add("loaded"); });
  if (heroVideo.readyState >= 3) heroVideo.classList.add("loaded");
}

// ── SCROLL PROGRESS BAR ──
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollProgress) scrollProgress.style.width = ((scrollTop / docHeight) * 100) + '%';
});

// ── NAVBAR SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
});

// ── ACTIVE NAV HIGHLIGHT ──
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
    if (!mobileMenu.contains(e.target) && hamburger && !hamburger.contains(e.target)) closeMobileMenu();
  }
});

// ── TYPING ANIMATION ──
const typingRoles = ['AI & ML Engineer','Python Developer','Deep Learning Builder','Problem Solver','Open to Opportunities'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typing-text');
function typeRole() {
  if (!typingEl) return;
  const cur = typingRoles[roleIndex];
  typingEl.textContent = isDeleting ? cur.substring(0, charIndex - 1) : cur.substring(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;
  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === cur.length) { speed = 1800; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % typingRoles.length; speed = 400; }
  setTimeout(typeRole, speed);
}
setTimeout(typeRole, 800);

// ── BACK TO TOP ──
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  }
});
if (backToTopBtn) backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── ANIMATED STAT COUNTERS ──
function animateCounter(el, target, duration = 1200) {
  const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.innerHTML = Math.floor(start) + suffix;
  }, 16);
}
const statsSection = document.getElementById('about-stats');
let statsAnimated = false;
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

// ── LIVE AGE COUNTER ──
function updateAge() {
  const el = document.getElementById('age-counter');
  if (!el) return;
  // UPDATE THIS TO YOUR ACTUAL BIRTHDATE
  const dob = new Date('2004-01-13T00:00:00');
  el.textContent = ((new Date() - dob) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(6);
}
updateAge();
setInterval(updateAge, 100);

// ── DARK / LIGHT MODE TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const themeLabel  = document.getElementById('themeLabel');
const themeIcon   = document.getElementById('themeIcon');
const themeCircle = document.getElementById('themeCircle');
let isLight = false;

function triggerThemeCircle(x, y, toLight) {
  if (!themeCircle) return;
  const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2.5;
  themeCircle.style.left = x + 'px';
  themeCircle.style.top  = y + 'px';
  themeCircle.style.width = '0px';
  themeCircle.style.height = '0px';
  themeCircle.style.background = toLight ? '#f0f0f5' : '#0a0a0f';
  themeCircle.classList.remove('expanding');
  void themeCircle.offsetWidth;
  themeCircle.classList.add('expanding');
  themeCircle.style.width  = maxDim + 'px';
  themeCircle.style.height = maxDim + 'px';
  setTimeout(() => {
    document.body.classList.toggle('light-mode', toLight);
    themeCircle.style.width = '0px';
    themeCircle.style.height = '0px';
  }, 680);
}

if (themeToggle) {
  themeToggle.addEventListener('click', (e) => {
    const rect = themeToggle.getBoundingClientRect();
    isLight = !isLight;
    triggerThemeCircle(rect.left + rect.width / 2, rect.top + rect.height / 2, isLight);
    if (themeIcon)  themeIcon.textContent  = isLight ? '☀️' : '🌙';
    if (themeLabel) themeLabel.textContent = isLight ? 'Light Mode' : 'Dark Mode';
  });
}

// ── LEAFLET MAP ──
window.addEventListener('load', () => {
  const mapEl = document.getElementById('bento-map');
  if (mapEl && typeof L !== 'undefined') {
    const map = L.map('bento-map', {
      zoomControl: false, dragging: false,
      scrollWheelZoom: false, doubleClickZoom: false,
      touchZoom: false, attributionControl: false,
    }).setView([28.5355, 77.3910], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);
    const icon = L.divIcon({
      html: `<div style="width:14px;height:14px;border-radius:50%;background:#7c3aed;border:3px solid #fff;box-shadow:0 0 12px rgba(124,58,237,0.8);"></div>`,
      iconSize: [14, 14], iconAnchor: [7, 7], className: '',
    });
    L.marker([28.5355, 77.3910], { icon }).addTo(map);
  }
});

// ── COPY EMAIL ──
function copyEmail(e, email) {
  e.preventDefault(); e.stopPropagation();
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
  const loadingEl = document.getElementById('gh-loading');
  const statsRow  = document.getElementById('gh-stats-row');
  const langsEl   = document.getElementById('gh-langs');
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const user = await userRes.json();
    if (!user.login) throw new Error('User not found');

    document.getElementById('gh-repos').textContent     = user.public_repos || 0;
    document.getElementById('gh-followers').textContent = user.followers || 0;
    document.getElementById('gh-following').textContent = user.following || 0;

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await reposRes.json();

    if (Array.isArray(repos)) {
      document.getElementById('gh-stars').textContent = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);

      const langColors = {
        'Python':'#3572A5','JavaScript':'#f1e05a','HTML':'#e34c26',
        'CSS':'#563d7c','Java':'#b07219','TypeScript':'#2b7489',
        'Jupyter Notebook':'#DA5B0B','Shell':'#89e051',
      };
      const langCount = {};
      repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
      const sorted = Object.entries(langCount).sort((a,b) => b[1]-a[1]).slice(0, 6);
      const total  = sorted.reduce((a, b) => a + b[1], 0);

      if (langsEl && sorted.length > 0) {
        const barHtml = sorted.map(([lang, count]) => {
          const pct = ((count/total)*100).toFixed(1);
          const col = langColors[lang] || '#a78bfa';
          return `<div class="gh-lang-bar-seg" style="width:${pct}%;background:${col}" title="${lang}: ${pct}%"></div>`;
        }).join('');
        const labelsHtml = sorted.map(([lang, count]) => {
          const pct = ((count/total)*100).toFixed(1);
          const col = langColors[lang] || '#a78bfa';
          return `<div class="gh-lang-label"><span class="gh-lang-dot" style="background:${col}"></span><span class="gh-lang-name">${lang}</span><span class="gh-lang-pct">${pct}%</span></div>`;
        }).join('');
        langsEl.innerHTML = `<div class="gh-lang-bar">${barHtml}</div><div class="gh-lang-labels">${labelsHtml}</div>`;
      }

      // Draw contribution graph on canvas
      drawContribGraph(repos);
    }

    if (loadingEl) loadingEl.style.display = 'none';
    if (statsRow)  statsRow.classList.add('loaded');
  } catch (err) {
    if (loadingEl) loadingEl.innerHTML = '<span style="color:#888;font-size:13px">Visit <a href="https://github.com/Prashant-core" target="_blank" style="color:#7c3aed">github.com/Prashant-core</a></span>';
    console.error('GitHub error:', err);
  }
}

function drawContribGraph(repos) {
  const canvas = document.getElementById('gh-contrib-canvas');
  const loadingEl = document.getElementById('gh-contrib-loading');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth || 800;
  canvas.height = 120;

  // Generate last 30 days placeholder data based on repos update dates
  const days = 30;
  const data = new Array(days).fill(0);
  const now = new Date();
  repos.forEach(r => {
    if (r.updated_at) {
      const diff = Math.floor((now - new Date(r.updated_at)) / (1000*60*60*24));
      if (diff < days) data[days - 1 - diff]++;
    }
  });

  const W = canvas.width, H = canvas.height;
  const maxVal = Math.max(...data, 1);
  const padL = 36, padR = 16, padT = 10, padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const stepX  = chartW / (days - 1);

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + (chartH / 4) * i;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
  }

  // Y axis labels
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'right';
  for (let i = 0; i <= 4; i++) {
    const val = Math.round(maxVal * (1 - i/4));
    const y = padT + (chartH / 4) * i;
    ctx.fillText(val, padL - 6, y + 4);
  }

  // Gradient fill
  const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
  grad.addColorStop(0, 'rgba(124,58,237,0.35)');
  grad.addColorStop(1, 'rgba(124,58,237,0.02)');

  ctx.beginPath();
  data.forEach((val, i) => {
    const x = padL + i * stepX;
    const y = padT + chartH - (val / maxVal) * chartH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.lineTo(padL + (days-1)*stepX, padT + chartH);
  ctx.lineTo(padL, padT + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 2;
  data.forEach((val, i) => {
    const x = padL + i * stepX;
    const y = padT + chartH - (val / maxVal) * chartH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Dots
  data.forEach((val, i) => {
    const x = padL + i * stepX;
    const y = padT + chartH - (val / maxVal) * chartH;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = val > 0 ? '#ec4899' : 'rgba(124,58,237,0.3)';
    ctx.fill();
  });

  // X axis day labels
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '9px Inter, sans-serif';
  ctx.textAlign = 'center';
  [0, 7, 14, 21, 29].forEach(i => {
    const x = padL + i * stepX;
    const d = new Date(now); d.setDate(d.getDate() - (days - 1 - i));
    ctx.fillText(d.getDate(), x, H - 6);
  });

  if (loadingEl) loadingEl.style.display = 'none';
  canvas.style.display = 'block';
}

// Fetch when GitHub section visible
const ghSection = document.querySelector('.github-stats');
if (ghSection) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { fetchGitHubStats(); }
    });
  }, { threshold: 0.1 }).observe(ghSection);
}

// ── FOOTER YEAR ──
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// ── PARTICLE CANVAS ──
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx2 = canvas.getContext('2d');
  let width, height, particles = [];
  let mouse = { x: null, y: null };

  function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width; this.y = Math.random() * height;
      this.z = Math.random() * 2 + 0.5; this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3 * this.z;
      this.speedY = (Math.random() - 0.5) * 0.3 * this.z;
      this.opacity = Math.random() * 0.5 + 0.1;
      const colors = ['#7c3aed','#ec4899','#f97316','#a78bfa','#fb7185'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.pulse += 0.02; this.x += this.speedX; this.y += this.speedY;
      if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) { this.x += (dx/dist)*1.2; this.y += (dy/dist)*1.2; }
      }
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
      const ps = this.size + Math.sin(this.pulse) * 0.4;
      ctx2.save(); ctx2.globalAlpha = this.opacity;
      ctx2.fillStyle = this.color; ctx2.shadowBlur = 8; ctx2.shadowColor = this.color;
      ctx2.beginPath(); ctx2.arc(this.x, this.y, ps, 0, Math.PI*2); ctx2.fill(); ctx2.restore();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 110) {
          ctx2.save(); ctx2.globalAlpha = (1 - dist/110) * 0.1;
          ctx2.strokeStyle = '#7c3aed'; ctx2.lineWidth = 0.5;
          ctx2.beginPath(); ctx2.moveTo(particles[i].x, particles[i].y);
          ctx2.lineTo(particles[j].x, particles[j].y); ctx2.stroke(); ctx2.restore();
        }
      }
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 14000);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  initParticles();

  const orbs = [
    {x:0.2,y:0.3,r:250,color:'#7c3aed',speed:0.0008},
    {x:0.8,y:0.2,r:200,color:'#ec4899',speed:0.001},
    {x:0.6,y:0.8,r:180,color:'#f97316',speed:0.0012},
  ];
  let orbTime = 0;
  function drawOrbs() {
    orbTime += 0.01;
    orbs.forEach((orb, i) => {
      const x = (orb.x + Math.sin(orbTime*orb.speed*1000+i)*0.05)*width;
      const y = (orb.y + Math.cos(orbTime*orb.speed*1000+i)*0.05)*height;
      const grad = ctx2.createRadialGradient(x,y,0,x,y,orb.r);
      grad.addColorStop(0, orb.color+'22'); grad.addColorStop(1,'transparent');
      ctx2.fillStyle = grad; ctx2.beginPath(); ctx2.arc(x,y,orb.r,0,Math.PI*2); ctx2.fill();
    });
  }

  function animate() {
    ctx2.clearRect(0,0,width,height); drawOrbs(); drawConnections();
    particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate);
  }
  animate();
}

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
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
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
document.querySelectorAll('.skills').forEach(el => observer.observe(el));

// ── CONTACT FORM ──
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...'; btn.disabled = true;
    try {
      const res  = await fetch('/contact', { method: 'POST', body: new FormData(form) });
      const json = await res.json();
      formStatus.innerHTML = json.status === 'success'
        ? '<p class="form-success">Message sent! I\'ll get back to you soon.</p>'
        : '<p class="form-error">Something went wrong. Please email me directly.</p>';
      if (json.status === 'success') form.reset();
    } catch { formStatus.innerHTML = '<p class="form-error">Network error. Try again.</p>'; }
    btn.textContent = 'Send Message'; btn.disabled = false;
  });
}

// ── SMOOTH REVEAL ON LOAD ──
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});

// ── CURSOR GLOW ──
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = 'position:fixed;width:300px;height:300px;background:radial-gradient(circle,rgba(124,58,237,0.06) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:all 0.1s ease;';
document.body.appendChild(cursorGlow);
window.addEventListener('mousemove', e => { cursorGlow.style.left = e.clientX+'px'; cursorGlow.style.top = e.clientY+'px'; });