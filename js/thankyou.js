const order = JSON.parse(localStorage.getItem("lastOrder")) || [];

function renderThankYou() {
  const list = document.getElementById("thank-items");
  const totalText = document.getElementById("thank-total");

  if (!list || !totalText) return;

  list.innerHTML = "";
  let total = 0;

  order.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const sum = item.price * item.quantity;
    total += sum;

    li.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img src="${item.image}" style="width:50px; height:50px; object-fit:contain;">
        
        <div class="flex-grow-1">
          <strong>${item.title}</strong><br>
          ${item.quantity} x ${item.price} $
        </div>

        <strong>${sum.toFixed(2)} $</strong>
      </div>
    `;

    list.appendChild(li);
  });

  totalText.textContent = "Totalt: " + total.toFixed(2) + " $";
}

renderThankYou();

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("back-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      localStorage.removeItem("shoppingcart");
      localStorage.removeItem("lastOrder");
      window.location.href = "index.html";
    });
  }
});