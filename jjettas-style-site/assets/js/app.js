/* MH8 shared behavior — edit-photos, reveals, counters, loader */
/* ══════════════════════════════════════════════════════════════
   SITE_CONFIG — rename the whole site here. Every [data-bind]
   element with a matching key updates automatically.
   ══════════════════════════════════════════════════════════════ */
const SITE_CONFIG = {
  logo: 'MH<b>°8</b>',
  navCta: 'Work with me',
  eyebrow: 'Wide Receiver · #8 · Baton Rouge, LA',
  heroTitle: 'MARCUS<br><span class="stroke">HARRIS</span>',
  tagline: 'From <strong>Baton Rouge to the bright lights.</strong> Every move carries intention, style, and a story you don\'t see on the field.',
  chip1: '2021 Draft · 1st Round',
  chip2: '4× All-Star',
  chip3: 'Player of the Year',
  bigNum: '8',
  statement: 'I don\'t play for the highlight. I play for the kid in the nosebleeds who\'ll <span class="u">remember this night forever.</span>',
  statementAttr: 'Marcus Harris · Post-game, Week 14',
  cardName: 'MARCUS HARRIS',
  cardNum: '8',
  originTitle: 'The 2021 first-round pick who <span>rewrote the record books.</span>',
  originText: 'The rookie card that marked the start of a generational career — from Friday nights in Baton Rouge to Sundays under the brightest lights in football.',
  emailBtn: 'team@example.com',
  footer: '© 2026 Marcus Harris. All rights reserved.'
};
document.querySelectorAll('[data-bind]').forEach(el => {
  const v = SITE_CONFIG[el.dataset.bind];
  if (v !== undefined) el.innerHTML = v;
});
const emailBtn = document.querySelector('[data-bind="emailBtn"]');
if (emailBtn) emailBtn.href = 'mailto:' + SITE_CONFIG.emailBtn;

/* ── Loader ─────────────────────────────────────────────── */
(() => {
  const num = document.getElementById('loadNum'), bar = document.getElementById('loadBar');
  let p = 0;
  const t = setInterval(() => {
    p = Math.min(100, p + Math.random() * 22);
    num.textContent = Math.floor(p) + '%';
    bar.style.transform = `scaleX(${p / 100})`;
    if (p >= 100) { clearInterval(t); setTimeout(() => document.getElementById('loader').classList.add('done'), 250); }
  }, 120);
})();

/* ── Scroll reveals ─────────────────────────────────────── */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── Animated counters ──────────────────────────────────── */
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, target = +el.dataset.count, t0 = performance.now(), dur = 1600;
  const tick = now => {
    const p = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(target * ease).toLocaleString('en-US');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  cio.unobserve(el);
}), { threshold: .5 });
document.querySelectorAll('.count').forEach(el => cio.observe(el));

/* ── Hero parallax (subtle) ─────────────────────────────── */
const portrait = document.querySelector('.hero-portrait');
addEventListener('scroll', () => {
  const y = scrollY;
  if (y < innerHeight && portrait) portrait.style.translate = `0 ${y * .12}px`;
}, { passive: true });

/* ── Edit-photos mode (click → upload → auto-saves) ─────── */
const LS_PREFIX = 'mh8-photo-';
const filePick = document.getElementById('filePick');
let activeSlot = null;

// restore saved swaps
document.querySelectorAll('[data-photo]').forEach(img => {
  try {
    const saved = localStorage.getItem(LS_PREFIX + img.dataset.photo);
    if (saved) img.src = saved;
  } catch (e) { /* storage full/blocked — ignore */ }
});

const editToggle = document.getElementById('editToggle');
const editReset = document.getElementById('editReset');
editToggle.addEventListener('click', () => {
  const on = document.body.classList.toggle('editing');
  editToggle.textContent = on ? '✓ Done editing' : '✎ Edit photos';
  editReset.classList.toggle('hidden', !on);
});
editReset.addEventListener('click', () => {
  if (!confirm('Restore all original photos?')) return;
  Object.keys(localStorage).filter(k => k.startsWith(LS_PREFIX)).forEach(k => localStorage.removeItem(k));
  location.reload();
});
document.querySelectorAll('[data-photo]').forEach(img => {
  img.addEventListener('click', () => {
    if (!document.body.classList.contains('editing')) return;
    activeSlot = img;
    filePick.click();
  });
});
filePick.addEventListener('change', () => {
  const f = filePick.files[0];
  if (!f || !activeSlot) return;
  const url = URL.createObjectURL(f);
  const probe = new Image();
  probe.onload = () => {
    // downscale to max 1600px so localStorage doesn't overflow
    const max = 1600, s = Math.min(1, max / Math.max(probe.width, probe.height));
    const c = document.createElement('canvas');
    c.width = Math.round(probe.width * s); c.height = Math.round(probe.height * s);
    c.getContext('2d').drawImage(probe, 0, 0, c.width, c.height);
    const dataUrl = c.toDataURL('image/jpeg', .85);
    activeSlot.src = dataUrl;
    try { localStorage.setItem(LS_PREFIX + activeSlot.dataset.photo, dataUrl); }
    catch (e) { alert('Saved for this session, but browser storage is full — use smaller images for persistence.'); }
    URL.revokeObjectURL(url);
    filePick.value = '';
  };
  probe.src = url;
});

/* ── Multi-page: active nav + partner form ────────────────── */
(() => {
  const page = document.body.dataset.page;
  if (page) document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if ((page === 'foundation' && href === 'foundation.html') ||
        (page === 'partners' && href === 'partnerships.html')) a.classList.add('active');
  });
  const form = document.getElementById('partnerForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const note = document.getElementById('formNote');
    const f = form.elements;
    const name = f.name.value.trim(), brand = f.brand.value.trim(), email = f.email.value.trim();
    if (!name || !brand || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      note.textContent = 'Please complete name, brand, and a valid email.';
      return;
    }
    note.textContent = `Thanks ${name} — your inquiry for ${brand} is in. Expect a reply within 48 hours.`;
    form.reset();
  });
})();
