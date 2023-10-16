const productButtons = document.querySelectorAll('.add-to-cart');
const cart = document.getElementById('cart');
const cartTotal = document.getElementById('cart-subtotal');
const cartTotaled = document.getElementById('cart-total');
const inputPromoCode = document.getElementById('promo-code');
const promoCodes = document.getElementById('promo-code');
const discountValue = document.getElementById('discount');
const cartItems = [];

// Kode promo
const promo = [
  {
    label: 'DISC10',
    value: 0.1,
  },
  {
    label: 'DISC50',
    value: 0.5,
  },
  {
    label: 'DISC75',
    value: 0.75,
  },
];

// Menambahkan event listener ke tombol "Add to Cart"
productButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

// Fungsi untuk menambahkan barang ke keranjang
function addToCart(event) {
  const button = event.target;
  const name = button.getAttribute('data-name');
  const price = parseFloat(button.getAttribute('data-price'));
  const item = { name, price };

  // Menambahkan item ke dalam keranjang
  cartItems.push(item);
  updateCartTotal();
}

// Fungsi untuk mengupdate total belanja di keranjang
function updateCartTotal() {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price;
  });
  cartTotal.textContent = `Rp. ${total.toFixed(2)}`;
  displayCart();
}

// Fungsi untuk menampilkan isi keranjang
function displayCart() {
  cart.innerHTML = '';

  if (cartItems.length === 0) {
    cart.innerHTML = '<p class="my-4 italic text-center">Keranjang kosong</p>';
  } else {
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
      <div class="flex-shrink-0">
      <h5 class="mb-1 font-normal">${item.name}</h5>
      <h6 class="font-medium text-lg">Rp. ${item.price.toFixed(2)}</h6>
      </div>
        <button class="remove-from-cart text-sm py-2 px-4 rounded-md bg-red-500 text-white" data-index="${index}">Hapus</button>
      `;
      cart.appendChild(cartItem);
    });
  }

  // Menambahkan event listener ke tombol "Hapus" di keranjang
  const removeButtons = document.querySelectorAll('.remove-from-cart');
  removeButtons.forEach((button) => {
    button.addEventListener('click', removeFromCart);
  });
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(event) {
  const index = parseInt(event.target.getAttribute('data-index'));
  cartItems.splice(index, 1);
  updateCartTotal();
}

// Fungsi untuk menerapkan kode promo
function applyPromoCode() {
  const code = promoCodes.value;
  const matchingPromo = promo.find((p) => p.label === code);

  if (matchingPromo) {
    // Kode promo ditemukan
    const discount = matchingPromo.value;
    const total = calculateTotal();
    const discountedTotal = total - total * discount;

    // Update tampilan
    discountValue.textContent = `Diskon: ${Math.round(discount * 100)}%`;
    cartTotaled.textContent = `Total: Rp. ${discountedTotal.toFixed(2)}`;
  } else {
    // Kode promo tidak valid
    discountValue.textContent = '-';
    cartTotaled.textContent = `Total: Rp. ${calculateTotal().toFixed(2)}`;
  }
}

// Event listener untuk input kode promo
promoCodes.addEventListener('input', applyPromoCode);

// ...

// Fungsi untuk menghitung total belanja
function calculateTotal() {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price;
  });
  return total;
}