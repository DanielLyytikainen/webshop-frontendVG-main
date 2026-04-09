let shoppingcart = JSON.parse(localStorage.getItem("shoppingcart")) || [];

function saveCart() {
  localStorage.setItem("shoppingcart", JSON.stringify(shoppingcart));

  updateCartCount();
  renderCart();
  updateAllProductsUI();
}

function getQuantity(id) {
  const item = shoppingcart.find((p) => p.id === id);
  return item ? item.quantity : 0;
}

function updateCartCount() {
  const total = shoppingcart.reduce((sum, item) => sum + item.quantity, 0);

  const desktop = document.getElementById("cart-count");
  const mobile = document.getElementById("cart-count-mobile");

  [desktop, mobile].forEach(el => {
    if (!el) return;

    if (total > 0) {
      el.textContent = total;
      el.style.display = "inline-block";
    } else {
      el.style.display = "none";
    }
  });
}

function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("overlay");

  if (!drawer || !overlay) return;

  drawer.classList.toggle("open");
  overlay.classList.toggle("active");

  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-items");
  const totalText = document.getElementById("cart-total");

  if (!list || !totalText) return;

  list.innerHTML = "";
  let total = 0;

  shoppingcart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    const sum = item.price * item.quantity;
    total += sum;

    li.innerHTML = `
      <div class="cart-row">
        <img src="${item.image}" class="cart-img">

        <div class="cart-info">
          <div class="cart-title">${item.title}</div>
          <div>${item.price} $ x ${item.quantity} = <strong>${sum} $</strong></div>

          <div class="cart-controls">
          <button class="btn btn-primary btn-sm" onclick="changeQuantity(${index}, 1)">+</button>
          <button class="btn btn-primary btn-sm" onclick="changeQuantity(${index}, -1)">-</button>        
          <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">❌</button>
          </div>
        </div>
      </div>
    `;

    list.appendChild(li);
  });

  totalText.textContent = "Totalt: " + total.toFixed(2) + " $";
}

function changeQuantity(index, change) {
  shoppingcart[index].quantity += change;

  if (shoppingcart[index].quantity <= 0) {
    shoppingcart.splice(index, 1);
  }

  saveCart();
  updateCartCount();
  renderCart();
  updateProductUI(id);
}

function clearCart() {
  const ids = shoppingcart.map(item => item.id);
  shoppingcart = [];
  saveCart();
  updateCartCount();
  renderCart();
  ids.forEach(id => updateProductUI(id));
  
}

function addToCart(id, title, price, image) {
  const item = shoppingcart.find((p) => p.id === id);

  if (item) {
    item.quantity++;
  } else {
    shoppingcart.push({ id, title, price, image, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  updateProductUI(id);
}

function removeFromCart(id) {
  const item = shoppingcart.find((p) => p.id === id);

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    shoppingcart = shoppingcart.filter((p) => p.id !== id);
  }

  saveCart();
  updateCartCount();
  updateProductUI(id);
}

function updateProductUI(id) {
  const el = document.getElementById(`qty-${id}`);
  const item = shoppingcart.find((p) => p.id === id);

  if (el) {
    el.textContent = "Antal: " + (item ? item.quantity : 0);
  }
}

function goToOrder() {
  if (shoppingcart.length === 0) {
    alert("Varukorgen är tom!");
    return;
  }

  window.location.href = "order.html";
}
function removeItem(index) {
  shoppingcart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCart();
  updateProductUI(id);
}
window.addEventListener("storage", () => {
  shoppingcart = JSON.parse(localStorage.getItem("shoppingcart")) || [];

  updateCartCount();
  renderCart();
  updateAllProductsUI();
});
function updateAllProductsUI() {
  document.querySelectorAll("[id^='qty-']").forEach(el => {
    const id = parseInt(el.id.replace("qty-", ""));
    updateProductUI(id);
  });
}

updateCartCount();
