<script lang="ts">
  import { authStore } from '../../lib/stores/auth';
  import { navigate } from '../../lib/stores/router';
  import { Eye, EyeOff } from 'lucide-svelte';
  
  let formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'talent' as 'talent' | 'client' | 'agency'
  };
  
  let isLoading = false;
  let errors: string[] = [];
  let showPassword = false;
  let showConfirmPassword = false;
  
  async function handleSubmit() {
    errors = [];
    
    if (!formData.name || !formData.email || !formData.password) {
      errors = ['Please fill in all fields'];
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors = ['Passwords do not match'];
      return;
    }
    
    if (formData.password.length < 6) {
      errors = ['Password must be at least 6 characters'];
      return;
    }
    
    isLoading = true;
    
    const result = await authStore.register(formData.email, formData.password, formData.name, formData.type);
    
    if (result.success) {
      // Redirect based on user type
      if (formData.type === 'talent') {
        navigate('/talent/portfolio');
      } else if (formData.type === 'client') {
        navigate('/client/dashboard');
      } else {
        navigate('/agency/dashboard');
      }
    } else {
      errors = [result.error || 'Registration failed'];
    }
    
    isLoading = false;
  }

</script>

<svelte:head>
  <title>Join FlourishTalents - Create Your Account</title>
</svelte:head>

<div class="card p-10 w-full max-w-lg mx-4 shadow-2xl">
  <div class="text-center mb-10">
    <div class="h-16 w-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
      <span class="text-white font-bold text-2xl">FT</span>
    </div>
    <h2 class="text-3xl font-bold text-gray-900 mb-2">Join FlourishTalents</h2>
    <p class="text-gray-600">Create your account and start your creative journey</p>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    {#if errors.length > 0}
      <div class="bg-red-50 border border-red-200 rounded-xl p-4">
        {#each errors as error}
          <p class="text-red-600 text-sm font-medium">{error}</p>
        {/each}
      </div>
    {/if}

    <div>
      <label for="name" class="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
      <input
        type="text"
        id="name"
        bind:value={formData.name}
        class="input-field"
        placeholder="Enter your full name"
        required
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
      <input
        type="email"
        id="email"
        bind:value={formData.email}
        class="input-field"
        placeholder="Enter your email"
        required
      />
    </div>

    <div>
      <label for="type" class="block text-sm font-semibold text-gray-700 mb-3">Account Type</label>
      <select bind:value={formData.type} class="input-field" required>
        <option value="talent">Talent (Model, Actor, Artist, etc.)</option>
        <option value="client">Client (Brand, Company)</option>
        <option value="agency">Agency (Marketing, Advertising)</option>
      </select>
    </div>

    <div>
      <label for="password" class="block text-sm font-semibold text-gray-700 mb-3">Password</label>
      <div class="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          bind:value={formData.password}
          class="input-field pr-12"
          placeholder="Create a password"
          required
        />
        <button
          type="button"
          on:click={() => showPassword = !showPassword}
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {#if showPassword}
            <EyeOff class="w-5 h-5" />
          {:else}
            <Eye class="w-5 h-5" />
          {/if}
        </button>
      </div>
    </div>

    <div>
      <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-3">Confirm Password</label>
      <div class="relative">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          bind:value={formData.confirmPassword}
          class="input-field pr-12"
          placeholder="Confirm your password"
          required
        />
        <button
          type="button"
          on:click={() => showConfirmPassword = !showConfirmPassword}
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {#if showConfirmPassword}
            <EyeOff class="w-5 h-5" />
          {:else}
            <Eye class="w-5 h-5" />
          {/if}
        </button>
      </div>
    </div>

    <button
      type="submit"
      disabled={isLoading}
      class="btn-primary w-full text-lg py-4 shadow-lg hover:shadow-xl {isLoading ? 'opacity-50 cursor-not-allowed' : ''}"
    >
      {isLoading ? 'Creating Account...' : 'Create Account'}
    </button>
  </form>

  <div class="mt-8 text-center">
    <p class="text-gray-600">
      Already have an account?
      <button type="button" on:click={() => navigate('/auth/login')} class="text-primary-600 hover:text-primary-700 font-semibold">Sign in</button>
    </p>
  </div>
</div>
