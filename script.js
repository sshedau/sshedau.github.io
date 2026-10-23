// Mobile menu
const menu = document.querySelector('.menu');
const nav = document.getElementById('nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
  menu.textContent = open ? 'Close' : 'Menu';
});
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = 'Menu';
  }
});

// Highlight the section being read
const links = [...nav.querySelectorAll('a')];
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => {
      if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-35% 0px -60% 0px' });
links.forEach(a => {
  const s = document.querySelector(a.getAttribute('href'));
  if (s) io.observe(s);
});

// Project tabs (arrow keys supported)
const tabs = [...document.querySelectorAll('[role=tab]')];
function select(i) {
  tabs.forEach((t, n) => {
    const on = n === i;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
  tabs[i].focus();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => select(i));
  t.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') select((i + 1) % tabs.length);
    if (e.key === 'ArrowLeft') select((i + tabs.length - 1) % tabs.length);
  });
});
