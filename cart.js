const cartContainer = document.getElementById('cartContainer');
console.log(cartContainer);
cartContainer.innerHTML = 
  document.createElement('h1').innerText = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).title : 'No items in cart'
