function redirectToLogin() {
  window.location.href = "login.html?redirect=account.html";
}

function getCurrentUserOrRedirect() {
  const raw = localStorage.getItem("currentUser"); 
  if (!raw) redirectToLogin();

  try {
    const user = JSON.parse(raw);
    if (!user?.email || !user?.role) redirectToLogin();
    return user;
  } catch {
    redirectToLogin();
  }
}

const currentUser = getCurrentUserOrRedirect();

// Remplir le profil
const hello = document.querySelector("#hello");
if (hello) hello.textContent = `Bonjour ${currentUser.firstname} ${currentUser.lastname}`;

const emailEl = document.querySelector("#account-email");
if (emailEl) emailEl.textContent = currentUser.email;

const roleEl = document.querySelector("#account-role");
if (roleEl) roleEl.textContent = currentUser.role;

const idEl = document.querySelector("#account-id");
if (idEl) idEl.textContent = String(currentUser.id ?? "—");

// Panels par rôle
const adminPanel = document.querySelector("#admin-panel");
const editorPanel = document.querySelector("#editor-panel");
const userPanel = document.querySelector("#user-panel");

if (adminPanel) adminPanel.classList.add("hidden");
if (editorPanel) editorPanel.classList.add("hidden");
if (userPanel) userPanel.classList.add("hidden");

if (currentUser.role === "admin") {
  if (adminPanel) adminPanel.classList.remove("hidden");
} else if (currentUser.role === "editor") {
  if (editorPanel) editorPanel.classList.remove("hidden");
} else {
  if (userPanel) userPanel.classList.remove("hidden");
}