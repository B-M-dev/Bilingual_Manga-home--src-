<script>
    import {obj} from '$lib/store.js';
    import {onMount} from 'svelte'
    onMount(dwdata)
    let meta;
    obj.subscribe(value => { meta=value;});
    let x11 = meta['0'].manga_titles;
    let x12 = x11.slice().reverse()
    let cdncdn1=meta['0'].cdn1;

    let lan="JPN"
    function clic()
    {
        if(lan==="JPN")
        {
            lan="ENG"
        }
        else if(lan === "ENG")
        {
            lan="JPN"
        }
    }
    cdncdn1
    let chk={}
    function chkclr(chk,xa=true)
    {
        for(let chel in chk)
        {
            if(chk[chel])
            {
                if(xa)
                {document.getElementById(`#s${chel}`).style.color="green"}
                else
                {document.getElementById(`#s${chel}`).style.color="white"}
            }
        }
    }
    function fetdw()
    {
        fetch(`${cdncdn1}/download`, { method: "post",headers: {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify(chk)}).then( (response) => {let aaafdfv = response;}).then(()=>{chkclr(chk);refr1();dwdata();});
        
    }

    function fetdw1()
    {
        fetch(`${cdncdn1}/remove`, { method: "post",headers: {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify(chk)}).then( (response) => {let aaafdfv = response;}).then(()=>{chkclr(chk,false);refr1();});
    }

    function dwdata()
    {
        fetch(`${cdncdn1}/json/dw.json`)
        .then(response => response.json())
	    .then((data3)=>{
            let pmd = data3["pm"]
            for(let xx in x12)
            {   if(pmd.includes(x12[xx].enid))
                {
                    document.getElementById(`#s${xx}`).style.color="green"
                }

            }
        })
        .catch(err => {console.log(err);})
    }

    function refr1()
    {
        for(let elm in chk)
        {
            chk[elm]=false
        }
    }

    function refr()
    {
        for(let elm in chk)
        {
            chk[elm]=false
            document.getElementById(`#s${elm}`).style.color="white"
        }
        dwdata()
    }

    function sela()
    {
        for(let i in x12)
        {
            chk[`${i}`]=true
        }
    }
    function seld()
    {
        fetch(`${cdncdn1}/json/dw.json`)
        .then(response => response.json())
	    .then((data3)=>{
            let pmd = data3["pm"]
            for(let xx in x12)
            {   if(pmd.includes(x12[xx].enid))
                {
                    chk[`${xx}`]=true
                }

            }
        })
        .catch(err => {console.log(err);})
    }
    function seldu()
    {
        fetch(`${cdncdn1}/json/dw.json`)
        .then(response => response.json())
	    .then((data3)=>{
            let pmd = data3["pm"]
            for(let xx in x12)
            {   if(pmd.includes(x12[xx].enid))
                {
                    chk[`${xx}`]=false
                }

            }
        })
        .catch(err => {console.log(err);})
    }
</script>
<button style="padding:5px" on:click={clic}>{lan}</button>
<button style="padding:5px;position:fixed;top:70vh;left:80vw;" on:click={fetdw}>Download</button>
<button style="padding:5px;" on:click={fetdw1}>Delete Manga</button>
<button style="padding:5px;" on:click={sela}>Select All</button>
<button style="padding:5px;" on:click={refr}>unSelect All</button>
<button style="padding:5px;" on:click={seld}>Select Downloaded</button>
<button style="padding:5px;" on:click={seldu}>unSelect Downloaded</button>
<div style="text-align: left;font-size:15pt; font-weight:550;margin:10px;">
<ol>
{#each x12 as name,index}
<div id=#s{index}>
{#if lan==="JPN"}
<div id=#d{index}>
<li><input id=#{index} type=checkbox bind:checked={chk[`${index}`]} on:change={()=>{if(chk[`${index}`]){document.getElementById(`#s${index}`).style.color="yellow"}else{document.getElementById(`#s${index}`).style.color="white";dwdata()}}}>{name.entit}</li>
</div>
{/if}
{#if lan==="ENG"}
<div id=#d{index}>
<li><input id=#{index} type=checkbox bind:checked={chk[`${index}`]} on:change={()=>{if(chk[`${index}`]){document.getElementById(`#s${index}`).style.color="yellow"}else{document.getElementById(`#s${index}`).style.color="white";dwdata()}}}>{name.jptit}</li>
</div>
{/if}
</div>

{/each}
</ol>
</div>