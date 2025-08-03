<script lang="ts">
  let activeCategory = 'all';
  let cartItems = [];
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'apparel', name: 'Apparel' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'tech', name: 'Tech & Lifestyle' },
    { id: 'stationery', name: 'Stationery' }
  ];
  
  const products = [
    {
      id: 1,
      name: 'FlourishTalents Club T-Shirt',
      price: 29.99,
      category: 'apparel',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      colors: ['Black', 'White', 'Navy', 'Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
      id: 2,
      name: 'Premium Branded Hoodie',
      price: 59.99,
      category: 'apparel',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      colors: ['Black', 'Gray', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      id: 3,
      name: 'Wireless Bluetooth Earbuds',
      price: 149.99,
      category: 'tech',
      image: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=800',
      colors: ['Black', 'White'],
      sizes: ['One Size']
    },
    {
      id: 4,
      name: 'Professional Portfolio Case',
      price: 89.99,
      category: 'accessories',
      image: 'https://images.pexels.com/photos/4491459/pexels-photo-4491459.jpeg?auto=compress&cs=tinysrgb&w=800',
      colors: ['Black', 'Brown'],
      sizes: ['Standard']
    },
    {
      id: 5,
      name: 'Luxury Branded Notebook',
      price: 24.99,
      category: 'stationery',
      image: 'https://images.pexels.com/photos/3831849/pexels-photo-3831849.jpeg?auto=compress&cs=tinysrgb&w=800',
      colors: ['Black', 'Navy', 'Burgundy'],
      sizes: ['A5']
    },
    {
      id: 6,
      name: 'Creative Professional Mug',
      price: 19.99,
      category: 'accessories',
      image: 'https://images.pexels.com/photos/6292252/pexels-photo-6292252.jpeg?auto=compress&cs=tinysrgb&w=800',
      colors: ['White', 'Black'],
      sizes: ['11oz', '15oz']
    }
  ];
  
  $: filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);
    
  function addToCart(product) {
    cartItems = [...cartItems, { ...product, quantity: 1 }];
  }
</script>

<svelte:head>
  <title>Merchandise Store - FlourishTalents</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
        Merchandise Store
      </h1>
      <p class="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
        Show your FlourishTalents pride with premium branded merchandise. 
        From professional gear to lifestyle accessories, find everything you need to represent our community.
      </p>
    </div>
  </section>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Category Filter -->
    <div class="flex flex-wrap gap-4 mb-12 justify-center">
      {#each categories as category}
        <button
          on:click={() => activeCategory = category.id}
          class="px-6 py-3 rounded-lg font-medium transition duration-200 {
            activeCategory === category.id 
              ? 'bg-primary-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
          }"
        >
          {category.name}
        </button>
      {/each}
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {#each filteredProducts as product}
        <div class="card overflow-hidden group">
          <div class="aspect-square overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
            
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-primary-600">${product.price}</span>
              <span class="text-sm text-gray-500 capitalize">{product.category}</span>
            </div>
            
            <!-- Color Options -->
            <div class="mb-4">
              <p class="text-sm text-gray-700 mb-2">Colors:</p>
              <div class="flex space-x-2">
                {#each product.colors as color}
                  <button class="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-primary-600 transition duration-200"
                    style="background-color: {color.toLowerCase() === 'white' ? '#ffffff' : color.toLowerCase() === 'black' ? '#000000' : color.toLowerCase() === 'navy' ? '#1e3a8a' : color.toLowerCase() === 'gray' ? '#6b7280' : color.toLowerCase() === 'brown' ? '#92400e' : color.toLowerCase() === 'burgundy' ? '#7c2d12' : '#6b7280'}"
                    title={color}
                  ></button>
                {/each}
              </div>
            </div>
            
            <!-- Size Options -->
            <div class="mb-4">
              <p class="text-sm text-gray-700 mb-2">Sizes:</p>
              <div class="flex flex-wrap gap-2">
                {#each product.sizes as size}
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:border-primary-600 hover:text-primary-600 transition duration-200">
                    {size}
                  </button>
                {/each}
              </div>
            </div>
            
            <button 
              on:click={() => addToCart(product)}
              class="btn-primary w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      {/each}
    </div>

    <!-- Features Section -->
    <section class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="card p-8 text-center">
        <div class="text-4xl mb-4">🚚</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">Free Shipping</h3>
        <p class="text-gray-600">Free delivery on orders over $75 within Nigeria</p>
      </div>
      
      <div class="card p-8 text-center">
        <div class="text-4xl mb-4">🔄</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">Easy Returns</h3>
        <p class="text-gray-600">30-day return policy for all merchandise</p>
      </div>
      
      <div class="card p-8 text-center">
        <div class="text-4xl mb-4">🎨</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">Custom Design</h3>
        <p class="text-gray-600">Personalize your items with custom prints and designs</p>
      </div>
    </section>
  </div>

  <!-- Cart Notification -->
  {#if cartItems.length > 0}
    <div class="fixed bottom-4 right-4 bg-primary-600 text-white p-4 rounded-lg shadow-lg">
      <p class="font-medium">{cartItems.length} item(s) in cart</p>
      <button class="mt-2 bg-white text-primary-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition duration-200">
        View Cart
      </button>
    </div>
  {/if}
</div>