<script lang="ts">
  import { user, isAuthenticated, authStore } from '../stores/auth';
  import { onMount } from 'svelte';
  import { page, navigate } from '../stores/router';
  import { Menu, X, ChevronDown, User, Settings, Bell, LogOut } from 'lucide-svelte';
  
  let showMobileMenu = false;
  let showUserMenu = false;
  let showTalentDropdown = false;
  let showCommunityDropdown = false;
  
  onMount(() => {
    authStore.init();
  });
  
  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Talent', 
      href: '/talent',
      dropdown: [
        { name: 'Discovery', href: '/talent/discovery' },
        { name: 'Portfolio', href: '/talent/portfolio' },
        { name: 'MasterClass', href: '/talent/masterclass' },
        { name: 'Awards', href: '/talent/awards' },
        { name: 'Projects', href: '/talent/projects' }
      ]
    },
    { name: 'Media', href: '/media' },
    { name: 'Agency', href: '/agency' },
    { 
      name: 'Community', 
      href: '/community',
      dropdown: [
        { name: 'FlourishTalents Club', href: '/community/club' },
        { name: 'Membership Portal', href: '/community/membership' },
        { name: 'Merchandise', href: '/community/merchandise' }
      ]
    }
  ];
  
  const handleLogout = async () => {
    await authStore.logout();
    showUserMenu = false;
  };

  // Close dropdowns when clicking outside
  function handleClickOutside() {
    showUserMenu = false;
    showTalentDropdown = false;
    showCommunityDropdown = false;
  }
</script>

<svelte:window on:click={handleClickOutside} />

<header class="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-20">
      <!-- Logo -->
      <div class="flex items-center">
        <button on:click={() => navigate('/')} class="flex-shrink-0 flex items-center group">
          <div class="h-12 w-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
            <span class="text-white font-bold text-xl">FT</span>
          </div>
          <span class="ml-3 text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">FlourishTalents</span>
        </button>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center space-x-8">
        {#each navigation as item}
          <div class="relative group">
            <button 
              class="text-gray-700 hover:text-primary-600 px-4 py-2 text-sm font-semibold transition duration-300 rounded-lg hover:bg-primary-50 flex items-center space-x-1 {$page.url.pathname === item.href ? 'text-primary-600 bg-primary-50' : ''}"
              on:click|stopPropagation={() => {
                if (item.name === 'Talent') showTalentDropdown = !showTalentDropdown;
                else if (item.name === 'Community') showCommunityDropdown = !showCommunityDropdown;
                else navigate(item.href);
              }}
            >
              <span>{item.name}</span>
              {#if item.dropdown}
                <ChevronDown class="w-4 h-4" />
              {/if}
            </button>
            
            {#if item.dropdown && ((item.name === 'Talent' && showTalentDropdown) || (item.name === 'Community' && showCommunityDropdown))}
              <div class="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-100 visible transition-all duration-200 z-50">
                <div class="py-3">
                  {#each item.dropdown as subItem}
                    <button
                      on:click={() => { navigate(subItem.href); showTalentDropdown = false; showCommunityDropdown = false; }}
                      class="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition duration-200 font-medium"
                    >
                      {subItem.name}
                    </button>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Auth Buttons / User Menu -->
      <div class="hidden lg:flex items-center space-x-4">
        {#if $isAuthenticated && $user}
          <div class="relative">
            <button
              on:click|stopPropagation={() => showUserMenu = !showUserMenu}
              class="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition duration-300 bg-gray-50 hover:bg-primary-50 rounded-xl px-4 py-2"
            >
              <div class="h-10 w-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center shadow-md">
                <span class="text-white text-sm font-bold">{$user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div class="text-left">
                <div class="text-sm font-semibold">{$user.name}</div>
                <div class="text-xs text-gray-500 capitalize">{$user.type}</div>
              </div>
              <ChevronDown class="w-4 h-4" />
            </button>
            
            {#if showUserMenu}
              <div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                <div class="py-3">
                  <div class="px-6 py-2 border-b border-gray-100">
                    <p class="text-sm font-semibold text-gray-900">{$user.name}</p>
                    <p class="text-xs text-gray-500">{$user.email}</p>
                  </div>
                  <button on:click={() => { navigate('/profile'); showUserMenu = false; }} class="flex items-center w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition duration-200">
                    <User class="w-4 h-4 mr-3" />
                    Profile
                  </button>
                  <button on:click={() => { navigate('/settings'); showUserMenu = false; }} class="flex items-center w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition duration-200">
                    <Settings class="w-4 h-4 mr-3" />
                    Settings
                  </button>
                  <button on:click={() => { navigate('/notifications'); showUserMenu = false; }} class="flex items-center w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition duration-200">
                    <Bell class="w-4 h-4 mr-3" />
                    Notifications
                  </button>
                  <div class="border-t border-gray-100 mt-2 pt-2">
                    <button 
                      on:click={handleLogout}
                      class="flex items-center w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-200"
                    >
                      <LogOut class="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        {:else}
          <button on:click={() => navigate('/auth/login')} class="text-gray-700 hover:text-primary-600 font-semibold transition duration-300 px-4 py-2 rounded-lg hover:bg-primary-50">Sign In</button>
          <button on:click={() => navigate('/auth/register')} class="btn-primary shadow-lg hover:shadow-xl">Get Started</button>
        {/if}
      </div>

      <!-- Mobile menu button -->
      <div class="lg:hidden flex items-center">
        <button
          on:click={() => showMobileMenu = !showMobileMenu}
          class="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600 transition duration-300 p-2 rounded-lg hover:bg-primary-50"
        >
          {#if showMobileMenu}
            <X class="h-6 w-6" />
          {:else}
            <Menu class="h-6 w-6" />
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    {#if showMobileMenu}
      <div class="lg:hidden bg-white border-t border-gray-100 shadow-lg">
        <div class="px-4 pt-4 pb-6 space-y-2">
          {#each navigation as item}
            <div>
              <button
                on:click={() => { navigate(item.href); showMobileMenu = false; }}
                class="block w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition duration-300"
              >
                {item.name}
              </button>
              {#if item.dropdown}
                <div class="ml-4 mt-2 space-y-1">
                  {#each item.dropdown as subItem}
                    <button
                      on:click={() => { navigate(subItem.href); showMobileMenu = false; }}
                      class="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition duration-200"
                    >
                      {subItem.name}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
        
        <div class="pt-4 pb-6 border-t border-gray-100 bg-gray-50">
          {#if $isAuthenticated && $user}
            <div class="flex items-center px-6 mb-4">
              <div class="h-12 w-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center shadow-md">
                <span class="text-white font-bold">{$user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div class="ml-4">
                <div class="text-base font-semibold text-gray-800">{$user.name}</div>
                <div class="text-sm text-gray-500">{$user.email}</div>
              </div>
            </div>
            <div class="space-y-1 px-4">
              <button on:click={() => { navigate('/profile'); showMobileMenu = false; }} class="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white rounded-lg transition duration-200">Profile</button>
              <button on:click={() => { navigate('/settings'); showMobileMenu = false; }} class="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white rounded-lg transition duration-200">Settings</button>
              <button 
                on:click={handleLogout}
                class="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-white rounded-lg transition duration-200"
              >
                Sign Out
              </button>
            </div>
          {:else}
            <div class="space-y-2 px-4">
              <button on:click={() => { navigate('/auth/login'); showMobileMenu = false; }} class="block w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary-600 hover:bg-white rounded-lg transition duration-200">Sign In</button>
              <button on:click={() => { navigate('/auth/register'); showMobileMenu = false; }} class="block w-full px-4 py-3 text-base font-semibold bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition duration-200 text-center">Get Started</button>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </nav>
</header>
