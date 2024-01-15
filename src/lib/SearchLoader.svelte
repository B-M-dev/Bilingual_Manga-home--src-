<script>
export let datav;
export let val;
export let blurring;
let marr =datav[0].manga_titles;
let ser=[];
const blur_off=()=>{blurring=false;}
$:{
ser=[];
marr.forEach(m => {
    let xv = `${m.entit}${m.jptit}${m.search}`
    xv=xv.toLowerCase()
    if(xv.indexOf(val)!=-1)
    {ser.push(m)}        
});}

</script>
{#if (val!=""&&val!=undefined)}
<div>
    {#if (ser.length!=0)}
    <h3 id="B_title">Manga</h3>
    <div id ="search_inbox">
        {#each ser as m }
        <a href="/manga/{m.enid}?lang=en" data-sveltekit:prefetch style="color: #f2f2f2;text-decoration: none;" on:click={blur_off} target="_top" rel="noopener noreferrer"><div id="search_resultsen" class="search_results">{m.entit}</div></a>
        <a href="/manga/{m.enid}?lang=jp" data-sveltekit:prefetch style="color: #f2f2f2;text-decoration: none;" on:click={blur_off} target="_top" rel="noopener noreferrer"><div id="search_resultsjp" class="search_results">{m.jptit}</div></a>
         {/each}
    </div>
    {:else}
    <div id="search_notfound">Manga Not Found</div>
    {/if}
</div>
    
{/if}
<style>

    #search_inbox{
        background-color:#484848;
        border-radius:5px ;
        margin: 2vh;
        padding: 10px;
        font-weight: bold;
    }

    .search_results{
        margin: 2px 0px;
        text-align:left ;
        padding: 20px 10px;
        background: #303030;
        border-radius: 5px;
        border:#484848 solid 1px;
    
    }
    .search_results:hover{
        background-color:rgba(255,255,255,0.3);

    }
    #search_notfound{
        margin: 2px 0px;
        text-align:center ;
        padding: 20px 10px;
        font-weight: bold;
        background: #303030;
        border-radius: 5px;
        border:#484848 solid 1px;
    }



</style>