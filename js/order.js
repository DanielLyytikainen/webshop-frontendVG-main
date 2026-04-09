const form = document.getElementById("orderForm");
const message = document.getElementById("message");
const cancelBtn = document.getElementById("cancel-button");
const phoneInput = document.getElementById("phone");
const zipInput = document.getElementById("zip");

if (phoneInput) {
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9\-()]/g, "");
  });
}
if (zipInput) {
  zipInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9-()]/g, "");
  });
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", function () {
    const confirmCancel = confirm(
      "Are you sure you want to cancel this order?",
    );

    if (confirmCancel) {
      localStorage.removeItem("shoppingcart");
      window.location.href = "index.html";
    }
  });
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const street = document.getElementById("street").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const city = document.getElementById("city").value.trim();

    let error = "";

    if (name.length < 2 || name.length > 50) {
      error = "Name must be between 2 and 50 characters";
    } else if (!email.includes("@") || email.length > 50) {
      error = "Email must contain @ and be max 50 characters";
    } else if (!/^[0-9\-()]+$/.test(phone) || phone.length > 20) {
      error =
        "Phone number can only contain numbers, hyphens, and parentheses, max 20 characters";
    } else if (street.length < 2 || street.length > 50) {
      error = "Street address must be between 2 and 50 characters";
    } else if (!/^[0-9]{5}$/.test(zip)) {
      error = "Postal code must be exactly 5 digits";
    } else if (city.length < 2 || city.length > 20) {
      error = "City must be between 2 and 20 characters";
    }

    if (error) {
      message.style.color = "red";
      message.innerText = error;
      return;
    }

    message.style.color = "green";

    form.reset();
    localStorage.setItem("lastOrder", JSON.stringify(shoppingcart));
    localStorage.removeItem("shoppingcart");

    setTimeout(() => {
      window.location.href = "thankyou.html";
    }, 500);
  });
}

function renderOrderSummary() {
  const list = document.getElementById("order-items");
  const totalText = document.getElementById("order-total");

  if (!list || !totalText) return;

  list.innerHTML = "";
  let total = 0;

  shoppingcart.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const sum = item.price * item.quantity;
    total += sum;

    li.innerHTML = `
      <strong>${item.title}</strong><br>
      ${item.price} $ x ${item.quantity} = ${sum.toFixed(2)} $
    `;

    list.appendChild(li);
  });

  totalText.textContent = "Totalt: " + total.toFixed(2) + " $";
}

document.addEventListener("DOMContentLoaded", renderOrderSummary);
