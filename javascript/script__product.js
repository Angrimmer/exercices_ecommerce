import { loadProducts } from "../javascript/utils.js";

const products = await loadProducts()


const slug = window.location.search.split("=")[1];
const product = products.find((p) => p.slug === slug);



if (!product) {
  document.querySelector(".title").textContent = "Produit introuvable";
} else {
  console.log("slug récupéré =", product.slug);
 

  document.querySelector(".title").textContent = product.name;
  document.querySelector(".panel").textContent = product.description;
  document.querySelector(".subtitle").textContent = product.category;
  document.querySelector(".price__value").textContent = `${product.price} €`;
  document.querySelector(".stock").textContent = `Stock : ${product.stock} unités`;
  document.querySelector(".main-image").src = product.image;
}



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
