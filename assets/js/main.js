// ==========================
// Sliders & Navigation
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  // Slider
  const slides = document.querySelectorAll('.about-slide');
  let index = 0;
  if (slides.length) {
    setInterval(() => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 5000);
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#header nav');

  const closeMenu = () => {
    if (nav) nav.classList.remove('open');
    if (navToggle) navToggle.classList.remove('open');
  };

  // Toggle menu on hamburger click
  if (navToggle && nav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // Close menu when a nav link is clicked
  if (nav) {
    nav.querySelectorAll('ul li a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Close menu when tapping/clicking outside
  const outsideHandler = (event) => {
    const isInside =
      (nav && nav.contains(event.target)) ||
      (navToggle && navToggle.contains(event.target));
    if (!isInside) closeMenu();
  };

  document.addEventListener('pointerdown', outsideHandler);
  document.addEventListener('touchstart', outsideHandler);
  document.addEventListener('click', outsideHandler);

  // ==========================
  // Global Preloader
  // ==========================
  const loader = document.getElementById('global-loader');

  // HOME: force loader visible for 1.5s on initial load
  window.addEventListener('load', () => {
    if (!loader) return;

    loader.classList.remove('hidden'); // force show
    loader.offsetHeight;               // force repaint

    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1500);
  });

  // Preloader for page navigation links
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');

    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:')
    ) {
      link.addEventListener('click', e => {
        e.preventDefault();
        if (loader) loader.classList.remove('hidden');

        const isRoomOrGallery = /rooms|gallery/i.test(href);

        setTimeout(() => {
          window.location.href = href;
        }, isRoomOrGallery ? 1500 : 300);
      });
    }
  });

  // Loader for iframes (like Google Maps)
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(frame => {
    const iframeLoader = document.createElement('div');
    iframeLoader.className = 'iframe-loader';
    iframeLoader.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #c9a24d;
      font-family: 'Cinzel', serif;
      font-size: 1.5rem;
      z-index: 500;
    `;
    iframeLoader.innerHTML = 'Loading Map...';
    frame.parentNode.style.position = 'relative';
    frame.parentNode.appendChild(iframeLoader);

    frame.addEventListener('load', () => {
      iframeLoader.style.display = 'none';
    });
  });
});

// ==========================
// WhatsApp booking
// ==========================
function sendWhatsApp() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const data = new FormData(form);
  const arrival = data.get('arrival');
  const departure = data.get('departure');
  const guests = data.get('guests');
  const room = data.get('room');

  if (!arrival || !departure || !guests || !room) {
    alert("Please fill in all booking fields.");
    return;
  }

  const phone = '2348106983441';
  const message =
    `Hello, I would like to make a reservation at 3D Hotels.%0A` +
    `Arrival: ${arrival}%0A` +
    `Departure: ${departure}%0A` +
    `Guests: ${guests}%0A` +
    `Room: ${room}`;

  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// ==========================
// Fix viewport height on mobile
// ==========================
function setVh() {
  document.documentElement.style.setProperty(
    '--vh',
    `${window.innerHeight * 0.01}px`
  );
}
setVh();
window.addEventListener('resize', setVh);
