import { cart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { renderNavBar } from "./navbar.js";

const navbarHtml=renderNavBar();
const cartContainer = document.querySelector(".js-cart-items");
const subtotalEl = document.querySelector(".js-subtotal");
const taxesEl = document.querySelector(".js-taxes");
const totalEl = document.querySelector(".js-total");
console.log(navbarHtml)

function renderCart() {

    document.querySelector(".js-navbar").innerHTML = navbarHtml;
    let cartHtml = "";

    cart.forEach((cartItem, index) => {
        const product = products.find(p => p.id === cartItem.id);
        if (!product) return;

        cartHtml += `
        <div class="flex justify-between items-center js-cart-item" data-index="${index}">
            <!-- Product Info -->
            <div class="flex items-center gap-4">
                <img src="${product.image}" alt="${product.name}" class="h-20 w-20 rounded object-cover">
                <div class="flex flex-col justify-center h-full">
                <p class="font-semibold text-lg">${product.name}</p>
                <button class="w-max p-1 px-2 rounded-sm shadow js-remove mt-2">
                    Remove
                </button>
                </div>
            </div>

            <!-- Price & Quantity Column -->
            <div class="flex flex-col items-end">
                <div class="text-gray-700 font-semibold mb-2">$${(product.price / 100).toFixed(2)}</div>
                <div class="flex items-center gap-2">
                <button class="px-3 py-1 shadow rounded js-decrease hover:bg-gray-300">-</button>
                <span class="js-quantity text-lg">${cartItem.quantity}</span>
                <button class="px-3 py-1 shadow rounded js-increase hover:bg-gray-300">+</button>
                </div>
            </div>
</div>

    `;
    });

    cartContainer.innerHTML = cartHtml;
    updateTotals();
    setupCartActions(); // Attach event listeners after rendering
}
function updateTotals() {
    let subtotal = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
        subtotal += (product.price / 100) * item.quantity;
    });

    const taxes = subtotal * 0.1;
    const total = subtotal + taxes;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxesEl.textContent = `$${taxes.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}
function setupCartActions() {
    document.querySelectorAll(".js-increase").forEach(btn => {
        btn.addEventListener("click", () => {
            const cartItemEl = btn.closest(".js-cart-item");
            const index = Number(cartItemEl.dataset.index);
            cart[index].quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartQuantity(); // update navbar badge
        });
    });

    document.querySelectorAll(".js-decrease").forEach(btn => {
        btn.addEventListener("click", () => {
            const cartItemEl = btn.closest(".js-cart-item");
            const index = Number(cartItemEl.dataset.index);
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartQuantity();
        });
    });

    document.querySelectorAll(".js-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const cartItemEl = btn.closest(".js-cart-item");
            const index = Number(cartItemEl.dataset.index);
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartQuantity();
        });
    });
}

renderCart();
updateCartQuantity();
