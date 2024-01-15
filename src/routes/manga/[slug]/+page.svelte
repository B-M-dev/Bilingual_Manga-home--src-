
<script>
import MangaView from '$lib/MangaView.svelte'
import MangaApp from '$lib/MangaApp.svelte';
import {obj} from '$lib/store.js';
import { page } from '$app/stores';
import {onMount} from 'svelte'

let currlink=$page.url;
let curdom=`${currlink}`.split('/');
let curdom1=curdom.splice(0,3).join('/');

export let data;
let meta;
obj.subscribe(value => { meta=value;});

   
let x = meta['0'].manga_titles;
let cdncdn = meta['0'].cdn;
let cdncdn1 = meta['0'].cdn1;
let ipfsgate = meta['0'].ipfsgate;
let ipfsgate1 = meta['0'].ipfsgate1;
let ipfs={"abci":ipfsgate,"abcii":ipfsgate1,"id":data.p}
let xipfs=""

let prel = parseInt(meta['0'].prel);
let delayml = parseInt(meta['0'].delayml);





$:ll={};
$:{
    x.forEach(element => {
        if(element.enid===data.p)
        {
            ll=element;
          
        }
        
    });
}





let imgs_darr=data.manga_data;


let langt=data.l==='en'?'ENG':'JP'
let chengt = (data.chen!=null&&data.chen!=undefined&&data.chen.length > 0&&parseInt(data.chen)>=0)?data.chen:'0';
let chjpt  = (data.chjp!=null&&data.chjp!=undefined&&data.chjp.length > 0&&parseInt(data.chjp)>=0)?data.chjp:'0';
let enp =   (data.enp!=null&&data.enp!=undefined&&data.enp.length > 0&&parseInt(data.enp)>=0)?data.enp:'0';
let jpp =   (data.jpp!=null&&data.jpp!=undefined&&data.jpp.length > 0&&parseInt(data.jpp)>=0)?data.jpp:'0';

let chaptersen=data.manga_data.en_data.ch_naen;
let chaptersjp=data.manga_data.jp_data.ch_najp;

let volumesen=data.manga_data.en_data.vol_en;
let volumesjp=data.manga_data.jp_data.vol_jp;
</script>
{#if ((data.chen!=null&&data.chen!=undefined&&data.chen.length > 0&&parseInt(data.chen)>=0)||(data.chjp!=null&&data.chjp!=undefined&&data.chjp.length > 0&&parseInt(data.chjp)>=0))}

{@html meta[0].inhtml['ad-up']}
<MangaApp  delayml={delayml} prel={prel} ipfsgate={data.ipfs} cdncdn={cdncdn} cdncdn1={cdncdn1} cheng={parseInt(chengt)} chjpn={parseInt(chjpt)} enp={[enp]} jpp={[jpp]} lang={langt} endata={imgs_darr.en_data} jpdata={imgs_darr.jp_data} chaptersen={chaptersen} chaptersjp={chaptersjp} volumesen={volumesen} volumesjp={volumesjp}/>
{@html meta[0].inhtml['ad-down']}
{:else}
<MangaView ll={ll} data={data} cdncdn1={cdncdn1}/>
{@html meta[0].inhtml['ad-down']}
{/if}
<svelte:head>
    <link rel="canonical" href={currlink} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:locale:alternate" content="ja_JP" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={currlink}/>
    <meta property="og:site_name" content="Bilingual Manga" />
{#if data.l==="en"}
    <title>{ll.entit} - Bilingual Manga</title>
    <meta name="description" content={data.manga_data.syn_en} />
    <meta property="og:title" content={ll.entit}/>
    <meta property="og:description" content={data.manga_data.syn_en}/>
    <meta property="og:image" content="{cdncdn1}/{ll.coveren}"/>
{:else}
    <title>{ll.jptit} - Bilingual Manga</title>
    <meta name="description" content={data.manga_data.syn_jp} />
    <meta property="og:title" content={ll.jptit}/>
    <meta property="og:description" content={data.manga_data.syn_jp}/>
    <meta property="og:image" content="{cdncdn1}/{ll.coverjp}"/>

{/if}
</svelte:head>
<style></style>
