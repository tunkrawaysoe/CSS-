export function renderNavBar() {
  return `
  <nav class="bg-white shadow fixed w-full z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">

        <!-- Logo + Menu -->
        <div class="flex items-center space-x-8">
          <div class="text-xl font-bold text-indigo-600">MyApp</div>
          <ul class="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li><a href="http://127.0.0.1:5500/shopping/home.html" class="hover:text-indigo-600">Home</a></li>
            <li><a href="#" class="hover:text-indigo-600">Shop</a></li>
            <li><a href="#" class="hover:text-indigo-600">Contact Us</a></li>
          </ul>
        </div>

        <!-- Icons -->
        <div class="flex items-center space-x-3 text-gray-700">

          <!-- Cart -->
          <div class="relative">
            <button
              class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-700">
              <i class="bi bi-cart text-lg"></i>
            </button>
            <span
              class="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold bg-[#714e62] text-white">3</span>
          </div>

          <!-- Search -->
          <button
            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-700">
            <i class="bi bi-search"></i>
          </button>

          <!-- Phone (Desktop) -->
          <div class="hidden md:flex items-center space-x-2 font-medium">
            <span
              class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-700">
              <i class="bi bi-telephone"></i>
            </span>
            <a href="tel:+1234567890" class="hover:text-indigo-600">+123 456 7890</a>
          </div>

          <!-- Contact Button (Desktop) -->
          <a href="#contact"
            class="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#714e62] text-white text-sm hover:bg-[#5f4052] transition">
            Contact Us
          </a>

          <!-- Contact (Mobile) -->
          <a href="#contact"
            class="md:hidden flex items-center gap-2 text-[#714e62] font-medium hover:text-[#5f4052]">
            <i class="bi bi-envelope"></i>
            <span>Contact</span>
          </a>

        </div>
      </div>
    </div>
  </nav>
  `;
}
