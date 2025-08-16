// Highlight the active page in the navbar
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if ((path === '' && href.endsWith('index.html')) || href.endsWith(path)) {
      a.classList.add('active');
    }
  });
})();

// Footer year
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
