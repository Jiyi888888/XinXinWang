/* script.js — shared helpers */

/* Highlight current nav link */
(function highlightActiveNav(){
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if ((path === '' && href.endsWith('index.html')) || href.endsWith(path)) {
      a.classList.add('active');
    }
  });
})();

/* Eager-load home images so all 3 show */
(function eagerHomeImages(){
  if (document.body.dataset.page !== 'home') return;
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (!img.complete) img.loading = 'eager';
  });
})();

/* Mobile hamburger toggle (close on link, outside click, and ESC) */
(function mobileMenu(){
  const btn   = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  function setOpen(state){
    links.classList.toggle('open', state);
    btn.classList.toggle('open', state);  // animate bars -> X
    btn.setAttribute('aria-expanded', state ? 'true' : 'false');
  }

  btn.addEventListener('click', () => setOpen(!links.classList.contains('open')));

  // Close when a nav link is clicked
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') setOpen(false);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!links.classList.contains('open')) return;
    if (!e.target.closest('nav')) setOpen(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();

/* === Work page lightbox (fullscreen image with caption) === */
(function workLightbox(){
  if (document.body.dataset.page !== 'work') return;

  const gallery = document.querySelector('.work-gallery');
  const overlay = document.getElementById('lightbox');
  const imgEl = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');
  const closeBtn = document.getElementById('lightboxClose');

  if (!gallery || !overlay || !imgEl || !titleEl || !descEl || !closeBtn) return;

  function openLightbox(fromFigure){
    const img = fromFigure.querySelector('img');
    const title = fromFigure.querySelector('.artwork-info h3');
    const desc = fromFigure.querySelector('.artwork-info p');

    imgEl.src = img.getAttribute('src');
    imgEl.alt = img.getAttribute('alt') || '';
    titleEl.textContent = title ? title.textContent : (imgEl.alt || 'Artwork');
    descEl.textContent = desc ? desc.textContent : '';

    overlay.classList.add('open');
    document.documentElement.style.overflow = 'hidden'; // lock scroll
  }

  function closeLightbox(){
    overlay.classList.remove('open');
    imgEl.src = '';
    document.documentElement.style.overflow = '';
  }

  // Click any work image to open
  gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.artwork-item');
    if (!card || !card.querySelector('img')) return;
    e.preventDefault();
    openLightbox(card);
  });

  // Close handlers
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox(); // click outside content
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeLightbox();
  });
})();

