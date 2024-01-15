<script>
import {obj} from '$lib/store.js';
let meta;
obj.subscribe(value => { meta=value;});
let cont=meta[0].inhtml.about
</script>
<svelte:head>
<title>About - Bilingual Manga</title>
{@html meta[0].inhtml['metades']}
</svelte:head>
{@html cont}