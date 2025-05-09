const cartContainer = document.getElementById('cartContainer');
const cart = JSON.parse(localStorage.getItem('cart')) || [];
document.getElementById('no_of_items').innerText = JSON.parse(localStorage.getItem('cart'))?.length || 0;

cart.forEach((item, index) => {
  const cartItem = document.createElement('div');
  cartItem.classList.add('flex', 'gap-4', 'border-b', 'border-gray-300', 'p-4');
  cartItem.innerHTML = `
        <img class="h-24 bg-gray-200 px-4" src="${item.image}" alt="product">
        <div>
          <h2 class="text-lg">${item.title}</h2>
          <p class="text-sm">${item.description}</p>
          <p class="text-gray-500">Price: $ ${item.price}</p>
          </div>
        </div>
        <button class="deleteItem border border-gray-200 px-4 h-8 rounded mt-4" id="removeBtn">Remove</button>
`
  const removeBtn = cartItem.querySelector('.deleteItem');
  removeBtn.addEventListener('click', () => {
    deleteItem(index);
  })
  cartContainer.appendChild(cartItem);
})

const total_price = document.getElementById('total_price');
let total = 0;
cart.forEach((item)=> {
  total += item.price;
})
total_price.innerHTML = `
    <h2 class="text-lg">Total Price: $ ${total.toFixed(2)}</h2>
    <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4" id="checkoutBtn">Checkout</button>
`

// splice(initial index, 1)
function deleteItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload();
}

const checkoutBtn = document.getElementById('checkoutBtn');
checkoutBtn.addEventListener('click', () => {
  alert('Thank you for your purchase!');
  localStorage.setItem('cart', JSON.stringify([]));
  window.location.reload();
})