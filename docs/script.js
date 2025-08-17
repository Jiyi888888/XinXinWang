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
