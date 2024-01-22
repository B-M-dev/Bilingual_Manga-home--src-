<script>
export let data;
export let ls;
export let cdncdn="";
export let subheading="";

$: jpi=`background-image:url(${cdncdn}/${data.coverjp});background-position: center;background-repeat: no-repeat;background-size: cover;`
$: eni=`background-image:url(${cdncdn}/${data.coveren});background-position: center;background-repeat: no-repeat;background-size: cover;`
</script>
{#key data}
{#if ls==="en"}
<span style="display:flex;">
   <span class="mangacardhover">
    <a href="/manga/{data.enid}?lang=en" data-sveltekit:prefetch style="color: #f2f2f2;text-decoration: none;" target="_top" rel="noopener noreferrer">
        <div class="mangacard" style={eni}>
            <div class="mangacarddiv" >{data.entit}</div>
        </div>
        <div class="mangacarddiv" >{subheading}</div>
    </a>
   </span>
</span>
{:else}
{#if ls==="jp"}
<span style="display:flex;">
    <span class="mangacardhover">
     <a href="/manga/{data.enid}?lang=jp" data-sveltekit:prefetch style="color: #f2f2f2;text-decoration: none;" target="_top" rel="noopener noreferrer"><div class="mangacard" style={jpi}>
         <div class="mangacarddiv" >{data.jptit}</div>
        </div>
        <div class="mangacarddiv" >{subheading}</div>
    </a>
 </span>
 </span>

{:else}
<span style="display:flex;">
    <span class="mangacardhover">
     <a href="/manga/{data.enid}?lang=en" data-sveltekit:prefetch style="color: #f2f2f2;text-decoration: none;" target="_top" rel="noopener noreferrer">
         <div class="mangacard" style={eni}>
         <div class="mangacarddiv" >{data.entit}</div>
        </div>
        <div class="mangacarddiv" >{subheading}</div>
    </a>
    </span>
 </span>
 <span style="display:flex;">
    <span class="mangacardhover">
     <a href="/manga/{data.enid}?lang=jp" data-sveltekit:prefetch style="color: #f2f2f2;text-decoration: none;" target="_top" rel="noopener noreferrer"><div class="mangacard" style={jpi}>
         <div class="mangacarddiv" >{data.jptit}</div>
        </div>
        <div class="mangacarddiv" >{subheading}</div>
    </a>
 </span>
 </span>
 {/if}
 {/if}
 {/key}

<style>
.mangacard{
    display: flex;
    justify-content: center;
    height: 250px;
    width: 162px;
    max-width: 162px;
    max-height: 250px;
    min-width: 162px;
    min-height: 250px;    

    border-radius: 5px;
    margin: 5px;

    
}

.mangacarddiv{

    line-height: 1.2em;
    max-height: 2.4em;

    font-size: 1rem;
    font-weight: bold;
    text-align: center;

    width: 160px;
    min-width: 160px;
    max-width:160px;
    align-self: flex-end; 

    margin-bottom:0px;
    padding:0px 2px 0px 0px;
    color:whitesmoke;
    background-color: rgba(0,0,0,0.6);
    border: 0px;
    

    white-space: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
               
    text-shadow: 2px 2px 5px black;

}

.mangacardhover{
    z-index: 100;
    height: 100%;
    width: 100%;
    border-radius: 5px;
   
}
.mangacardhover:hover{
    background-color:black;
    margin: 3px;
    box-shadow: 0 0 10px white;
}
.mangacard:hover{
    
        opacity: 0.45;

    }
</style>