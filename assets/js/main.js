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
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  const links = document.querySelectorAll('nav ul li a');

  toggle?.addEventListener('click', () => nav.classList.toggle('open'));
  links.forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
});

// ==========================
// WhatsApp booking for global form (if any)
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
  const message = `Hello, I would like to make a reservation at 3D Hotels.%0AArrival: ${arrival}%0ADeparture: ${departure}%0AGuests: ${guests}%0ARoom: ${room}`;
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// ==========================
// Fix viewport height on mobile
// ==========================
function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVh();
window.addEventListener('resize', setVh);


document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');

  // Toggle menu on hamburger click
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent outside-close firing
    nav.classList.toggle('open');
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('open'); // triggers bar-to-X animation
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navLinks.classList.remove('active');
      navToggle.classList.remove('open');
    });
  });

  // Close menu when tapping/clicking outside
  const closeMenu = () => {
    nav.classList.remove('open');
    navLinks.classList.remove('active');
    navToggle.classList.remove('open');
  };

  const outsidePressHandler = (event) => {
    const isInside = nav.contains(event.target) || navToggle.contains(event.target);
    if (!isInside) closeMenu();
  };

  // Use pointer events for broad support
  document.addEventListener('pointerdown', outsidePressHandler);

  // Fallbacks for older browsers
  document.addEventListener('touchstart', outsidePressHandler);
  document.addEventListener('click', outsidePressHandler);
});