import { products } from "./products.js";

export const cart = JSON.parse(localStorage.getItem("cart")) || [];

export function updateCartQuantity() {
    const totalQuantity = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    const qtyEl = document.querySelector(".js-cart-quantity");
    if (qtyEl) {
        qtyEl.textContent = totalQuantity;
    }
}

export function addToCart(productId, quantity = 1) {
  const existing = cart.find(p => p.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartQuantity();
}

export function updateTotals(subtotalEl, taxesEl, totalEl) {
  let subtotal = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    subtotal += (product.price / 100) * item.quantity;
  });

  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (taxesEl) taxesEl.textContent = `$${taxes.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}