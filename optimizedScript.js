// Cache DOM elements to avoid repeated lookups
const elements = {
    search: document.getElementById('search'),
    filterSection: document.getElementById('filter_section'),
    shopCards: document.getElementById('shopCards'),
    notifyText: document.getElementById('notify_text'),
    noOfItems: document.getElementById('no_of_items'),
    saleTime: document.getElementById('sale_time')
  };
  
  // Constants
  const NOTIFY_DURATION = 1500;
  const DEFAULT_IMAGE = 'https://motobros.com/wp-content/uploads/2024/09/no-image.jpeg';
  let notifyTimeout;
  
  // Initialize cart counter from localStorage
  elements.noOfItems.innerText = JSON.parse(localStorage.getItem('cart'))?.length || 0;
  
  // Scroll to filter section when search is focused
  elements.search.addEventListener('focusin', () => {
    window.scrollTo({ top: elements.filterSection.offsetTop, behavior: 'smooth' });
  });
  
  // Fetch products with better error handling
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  
  // Create product card with more efficient DOM manipulation
  const createCard = (data) => {
    const { title, description, price, image } = data;
    const displayCard = document.createElement('div');
    displayCard.classList.add('card', 'h-96', 'w-64', 'rounded-2xl', 'border-[1px]', 'border-black', 'p-4', 'flex', 'flex-col', 'justify-between');
    
    const img = document.createElement('img');
    img.src = image || DEFAULT_IMAGE;
    img.className = 'h-48';
    img.alt = 'No preview available';
    
    const heading = document.createElement('h1');
    heading.className = 'text-lg';
    heading.textContent = title;
    
    const desc = document.createElement('p');
    desc.className = 'text-sm clamp';
    desc.textContent = description;
    
    const priceEl = document.createElement('p');
    priceEl.className = 'text-lg font-bold';
    priceEl.textContent = `$ ${price}`;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex justify-between items-center';
    
    const addButton = document.createElement('button');
    addButton.className = 'add-to-cart bg-black text-white text-xs rounded-full px-4 py-1';
    addButton.textContent = 'Add to Cart';
    addButton.addEventListener('click', () => addToCart(data));
    
    const viewButton = document.createElement('button');
    viewButton.className = 'border-[1px] border-black text-xs rounded-full px-4 py-1';
    viewButton.textContent = 'View Details';
    
    buttonContainer.append(addButton, viewButton);
    displayCard.append(img, heading, desc, priceEl, buttonContainer);
    
    return displayCard;
  };
  
  // Render products more efficiently
  const renderProducts = async () => {
    const products = await fetchProducts();
    const fragment = document.createDocumentFragment();
    
    products.forEach(product => {
      const card = createCard({
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.images[0],
      });
      fragment.appendChild(card);
    });
    
    elements.shopCards.appendChild(fragment);
  };
  
  // Debounce function to limit execution frequency
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  
  // Debounced search handler
  elements.search.addEventListener('input', debounce((event) => {
    const searchTerm = event.target.value.toLowerCase();
    const products = Array.from(elements.shopCards.children);
    
    products.forEach(product => {
      const title = product.querySelector('h1').textContent.toLowerCase();
      const description = product.querySelector('p').textContent.toLowerCase();
      
      product.style.display = 
        title.includes(searchTerm) || description.includes(searchTerm) 
          ? 'block' 
          : 'none';
    });
  }, 300));
  
  // Optimized add to cart function
  function addToCart(productData) {
    clearTimeout(notifyTimeout);
    elements.notifyText.classList.remove('hidden');
    notifyTimeout = setTimeout(() => {
      elements.notifyText.classList.add('hidden');
    }, NOTIFY_DURATION);
  
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [productData, ...existingCart];
    elements.noOfItems.innerText = updatedCart.length;
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
  
  // Initialize products
  renderProducts();
  
  // Update sale time with better performance
  const updateSaleTime = () => {
    elements.saleTime.innerText = new Date().toLocaleTimeString();
  };
  
  updateSaleTime();
  setInterval(updateSaleTime, 1000);