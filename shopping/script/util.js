
export function initMobileMenuToggle() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.querySelector(".js-mobile-menu");
  console.log(mobileMenu)

  if (!menuBtn || !mobileMenu) return;

  // Toggle menu visibility when clicking the menu button
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Optional: close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });
}

