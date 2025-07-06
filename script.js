// ---- Smooth Scroll to Menu ----
document.addEventListener("DOMContentLoaded", () => {
  const browseBtn = document.getElementById("browseBtn");
  const menuSection = document.getElementById("menu");

  browseBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const menuTop = menuSection.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: menuTop - navbarHeight - 20,
      behavior: "smooth",
    });
  });
});

// ---- Anchor Scroll Adjust for Navbar ----
document.addEventListener("DOMContentLoaded", () => {
  const navbarHeight = document.querySelector(".navbar").offsetHeight;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    });
  });
});

// ---- Typing Text Border Removal ----
document.addEventListener("DOMContentLoaded", () => {
  const typedText = document.querySelector(".typing-text");
  setTimeout(() => {
    typedText.style.borderRight = "none";
  }, 3000);
});

// ---- LocalStorage Cart Handling ----
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = count;
}

// ---- Auto Update Cart Count on Load ----
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});

// ---- Quantity Counter on Cards ----
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".snack-card");

  cards.forEach(card => {
    const incrementBtn = card.querySelector(".increment");
    const decrementBtn = card.querySelector(".decrement");
    const qtyDisplay = card.querySelector(".qty-display");
    const addToCartBtn = card.querySelector(".add-to-cart-btn");

    let qty = 0;

    incrementBtn?.addEventListener("click", () => {
      qty++;
      qtyDisplay.textContent = qty;
    });

    decrementBtn?.addEventListener("click", () => {
      if (qty > 0) {
        qty--;
        qtyDisplay.textContent = qty;
      }
    });

    addToCartBtn?.addEventListener("click", () => {
      if (qty === 0) return;
      const item = card.getAttribute("data-item");
      const price = parseInt(card.getAttribute("data-price"));
      for (let i = 0; i < qty; i++) {
        addToCart(item, price);
      }
      qty = 0;
      qtyDisplay.textContent = "0";
    });
  });
});

// ---- Mobile Menu Toggle ----
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu?.classList.toggle("hidden");
}

// ---- Snack Grid Scroll Arrows ----
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.snack-grid');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.scroll-arrow:not(.left-arrow)');

  function updateArrowVisibility() {
    if (!container || !leftArrow || !rightArrow) return;
    leftArrow.style.display = container.scrollLeft > 0 ? 'flex' : 'none';
    const scrollEnd = container.scrollWidth - container.clientWidth;
    rightArrow.style.display = container.scrollLeft >= scrollEnd - 1 ? 'none' : 'flex';
  }

  container?.addEventListener('scroll', updateArrowVisibility);
  updateArrowVisibility();
});

function scrollSnacks() {
  const container = document.querySelector('.snack-grid');
  container?.scrollBy({ left: 300, behavior: 'smooth' });
}

function scrollSnacksLeft() {
  const container = document.querySelector('.snack-grid');
  container?.scrollBy({ left: -300, behavior: 'smooth' });
}

// ---- Combo Builder Logic ----
const availableSnacks = [
  { name: 'Maggie', price: 20 },
  { name: 'Chips', price: 25 },
  { name: 'Oreo', price: 15 },
  { name: 'JimJam', price: 15 },
  { name: 'Kurkure Masala Munch', price: 25 },
  { name: 'Aloo Bhujia', price: 100 },
  { name: 'Bourbon', price: 45 },
  { name: 'HideandSeek', price: 45 },
];

const comboGrid = document.querySelector('.combo-grid');
const comboBtn = document.getElementById('create-combo-btn');
let selectedSnacks = [];

availableSnacks.forEach((snack) => {
  const div = document.createElement('div');
  div.className = 'combo-item';
  div.innerText = `${snack.name} - ₹${snack.price}`;
  div.addEventListener('click', () => toggleSelect(snack, div));
  comboGrid?.appendChild(div);
});

function toggleSelect(snack, element) {
  const index = selectedSnacks.findIndex(s => s.name === snack.name);
  if (index > -1) {
    selectedSnacks.splice(index, 1);
    element.classList.remove('selected');
  } else if (selectedSnacks.length < 3) {
    selectedSnacks.push(snack);
    element.classList.add('selected');
  }
  comboBtn.disabled = selectedSnacks.length !== 3;
}

comboBtn?.addEventListener('click', () => {
  const total = selectedSnacks.reduce((sum, s) => sum + s.price, 0);
  const discounted = Math.round(total * 0.85); // 15% off
  const comboName = selectedSnacks.map(s => s.name).join(', ');
  addToCart(`Combo: ${comboName}`, discounted);
  alert(`Combo added to cart for ₹${discounted}!`);

  document.querySelectorAll('.combo-item').forEach(el => el.classList.remove('selected'));
  selectedSnacks = [];
  comboBtn.disabled = true;
});

const snacks = [
  { name: 'Maggie', price: 20, image: 'maggie.png' },
  { name: 'Chips', price: 25, image: 'chips.png' },
  { name: 'Oreo', price: 15, image: 'oreo.png' },
  { name: 'JimJam', price: 15, image: 'jimjam.png' },
  { name: 'Kurkure Masala Munch', price: 25, image: 'kurkure.png' },
  { name: 'Aloo Bhujia', price: 100, image: 'aloobhujia.png' },
  { name: 'Bourbon', price: 45, image: 'bourbon.png' },
  { name: 'HideandSeek', price: 45, image: 'hideandseek.png' }
];

const snackGrid = document.getElementById('snackGrid');

snacks.forEach(snack => {
  const card = document.createElement('div');
  card.className = 'snack-card';
  card.setAttribute('data-item', snack.name);
  card.setAttribute('data-price', snack.price);

  card.innerHTML = `
    <img src="${snack.image}" alt="${snack.name}">
    <h3>${snack.name}</h3>
    <p>₹${snack.price}</p>
    <div class="quantity-control">
      <button class="qty-btn decrement">-</button>
      <span class="qty-display">0</span>
      <button class="qty-btn increment">+</button>
    </div>
    <button class="add-to-cart-btn">Add to Cart</button>
  `;

  snackGrid.appendChild(card);
});
