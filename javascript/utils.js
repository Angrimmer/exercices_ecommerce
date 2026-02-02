async function loadProducts() {
  const response = await fetch("product.json");
  const products = await response.json(); 
  return products;
}

export { loadProducts };
