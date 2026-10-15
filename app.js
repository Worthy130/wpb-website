/* Small progressive enhancement for in-page anchor navigation only.
   Booking and staff sign-in are handled by the secure membership service. */
function showSection(id) {
  document.querySelectorAll('section').forEach((section) => section.classList.remove('active'));
  const section = document.getElementById(id);
  if (section) section.classList.add('active');
}

function handleHash() {
  const id = window.location.hash ? window.location.hash.slice(1) : 'home';
  showSection(id);
}

window.addEventListener('hashchange', handleHash);
document.addEventListener('DOMContentLoaded', handleHash);
