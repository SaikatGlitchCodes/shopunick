const search = document.getElementById('search');
const filter_section = document.getElementById('filter_section').offsetTop;
search.addEventListener('focusin', () => {
    window.scrollTo({ top: filter_section, behavior: 'smooth' });
});

const fetchProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        return data.products;
    }
    catch (error) {
        console.error('Error fetching products:', error);
    }
    return [];
}

const Card = (data) => {
  const { title, description, price, image } = data;
    const displayCard = document.createElement('div');
    displayCard.classList.add('card', 'h-96', 'w-64', 'rounded-2xl', 'border-[1px]', 'border-black', 'p-4', 'flex', 'flex-col', 'justify-between');
    const imageOrText = image ? image : 'https://motobros.com/wp-content/uploads/2024/09/no-image.jpeg';
    displayCard.innerHTML = `<img
              src=${imageOrText}
              class="h-48"
              alt="No preview available"
            />
            <h1 class="text-lg">${title}</h1>
            <p class="text-sm clamp">
             ${description}
            </p>
            <p class="text-lg font-bold">$ ${price}</p>
            <div class="flex justify-between items-center">
              <button  class="add-to-cart bg-black text-white text-xs rounded-full px-4 py-1">
                Add to Cart
              </button>
              <button
                class="border-[1px] border-black text-xs rounded-full px-4 py-1"
              >
                View Details
              </button>
            </div>`
    const addToCartButton = displayCard.querySelector('.add-to-cart'); 
    addToCartButton.addEventListener('click', () => {
        addToCart(data);
    });       
    return displayCard;
}

const renderProducts = async () => {
    const shopCards = document.getElementById('shopCards');
    const products = await fetchProducts();
    
    products.forEach(product => {
        const card = Card({
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.images[0],
        });
        shopCards.appendChild(card);
    });
}

renderProducts();

search.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const shopCards = document.getElementById('shopCards');
    const products = Array.from(shopCards.children);
    console.log(products);

    products.forEach(product => {
        const title = product.querySelector('h1').textContent.toLowerCase();
        const description = product.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

function addToCart(productData) {
  document.getElementById('notify_text').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('notify_text').classList.add('hidden');
  }, 1500);

  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('no_of_items').innerText = existingCart.length + 1;
  localStorage.setItem('cart', JSON.stringify([productData, ...existingCart]));
}

document.getElementById('no_of_items').innerText = JSON.parse(localStorage.getItem('cart'))?.length || 0;
// setItem getItem

class CardClass {
  constructor(item1, item2){
    this.item1 = item1;
    this.item2 = item2;
    console.log(item1, item2);
  }
}

new CardClass('parleG', 'parleG2');

function CardFunction(item1, item2){
  console.log(item1, item2);
}

CardFunction('parleG', 'parleG2');


const sale_time = document.getElementById('sale_time');


setInterval(()=>{
  sale_time.innerText = new Date().toLocaleTimeString();
}, 1000);

