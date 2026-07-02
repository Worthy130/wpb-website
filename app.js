function showSection(id) {
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.remove("active");
  });
  const section = document.getElementById(id);
  if (!section) {
    console.warn(`showSection: no section found for id '${id}'`);
    return;
  }
  section.classList.add("active");
}

function selectPlan(plan) {
  localStorage.setItem("selectedPlan", plan);
  showSection("login");
}

// Fake login → go to dashboard
document.querySelectorAll(".primary").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "Login" || btn.textContent === "Register") {
      showSection("dashboard");
    }
  });
});

async function register() {
  const res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: "Test",
      email: "test@test.com",
      password: "123456"
    })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
}

async function login() {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: "test@test.com",
      password: "123456"
    })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);

  showDashboard();
}

async function loadDashboard() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/me", {
    headers: { Authorization: token }
  });

  const user = await res.json();

  console.log(user);
}

async function startCheckout(plan) {
  const res = await fetch("http://localhost:3000/create-checkout-session", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ plan })
  });

  const data = await res.json();
  window.location = data.url;
}

// Ensure sections respond to hash changes and initial load
function handleHash() {
  const id = window.location.hash ? window.location.hash.slice(1) : 'home';
  showSection(id);
}

window.addEventListener('hashchange', handleHash);
document.addEventListener('DOMContentLoaded', handleHash);