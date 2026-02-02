function getCurrentUser() {
  const raw = localStorage.getItem("currentUser");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function logout(redirect = "index.html") {
  localStorage.removeItem("currentUser"); // supprime la session
  window.location.href = redirect; // navigation
}

function initAuthUI() {
  const user = getCurrentUser();

  const linkLogin = document.querySelector('[data-auth="login"]');
  const linkAccount = document.querySelector('[data-auth="account"]');
  const btnLogout = document.querySelector('[data-auth="logout"]');
  const hello = document.querySelector('[data-auth="hello"]');

  if (linkLogin) linkLogin.classList.toggle("hidden", !!user);
  if (linkAccount) linkAccount.classList.toggle("hidden", !user);
  if (btnLogout) btnLogout.classList.toggle("hidden", !user);

  if (hello) {
    hello.textContent = user ? `Bonjour ${user.firstname} ${user.lastname}` : "";
    hello.classList.toggle("hidden", !user);
  }

  if (btnLogout) btnLogout.addEventListener("click", () => logout());
}

document.addEventListener("DOMContentLoaded", initAuthUI); 

console.log("auth-ui loaded", {
  login: !!document.querySelector('[data-auth="login"]'),
  account: !!document.querySelector('[data-auth="account"]'),
  logout: !!document.querySelector('[data-auth="logout"]'),
  hello: !!document.querySelector('[data-auth="hello"]'),
});