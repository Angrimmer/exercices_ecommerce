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
          <button class="btn btn--primary" type="button">Ajouter</button>
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