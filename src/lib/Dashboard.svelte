<script>
    import RangeSlider from "svelte-range-slider-pips";
	import { onMount } from 'svelte';

    export let pauseen;
	export let pausejp;

    export let check;
    export let chaptersen;
    export let chaptersjp;
    export let checken;
    export let checkjp;
    export let checkpage;
    export let vj;
    export let jjj;
    export let jpp;
    export let vi;
    export let iii;
    export let enp;
    export let langds;
    export let change;
    export let jpcolor;
    export let encolor;
    export let indicator;
    export let allquerys;
    export let refresh;
    export let volumesjp;
    export let volumesen;
    export let sli1;
    export let sli2;
    export let imgs_jap;
    export let imgs_eng;
	export let fitscreen;
	export let nomouse;

	export let updown=true;
	export let upt="🡅";
	let chfl = false;
	export let ocron = false;
	export let ocroff = false;
	export let ocrbor = false;

	export let fitfunc;
	
	onMount(() => {allst();flt();fitfunc();});
	

	const flt=()=>{
		if(chfl)
		{
			document.getElementById("langb").style="position:fixed;top:50vh;right:3vw;"
		}
		else
		{
			document.getElementById("langb").style="position:static;"
		}
		setfunc();
	
	}

	


	
	const upb=()=>{
		if(updown)
		{
			upt="🡇";
			updown=false;
			document.getElementById("dash").style="position:fixed;bottom:1px;right:2.5vw;left:2.5vw;z-index: 999;background-color:rgba(0,0,0,0.6);"
		}
		else
		{
			upt="🡅";
			updown=true;
			document.getElementById("dash").style="position:static;right:2.5vw;left:2.5vw;z-index: 999;background-color:rgba(0,0,0,0.6);"
		}

	}
const allst=()=>{
	if(localStorage.getItem("checkpage")!=null)
	{checkpage=localStorage.getItem("checkpage")==="false"?false:true;}
	else
	{checkpage=false;}	

	if(localStorage.getItem("check")!=null)
	{check=localStorage.getItem("check")==="false"?false:true;}
	else
	{check=false;}	


	if(localStorage.getItem("chfl")!=null)
	{chfl=localStorage.getItem("chfl")==="false"?false:true;}
	else
	{chfl=false;}	

	if(localStorage.getItem("ocrbor")!=null)
	{ocrbor=localStorage.getItem("ocrbor")==="false"?false:true;}
	else
	{ocrbor=false;}

	if(localStorage.getItem("ocron")!=null)
	{ocron=localStorage.getItem("ocron")==="false"?false:true;}
	else
	{ocron=false;}

	if(localStorage.getItem("ocroff")!=null)
	{ocroff=localStorage.getItem("ocroff")==="false"?false:true;}
	else
	{ocroff=false;}

	if(sessionStorage.getItem("checken")!=null)
	{checken=sessionStorage.getItem("checken")==="false"?false:true;}
	else
	{checken=false;}

	if(sessionStorage.getItem("checkjp")!=null)
	{checkjp=sessionStorage.getItem("checkjp")==="false"?false:true;}
	else
	{checkjp=false;}

	if(sessionStorage.getItem("pauseen")!=null)
	{pauseen=sessionStorage.getItem("pauseen")==="false"?false:true;}
	else
	{pauseen=false;}

	if(sessionStorage.getItem("pausejp")!=null)
	{pausejp=sessionStorage.getItem("pausejp")==="false"?false:true;}
	else
	{pausejp=false;}

	if(localStorage.getItem("fitscreen")!=null)
	{fitscreen=localStorage.getItem("fitscreen")==="false"?false:true;}
	else
	{fitscreen=true;}


	if(localStorage.getItem("nomouse")!=null)
	{nomouse=localStorage.getItem("nomouse")==="true"?true:false;}
	else
	{nomouse=false;}
}

const setfunc=()=>{
	localStorage.setItem("nomouse", nomouse);
	localStorage.setItem("fitscreen", fitscreen);
	localStorage.setItem("check", check);
	localStorage.setItem("checkpage", checkpage);
	localStorage.setItem("chfl", chfl);
	localStorage.setItem("ocrbor", ocrbor);
	localStorage.setItem("ocron", ocron);
	localStorage.setItem("ocroff", ocroff);
	sessionStorage.setItem("checken", checken);
	sessionStorage.setItem("checkjp", checkjp);
	sessionStorage.setItem("pauseen", pauseen);
	sessionStorage.setItem("pausejp", pausejp);
	
	fitfunc();
}


</script>

<div id="slider" >
	<div id="r-opt">
		<span id="langb"><button on:click={()=>{change();}} style="height:45px;width:45px;">{langds}</button><button id="updownb" on:click={upb}>{upt}</button></span>
	</div>
	<div>
		<input type=checkbox bind:checked={chfl} on:change={flt}>Float buttons
		<input type=checkbox bind:checked={fitscreen} on:change={setfunc}>Fit-screen
		<input type=checkbox bind:checked={nomouse} on:change={setfunc}>No-click
	</div>
	<div>
		OCR:
		<input type=checkbox bind:checked={ocrbor} on:change={setfunc}>No-Border
		<input type=checkbox bind:checked={ocron} on:change={setfunc}>Show
		<input type=checkbox bind:checked={ocroff} on:change={setfunc}>Off
	</div>
	<input type=checkbox bind:checked={check} on:change={setfunc}>chapter drag
	<input type=checkbox bind:checked={checkpage} on:change={setfunc}>reverse page
	<div id="jpslider" style={jpcolor}>
	<button on:click={()=>{indicator.b=2;indicator.d=true;allquerys();refresh();}}>❮❮❮</button><button on:click={()=>{indicator.b=1;indicator.d=true;allquerys();refresh();}}>❯❯❯</button>
	<span>JP</span>
	<select id='volumejp' bind:value={vj}>
		<option value="" disabled selected>Volumes</option>
		<option value="" disabled selected>----------</option>
		{#each  Object.keys(volumesjp) as vol_n1,volj}
		<option value={volj}>{vol_n1}</option>  
		{/each}
	</select>


	<select id="selectjp" bind:value={jjj} on:change={sli1} >
		<option value="" disabled selected>Chapters</option>
        {#each chaptersjp as chapter_n1,jjjj}
		{#if (volumesjp[Object.keys(volumesjp)[vj]].s<=jjjj&&volumesjp[Object.keys(volumesjp)[vj]].e>=jjjj)}
		<option value="" disabled selected>----------</option>
		<option value={jjjj}>{chapter_n1}</option> 
		{:else}
		<option value={jjjj}  hidden>{chapter_n1}</option> 
		{/if}
		{/each}
    </select>
	<div>
		{jpp[0]}/{imgs_jap.length-1}
		<input type=checkbox bind:checked={checkjp} on:change={setfunc}>2x
		<input type=checkbox bind:checked={pausejp} on:change={setfunc}>Pause</div>

	<RangeSlider  bind:values={jpp} on:change={sli1} pipstep={1}  rest={false}  float hoverable max={imgs_jap.length-1}  />	
	</div>
<div id="enslider" style={encolor}>
<div style="display: flexbox;">
	<button on:click={()=>{indicator.a=2;indicator.c=true;allquerys();refresh();}}>❮❮❮</button><button on:click={()=>{indicator.a=1;indicator.c=true;allquerys();refresh();}}>❯❯❯</button>
	<span>ENG</span>

	<select id='volumeen' bind:value={vi}>
		<option value="" disabled selected>Volumes</option>
		<option value="" disabled selected>----------</option>
		{#each  Object.keys(volumesen) as vol_n,voli}
		<option value={voli}>{vol_n}</option>  
		{/each}
	</select>


	<select id="selecten" bind:value={iii} on:change={sli2} >
		<option value="" disabled selected>Chapters</option>
        {#each chaptersen as chapter_n,ii}
		{#if (volumesen[Object.keys(volumesen)[vi]].s<=ii&&volumesen[Object.keys(volumesen)[vi]].e>=ii)}
		<option value="" disabled selected>----------</option>
		<option value={ii}>{chapter_n}</option>  
		{:else}
		<option value={ii}  hidden>{chapter_n}</option> 
		{/if}
		{/each}
    </select>
	<div>
		{enp[0]}/{imgs_eng.length-1}
		<input type=checkbox bind:checked={checken} on:change={setfunc}>2x
		<input type=checkbox bind:checked={pauseen} on:change={setfunc}>Pause
	</div>
</div>

	<RangeSlider bind:values={enp} on:change={sli2} pipstep={1}  rest={false}  float hoverable max={imgs_eng.length-1}  />	
</div>
</div> 
<style>

#slider
	{
		margin:auto;

		text-align: center;
		width:95vw;
		font-size:auto;

	}
#r-opt{
		display: block;
	}
#jpslider{

	margin-left:1vw;margin-right:1vw;
}
#enslider{
	margin-left:1vw;margin-right:1vw;
}
#langb{
	z-index: 999;
	
}

#langb>button{
	background-color: rgba(130, 231, 135, 0.6);
	border: 0px;
	padding: 5px;
	border: 1px black solid;
	border-radius: 5px;
}
#langb>button:hover{
	background-color: rgba(130, 231, 135, 0.4);

}



#selecten{
	max-width: 60vw;

}
#selectjp{
	max-width: 60vw;

}
#volumeen{
	max-width: 60vw;

}
#volumejp{
	max-width: 60vw;

}

</style>