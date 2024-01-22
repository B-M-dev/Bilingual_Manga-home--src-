    <script>
    import MangaCard from '$lib/MangaCard.svelte';
    import MangaSortDashboard from '$lib/MangaSortDashboard.svelte';
    import { page } from '$app/stores';
    import { sort_options, sortManga } from '$lib/MangaSorter.js';
    export let x;
    export let cdncdn;
    export let cdncdn1;

    let pagenew=1;
    let numoe=12
    let url1=""

    url1=`${$page.url}`.split('?')[0]
    let pagen=parseInt($page.url.searchParams.get('page'));
    let ls=$page.url.searchParams.get('ls');
    let sort_criteria=$page.url.searchParams.get('sort');
    if (sort_criteria === null) {
        sort_criteria = 'Newly added';
    }
    let sort_reverse=$page.url.searchParams.get('reverse') == "true" ? true : false;

    $: url_param = "ls=" + ls + "&sort=" + sort_criteria + "&reverse=" + (sort_reverse ? "true" : "false");
    $: x = sortManga(x, sort_criteria, sort_reverse);

    if(ls==="en" || ls==="jp")
    {
        numoe=24;
        pagenew=pagen;
        
    }
    else
    {
        ls="all"
    }
    

    let xnum=Math.ceil(x.length/numoe)
    let xarr=[];
    for(let i=1;i<=xnum;i++)
    {
        xarr.push(i)
    }

    let pii=1;
    

    if(pagen>=1&&pagen<=xnum)
    {
        pii=parseInt(pagen);
    }

    let pii2=pii-1;
    let pii3=pii+1;


    const pagchang=(pi)=>{
        pi=pi+1;
        let tempp = Math.ceil(pi/numoe);
        if(tempp===pii)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    const sortCriteriaChanged = (e) => {
        // TODO: jump to first page
    };

    </script>
    <div class="selgrid">
    <div class="lssel">
    <a href="{url1}?page={pagenew}&ls=en" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">ENG TL</a>
    <a href="{url1}?page={pagenew}&ls=jp" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">JP RAW</a>
    <a href="{url1}?page=1&ls=all" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">ALL</a>
    </div>
    <div class="lssel">
        <a href="{url1}download" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">Download</a>
    </div>
    <div class="sortsel">
        <MangaSortDashboard bind:sort_criteria bind:sort_reverse sort_criteria_list={Object.keys(sort_options)} on:SortCriteriaChanged={sortCriteriaChanged}/>
    </div>
    </div>
<div id="cardholderid" class="cardholder">
    {#each x as manga,pi }
    {#if pagchang(pi) }
    <MangaCard data={manga} subheading={manga.subheading} ls={ls} cdncdn={cdncdn1}/>
    {/if}        
    {/each}
    {#if xnum>1}
    <div id="pagesnum">
        {#if (pii!=1)}
        <a href="{url1}?page=1&{url_param}" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">First</a>&nbsp
        {/if} 
        {#if (pii2>0)}
        <a href="{url1}?page={pii2}&{url_param}" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">🮤</a>&nbsp   
        {/if}  
        {#each xarr as xi }
            
            {#if Math.ceil(xi/5)==(Math.ceil(pii/5))}
            <a href="{url1}?page={xi}&{url_param}" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">{xi}</a>&nbsp
            {/if}
        {/each}
        {#if (pii3<=xnum)}
        <a href="{url1}?page={pii3}&{url_param}" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">🮥</a>&nbsp 
        {/if}
        {#if (pii!=xnum)}
        &nbsp<a href="{url1}?page={xnum}&{url_param}" data-sveltekit:prefetch target="_top" rel="noopener noreferrer">Last</a>&nbsp   
        {/if}
    </div>
    {/if}
    </div>

    <style>
        .cardholder{
            position: absolute;
            left: 5vw;
            right: 5vw;
            display: flex;
            flex-wrap: wrap;

            justify-content: center;
            text-align: center;
            width: 90vw;
        }

        #pagesnum{

            padding-top: 30px;
            padding-bottom:30px;
            width: 100%;
            min-width: 100%;

        }

        #pagesnum>a{
            text-decoration: none;
            color: whitesmoke;
            font-size: 1.2rem;
            margin-right:5px;
            padding: 5px;
            border-radius: 5px;
        }

        #pagesnum>a:hover{
            background-color: rgba(255,255,255,0.4);
        }
        .selgrid {
            display: grid;
            grid-template-columns: 1fr 0.5fr 1fr;
            grid-gap: 5px;
        }
        .lssel{
            margin-top:25px;
            margin-bottom:15px;
        }
        .lssel>a{
            text-decoration: none;
            color: whitesmoke;
            font-size: 1.1 rem;
            margin-right:5px;
            padding: 10px;
            border-radius: 5px;
            background:#444;
        }
        .lssel>a:hover{
            background-color: rgba(255,255,255,0.4);
        }
        .sortsel{
            margin-top:15px;
            margin-bottom:15px;
        }
    </style>

    