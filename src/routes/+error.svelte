<script>

  import { onMount } from 'svelte'
  onMount(() => {
    if(location.href!="/"){
    location.href="/";}
  });
</script>
<h1>
    We have an Error   
</h1>
<h2>
  Redirecting to Home.... 
</h2>
<svelte:head>
<title>Error - Bilingual Manga</title>
</svelte:head>
