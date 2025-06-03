function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  const emptyMessage = document.getElementById('empty-message');

  const cart = getCart();
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    emptyMessage.style.display = 'block';
    totalPriceEl.textContent = '0';
    return;
  }

  emptyMessage.style.display = 'none';

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = Number(item.price) * Number(item.quantity);
    total += itemTotal;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <div class="cart-item-info">
        <strong>${item.name}</strong> (x${item.quantity})<br>
        ₹${itemTotal}
      </div>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  totalPriceEl.textContent = total.toFixed(2);
}


function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

document.getElementById('place-order').addEventListener('click', () => {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Customize behavior here — for now, just show a message and clear the cart
  alert("Order placed successfully! 🎉\nYour order will be delivered in front of room number 515 😄");

  localStorage.removeItem('cart');
  renderCart();
});

// Render the cart when the page loads
window.onload = renderCart;
