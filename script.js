const loader = document.getElementById('loader');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCount = document.getElementById('lightboxCount');
const photos = [...document.querySelectorAll('.photo img')];
const backToTop = document.getElementById('backToTop');
let current = 0;

window.addEventListener('load', () => {
  window.setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('locked');
  }, 450);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

function showPhoto(index) {
  current = (index + photos.length) % photos.length;
  lightboxImage.src = photos[current].src;
  lightboxImage.alt = photos[current].alt;
  lightboxCount.textContent = `${current + 1} / ${photos.length}`;
}

document.getElementById('photoGallery').addEventListener('click', event => {
  const button = event.target.closest('.photo');
  if (!button) return;
  showPhoto(Number(button.dataset.index));
  lightbox.showModal();
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(current - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(current + 1));

lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener('keydown', event => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowLeft') showPhoto(current - 1);
  if (event.key === 'ArrowRight') showPhoto(current + 1);
});

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > window.innerHeight * .8);
}, { passive: true });
