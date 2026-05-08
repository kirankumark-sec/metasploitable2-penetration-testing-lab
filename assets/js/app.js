/* ─── SEARCH ─────────────────────────────────────────────────────────────── */
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  const cards = [...document.querySelectorAll('.module-card')];
  searchInput.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    cards.forEach(card => {
      const text = (card.textContent + ' ' + (card.dataset.keywords || '')).toLowerCase();
      card.style.display = q === '' || text.includes(q) ? '' : 'none';
    });
  });
}

/* ─── COPY TO CLIPBOARD ──────────────────────────────────────────────────── */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const pre = btn.closest('.code-wrap').querySelector('pre');
    const text = pre.innerText;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
  });
});

/* ─── LIGHTBOX ───────────────────────────────────────────────────────────── */
const overlay = document.getElementById('lightbox');
const overlayImg = overlay && overlay.querySelector('img');
const closeBtn = overlay && overlay.querySelector('.lightbox-close');

document.querySelectorAll('.screenshot-wrap').forEach(wrap => {
  wrap.addEventListener('click', () => {
    const img = wrap.querySelector('img');
    if (!overlay || !overlayImg) return;
    overlayImg.src = img.src;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
if (closeBtn) {
  closeBtn.addEventListener('click', closeLightbox);
}
if (overlay) {
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
function closeLightbox() {
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── TOC ACTIVE STATE ───────────────────────────────────────────────────── */
const tocLinks = [...document.querySelectorAll('.toc a')];
if (tocLinks.length) {
  const sections = tocLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(a => a.classList.remove('active'));
        const link = tocLinks.find(a => a.getAttribute('href') === '#' + entry.target.id);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => observer.observe(s));
}

/* ─── SMOOTH STAGGER ON CARDS ────────────────────────────────────────────── */
const moduleCards = [...document.querySelectorAll('.module-card')];
moduleCards.forEach((card, i) => {
  card.style.animationDelay = `${i * 0.06}s`;
  card.style.opacity = '0';
  card.style.animation = `fadeUp .45s ${i * 0.06}s ease forwards`;
});
