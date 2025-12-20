import {
    cart,
    renderNavBarWithCartQty,
    updateCartQuantity,
    updateTotals
} from "../data/cart.js";
import { products } from "../data/products.js";

const cartContainer = document.querySelector(".js-cart-items");
const subtotalEl = document.querySelector(".js-subtotal");
const taxesEl = document.querySelector(".js-taxes");
const totalEl = document.querySelector(".js-total");

function renderCart() {
    // Render navbar
    document.querySelector(".js-navbar").innerHTML = renderNavBarWithCartQty();

    let cartHtml = "";

    cart.forEach((cartItem, index) => {
        const product = products.find(p => p.id === cartItem.id);
        if (!product) return;

        cartHtml += `
      <div class="flex justify-between items-center js-cart-item" data-index="${index}">
        
        <!-- Product Info -->
        <div class="flex items-center gap-4">
          <img src="${product.image}" alt="${product.name}" class="h-20 w-20 rounded object-cover">
          <div class="flex flex-col">
            <p class="font-semibold text-lg">${product.name}</p>
            <button class="w-max p-1 px-2 mt-2 rounded-sm shadow js-remove" data-product-id="${product.id}"
            >
              Remove
            </button>
          </div>
        </div>

        <!-- Price & Quantity -->
        <div class="flex flex-col items-end">
          <div class="font-semibold mb-2 text-gray-700">
            $${(product.price / 100).toFixed(2)}
          </div>

          <div class="flex items-center gap-2">
            <button
              class="px-3 py-1 shadow rounded js-decrease hover:bg-gray-300"
              data-product-id="${product.id}"
            >-</button>

            <span class="text-lg">${cartItem.quantity}</span>

            <button
              class="px-3 py-1 shadow rounded js-increase hover:bg-gray-300"
              data-product-id="${product.id}"
            >+</button>
          </div>
        </div>
      </div>
    `;
    });

    cartContainer.innerHTML = cartHtml;

    updateTotals(subtotalEl, taxesEl, totalEl);
    setupCartActions();
}

function setupCartActions() {

    // INCREASE QUANTITY
    document.querySelectorAll(".js-increase").forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = Number(btn.dataset.productId);

            const cartItem = cart.find(item => item.id === productId);
            if (!cartItem) return;

            cartItem.quantity += 1;

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartQuantity();
        });
    });

    // DECREASE QUANTITY
    document.querySelectorAll(".js-decrease").forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = Number(btn.dataset.productId);
            const cartItem = cart.find(item => item.id === productId);
            if (!cartItem) return;

            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                cart.splice(cart.indexOf(cartItem), 1);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartQuantity();
        });
    });

    // REMOVE ITEM
    document.querySelectorAll(".js-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = Number(btn.dataset.productId);
            const index = cart.findIndex(item => item.id === productId);
            if (index === -1) return;
            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartQuantity();
        });
    });
}

renderCart();
updateCartQuantity();
