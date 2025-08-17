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

/* Mobile hamburger toggle (with close-on-click/outside/ESC) */
(function mobileMenu(){
  const btn   = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  function setOpen(state){
    links.classList.toggle('open', state);
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
    const withinNav = e.target.closest('nav');
    if (!withinNav) setOpen(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
