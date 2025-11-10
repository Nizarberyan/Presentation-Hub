<script lang="ts">
  import { onMount } from 'svelte';
  
  let presentations: any[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch('/api/presentations');
      presentations = await response.json();
    } catch (error) {
      console.error('Error loading presentations:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Presentation Hub</title>
</svelte:head>

<main class="container">
  <h1>Presentation Hub</h1>
  
  {#if loading}
    <p>Loading presentations...</p>
  {:else if presentations.length === 0}
    <p>No presentations found.</p>
  {:else}
    <div class="presentations">
      {#each presentations as presentation}
        <div class="presentation-card">
          <h3>{presentation.titre}</h3>
          <p><strong>Binôme:</strong> {presentation.binome}</p>
          <p><strong>Date:</strong> {presentation.date}</p>
          <p><strong>Status:</strong> {presentation.status}</p>
          <p>{presentation.description}</p>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .presentations {
    display: grid;
    gap: 1rem;
  }
  
  .presentation-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: #f9f9f9;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>