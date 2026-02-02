const users = [
  {
    id: 1,
    email: "admin@fakeboutique.com",
    password: "admin123",
    role: "admin",
    firstname: "Alice",
    lastname: "Martin",
  },
  {
    id: 2,
    email: "editor@fakeboutique.com",
    password: "editor123",
    role: "editor",
    firstname: "Lucas",
    lastname: "Durand",
  },
  {
    id: 3,
    email: "user@fakeboutique.com",
    password: "user123",
    role: "user",
    firstname: "Emma",
    lastname: "Bernard",
  },
];

const form = document.querySelector("#login-form") || document.querySelector(".form");
const errorEl = document.querySelector("#login-error");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // bloque le submit natif (pas de reload)

  const email = form.elements.email.value.trim().toLowerCase();
  const password = form.elements.password.value;

  const user = users.find(
    (u) => u.email.toLowerCase() === email && u.password === password
  );

  if (!user) {
    if (errorEl) {
      errorEl.style.display = "block";
      errorEl.textContent = "Email ou mot de passe incorrect.";
    }
    return;
  }

  // “Session” front (démo)
  const safeUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    firstname: user.firstname,
    lastname: user.lastname,
  };

  localStorage.setItem("currentUser", JSON.stringify(safeUser)); // persiste la session

// redirection (option redirect=... sinon account)
const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect") || "account.html";
window.location.href = redirect;
})



