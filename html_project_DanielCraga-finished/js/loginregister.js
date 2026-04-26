function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

function setMessage(id, text) {
  var box = document.getElementById(id);
  if (box) box.textContent = text;
}

function openModal(modal) {
  var overlay = document.getElementById('modalOverlay');
  var login = document.getElementById('loginModal');
  var register = document.getElementById('registerModal');
  if (!overlay || !login || !register) return;

  overlay.classList.add('show');
  login.classList.add('hidden');
  register.classList.add('hidden');
  modal.classList.remove('hidden');
}

function closeModal() {
  var overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('show');
}

function updateNav() {
  var user = getUser();
  var loginBtn = document.getElementById('openLoginBtn');
  var registerBtn = document.getElementById('openRegisterBtn');
  if (!loginBtn || !registerBtn) return;

  if (user) {
    registerBtn.textContent = user.name.split(' ')[0];
    registerBtn.disabled = true;
    loginBtn.textContent = 'Log out';
  } else {
    registerBtn.textContent = 'Register';
    registerBtn.disabled = false;
    loginBtn.textContent = 'Log in';
  }
}

function setupAccount() {
  var login = document.getElementById('loginModal');
  var register = document.getElementById('registerModal');
  var loginBtn = document.getElementById('openLoginBtn');
  var registerBtn = document.getElementById('openRegisterBtn');
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');
  var switchToRegister = document.getElementById('switchToRegister');
  var switchToLogin = document.getElementById('switchToLogin');
  var overlay = document.getElementById('modalOverlay');
  if (!login || !register || !loginBtn || !registerBtn) return;

  updateNav();

  loginBtn.onclick = function () {
    if (getUser()) {
      localStorage.removeItem('currentUser');
      updateNav();
      alert('Logged out');
    } else {
      openModal(login);
    }
  };

  registerBtn.onclick = function () { openModal(register); };
  if (switchToRegister) switchToRegister.onclick = function () { openModal(register); };
  if (switchToLogin) switchToLogin.onclick = function () { openModal(login); };
  if (overlay) overlay.onclick = function (e) { if (e.target === overlay) closeModal(); };

  document.querySelectorAll('[data-close]').forEach(function (btn) {
    btn.onclick = closeModal;
  });

  if (registerForm) {
    registerForm.onsubmit = function (e) {
      e.preventDefault();
      var name = document.getElementById('registerName').value.trim();
      var email = document.getElementById('registerEmail').value.trim().toLowerCase();
      var pass = document.getElementById('registerPassword').value;
      var confirm = document.getElementById('registerConfirmPassword').value;
      var users = getUsers();

      if (!name || !email || !pass || !confirm) return alert('Please fill in all fields');
      if (pass.length < 4) return alert('Password must have at least 4 characters');
      if (pass !== confirm) return alert('Passwords do not match');
      if (users.some(function (u) { return u.email === email; })) return alert('This email already exists');

      users.push({ name: name, email: email, password: pass });
      saveUsers(users);
      localStorage.setItem('currentUser', JSON.stringify({ name: name, email: email }));
      registerForm.reset();
      closeModal();
      updateNav();
      alert('Account created');
    };
  }

  if (loginForm) {
    loginForm.onsubmit = function (e) {
      e.preventDefault();
      var email = document.getElementById('loginEmail').value.trim().toLowerCase();
      var pass = document.getElementById('loginPassword').value;
      var user = getUsers().find(function (u) { return u.email === email && u.password === pass; });
      if (!user) return alert('Wrong email or password');

      localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
      loginForm.reset();
      closeModal();
      updateNav();
      alert('Logged in');
    };
  }
}

function setupPassengers() {
  var saved = JSON.parse(localStorage.getItem('passengers') || '{"adults":1,"children":0}');
  var adults = saved.adults || 1;
  var children = saved.children || 0;
  var button = document.getElementById('passengerBtn');
  var panel = document.getElementById('passengerPanel');
  var adultText = document.getElementById('adultCount');
  var childText = document.getElementById('childCount');
  if (!button || !panel) return;

  function updateText() {
    adultText.textContent = adults;
    childText.textContent = children;
    var text = adults + (adults === 1 ? ' Adult' : ' Adults');
    if (children > 0) text += ', ' + children + (children === 1 ? ' Child' : ' Children');
    button.textContent = text;
    localStorage.setItem('passengers', JSON.stringify({ adults: adults, children: children }));
  }

  button.onclick = function () { panel.classList.toggle('hidden'); };
  document.getElementById('minusAdult').onclick = function () { if (adults > 1) adults--; updateText(); };
  document.getElementById('plusAdult').onclick = function () { adults++; updateText(); };
  document.getElementById('minusChild').onclick = function () { if (children > 0) children--; updateText(); };
  document.getElementById('plusChild').onclick = function () { children++; updateText(); };
  updateText();
}

var availableDepartures = ['2026-04-27', '2026-05-03', '2026-05-04', '2026-05-06'];
var availableReturns = ['2026-04-29', '2026-05-10', '2026-05-11', '2026-05-12'];

function niceDate(iso) {
  if (!iso) return '';
  var parts = iso.split('-');
  var date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function airportCode(text) {
  var match = text.match(/\((.*?)\)/);
  return match ? match[1] : text;
}

function makeCalendar(inputId, boxId, dates) {
  var input = document.getElementById(inputId);
  var box = document.getElementById(boxId);
  if (!input || !box) return;

  var year = 2026;
  var month = inputId === 'departureDate' ? 3 : 4;

  input.onclick = function () {
    box.classList.toggle('show');
  };

  function drawCalendar() {
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var monthName = new Date(year, month, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    var html = '<div class="calendar-title">' + monthName + '</div>';
    html += '<div class="calendar-grid">';

    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(function (day) {
      html += '<div class="calendar-day-name">' + day + '</div>';
    });

    for (var i = 0; i < firstDay; i++) html += '<button class="calendar-day empty" type="button"></button>';

    for (var d = 1; d <= daysInMonth; d++) {
      var iso = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      var disabled = dates.indexOf(iso) === -1;
      html += '<button type="button" class="calendar-day ' + (disabled ? 'disabled' : '') + '" data-date="' + iso + '">' + d + '</button>';
    }

    html += '</div><div class="calendar-note">Blue dates are available. Grey dates are unavailable.</div>';
    box.innerHTML = html;

    box.querySelectorAll('.calendar-day').forEach(function (dayBtn) {
      dayBtn.onclick = function () {
        if (dayBtn.classList.contains('disabled') || dayBtn.classList.contains('empty')) return;
        input.value = dayBtn.dataset.date;
        box.classList.remove('show');
      };
    });
  }

  drawCalendar();
}

function setupCalendars() {
  makeCalendar('departureDate', 'departureCalendar', availableDepartures);
  makeCalendar('returnDate', 'returnCalendar', availableReturns);
}

function setupHomeBooking() {
  var btn = document.getElementById('startBookingBtn');
  if (!btn) return;

  btn.onclick = function (e) {
    e.preventDefault();
    var origin = document.getElementById('originInput').value.trim();
    var destination = document.getElementById('destinationInput').value.trim();
    var depart = document.getElementById('departureDate').value;
    var ret = document.getElementById('returnDate').value;
    var type = document.querySelector('input[name="tripType"]:checked').value;

    if (!origin || !destination || !depart) return setMessage('bookingError', 'Please complete the search form.');
    if (origin === destination) return setMessage('bookingError', 'Origin and destination cannot be the same.');
    if (availableDepartures.indexOf(depart) === -1) return setMessage('bookingError', 'No departure flights available on this date.');
    if (type === 'return' && !ret) return setMessage('bookingError', 'Please choose a return date.');
    if (type === 'return' && availableReturns.indexOf(ret) === -1) return setMessage('bookingError', 'No return flights available on this date.');

    var passengers = JSON.parse(localStorage.getItem('passengers') || '{"adults":1,"children":0}');
    localStorage.setItem('tripSearch', JSON.stringify({ origin: origin, destination: destination, depart: depart, ret: ret, type: type, passengers: passengers }));
    window.location.href = 'departure.html';
  };

  document.querySelectorAll('.deal-card').forEach(function (card) {
    card.onclick = function () {
      localStorage.setItem('tripSearch', JSON.stringify({
        origin: card.dataset.origin,
        destination: card.dataset.destination,
        depart: '2026-05-04',
        ret: '2026-05-10',
        type: 'return',
        passengers: JSON.parse(localStorage.getItem('passengers') || '{"adults":1,"children":0}')
      }));
    };
  });
}

function updateFlightPages() {
  var trip = JSON.parse(localStorage.getItem('tripSearch') || '{}');
  var bar = document.getElementById('tripSummaryBar');
  if (!bar || !trip.origin) return;

  var p = trip.passengers || { adults: 1, children: 0 };
  var passengerText = p.adults + (p.adults === 1 ? ' adult' : ' adults');
  if (p.children > 0) passengerText += ', ' + p.children + (p.children === 1 ? ' child' : ' children');

  bar.innerHTML = '<span>' + airportCode(trip.origin) + ' → ' + airportCode(trip.destination) + '</span>' +
                  '<span>' + (trip.type === 'return' ? 'Return trip' : 'One way') + '</span>' +
                  '<span>' + passengerText + '</span>';

  var depTitle = document.getElementById('departureTitle');
  var retTitle = document.getElementById('returnTitle');
  if (depTitle) depTitle.textContent = 'Departure flights for ' + niceDate(trip.depart);
  if (retTitle) retTitle.textContent = 'Return flights for ' + niceDate(trip.ret);

  var depTabs = document.getElementById('departureDateTabs');
  var retTabs = document.getElementById('returnDateTabs');
  if (depTabs) depTabs.innerHTML = '<div class="date-tab active">' + niceDate(trip.depart) + '</div>';
  if (retTabs) retTabs.innerHTML = '<div class="date-tab active">' + niceDate(trip.ret) + '</div>';
}

function setupFlightChoice() {
  document.querySelectorAll('.flight-select-btn').forEach(function (btn, index) {
    btn.onclick = function () {
      var trip = JSON.parse(localStorage.getItem('tripSearch') || '{}');
      var page = location.pathname.includes('return') ? 'returnFlight' : 'departureFlight';
      var card = btn.closest('.flight-card');
      var values = card.querySelectorAll('.flight-value');
      localStorage.setItem(page, JSON.stringify({
        date: page === 'returnFlight' ? trip.ret : trip.depart,
        depart: values[0].textContent,
        arrive: values[1].textContent,
        duration: values[2].textContent,
        price: values[3].textContent,
        option: index + 1
      }));

      if (trip.type === 'oneway' && page === 'departureFlight') {
        btn.href = 'payment.html';
      }
    };
  });
}

function numberFromPrice(price) {
  return Number(String(price || '0').replace('€', '').trim());
}

function setupPaymentSummary() {
  var box = document.getElementById('paymentSummary');
  if (!box) return;

  var trip = JSON.parse(localStorage.getItem('tripSearch') || '{}');
  var dep = JSON.parse(localStorage.getItem('departureFlight') || '{}');
  var ret = JSON.parse(localStorage.getItem('returnFlight') || '{}');
  var p = trip.passengers || { adults: 1, children: 0 };

  var depPrice = numberFromPrice(dep.price || 49);
  var retPrice = trip.type === 'return' ? numberFromPrice(ret.price || 55) : 0;
  var adultPrice = depPrice + retPrice;
  var childPrice = Math.round(adultPrice * 0.7);
  var total = (p.adults * adultPrice) + (p.children * childPrice);

  var passengerText = p.adults + (p.adults === 1 ? ' adult' : ' adults');
  if (p.children > 0) passengerText += ', ' + p.children + (p.children === 1 ? ' child' : ' children');

  box.innerHTML = '<h3>Trip summary</h3>' +
    '<div class="summary-line"><span>Route</span><span>' + airportCode(trip.origin || 'TIA') + ' → ' + airportCode(trip.destination || 'FCO') + (trip.type === 'return' ? ' (return)' : '') + '</span></div>' +
    '<div class="summary-line"><span>Outbound</span><span>' + niceDate(dep.date || trip.depart) + ' · ' + (dep.depart || '06:20') + '</span></div>' +
    (trip.type === 'return' ? '<div class="summary-line"><span>Inbound</span><span>' + niceDate(ret.date || trip.ret) + ' · ' + (ret.depart || '09:40') + '</span></div>' : '') +
    '<div class="summary-line"><span>Passengers</span><span>' + passengerText + '</span></div>' +
    '<div class="summary-line"><span>Adult price</span><span>€' + adultPrice + '</span></div>' +
    (p.children > 0 ? '<div class="summary-line"><span>Child price</span><span>€' + childPrice + '</span></div>' : '') +
    '<div class="summary-line total"><span>Total</span><span>€' + total + '</span></div>' +
    '<p class="info-note">Total changes based on passengers. Children are counted at 70% of the adult price.</p>';

  localStorage.setItem('bookingTotal', total);
}

function setupPayment() {
  var form = document.getElementById('paymentForm');
  if (!form) return;

  setupPaymentSummary();

  var user = getUser();
  if (user) {
    document.getElementById('fullName').value = user.name;
    document.getElementById('email').value = user.email;
  }

  form.onsubmit = function (e) {
    e.preventDefault();
    var needed = ['fullName', 'email', 'phone', 'country', 'address', 'city', 'zipCode', 'cardHolder', 'cardNumber', 'expiry', 'cvv'];

    for (var i = 0; i < needed.length; i++) {
      if (!document.getElementById(needed[i]).value.trim()) {
        return setMessage('paymentError', 'Please fill in all payment fields.');
      }
    }

    var cardNumber = document.getElementById('cardNumber').value.replaceAll(' ', '');
    var cvv = document.getElementById('cvv').value;
    if (cardNumber.length < 12) return setMessage('paymentError', 'Card number is too short.');
    if (cvv.length < 3) return setMessage('paymentError', 'CVV is not correct.');

    var bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({
      user: document.getElementById('email').value,
      trip: JSON.parse(localStorage.getItem('tripSearch') || '{}'),
      departure: JSON.parse(localStorage.getItem('departureFlight') || '{}'),
      returnFlight: JSON.parse(localStorage.getItem('returnFlight') || '{}'),
      total: localStorage.getItem('bookingTotal'),
      date: new Date().toLocaleString()
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    window.location.href = 'success.html';
  };
}

setupAccount();
setupPassengers();
setupCalendars();
setupHomeBooking();
updateFlightPages();
setupFlightChoice();
setupPayment();
