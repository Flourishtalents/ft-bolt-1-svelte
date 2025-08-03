<script lang="ts">
  console.log('App.svelte is loading');
</script>

<div class="min-h-screen bg-blue-500 text-white p-8">
  <h1 class="text-4xl font-bold">TEST: Tailwind is working!</h1>
  <p class="text-xl mt-4">If you see this styled text, the basic setup is working.</p>
</div>

<style>
  /* Fallback styles in case Tailwind fails */
  div {
    background: blue;
    color: white;
    padding: 20px;
    min-height: 100vh;
  }
</style>
