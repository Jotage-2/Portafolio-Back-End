/* ---------------------------
  script.js - funcionalidad
  - inyecta texto "sobre mí"
  - menu hamburguesa
  - scroll suave
  - carrusel automático y botones prev/next
  - animación de barras de skills
----------------------------*/

/* === ABOUT TEXT (lorem 300-500 chars) ===
   Si quieres cambiarlo manualmente, edítalo aquí.
*/
const aboutText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

/* Inyecta el texto en la sección 'Sobre mí' */
document.addEventListener('DOMContentLoaded', () => {
  const aboutEl = document.getElementById('about-text');
  if(aboutEl) aboutEl.innerText = aboutText;

  // Habilitar scroll suave en los enlaces del nav
  document.querySelectorAll('.main-nav a, .hero-ctas a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'start'});
          // si el menú está abierto en mobile, cerrarlo
          if(document.getElementById('main-nav').classList.contains('open')){
            toggleMenu(false);
          }
        }
      }
    });
  });

  // Inicializa menu hamburguesa
  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', () => toggleMenu());

  // Inicializa carrusel
  initCarousel();

  // Inicializa animación de skills
  animateSkills();
});

/* === Menu hamburguesa === */
function toggleMenu(forceClose = null){
  const nav = document.getElementById('main-nav');
  const open = nav.classList.contains('open');
  if(forceClose === false) {
    nav.classList.remove('open');
    nav.style.display = '';
    return;
  }
  if(forceClose === true) {
    nav.classList.remove('open');
    nav.style.display = '';
    return;
  }
  if(!open){
    nav.classList.add('open');
    nav.style.display = 'block';
  } else {
    nav.classList.remove('open');
    // pequeña espera para permitir animación si la agregas
    setTimeout(()=> nav.style.display = '', 300);
  }
}

/* === Carrusel básico (10 slides) === */
function initCarousel(){
  const track = document.getElementById('track');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let current = 0;
  let isAnimating = false;
  const total = slides.length;

  function goTo(index){
    if(isAnimating) return;
    isAnimating = true;
    current = (index + total) % total;
    const offset = -current * 100;
    track.style.transform = `translateX(${offset}%)`;
    setTimeout(()=> isAnimating = false, 620);
  }

  nextBtn && nextBtn.addEventListener('click', ()=> goTo(current + 1));
  prevBtn && prevBtn.addEventListener('click', ()=> goTo(current - 1));

  // auto-play
  let autoplay = setInterval(()=> goTo(current + 1), 4500);

  // pausa al hacer hover/touch en la vista
  const viewport = document.querySelector('.carousel-viewport');
  viewport.addEventListener('mouseenter', ()=> clearInterval(autoplay));
  viewport.addEventListener('mouseleave', ()=> autoplay = setInterval(()=> goTo(current + 1), 4500));
  viewport.addEventListener('touchstart', ()=> clearInterval(autoplay));
  viewport.addEventListener('touchend', ()=> autoplay = setInterval(()=> goTo(current + 1), 4500));

  // make it swipeable (táctil simple)
  let startX = 0;
  viewport.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
  viewport.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if(Math.abs(dx) > 40){
      if(dx < 0) goTo(current + 1); else goTo(current - 1);
    }
  });

  // inicializa en 0
  goTo(0);
}

/* === Animación de skills basada en atributos data-value === */
function animateSkills(){
  const fills = document.querySelectorAll('.fill');
  fills.forEach(el => {
    const val = parseInt(el.getAttribute('data-value') || '60', 10);
    setTimeout(()=> el.style.width = `${val}%`, 400);
  });
}
