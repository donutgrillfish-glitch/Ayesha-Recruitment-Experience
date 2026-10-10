const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealItems = document.querySelectorAll('.reveal');
document.documentElement.classList.add('motion-ready');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('in-view'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.04, rootMargin: '0px 0px -5% 0px' });

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
      item.classList.add('in-view');
    } else {
      observer.observe(item);
    }
  });
}

const badge = document.querySelector('.badge-scene');
if (badge && !reducedMotion) {
  document.querySelector('.hero').addEventListener('pointermove', (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    badge.style.transform = `rotate(${x}deg)`;
  });
  document.querySelector('.hero').addEventListener('pointerleave', () => {
    badge.style.transform = 'rotate(0deg)';
  });
}
