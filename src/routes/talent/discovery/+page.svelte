<script lang="ts">
  let searchQuery = '';
  let selectedCategory = 'all';
  let selectedLocation = 'all';
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'models', name: 'Models' },
    { id: 'actors', name: 'Actors & Actresses' },
    { id: 'musicians', name: 'Musicians' },
    { id: 'dancers', name: 'Dancers' },
    { id: 'influencers', name: 'Influencers' },
    { id: 'photographers', name: 'Photographers' },
    { id: 'designers', name: 'Designers' }
  ];
  
  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'lagos', name: 'Lagos, Nigeria' },
    { id: 'abuja', name: 'Abuja, Nigeria' },
    { id: 'london', name: 'London, UK' },
    { id: 'newyork', name: 'New York, USA' },
    { id: 'paris', name: 'Paris, France' }
  ];
  
  const talents = [
    {
      id: 1,
      name: 'Adaora Okafor',
      title: 'Fashion Model & Brand Ambassador',
      location: 'Lagos, Nigeria',
      category: 'models',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      projects: 25,
      rate: '$500/day',
      skills: ['Runway Modeling', 'Commercial Photography', 'Brand Campaigns'],
      available: true
    },
    {
      id: 2,
      name: 'James Thompson',
      title: 'Actor & Voice Artist',
      location: 'London, UK',
      category: 'actors',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      projects: 18,
      rate: '$750/day',
      skills: ['Theatre', 'Film Acting', 'Voice Over', 'Commercials'],
      available: true
    },
    {
      id: 3,
      name: 'Sofia Rodriguez',
      title: 'Music Artist & Performer',
      location: 'Lagos, Nigeria',
      category: 'musicians',
      image: 'https://images.pexels.com/photos/1181448/pexels-photo-1181448.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      projects: 32,
      rate: '$1200/event',
      skills: ['Live Performance', 'Recording', 'Songwriting', 'Music Production'],
      available: false
    },
    {
      id: 4,
      name: 'Michael Chen',
      title: 'Creative Photographer',
      location: 'New York, USA',
      category: 'photographers',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      projects: 41,
      rate: '$800/session',
      skills: ['Portrait Photography', 'Event Photography', 'Product Photography', 'Post-Production'],
      available: true
    },
    {
      id: 5,
      name: 'Isabella Martinez',
      title: 'Contemporary Dancer',
      location: 'Paris, France',
      category: 'dancers',
      image: 'https://images.pexels.com/photos/1701194/pexels-photo-1701194.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      projects: 22,
      rate: '$600/performance',
      skills: ['Contemporary Dance', 'Choreography', 'Teaching', 'Performance Art'],
      available: true
    },
    {
      id: 6,
      name: 'David Kim',
      title: 'Social Media Influencer',
      location: 'Abuja, Nigeria',
      category: 'influencers',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      projects: 15,
      rate: '$300/post',
      skills: ['Content Creation', 'Brand Partnerships', 'Social Media Strategy', 'Video Production'],
      available: true
    }
  ];
  
  $: filteredTalents = talents.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         talent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || talent.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || talent.location.toLowerCase().includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });
</script>

<svelte:head>
  <title>Discover Talents - FlourishTalents</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
        Discover Amazing Talents
      </h1>
      <p class="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
        Connect with exceptional creative professionals across entertainment, media, and marketing. 
        Find the perfect talent for your next project.
      </p>
    </div>
  </section>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Search and Filters -->
    <div class="card p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Talents</label>
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search by name, skills, or title..."
            class="input-field"
          />
        </div>
        
        <!-- Category Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select bind:value={selectedCategory} class="input-field">
            {#each categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>
        
        <!-- Location Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select bind:value={selectedLocation} class="input-field">
            {#each locations as location}
              <option value={location.id}>{location.name}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div class="mb-6">
      <p class="text-gray-600">
        Showing {filteredTalents.length} talent{filteredTalents.length !== 1 ? 's' : ''}
        {searchQuery ? `for "${searchQuery}"` : ''}
      </p>
    </div>

    <!-- Talents Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each filteredTalents as talent}
        <div class="card overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
          <div class="aspect-square overflow-hidden">
            <img 
              src={talent.image} 
              alt={talent.name}
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold text-gray-900">{talent.name}</h3>
              {#if talent.available}
                <span class="w-3 h-3 bg-secondary-500 rounded-full" title="Available"></span>
              {:else}
                <span class="w-3 h-3 bg-gray-400 rounded-full" title="Unavailable"></span>
              {/if}
            </div>
            
            <p class="text-primary-600 font-medium mb-2">{talent.title}</p>
            
            <div class="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span>📍 {talent.location}</span>
              <div class="flex items-center space-x-1">
                <span class="text-yellow-400">⭐</span>
                <span>{talent.rating}</span>
              </div>
            </div>
            
            <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>{talent.projects} projects</span>
              <span class="font-semibold text-gray-900">{talent.rate}</span>
            </div>
            
            <!-- Skills -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-1">
                {#each talent.skills.slice(0, 3) as skill}
                  <span class="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                    {skill}
                  </span>
                {/each}
                {#if talent.skills.length > 3}
                  <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{talent.skills.length - 3} more
                  </span>
                {/if}
              </div>
            </div>
            
            <div class="flex space-x-2">
              <button class="btn-primary flex-1 text-sm py-2">
                View Profile
              </button>
              <button class="btn-secondary flex-1 text-sm py-2">
                Contact
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredTalents.length === 0}
      <div class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No talents found</h3>
        <p class="text-gray-600">Try adjusting your search criteria or browse all talents.</p>
        <button 
          on:click={() => {
            searchQuery = '';
            selectedCategory = 'all';
            selectedLocation = 'all';
          }}
          class="btn-primary mt-4"
        >
          Clear Filters
        </button>
      </div>
    {/if}
  </div>
</div>