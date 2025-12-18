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
