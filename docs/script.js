/* script.js — small shared helpers */

// Mark current nav link active based on URL path
(function highlightActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '' && href.endsWith('index.html')) || href.endsWith(path)) {
      a.classList.add('active');
    }
  });
})();

// Ensure home page images render eagerly (fixes 3rd image sometimes not showing)
(function eagerHomeImages(){
  if (document.body.dataset.page !== 'home') return;
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (!img.complete) img.loading = 'eager';
  });
})();

// Mobile hamburger toggle
(function mobileMenu(){
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();
