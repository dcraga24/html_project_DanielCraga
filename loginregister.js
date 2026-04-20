const o = document.getElementById('modalOverlay'),
      l = document.getElementById('loginModal'),
      r = document.getElementById('registerModal'),
      openLoginBtn = document.getElementById('openLoginBtn'),
      openRegisterBtn = document.getElementById('openRegisterBtn'),
      switchToRegister = document.getElementById('switchToRegister'),
      switchToLogin = document.getElementById('switchToLogin'),
      registerForm = document.getElementById('registerForm'),
      loginForm = document.getElementById('loginForm'),
      registerEmail = document.getElementById('registerEmail'),
      registerPassword = document.getElementById('registerPassword'),
      registerConfirmPassword = document.getElementById('registerConfirmPassword'),
      loginEmail = document.getElementById('loginEmail'),
      loginPassword = document.getElementById('loginPassword');

if (o && l && r && openLoginBtn && openRegisterBtn && switchToRegister && switchToLogin &&
    registerForm && loginForm && registerEmail && registerPassword && registerConfirmPassword &&
    loginEmail && loginPassword) {

  const show = m => (o.classList.add('show'), l.classList.add('hidden'), r.classList.add('hidden'), m.classList.remove('hidden'));
  const hide = () => o.classList.remove('show');

  openLoginBtn.onclick = () => show(l);
  openRegisterBtn.onclick = () => show(r);
  switchToRegister.onclick = () => show(r);
  switchToLogin.onclick = () => show(l);

  o.onclick = e => e.target === o && hide();
  document.querySelectorAll('[data-close]').forEach(b => b.onclick = hide);

  registerForm.onsubmit = e => {
    e.preventDefault();
    if (registerPassword.value !== registerConfirmPassword.value)
      return alert('Passwords do not match');

    localStorage.user = JSON.stringify({
      email: registerEmail.value,
      pass: registerPassword.value
    });

    alert('Registered');
    show(l);
  };

  loginForm.onsubmit = e => {
    e.preventDefault();
    let u = JSON.parse(localStorage.user || '{}');

    if (u.email !== loginEmail.value || u.pass !== loginPassword.value)
      return alert('Invalid');

    alert('Logged in');
    hide();
  };
}
