<script>
    import {obj} from '$lib/store.js';
    import { page } from '$app/stores';
    import MangaShowcase from '$lib/MangaShowcase.svelte';
    let meta;
    obj.subscribe(value => { meta=value;});
    let x = meta['0'].manga_titles;
    let cdncdn=meta['0'].cdn;
    let cdncdn1=meta['0'].cdn1;
    let y=[]
    let match=$page.params.slug
    x.forEach((el,i) => {
        if(el.Status.includes(match))
        {y.push(el);}
        
    });

    
    </script>
    <div style="margin-top:20px;font-weight: bold;font-size: 2rem;">{match} Manga</div>
    {#if (y.length!=0)}
    <MangaShowcase x={y} cdncdn={cdncdn} cdncdn1={cdncdn1}/>
    {:else}
    <div style="font-size: 1.5rem;font-weight:bold;margin-top:10vh;">No Manga Found</div>
    {/if}
   
    <svelte:head>
    <title>{match} Archives - Bilingual Manga</title>
    {@html meta[0].inhtml['metades']}
    </svelte:head>
    
    <style></style>