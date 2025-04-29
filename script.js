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

const Card = ({ image, title, description, price }) => {
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
            <p class="text-lg font-bold">${price}</p>
            <div class="flex justify-between items-center">
              <button class="bg-black text-white text-xs rounded-full px-4 py-1">
                Add to Cart
              </button>
              <button
                class="border-[1px] border-black text-xs rounded-full px-4 py-1"
              >
                View Details
              </button>
            </div>`
    return displayCard;
}

const renderProducts = async () => {
    const shopCards = document.getElementById('shopCards');
    const products =await fetchProducts();
    console.log(products)
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