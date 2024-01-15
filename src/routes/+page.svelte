<script>
import {obj} from '$lib/store.js';
import MangaShowcase from '$lib/MangaShowcase.svelte';
let meta;
obj.subscribe(value => { meta=value;});
let x = meta['0'].manga_titles;
let cdncdn=meta['0'].cdn;
let cdncdn1=meta['0'].cdn1;
</script>
<div>All Manga</div>
<MangaShowcase x={x} cdncdn={cdncdn} cdncdn1={cdncdn1}/>
<svelte:head>
<title>Home - Bilingual Manga</title>
{@html meta[0].inhtml['metades']}
</svelte:head>
<style>
div{
    margin-top:20px;
    font-weight: bold;
    font-size: 2rem;
}

</style>
