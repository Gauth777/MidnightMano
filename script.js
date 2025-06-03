document.addEventListener("DOMContentLoaded", () => {
  const browseBtn = document.getElementById("browseBtn");
  const menuSection = document.getElementById("menu");

  browseBtn.addEventListener("click", function (e) {
    e.preventDefault(); // prevent default anchor jump

    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const menuTop = menuSection.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: menuTop - navbarHeight - 20, // adjust -20 for extra gap
      behavior: "smooth",
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const typedText = document.querySelector(".typing-text");
  setTimeout(() => {
    typedText.style.borderRight = "none";
  }, 3000); // Match your typing duration
});


// Save item to localStorage
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
  document.getElementById('cart-count').textContent = count;
}

// Automatically update count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});

/*
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash-screen");
    splash.style.display = "none";
  }, 2500); // 2.5 seconds
});
*/

function scrollSnacks() {
  const container = document.querySelector('.snack-grid');
  container.scrollBy({ left: 300, behavior: 'smooth' });
}

function scrollSnacksLeft() {
  const container = document.querySelector('.snack-grid');
  container.scrollBy({ left: -300, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.snack-grid');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.scroll-arrow:not(.left-arrow)');

  function updateArrowVisibility() {
    leftArrow.style.display = container.scrollLeft > 0 ? 'flex' : 'none';

    const scrollEnd = container.scrollWidth - container.clientWidth;
    rightArrow.style.display = container.scrollLeft >= scrollEnd - 1 ? 'none' : 'flex';
  }

  container.addEventListener('scroll', updateArrowVisibility);

  // Check on initial load too
  updateArrowVisibility();
});
