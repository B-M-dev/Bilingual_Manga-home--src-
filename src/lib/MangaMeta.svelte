<script>
export let meta;
export let syn;
let st="Show More"
const clst=()=>
{
    if(st==="Show More")
    {
        st="Show Less";
        document.getElementById("metac").style="height:auto;"
}
    else if(st==="Show Less")
    {
        st="Show More";
        document.getElementById("metac").style="height:50vh;"

}
}

</script>
<div id="metac">
<b style="font-size: 1.1rem;">Alternative Titles</b>
<div class="metaesearch" style="margin:0;padding:5px;">
{meta.search}
</div>
{#if (meta.genres.length<=1)}
<b style="font-size: 1.1rem;">Genre</b>
{:else}
<b style="font-size: 1.1rem;">Genres</b>
{/if}
<div class="metae">
    {#each meta.genres as genre }
     <a href="/manga-genre/{genre}">{genre}</a>
    {/each}    
</div>
{#if (meta.Author.length<=1)}
<b style="font-size: 1.1rem;">Author</b>
{:else}
<b style="font-size: 1.1rem;">Authors</b>
{/if}
<div class="metae">
    {#each meta.Author as Author }
        <a href="/manga-author/{Author}">{Author}</a>
    {/each}    
</div>
{#if (meta.Artist.length<=1)}
<b style="font-size: 1.1rem;">Artist</b>
{:else}
<b style="font-size: 1.1rem;">Artists</b>
{/if}
<div class="metae">
    {#each meta.Artist as Artist }
        <a href="/manga-artist/{Artist}">{Artist}</a>
    {/each}    
</div>

<div style="display: flex;">
    <div>
    <b style="font-size: 1.1rem;">Release</b>
    <div class="metae">
    <a href="/manga-release/{meta.Release}">{meta.Release}</a>
    </div>
    </div>
    <div style="margin-left:20px;">
    <b style="font-size: 1.1rem;">Status</b>
    <div class="metae">
    <a href="/manga-status/{meta.Status}">{meta.Status}</a>
    </div>
    </div>
</div>

<div class="metaesyn" style="margin-top:10px;">
    {syn}    
</div>
</div>
<button on:click={clst}><span style="font-size:0.8rem;">{st}</span></button>
<style>
#metac{
display: block;
text-align: left;
margin: 5px 5vw;
margin-bottom: 0px;
height: 50vh;
max-width: 90vw;
overflow: clip;

border-bottom:rgb(28, 163, 28) solid 2px;
border-radius:5px;
}
.metae{

    overflow-wrap: break-word;
    
}
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
    display: inline;
    border: 2px solid green;
    border-radius:0px 0px 5px 5px;
    margin: 0px;
    padding: auto;
    background-color: green;

    color: whitesmoke;

}
button:hover{
    background-color:rgba(0,110,0,1);
    border-color:rgba(0,110,0,1);


}

</style>