fetch("https://fakestoreapi.com/products")
  .then((res) => {
    if (!res.ok) {
      throw new Error("FakeStore is down");
    }
    return res.json();
  })
  .catch(async () => {
    const res = await fetch("https://dummyjson.com/products/?limit=18");
    return await res.json();
  })
  .then((data) => {
    const products = Array.isArray(data) ? data : data.products;

    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach((product) => {
      const image = product.image || product.thumbnail;
      const title = product.title;
      const price = product.price;

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${image}" width="100">
        <h3>${title}</h3>
        <p class="price">${price} $</p>

        <div>
          <button onclick="addToCart(${product.id}, \`${title}\`, ${price}, \`${image}\`)">+</button>
          <button onclick="removeFromCart(${product.id})">-</button>
        </div>

        <p id="qty-${product.id}">Antal: ${getQuantity(product.id)}</p>
      `;

      container.appendChild(card);
      updateProductUI(product.id);
    });
  })
  .catch((err) => {
    console.error("Both APIs failed:", err);
  });

