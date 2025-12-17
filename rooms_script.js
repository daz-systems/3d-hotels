

  function reserveRoom(event, roomName, pricePerNight) {
 event.preventDefault();

    const form = event.target;
    const arrival = form.querySelector('[name="arrival"]').value;
    const departure = form.querySelector('[name="departure"]').value;
    const guests = form.querySelector('[name="guests"]').value;

    const nights = (new Date(departure) - new Date(arrival)) / (1000 * 60 * 60 * 24);
    const total = nights > 0 ? nights * pricePerNight : 0;

    form.querySelector('.total-display').textContent = `Total: ₦${total.toLocaleString()}`;

    const phoneNumber = "2348106983441";
    const message = `Hello, I'm interested in making a reservation @ 3D HOTELS.
Room: ${roomName}
Price per night: ₦${pricePerNight.toLocaleString()}
Arrival: ${arrival}
Departure: ${departure}
Guests: ${guests}
Nights: ${nights}
Total: ₦${total.toLocaleString()}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  function resetOtherForms(activeCard) {
    document.querySelectorAll('.card').forEach(card => {
      if (card !== activeCard) {
        const form = card.querySelector('form');
        form.reset();
        form.querySelector('.total-display').textContent = 'Total: ₦0';
      }
    });
  }

  document.querySelectorAll('[name="arrival"], [name="departure"]').forEach(input => {
    input.addEventListener('change', () => {
      const form = input.closest('form');
      const arrival = form.querySelector('[name="arrival"]').value;
      const departure = form.querySelector('[name="departure"]').value;
      const priceText = form.closest('.card').querySelector('.price').textContent;
      const pricePerNight = parseInt(priceText.replace(/\D/g, '')) || 0;

      const nights = (new Date(departure) - new Date(arrival)) / (1000 * 60 * 60 * 24);
      const total = nights > 0 ? nights * pricePerNight : 0;
      form.querySelector('.total-display').textContent = `Total: ₦${total.toLocaleString()}`;
    });
  });

