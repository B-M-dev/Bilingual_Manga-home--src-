<script>
    import MangaMeta from '$lib/MangaMeta.svelte';
    import MangaChSel from '$lib/MangaChSel.svelte';
    import { page } from '$app/stores';
    export let data;    
    export let ll;
    
    export let cdncdn1;
    let chaptersen=data.manga_data.en_data.ch_naen;
    let chaptersjp=data.manga_data.jp_data.ch_najp;

    let volumesen=data.manga_data.en_data.vol_en;
    let volumesjp=data.manga_data.jp_data.vol_jp;
    let url1=`${$page.url}`.split('?')[0]
</script>
{#if data.l==="en"}

<div id="mainimagec" style="background:url({cdncdn1}/{ll.coveren}) no-repeat; background-size: cover;background-position: center;" >
<img src="{cdncdn1}/{ll.coveren}" alt="{ll.coveren}" id="mainimage"/>
<div id="spreads" ></div>
<div id="mainimagetitle">{ll.entit}</div>
</div>
<MangaMeta meta={ll} syn={data.manga_data.syn_en}/>
<div style="text-align: left;margin-left:5.3vw;"><a class="chbtna" href="{url1}?lang=jp" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">JP 🡆</a></div>
<MangaChSel ch={chaptersen} vol={volumesen} la="en"/>

{:else}

<div id="mainimagec" style="background:url({cdncdn1}/{ll.coverjp}) no-repeat; background-size: cover;background-position: center;" >
<img src="{cdncdn1}/{ll.coverjp}" alt="{ll.coverjp}" id="mainimage"/>
<div id="spreads" ></div>
<div id="mainimagetitle">{ll.jptit}</div>
</div>
<MangaMeta meta={ll} syn={data.manga_data.syn_jp}/>
<div style="text-align: left;margin-left:5vw;"><a class="chbtna" href="{url1}?lang=en" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">EN 🡆</a></div>
<MangaChSel ch={chaptersjp} vol={volumesjp} la="jp"/>

{/if} 


<style>
    #mainimage{
        max-height:250px;
        margin-left:5vw ;
        z-index: 3;
        border-radius: 3px;
       
    }
    #mainimagec{
        display: flex;
        height:250px;
        max-height:250px;
        width: 100vw;

        position: relative;
        z-index: 1;
        outline: none;

        
    }
    #spreads{
        position: absolute;
        top: 0px;
        left: 0px;
        background-color:rgba(0,0,0,0.7);

        height: 100%;
        width: 100%;
        z-index: 2;
    }

    #mainimagetitle{
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 4;
        word-wrap: break-word;
        overflow: hidden;

        margin:10px 0px 10px 5px;
    }
    .chbtna{
    text-decoration: none;
    padding:7px;
    margin: 5px 5px;
    color: whitesmoke;
    background:#333;
    border-radius:5px;
    border: 2px solid gray ;
    }
</style>