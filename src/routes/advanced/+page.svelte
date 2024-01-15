<script>
import {obj} from '$lib/store.js';
let fd=0;
let genarrf=[]
let meta;
let nbk="All Genres";
obj.subscribe(value => { meta=value;});
let x = meta['0'].manga_titles;
let genarr=[];
let genarr1=[];
let genarr2=[];
let genarr3=[];
let genarr4=[];
const check=(a,b)=>{
    let cc=b;
    a.forEach((el)=>{
        if(!(b.includes(el)))
        {
            cc.push(el);
        }
    })
    return cc;

}

const check1=(a,b)=>{
    if(!(b.includes(a)))
    {
        b.push(a);
    }
    return b;
}

x.forEach(ele => {
    genarr=check(ele.genres,genarr);
    genarr1=check(ele.Author,genarr1);
    genarr2=check(ele.Artist,genarr2);
    genarr3=check1(ele.Release,genarr3);
    genarr4=check1(ele.Status,genarr4);
    
});
genarr.sort();
genarr1.sort();
genarr2.sort();
genarr3.sort();
genarr4.sort();

genarrf=genarr;

const chdgw=(sss=true)=>{
if(fd==0)
{nbk="All Genres";genarrf=genarr;}
else if(fd==3)
{nbk="All Authors";genarrf=genarr1;}
else if(fd==4)
{nbk="All Artists";genarrf=genarr2;}
else if(fd==1)
{nbk="All Years";genarrf=genarr3;}
else if(fd==2)
{nbk="All Status";genarrf=genarr4;}
}
</script>
<svelte:head>
<title> Advanced Search - Bilingual Manga</title>
{@html meta[0].inhtml['metades']}
</svelte:head>
<div style="text-align:left;margin-left:5vw;margin-right:5vw;color:whitesmoke;">
<div style="text-align:center;font-weight:bolder;font-size:1.4rem;margin:10px;">
    {#if fd!=0 && fd>0}
    <button on:click={()=>{fd=fd-1;chdgw();}}>🮤</button>
    {/if}
    {nbk}
    {#if fd!=4}
    <button on:click={()=>{fd=fd+1;sessionStorage.getItem("fd",fd);chdgw();}}>🮥</button>
    {/if}
</div>
{#if fd===0}
{#each genarrf as gg }
<a href="/manga-genre/{gg}">{gg}</a>
{/each}
{/if}
{#if fd===1}
{#each genarrf as gg }
<a href="/manga-release/{gg}">{gg}</a>
{/each}
{/if}
{#if fd===2}
{#each genarrf as gg }
<a href="/manga-status/{gg}">{gg}</a>
{/each}
{/if}
{#if fd===3}
{#each genarrf as gg }
<a href="/manga-author/{gg}">{gg}</a>
{/each}
{/if}
{#if fd===4}
{#each genarrf as gg }
<a href="/manga-artist/{gg}">{gg}</a>
{/each}
{/if}
</div>
<style>
a{
display: inline-block;
text-decoration: none;
padding:7px;
margin: 5px 5px;
color: whitesmoke;
background:#333;
border-radius:5px;

}
a:hover {
  background-color:rgba(255,255,255,0.3);
}
button{
    padding: 0px;
    border: 0px;
    margin: 0px;
    color: whitesmoke;
    background:#333;
    border-radius:5px;
    padding:7px;

}
button:hover {
  background-color:rgba(255,255,255,0.3);
}
</style>
