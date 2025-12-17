import { products } from "./data/products.js";
import { renderNavBar } from "./navbar.js";

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const product = products.find((p) => p.id === productId);

if (!product) {
  alert("Product not found!");
  window.location.href = "index.html";
}

const colorImages = [
  product.image,
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
];

const html = `
  ${renderNavBar()}
  <div class="p-20 js-product-detail-container">
    <h2 class="text-gray-600 js-breadcrumb">All Products / ${
      product.name
    }</h2>

    <div class="bg-green-100 flex rounded-lg grid grid-cols-1 md:grid-cols-2 py-4">

      <!-- LEFT: Image + Thumbnails -->
      <div class="flex">
        <div class="flex flex-col gap-2 w-20">
          ${colorImages
            .map(
              (img, i) =>
                `<img src="${img}" alt="Color ${
                  i + 1
                }" class="w-full h-20 object-cover rounded cursor-pointer js-color-thumb">`
            )
            .join("")}
        </div>

        <div class="flex-1 flex justify-center items-start">
          <img src="${product.image}" alt="${
  product.name
}" class="object-cover rounded w-full max-w-[420px] h-[420px] js-product-image" />
        </div>
      </div>

      <!-- RIGHT: Product Details -->
      <div class="flex flex-col justify-start space-y-6">
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold js-product-name">${
            product.name
          }</h1>
          <p class="text-2xl font-bold js-product-price">$${
            product.price / 100
          }</p>
        </div>

        <!-- Quantity + Buttons -->
        <div class="flex items-center gap-3">
          <button class="w-10 h-10 border rounded js-minus">−</button>
          <span class="js-qty font-semibold">1</span>
          <button class="w-10 h-10 border rounded js-plus">+</button>

          <button class="py-2 px-6 bg-[#714e62] text-white rounded hover:bg-indigo-700 js-add-cart">
            Add to Cart
          </button>

          <button class="w-10 h-10 border rounded flex items-center justify-center hover:bg-gray-100">
            <i class="bi bi-heart text-xl"></i>
          </button>
        </div>

        <!-- Terms -->
        <div class="pt-4 text-sm text-gray-600 border-t space-y-1">
          <p>• Cash on delivery available</p>
          <p>• 7 days return policy</p>
          <p>• Free shipping on orders over $50</p>
        </div>
      </div>
    </div>
  </div>
`;

document.querySelector(".js-product-details").innerHTML = html;

// Quantity functionality
let qty = 1;
const qtyEl = document.querySelector(".js-qty");

document.querySelector(".js-plus").onclick = () => {
  qty++;
  qtyEl.textContent = qty;
};

document.querySelector(".js-minus").onclick = () => {
  if (qty > 1) qty--;
  qtyEl.textContent = qty;
};

// Add to Cart button
document.querySelector(".js-add-cart").onclick = () => {
  console.log({ product, quantity: qty });
  alert(`Added ${qty} ${product.name}(s) to cart`);
};

// Color thumbnail click functionality
document.querySelectorAll(".js-color-thumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    document.querySelector(".js-product-image").src = thumb.src;
    document
      .querySelectorAll(".js-color-thumb")
      .forEach((t) => t.classList.remove("ring-2", "ring-indigo-600"));
    thumb.classList.add("ring-2", "ring-indigo-600");
  });
});
