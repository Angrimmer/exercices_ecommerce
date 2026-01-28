console.log( window.location.search.split('=')[1]);
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

const slug = window.location.search.split("=")[1];
const product = products.find((p) => p.slug === slug);


if (!product) {
  document.querySelector(".title").textContent = "Produit introuvable";
} else {
  console.log("slug récupéré =", product.slug);
 
  //! Recapitulatif
  //? Product est egal a ton array ProductS friltré par le slug donc tu peut juste tout asign direct vu que tu a l'objet grace a ça
  //? querySelector(".[LE NOM DE LA CLASSE DE L'OBJET]")    On choppe l'objet
  //? .textcontent, On modifie le texte de l'objet,         On dit qu'on veut changer le nom
  //? product.[KEY] product contiens tout donc,             On dit par quoi on veut le changer
  //  product =>
  //  slug  element => 
  //        element =>
  //        element =>
  //? Le slug permet de savoir quelle objet on va chercher
    // le nom de la classe = CSS donc ?
  //!  Ouais tu pourrait tres bien mettre un # pour un id par example
  // Tu peut aussi mettre un [span] si tu veut (ça choppera le premier span parce que la fonction ne peut return q'un element)
  // Tu peut aussi avoir plusieurs elements avec querySElectorAll([Un element que tout les elements doivent avoir en commyun])

  document.querySelector(".title").textContent = product.name;
  document.querySelector(".panel").textContent = product.description;
  document.querySelector(".subtitle").textContent = product.category;
  document.querySelector(".price__value").textContent = `${product.price} €`;
  document.querySelector(".stock").textContent = `Stock : ${product.stock} unités`;
  document.querySelector(".main-image").src = product.image;
}

