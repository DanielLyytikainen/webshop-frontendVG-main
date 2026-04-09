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
        <button>Buy Now</button>
      `;

      const button = card.querySelector("button");

      button.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "order.html";
      });

      container.appendChild(card);
    });
  })
  .catch((err) => {
    console.error("Both APIs failed:", err);
  });
