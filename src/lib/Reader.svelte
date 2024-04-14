<script>

	import Ocr from "./Ocr.svelte";
	import Dashboard from "./Dashboard.svelte";

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation'
  	import { page } from '$app/stores'
    import { bind } from "svelte/internal";

	export let check=false;
	let nomouse=false;
	let fitscreen=true;
	let checken=false;
	let checkjp=false;
	let pauseen=false;
	let pausejp=false;
	let auto=true;
	export let prel=0	
	export let delayml=10000	
	export let lang="JP";
	export let imgs_jap=[];
	export let imgs_eng=[];
	export let jp_ocr={};
	export let eng_ocr={};
	export let indicator={a:0,b:0,c:false,d:false};
	export let chaptersen=[];
	export let chaptersjp=[];
	export let volumesen={};
	export let volumesjp={};
	export let vi=0;
	export let vj=0;
	export let iii;
	export let jjj;
	export let updown=true;
	export let upt="M";
	export let imgdata={};
	let src_o={};
	let src_o1={};
	let imgs_jp=[]
	let ocr={};
	let jpcolor="";
	let encolor="";
	let checkpage=false;
	let ocrbor=false;
	let ocroff=false;
	let ocron=false;
	
	let recheckhe=true
	let recheckhj=true
	let recheckhj1=true
	let recheckhe1=true
	$:j=0;
	$: langds=lang==="JP"?"ENG":"JP";
	let notj=j-1;
	export let jpp = [0];
	export let enp = [0];
	let scrollon=false;
	
	const imgmatcher=(a)=>{

		let ddk=Object.keys(imgdata);
		if(imgdata!={} && ddk.length>0 && auto)
		{	

			let kkkk=Object.keys(imgdata["jp"])
			let kkkk1=Object.keys(imgdata["en"])
			if(kkkk.includes(`${jjj}_${jpp[0]}`) && lang=='JP')
			{	
				let kkken=imgdata["jp"][`${jjj}_${jpp[0]}`].split('.')
				let kkkka=kkken[0]
				let newiii=parseInt(kkkka.split('_')[0]);
				let newenp=[parseInt(kkkka.split('_')[1])];
				iii=newiii
				enp=newenp
				let lollo=kkkka.split('_')
				if(lollo.length==3)
				{
					checken=true;
					notj=lollo[2];
				}
				else
				{
					checken=false;					
				}
			}

			if(!kkkk.includes(`${jjj}_${jpp[0]}`))
			{	checken=false;
				notj=j-1;
			}


			if(kkkk1.includes(`${iii}_${enp[0]}`) && lang=='ENG')
			{	

				let kkkka=imgdata["en"][`${iii}_${enp[0]}`].split('.')[0]
			
				let supbreak=kkkka
				let newjjj=parseInt(supbreak.split('_')[0]);
				let newjpp=[parseInt(supbreak.split('_')[1])];
				jjj=newjjj
				jpp=newjpp

				let lollo=kkkka.split('_')
				if(lollo.length==3)
				{
					checkjp=true;
					notj=lollo[2];
				}
				else
				{
					checkjp=false;					
				}
				
			}
			if(!kkkk1.includes(`${iii}_${enp[0]}`))
			{	checkjp=false;
				notj=j-1;
			}
		
			$page.url.searchParams.set('chjp',jjj);
			$page.url.searchParams.set('chen',iii);
			$page.url.searchParams.set('enp',enp[0]);
			$page.url.searchParams.set('jpp',jpp[0]);

		}
		
	}


	$:{

		imgmatcher([enp,jpp,vi,iii,vj,jjj,auto]);

	}




	onMount(() => {refresh();imgloadercc();scrollon=true;});

	const fitfunc=()=>{
		let imgid1=document.getElementById("ch-i");
		let imgid2=document.getElementById("ch-i1");
		let twoxid=document.getElementById("twoxholder");
		if(imgid1!=undefined)
		{
			if(fitscreen!=true)
			{imgid1.style.maxHeight='none';}
			else if(fitscreen===true)
			{imgid1.style.maxHeight='100vh';}
		}

		if(imgid2!=undefined)
		{
			if(fitscreen!=true)
			{imgid2.style.maxHeight='none';
			if(twoxid!=undefined && twoxid!=null)
			{twoxid.style.maxHeight='none';}}
			else if(fitscreen===true)
			{imgid2.style.maxHeight='100vh';
			if(twoxid!=undefined && twoxid!=null)
			{twoxid.style.maxHeight='100vh';}}
		}
	}
		

	const allquerys=()=>{
		let nlang=lang==="JP"?"jp":"en";		
		$page.url.searchParams.set('lang',nlang);
		$page.url.searchParams.set('chjp',jjj);
		$page.url.searchParams.set('chen',iii);
		$page.url.searchParams.set('enp',enp[0]);
		$page.url.searchParams.set('jpp',jpp[0]);
		setTimeout(()=>{
		
		goto(`?${$page.url.searchParams.toString()}#img_store`,{replaceState:true})
	},200);
		refresh();
	
	};
	
	const twox=(op)=>{	
		if(checkjp)
		{


			if(op)	
			{jpp[0]=jpp[0]+1;}
			else if(!op)
			{jpp[0]=jpp[0]-1;}
			

		}


		if(checken)
		{

			if(op)	
			{enp[0]=enp[0]+1;}
			else if(!op)
			{enp[0]=enp[0]-1;}
		}
		
	}


	$:{if(lang==="ENG")
	{		imgs_jp=imgs_eng;
			ocr=eng_ocr;
			j=enp[0];
			encolor="background-color:rgba(255,255,255,0.3);"
			jpcolor=""

	}
	else if(lang==="JP")
	{	
		imgs_jp=imgs_jap;
		ocr=jp_ocr;
		j=jpp[0];
		jpcolor="background-color:rgba(255,255,255,0.3);"
		encolor=""

	}}		

	const refresh=()=>{
		if(document.getElementById("ch-i")!=undefined)
		{document.getElementById("ch-i").src="/loader.svg";}
		if(document.getElementById("ch-i1")!=undefined)
		{document.getElementById("ch-i1").src="/loader.svg";}


	}
	
	const imgloadercc=()=>{
		let allimgsljp=document.getElementsByClassName("loadprefetchimgjp");
		let allnumjp=allimgsljp.length;
		let xallsjp=0;
		for(let ikii=jpp[0]+1;ikii<imgs_jap.length;ikii++)
		{	
			if(xallsjp<allnumjp)
			{allimgsljp[xallsjp].src=imgs_jap[ikii];}
			xallsjp++;
		
		}




		let allimgslen=document.getElementsByClassName("loadprefetchimgen");
		let allnumen=allimgslen.length;
		let xallsen=0;
		for(let ikii=enp[0]+1;ikii<imgs_eng.length;ikii++)
		{	
			if(xallsen<allnumen)
			{allimgslen[xallsen].src=imgs_eng[ikii];}
			xallsen++;
		
		}


	};
	
	const incdec=(op)=>{
		scrollon=true;
		if(op)
		{   
			if(enp[0]==(imgs_eng.length-1) && !pauseen)
			{
				indicator.a=1;
			}
			if(jpp[0]==(imgs_jap.length-1) && !pausejp)
			{
				indicator.b=1;
				
			}

			if(j<(imgs_jp.length-1))
			{
				if(!pauseen && lang=="EN")
					{j=j+1;}
				if(!pausejp && lang=="JP")
					{j=j+1;}

				if(!pauseen)
				{enp[0]=enp[0]+1;}
				if(!pausejp)
				{jpp[0]=jpp[0]+1;}
				twox(true);

			}
			

		}
		else  if(!(op))
		{	
			if(enp[0]==0 && !pauseen)
			{
				indicator.a=2;
			}
			if(jpp[0]==0  && !pausejp)
			{
				indicator.b=2;
				
			}

			if(j>0)
			{
				
				if(!pauseen && lang=="EN")
					{j=j-1;}
				if(!pausejp && lang=="JP")
					{j=j-1;}
				if(!pauseen)
				{enp[0]=enp[0]-1;}
				if(!pausejp)
				{jpp[0]=jpp[0]-1;}
				twox(false);

			}

		}
	
		imgmatcher([enp,jpp,vi,iii,vj,jjj,auto])
		allquerys();
		refresh();
		imgloadercc();


	}


	const change=()=>{

		lang=lang==="JP"?"ENG":"JP";
		allquerys();
		refresh();
		
		
		
		
	};






	const imgclick = (e)=>{
		if(!nomouse){
		if(e.srcElement.className!="ocrtext" && e.srcElement.className!="ocrtext1")
		{		
		let center = (document.getElementById("img_store").offsetWidth)/2;
		if (e.x > center) 
		{
			incdec(true);
		}
		else
		{
			incdec(false);
		}
		}
	}
	};
	


	
	const img_wid=(e)=>{
		let srce = e.srcElement.src;
		e.srcElement.alt = `Error loading this image.Try Reloading The Page after a few seconds...`
	};
	
	

	const img_wid1=(e)=>{	
				
		if(document.getElementById("ch-i").src!=imgs_jp[j])
		{
			document.getElementById("ch-i").src=imgs_jp[j];
			
			
		}

		src_o=document.getElementById("ch-i");

		if(document.getElementById("ch-i").src===imgs_jp[j])
		{

		}

		if(checken&&lang==="ENG"||checkjp&&lang==="JP")
		{
			if(j>0 || auto)
			{
			if(document.getElementById("ch-i1").src!=imgs_jp[notj])
				{
			document.getElementById("ch-i1").src=imgs_jp[notj];
			
				}
			}
		else if(j==0 && !auto)
			{
			if(document.getElementById("ch-i1").src!=imgs_jp[0])
				{
			document.getElementById("ch-i1").src=imgs_jp[0];
			
				}
			}
		src_o1=document.getElementById("ch-i1");
		
		}

		fitfunc();	
		let fdfdxx=jpp[0];
		let fdfdxy=enp[0];
		if(auto)
		{
			if(lang=="JP"){
				if((fdfdxx != 0))
				{recheckhj=true;}
				else
				{if(recheckhj)
					{imgmatcher([]);refresh();recheckhj=false;}}

				if((fdfdxx != imgs_jap.length-1))
				{recheckhj1=true;}
				else
				{if(recheckhj1)
					{imgmatcher([]);refresh();recheckhj1=false;}}
			}

			if(lang=="EN"){
				if((fdfdxy != 0))
				{recheckhe=true;}
				else
				{if(recheckhe)
					{imgmatcher([]);refresh();recheckhe=false;}}

				if((fdfdxy != imgs_eng.length-1))
				{recheckhe1=true;}
				else
				{if(recheckhe1)
					{imgmatcher([]);refresh();recheckhe1=false;}}
			}
		}

	};




	const img_wid2=(e)=>{

		
		if(document.getElementById("ch-i").src!=imgs_jp[j])
		{
			document.getElementById("ch-i").src=imgs_jp[j];
			
		}
		src_o=document.getElementById("ch-i");


		if(checken&&lang==="ENG"||checkjp&&lang==="JP")
		{
			if(j>0 || auto)
			{
			if(document.getElementById("ch-i1").src!=imgs_jp[notj])
				{
			document.getElementById("ch-i1").src=imgs_jp[notj];
			
				}
			}
		else if(j==0 && !auto)
			{
			if(document.getElementById("ch-i1").src!=imgs_jp[0])
				{
			document.getElementById("ch-i1").src=imgs_jp[0];
			
				}
			}
		src_o1=document.getElementById("ch-i1");
		}

	};


	const handleKeydown=(e)=>{		
		let key = e.key;
		if(key=="ArrowRight")
		{
			incdec(true);
		}
		else if(key=="ArrowLeft")
		{
			incdec(false);
		}

		}

const sli1=()=>{
	if(lang==="JP")
	{
		j=jpp[0];
		imgmatcher([enp,jpp,vi,iii,vj,jjj,auto])
		
		refresh();
	}
	upt="W";
	updown=false;
	document.getElementById("dash").style="position:fixed;bottom:1px;right:2.5vw;left:2.5vw;z-index: 999;background-color:rgba(0,0,0,0.6);"
	
	allquerys();
	

	
}
const sli2=()=>{
	if(lang==="ENG")
	{
		j=enp[0];
		imgmatcher([enp,jpp,vi,iii,vj,jjj,auto])
		
		refresh();
	}
	upt="W";
	updown=false;
	document.getElementById("dash").style="position:fixed;bottom:1px;right:2.5vw;left:2.5vw;z-index: 999;background-color:rgba(0,0,0,0.6);"

	allquerys();
	
}
let irrcom=[]
for(let ixxx=0;ixxx<=prel;ixxx++)
{
	irrcom.push(ixxx);
}
</script>


<svelte:window on:keydown={handleKeydown} on:resize={img_wid1}  on:scroll={img_wid2} />



<div id="reader">	
<div id="img_store" on:click={imgclick} >
	{#if (checken&&lang==="ENG"||checkjp&&lang==="JP")}
	{#if (checkpage)}
	<div id="twoxholder" style="display:flex;justify-content:center;margin:auto;max-height:100vh;max-width:95vw;">
	<span>
	<img id="ch-i1" src="/loader.svg" alt="ch-i1" style="margin-left:auto;max-width:47vw;" on:load={img_wid1} on:error={img_wid}/>
	<Ocr ocr1={ocr} src={src_o1} bind:ocrbor={ocrbor} bind:ocroff={ocroff} bind:ocron={ocron}/>
	</span>
	<span>
	<img id="ch-i" src="/loader.svg" alt="ch-i" style="margin-right:auto;max-width:47vw;" on:load={img_wid1} on:error={img_wid}/>
	<Ocr ocr1={ocr} src={src_o} bind:ocrbor={ocrbor} bind:ocroff={ocroff} bind:ocron={ocron}/>
	</span>
	</div>
	{:else}
	<div id="twoxholder" style="display:flex;justify-content:center;margin:auto;max-height:100vh;max-width:95vw;">
		<span>
		<img id="ch-i" src="/loader.svg" alt="ch-i" style="margin-right:auto;max-width:47vw;" on:load={img_wid1} on:error={img_wid}/>
		<Ocr ocr1={ocr} src={src_o} bind:ocrbor={ocrbor} bind:ocroff={ocroff} bind:ocron={ocron}/>
		</span>
		<span>
		<img id="ch-i1" src="/loader.svg" alt="ch-i1" style="margin-left:auto;max-width:47vw;" on:load={img_wid1} on:error={img_wid}/>
		<Ocr ocr1={ocr} src={src_o1} bind:ocrbor={ocrbor} bind:ocroff={ocroff} bind:ocron={ocron}/>
		</span>
		</div>
	{/if}	
	{:else}
	<img id="ch-i" src="/loader.svg" alt="ch-i" style="margin:auto;" on:load={img_wid1} on:error={img_wid}/>
	<Ocr ocr1={ocr} src={src_o} bind:ocrbor={ocrbor} bind:ocroff={ocroff} bind:ocron={ocron}/>
	{/if}

</div>


<div id="dash" >

<Dashboard
bind:auto={auto}
bind:pauseen={pauseen}
bind:pausejp={pausejp}
bind:check={check}
bind:chaptersen={chaptersen}
bind:chaptersjp={chaptersjp}
bind:checken={checken}
bind:checkjp={checkjp}
bind:checkpage={checkpage}
bind:vj={vj}
bind:jjj={jjj}
bind:jpp={jpp}
bind:vi={vi}
bind:iii={iii}
bind:enp={enp}
bind:langds={langds}
change={change}
bind:jpcolor={jpcolor}
bind:encolor={encolor}
bind:indicator={indicator}
allquerys={allquerys}
refresh={refresh}
bind:volumesjp={volumesjp}
bind:volumesen={volumesen}
sli1={sli1}
sli2={sli2}
bind:imgs_jap={imgs_jap}
bind:imgs_eng={imgs_eng}
bind:updown={updown}
bind:upt={upt}
bind:ocrbor={ocrbor}
bind:ocroff={ocroff}
bind:ocron={ocron}
bind:fitscreen={fitscreen}
bind:nomouse={nomouse}
fitfunc={fitfunc}/>
</div>

</div>	

<div id="loadprefetch" style="display:none;"> 
    {#each irrcom as idds}
      <img alt="" src="/loader.svg" class="loadprefetchimgen" style="max-width:200px;max-height:200px;" on:error={img_wid} />
    {/each}
	{#each irrcom as idds}
	<img alt="" src="/loader.svg" class="loadprefetchimgjp" style="max-width:200px;max-height:200px;" on:error={img_wid}/>
  	{/each}
</div>





<style>
	#reader{
		margin: auto;
		text-align: center;		
		
	}

	#img_store
	{
		width:95vw;
		height:auto;
		cursor: pointer;
		margin:auto;
		position:relative;
	}

	#ch-i
	{
		max-width:95vw;
		max-height:100vh;
	}

	#ch-i1
	{
		max-width:95vw;
		max-height:100vh;
	}
</style>