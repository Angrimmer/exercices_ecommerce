const products = [
  {
    id: 1,
    name: "T-shirt Basic",
    description: "T-shirt en coton bio, coupe regular, confortable au quotidien.",
    price: 19.99,
    stock: 12,
    category: "tshirt",
    image: "https://picsum.photos/seed/tshirt/600/400",
    slug: "t-shirt-basic"
  },
  {
    id: 2,
    name: "Hoodie Oversize",
    description: "Hoodie épais, coupe oversize, style street et confortable.",
    price: 49.99,
    stock: 7,
    category: "hoodie",
    image: "https://picsum.photos/seed/hoodie/600/400",
    slug: "hoodie-oversize"
  },
  {
    id: 3,
    name: "Jeans Regular",
    description: "Jean coupe droite, denim robuste et intemporel.",
    price: 59.99,
    stock: 4,
    category: "jeans",
    image: "https://picsum.photos/seed/jeans/600/400",
    slug: "jeans-regular"
  },
  {
    id: 4,
    name: "Veste légère",
    description: "Veste mi-saison, légère et élégante.",
    price: 79.99,
    stock: 9,
    category: "veste",
    image: "https://picsum.photos/seed/veste/600/400",
    slug: "veste-legere"
  },
  {
    id: 5,
    name: "Casquette Minimal",
    description: "Casquette sobre, logo discret, ajustable.",
    price: 14.99,
    stock: 20,
    category: "accessoire",
    image: "https://picsum.photos/seed/casquette/600/400",
    slug: "casquette-minimal"
  },
  {
    id: 6,
    name: "Sweat Zip",
    description: "Sweat zippé, intérieur molletonné, parfait en layering.",
    price: 54.99,
    stock: 6,
    category: "sweat",
    image: "https://picsum.photos/seed/sweat/600/400",
    slug: "sweat-zip"
  }
];

//? utiliser foreach pour afficher toutes les cartes de façon dynamique
products.forEach((product, index) => {
  document.querySelector('.grid').innerHTML += `
    <article class="card">
      <div class="card__media">
        <img src="${product.image}" alt="${product.name}">
        <span class="tag">New</span>
      </div>
      <div class="card_body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      
        <div class="card__meta">
          <span class="price">${product.price} €</span>
          <span class="muted">Stock :${product.stock}</span>
        </div>

        <div class="card__actions">
          <button class="btn btn--primary" type="button" data-id="${product.id}">Ajouter</button>
          <a href="product.html?product=${product.slug}" class="btn btn--ghost" type="button">Détails</a>
        </div>
      </div>
    </article>
  `;
});

//! Template card.
// <article class="card">
//   <div class="card__media">
//     <img src="https://picsum.photos/seed/tshirt/600/400" alt="T-shirt Basic" />
//     <span class="tag">New</span>
//   </div>
//   <div class="card__body">
//     <h3 class="card__title">T-shirt Basic</h3>
//     <p class="card__desc">Coton doux, coupe regular. Un essentiel.</p>
// 
//     <div class="card__meta">
//       <span class="price">19,99 €</span>
//       <span class="muted">Stock: 12</span>
//     </div>
// 
//     <div class="card__actions">
//       <button class="btn btn--primary" type="button">Ajouter</button>
//       <button class="btn btn--ghost" type="button">Détails</button>
//     </div>
//   </div>
// </article>

//? ajouter le product name quand on clique sur ajouter dans la console log

const addButtons = document.querySelectorAll('.btn--primary');
addButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        console.log(products[index].name);
    })
})

//! Cart area

//* 1) cart state
let cart = JSON.parse(localStorage.getItem("cart") || "[]");   //? get cart from localStorage or init empty array

// 2) add to cart (buttons on product cards)
document.querySelectorAll(".btn--primary").forEach((btn) => {          //? select all "add to cart" buttons
  btn.addEventListener("click", (e) => {                            //? add click listener
    const id = Number(e.currentTarget.dataset.id);                  //? get product id from data-id attribute
    const product = products.find((p) => p.id === id);              //? find product by id
    if (!product) return;                                       //? iff product not found, exit

    const line = cart.find((item) => item.id === id);                 //? check if product already in cart
    if (line) line.qty += 1;                                         //? if found, increment qty
    else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });   //? if not, add new line

    renderCart();
  });
});

//* 3) render cart (display + totals + persist)
function renderCart() {                                                
  const itemsEl = document.querySelector(".cart__items");            //? cart items container
  if (!itemsEl) return; 

  // Items
  if (cart.length === 0) {
    itemsEl.innerHTML = `<p class="muted">Panier vide.</p>`;             
  } else {
    itemsEl.innerHTML = cart                                               
      .map(
        (it) => `
        <div class="cart-item" data-id="${it.id}">
          <img class="cart-item__img" src="${it.image}" alt="">
          <div class="cart-item__info">
            <div class="cart-item__top">
              <strong>${it.name}</strong>
              <span class="muted">${it.price.toFixed(2)} €</span>
            </div>

            <div class="cart-item__bottom">
              <div class="qty">
                <button class="qty__btn" type="button" data-action="dec">-</button>
                <span class="qty__value">${it.qty}</span>
                <button class="qty__btn" type="button" data-action="inc">+</button>
              </div>
              <button class="link-btn" type="button" data-action="remove">Supprimer</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");                                        //? ajoute chaque ligne dans le container
  }

  // Totals (reduce = calcule une valeur unique depuis un tableau)
  const totalQty = cart.reduce((sum, it) => sum + it.qty, 0);                      //? total quantity
  const subtotal = cart.reduce((sum, it) => sum + it.price * it.qty, 0);           //? subtotal price

  // UI totals (avec guards pour éviter "null")
  const pillEl = document.querySelector(".pill");                                  //? cart pill element
  if (pillEl) pillEl.textContent = `${totalQty} articles`;                        //? update pill text

  const subtotalEl = document.querySelector(".cart__row strong");                 //? subtotal element
  if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)} €`;               //? update subtotal text

  document.querySelectorAll(".cart-badge").forEach((b) => (b.textContent = totalQty));     //? update all cart badges
 
  // Persist
  localStorage.setItem("cart", JSON.stringify(cart));             //? save cart to localStorage
}

//* 4) + / - / remove via event delegation (1 seul listener)
const cartItemsContainer = document.querySelector(".cart__items");            //? cart items container
if (cartItemsContainer) {                                                     
  cartItemsContainer.addEventListener("click", (event) => {                       //? listen for clicks
    const actionBtn = event.target.closest("[data-action]");  // closest() remonte vers le bouton si clic sur un enfant
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;                 //? get action (inc, dec, remove)

    const cartItemEl = actionBtn.closest(".cart-item");          //? get cart item element

    const id = Number(cartItemEl.dataset.id);                  //? get product id

    const line = cart.find((it) => it.id === id);               //? find cart line
    if (!line) return;

    if (action === "inc") line.qty += 1;                       //? increment qty

    if (action === "dec") {
      line.qty -= 1;
      if (line.qty <= 0) cart = cart.filter((it) => it.id !== id);          //? remove line if qty <= 0
    }

    if (action === "remove") {                                                //? remove line
      cart = cart.filter((it) => it.id !== id);                               //? keep lines where id != id to remove
    }
                  //! how it work ? -> En résumé : data-action ((inner)HTML) → dataset.action (JS) → if (logique).
    renderCart();
  });
}

//? via splice()

// const cartItemsContainer = document.querySelector(".cart__items"); // cart items container

// if (cartItemsContainer) {
//   cartItemsContainer.addEventListener("click", (event) => {
//     const actionBtn = event.target.closest("[data-action]"); // remonte si clic sur un enfant
//     if (!actionBtn) return;

//     const action = actionBtn.dataset.action; // "inc" | "dec" | "remove"

//     const cartItemEl = actionBtn.closest(".cart-item");
//     if (!cartItemEl) return;

//     const id = Number(cartItemEl.dataset.id);

//     // Trouver l'index de la ligne dans cart (nécessaire pour splice)
//     const index = cart.findIndex((it) => it.id === id);
//     if (index === -1) return;

//     if (action === "inc") {
//       cart[index].qty += 1;
//     }

//     if (action === "dec") {
//       cart[index].qty -= 1;
//       if (cart[index].qty <= 0) {
//         cart.splice(index, 1); // delete one element
//       }
//     }

//     if (action === "remove") {
//       cart.splice(index, 1); // direct cut
//     }

//     renderCart();
//   });
// }

//* 5) init
renderCart();

//* 6) Clear cart button
const clearBtn = document.querySelector("#btn-clear-cart"); 

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    const ok = window.confirm("Vider le panier ?"); 
    if (!ok) return;

    cart = [];
    localStorage.removeItem("cart"); // bybye localStorage key ♥
    renderCart();
  });
}

//! Faire fonctionner le panier via popup dans la page produits.

function getCurrentUser() {
  const raw = localStorage.getItem("currentUser");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function logout() {
  localStorage.removeItem("currentUser"); // supprime la session 
  window.location.href = "index.html"; // revient boutique 
}

function initAuthUI() {
  const user = getCurrentUser();

  // 1) liens (si tu les as)
  const linkLogin = document.querySelector('[data-auth="login"]');
  const linkAccount = document.querySelector('[data-auth="account"]');
  const btnLogout = document.querySelector('[data-auth="logout"]');

  if (linkLogin) linkLogin.classList.toggle("hidden", !!user);
  if (linkAccount) linkAccount.classList.toggle("hidden", !user);
  if (btnLogout) btnLogout.classList.toggle("hidden", !user);

  // 2) action logout
  if (btnLogout) btnLogout.addEventListener("click", logout);

  // 3) (optionnel) petit label “Bonjour…”
  const hello = document.querySelector('[data-auth="hello"]');
  if (hello) {
    hello.textContent = user ? `Bonjour ${user.firstname} ${user.lastname}` : "";
    hello.classList.toggle("hidden", !user);
  }
}

document.addEventListener("DOMContentLoaded", initAuthUI);
