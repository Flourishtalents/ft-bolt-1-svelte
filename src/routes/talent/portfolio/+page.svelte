<script lang="ts">
  import { user, isAuthenticated } from '$lib/stores/auth';
  import { portfolioStore, currentPortfolio } from '$lib/stores/portfolio';
  import { onMount } from 'svelte';
  import { Camera, Edit, Save, X, Plus, MapPin, Phone, Mail, Globe, Instagram, Twitter, Linkedin, Award, Briefcase } from 'lucide-svelte';
  
  let showCreateForm = false;
  let isEditing = false;
  let userPortfolio: any = null;
  let showSuccessMessage = false;
  
  let formData = {
    name: '',
    title: '',
    bio: '',
    skills: '',
    experience: '',
    location: '',
    phone: '',
    email: '',
    website: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    achievements: '',
    availability: true,
    rate: '',
    categories: ''
  };
  
  onMount(() => {
    portfolioStore.load();
    
    if ($user) {
      userPortfolio = portfolioStore.getByUserId($user.id);
      
      if (userPortfolio) {
        populateForm();
      }
    }
  });
  
  function populateForm() {
    if (userPortfolio) {
      formData = {
        name: userPortfolio.name,
        title: userPortfolio.title,
        bio: userPortfolio.bio,
        skills: userPortfolio.skills.join(', '),
        experience: userPortfolio.experience,
        location: userPortfolio.location,
        phone: userPortfolio.phone,
        email: userPortfolio.email,
        website: userPortfolio.website || '',
        instagram: userPortfolio.socialMedia.instagram || '',
        twitter: userPortfolio.socialMedia.twitter || '',
        linkedin: userPortfolio.socialMedia.linkedin || '',
        achievements: userPortfolio.achievements.join(', '),
        availability: userPortfolio.availability,
        rate: userPortfolio.rate,
        categories: userPortfolio.categories.join(', ')
      };
    }
  }
  
  function handleSubmit() {
    if (!$user) return;
    
    const portfolioData = {
      userId: $user.id,
      name: formData.name,
      title: formData.title,
      bio: formData.bio,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      experience: formData.experience,
      location: formData.location,
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      socialMedia: {
        instagram: formData.instagram,
        twitter: formData.twitter,
        linkedin: formData.linkedin
      },
      images: [
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181448/pexels-photo-1181448.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      videos: [],
      achievements: formData.achievements.split(',').map(s => s.trim()).filter(s => s),
      availability: formData.availability,
      rate: formData.rate,
      categories: formData.categories.split(',').map(s => s.trim()).filter(s => s)
    };
    
    if (userPortfolio && isEditing) {
      portfolioStore.update(userPortfolio.id, portfolioData);
    } else {
      portfolioStore.create(portfolioData);
    }
    
    userPortfolio = portfolioStore.getByUserId($user.id);
    showCreateForm = false;
    isEditing = false;
    showSuccessMessage = true;
    
    setTimeout(() => {
      showSuccessMessage = false;
    }, 3000);
  }
  
  function startEditing() {
    populateForm();
    isEditing = true;
    showCreateForm = true;
  }
  
  function addImageSlot() {
    if (userPortfolio && userPortfolio.images.length < 6) {
      const updatedImages = [...userPortfolio.images, 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800'];
      portfolioStore.update(userPortfolio.id, { images: updatedImages });
      userPortfolio = portfolioStore.getByUserId($user.id);
    }
  }
</script>

<svelte:head>
  <title>Portfolio - FlourishTalents</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Success Message -->
    {#if showSuccessMessage}
      <div class="fixed top-24 right-4 bg-secondary-600 text-white p-6 rounded-xl shadow-2xl z-50 transform transition-all duration-500">
        <div class="flex items-center space-x-3">
          <Save class="w-6 h-6" />
          <div>
            <p class="font-semibold">Portfolio {userPortfolio ? 'Updated' : 'Created'} Successfully!</p>
            <p class="text-sm opacity-90">Your portfolio is now live and visible to clients.</p>
          </div>
        </div>
      </div>
    {/if}

    {#if !userPortfolio && !showCreateForm}
      <!-- No Portfolio State -->
      <div class="text-center py-20">
        <div class="max-w-2xl mx-auto">
          <div class="h-32 w-32 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Briefcase class="h-16 w-16 text-white" />
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Create Your Portfolio</h1>
          <p class="text-xl text-gray-600 mb-10 leading-relaxed">Showcase your talents and connect with amazing opportunities. Build a stunning portfolio that represents your unique creative abilities and attracts the right clients.</p>
          <button 
            on:click={() => showCreateForm = true}
            class="btn-primary text-xl px-10 py-5 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            Create Portfolio
          </button>
        </div>
      </div>
    {:else if showCreateForm}
      <!-- Portfolio Creation/Edit Form -->
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {isEditing ? 'Edit Your Portfolio' : 'Create Your Portfolio'}
          </h1>
          <p class="text-xl text-gray-600">Fill in your details to create a stunning professional portfolio</p>
        </div>

        <form on:submit|preventDefault={handleSubmit} class="card p-10 shadow-2xl">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Basic Information -->
            <div class="lg:col-span-2">
              <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                  <Camera class="w-4 h-4 text-white" />
                </div>
                Basic Information
              </h3>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
              <input type="text" bind:value={formData.name} class="input-field" required />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Professional Title</label>
              <input type="text" bind:value={formData.title} class="input-field" placeholder="e.g., Professional Model, Actor, Musician" required />
            </div>
            
            <div class="lg:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Bio</label>
              <textarea bind:value={formData.bio} rows="5" class="input-field" placeholder="Tell us about yourself, your passion, and what makes you unique..."></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Skills & Specialties</label>
              <input type="text" bind:value={formData.skills} class="input-field" placeholder="Acting, Modeling, Dancing, etc. (comma separated)" />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Categories</label>
              <input type="text" bind:value={formData.categories} class="input-field" placeholder="Fashion, Commercial, Theatre, etc. (comma separated)" />
            </div>

            <!-- Contact Information -->
            <div class="lg:col-span-2 mt-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div class="w-8 h-8 bg-secondary-600 rounded-lg flex items-center justify-center mr-3">
                  <Phone class="w-4 h-4 text-white" />
                </div>
                Contact Information
              </h3>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Email</label>
              <input type="email" bind:value={formData.email} class="input-field" required />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Phone</label>
              <input type="tel" bind:value={formData.phone} class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Location</label>
              <input type="text" bind:value={formData.location} class="input-field" placeholder="City, Country" />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Website</label>
              <input type="url" bind:value={formData.website} class="input-field" placeholder="https://yourwebsite.com" />
            </div>

            <!-- Social Media -->
            <div class="lg:col-span-2 mt-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div class="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center mr-3">
                  <Instagram class="w-4 h-4 text-white" />
                </div>
                Social Media
              </h3>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Instagram</label>
              <input type="text" bind:value={formData.instagram} class="input-field" placeholder="@username" />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Twitter</label>
              <input type="text" bind:value={formData.twitter} class="input-field" placeholder="@username" />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">LinkedIn</label>
              <input type="text" bind:value={formData.linkedin} class="input-field" placeholder="username" />
            </div>

            <!-- Professional Details -->
            <div class="lg:col-span-2 mt-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Briefcase class="w-4 h-4 text-white" />
                </div>
                Professional Details
              </h3>
            </div>
            
            <div class="lg:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Experience</label>
              <textarea bind:value={formData.experience} rows="4" class="input-field" placeholder="Describe your professional experience..."></textarea>
            </div>
            
            <div class="lg:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Achievements</label>
              <textarea bind:value={formData.achievements} rows="3" class="input-field" placeholder="Awards, recognitions, notable projects (comma separated)"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Rate</label>
              <input type="text" bind:value={formData.rate} class="input-field" placeholder="e.g., $500/day, Negotiable" />
            </div>
            
            <div class="flex items-center space-x-3">
              <input type="checkbox" bind:checked={formData.availability} class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-5 h-5" />
              <label class="text-sm font-semibold text-gray-700">Available for new projects</label>
            </div>
          </div>

          <div class="mt-12 flex justify-end space-x-6">
            <button 
              type="button" 
              on:click={() => { showCreateForm = false; isEditing = false; }}
              class="btn-secondary px-8 py-4 flex items-center space-x-2"
            >
              <X class="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button type="submit" class="btn-primary px-8 py-4 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Save class="w-4 h-4" />
              <span>{isEditing ? 'Update Portfolio' : 'Create Portfolio'}</span>
            </button>
          </div>
        </form>
      </div>
    {:else if userPortfolio}
      <!-- Portfolio Display -->
      <div class="max-w-7xl mx-auto">
        <!-- Portfolio Header -->
        <div class="card p-10 mb-8 shadow-2xl">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
            <div class="flex items-center space-x-8 mb-6 lg:mb-0">
              <div class="h-32 w-32 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <span class="text-white font-bold text-4xl">{userPortfolio.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <h1 class="text-4xl font-bold text-gray-900 mb-2">{userPortfolio.name}</h1>
                <p class="text-2xl text-primary-600 font-semibold mb-3">{userPortfolio.title}</p>
                <div class="flex flex-wrap items-center gap-6 text-gray-600">
                  <span class="flex items-center space-x-2">
                    <MapPin class="w-4 h-4" />
                    <span>{userPortfolio.location}</span>
                  </span>
                  <span class="flex items-center space-x-2">
                    <span class="text-green-600">💰</span>
                    <span>{userPortfolio.rate}</span>
                  </span>
                  {#if userPortfolio.availability}
                    <span class="bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-semibold">Available</span>
                  {/if}
                </div>
              </div>
            </div>
            <button on:click={startEditing} class="btn-primary px-8 py-4 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Edit class="w-4 h-4" />
              <span>Edit Portfolio</span>
            </button>
          </div>
          
          <p class="text-gray-700 leading-relaxed mb-8 text-lg">{userPortfolio.bio}</p>
          
          <div class="flex flex-wrap gap-3">
            {#each userPortfolio.skills as skill}
              <span class="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold">{skill}</span>
            {/each}
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Portfolio Gallery -->
          <div class="lg:col-span-2">
            <div class="card p-8 shadow-xl">
              <h2 class="text-3xl font-bold text-gray-900 mb-8">Portfolio Gallery</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                {#each userPortfolio.images as image, index}
                  <div class="aspect-square rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-2xl group">
                    <img src={image} alt="Portfolio {index + 1}" class="w-full h-full object-cover" />
                  </div>
                {/each}
                {#if userPortfolio.images.length < 6}
                  <button 
                    on:click={addImageSlot}
                    class="aspect-square rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary-500 flex items-center justify-center group transition-all duration-300 hover:bg-primary-50"
                  >
                    <Plus class="w-8 h-8 text-gray-400 group-hover:text-primary-500" />
                  </button>
                {/if}
              </div>
            </div>
          </div>

          <!-- Contact & Details -->
          <div class="space-y-8">
            <!-- Contact Info -->
            <div class="card p-8 shadow-xl">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <Mail class="w-5 h-5 text-primary-600" />
                  <span class="text-gray-700 font-medium">{userPortfolio.email}</span>
                </div>
                <div class="flex items-center space-x-4">
                  <Phone class="w-5 h-5 text-primary-600" />
                  <span class="text-gray-700 font-medium">{userPortfolio.phone}</span>
                </div>
                {#if userPortfolio.website}
                  <div class="flex items-center space-x-4">
                    <Globe class="w-5 h-5 text-primary-600" />
                    <a href={userPortfolio.website} target="_blank" class="text-primary-600 hover:text-primary-700 font-semibold">Visit Website</a>
                  </div>
                {/if}
              </div>
            </div>

            <!-- Social Media -->
            <div class="card p-8 shadow-xl">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Social Media</h3>
              <div class="space-y-4">
                {#if userPortfolio.socialMedia.instagram}
                  <a href="https://instagram.com/{userPortfolio.socialMedia.instagram}" target="_blank" class="flex items-center space-x-4 text-gray-700 hover:text-primary-600 transition-colors duration-300">
                    <Instagram class="w-5 h-5" />
                    <span class="font-medium">Instagram</span>
                  </a>
                {/if}
                {#if userPortfolio.socialMedia.twitter}
                  <a href="https://twitter.com/{userPortfolio.socialMedia.twitter}" target="_blank" class="flex items-center space-x-4 text-gray-700 hover:text-primary-600 transition-colors duration-300">
                    <Twitter class="w-5 h-5" />
                    <span class="font-medium">Twitter</span>
                  </a>
                {/if}
                {#if userPortfolio.socialMedia.linkedin}
                  <a href="https://linkedin.com/in/{userPortfolio.socialMedia.linkedin}" target="_blank" class="flex items-center space-x-4 text-gray-700 hover:text-primary-600 transition-colors duration-300">
                    <Linkedin class="w-5 h-5" />
                    <span class="font-medium">LinkedIn</span>
                  </a>
                {/if}
              </div>
            </div>

            <!-- Achievements -->
            {#if userPortfolio.achievements.length > 0}
              <div class="card p-8 shadow-xl">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">Achievements</h3>
                <ul class="space-y-3">
                  {#each userPortfolio.achievements as achievement}
                    <li class="text-gray-700 flex items-start space-x-3">
                      <Award class="w-5 h-5 text-accent-600 mt-1 flex-shrink-0" />
                      <span class="font-medium">{achievement}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}

            <!-- Experience -->
            <div class="card p-8 shadow-xl">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Experience</h3>
              <p class="text-gray-700 leading-relaxed">{userPortfolio.experience}</p>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
