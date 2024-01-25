<script>
    import Header from '$lib/Header.svelte'
    import '../styles/global.css'
    import {obj} from '$lib/store.js';
    export let data; // this contains manga_metadata (loaded in layout_server.js via db.js)
    obj.set(data); // store.js <-- manga_metadata

</script>
<Header bind:datav={data}/>
<svelte:head>
  <link rel="icon" type="image/png" href="/favicon.png" />
  {@html data[0].inhtml['head']}
</svelte:head>
{@html data[0].inhtml['tracker']}
{@html data[0].inhtml['ad-sp']}
<main>
    <slot />    
</main>



