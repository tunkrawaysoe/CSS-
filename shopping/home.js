import { products } from "./data/products.js";
import { renderNavBar } from "./navbar.js";

document.body.insertAdjacentHTML("afterbegin", renderNavBar());

let productHtml = "";
products.forEach((product) => {
  productHtml += `
    <div 
      class="group rounded-sm overflow-hidden relative bg-white cursor-pointer js-product-card"
      data-id="${product.id}"
    >
      <div class="relative">
        <img src="${product.image}" class="w-full h-60 object-cover" alt="${
    product.name
  }">
        <button class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow">
          <i class="bi bi-heart"></i>
        </button>
        <button class="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white shadow">
          <i class="bi bi-cart"></i>
        </button>
      </div>
      <div class="pt-4">
        <h4 class="font-semibold truncate">${product.name}</h4>
        <p class="font-bold">$${product.price / 100}</p>
      </div>
    </div>
  `;
});

document.querySelector(".js-product-grid").innerHTML = productHtml;

document.querySelectorAll(".js-product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const productId = card.dataset.id; 
    window.location.href = `product-detail.html?id=${productId}`;
  });
});
