<script lang="ts">
  import { authStore } from '../../lib/stores/auth';
  import { navigate } from '../../lib/stores/router';
  import { Eye, EyeOff } from 'lucide-svelte';
  
  let formData = {
    email: '',
    password: ''
  };
  
  let isLoading = false;
  let errors: string[] = [];
  let showPassword = false;
  
  async function handleSubmit() {
    errors = [];
    
    if (!formData.email || !formData.password) {
      errors = ['Please fill in all fields'];
      return;
    }
    
    isLoading = true;
    
    const result = await authStore.login(formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      errors = [result.error || 'Login failed'];
    }
    
    isLoading = false;
  }

  async function handleAnonymousLogin() {
    isLoading = true;
    const result = await authStore.loginAnonymously();

    if (result.success) {
      navigate('/');
    } else {
      errors = [result.error || 'Anonymous login failed'];
    }
    
    isLoading = false;
  }
</script>

<svelte:head>
  <title>Sign In - FlourishTalents</title>
</svelte:head>

<div class="card p-10 w-full max-w-md mx-4 shadow-2xl">
  <div class="text-center mb-10">
    <div class="h-16 w-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
      <span class="text-white font-bold text-2xl">FT</span>
    </div>
    <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
    <p class="text-gray-600">Sign in to your FlourishTalents account</p>
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
      <label for="password" class="block text-sm font-semibold text-gray-700 mb-3">Password</label>
      <div class="relative">
        {#if showPassword}
          <input
            type="text"
            id="password"
            bind:value={formData.password}
            class="input-field pr-12"
            placeholder="Enter your password"
            required
          />
        {:else}
          <input
            type="password"
            id="password"
            bind:value={formData.password}
            class="input-field pr-12"
            placeholder="Enter your password"
            required
          />
        {/if}
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

    <div class="flex items-center justify-between">
      <label class="flex items-center">
        <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 shadow-sm" />
        <span class="ml-3 text-sm text-gray-600 font-medium">Remember me</span>
      </label>
      <button type="button" on:click={() => navigate('/auth/forgot-password')} class="text-sm text-primary-600 hover:text-primary-700 font-semibold">
        Forgot password?
      </button>
    </div>

    <button
      type="submit"
      disabled={isLoading}
      class="btn-primary w-full text-lg py-4 shadow-lg hover:shadow-xl {isLoading ? 'opacity-50 cursor-not-allowed' : ''}"
    >
      {isLoading ? 'Signing In...' : 'Sign In'}
    </button>
  </form>

  <div class="mt-8">
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
      </div>
    </div>

    <button
      on:click={handleAnonymousLogin}
      disabled={isLoading}
      class="mt-6 w-full btn-secondary py-4 {isLoading ? 'opacity-50 cursor-not-allowed' : ''}"
    >
      Browse Anonymously
    </button>
  </div>

  <div class="mt-8 text-center">
    <p class="text-gray-600">
      Don't have an account?
      <button type="button" on:click={() => navigate('/auth/register')} class="text-primary-600 hover:text-primary-700 font-semibold">Sign up</button>
    </p>
  </div>
</div>
