<script>
   import Reader from "./Reader.svelte";

	import { page } from '$app/stores';

	
const imgscon=(imgsl,rep)=>{
    const replaceing=(rstr,str)=>{
		let rstrarr=str.split('/')

		let rpsi=str.indexOf(`%@rep@%`);
        let resi=str.substring(0,rpsi);
		resi=ipfsgate.replace('%@cid@%',resi);
        let reti=`${resi}${rstr}`;

		return reti;  

		
          
    	}
  
    	let ximg={};
    	if(imgsl!=undefined){
    	rep.forEach((rep1,j1)=>{
        let imgsret=[];
        imgsl[(j1+1)].forEach((el)=>{
            let repx=replaceing(el,rep1)

            imgsret.push(repx);            
        	})
        ximg[(j1+1)]=imgsret;
    	}  );}

    	return ximg;
	}
	

const querys=(key,value)=>{		

		$page.url.searchParams.set(`${key}`,value);

		history.replaceState({name: 'BM'}, "BM back", `?${$page.url.searchParams.toString()}`);

	}
		


   let indicator={a:0,b:0,c:false,d:false};
   let i=0;
   let jj=0;
   let iii=0;
	let jjj=0;
	export let delayml=10000;
	export let prel=0;
	export let ipfsgate="";

	export let cdncdn="";
	export let cdncdn1="";
	export let cheng=0;
	export let chjpn=0;
   export let jpp=[0]; export let enp=[0];
   export let imgs_engo={};
   export let imgs_jpo={};

   export let endata={};
   export let jpdata={};
   let imgs_eng=[];
   let imgs_jap=[];
	export let chaptersen=[];
	export let chaptersjp=[];
	export let volumesen={};
	export let volumesjp={};
	let vi;
	let vj;
	export let lang="JP";


	imgs_engo=imgscon(endata.ch_en,endata.ch_enh);
	imgs_jpo=imgscon(jpdata.ch_jp,jpdata.ch_jph);
	if(cheng<chaptersen.length&&cheng>=0)
	{
		i=cheng;
		iii=cheng;



	}
	if(cheng>=chaptersen.length&&cheng>=0)
	{
		i=chaptersen.length-1;
		iii=chaptersen.length-1;

	}
	if(chjpn<chaptersjp.length&&chjpn>=0)
	{
		jj=chjpn;
		jjj=chjpn;


	}
	if(chjpn>=chaptersjp.length&&chjpn>=0)
	{
		jj=chaptersjp.length-1;
		jjj=chaptersjp.length-1;

	}


	$:{
		volseten(iii);
		volsetjp(jjj);
	}




	
	
	
	
	
	
let check;let el=0;let jl=0;

const volsetjp=(j11)=>{
		for(let kj=0;kj<Object.keys(volumesjp).length;kj++)
	{	let keyj=volumesjp[Object.keys(volumesjp)[kj]];
		if(keyj.s<=j11&&keyj.e>=j11)
		{
			vj=kj;
			
		}
	}
	}

const volseten=(i11)=>{
		for(let ki=0;ki<Object.keys(volumesen).length;ki++)
	{	let keyi=volumesen[Object.keys(volumesen)[ki]];
		if(keyi.s<=i11&&keyi.e>=i11)
		{
			vi=ki;

			
		}

	}
	}



jl=Object.keys(imgs_jap).length;


$:{
	if(imgs_engo[Object.keys(imgs_engo)[0]]!=undefined){el=Object.keys(imgs_engo).length;};

	if(imgs_jpo[Object.keys(imgs_jpo)[0]]!=undefined){jl=Object.keys(imgs_jpo).length;};



	

		if(check||lang==="ENG"||indicator.c){
		if(indicator.a==1 && i<el-1)
		{
			i=i+1;
			enp[0]=0;
			iii=i;
			volseten(iii);
			querys('chen',iii);
			querys('enp',enp[0]);	
		}

		if(indicator.a==2 && i>0)
		{
			i=i-1;
			enp[0]=(imgs_engo[Object.keys(imgs_engo)[i]]!=undefined)?imgs_engo[Object.keys(imgs_engo)[i]].length:0;
			iii=i;
			volseten(iii);
			querys('chen',iii);	
			querys('enp',enp[0]);
		}
		indicator.c=false;
	}

		
		
		if(check||lang==="JP"||indicator.d){
		if(indicator.b==1 && jj<jl-1)
		{
			jj=jj+1;
			jpp[0]=0;
			jjj=jj;
			volsetjp(jjj);
			querys('chjp',jjj);
			querys('jpp',jpp[0]);
			
		}


		if(indicator.b==2 && jj>0)
		{
			jj=jj-1;
			jpp[0]=(imgs_jpo[Object.keys(imgs_jpo)[jj]]!=undefined)?imgs_jpo[Object.keys(imgs_jpo)[jj]].length:0;
			jjj=jj;
			volsetjp(jjj);
			querys('chjp',jjj);
			querys('jpp',jpp[0]);
			
		}
		indicator.d=false;
	}
		


		

	
	indicator.a=0;
	indicator.b=0;

}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	




	$:{if(imgs_engo[Object.keys(imgs_engo)[0]]!=undefined){imgs_eng=imgs_engo[Object.keys(imgs_engo)[i]];}

		if(imgs_jpo[Object.keys(imgs_jpo)[0]]!=undefined){imgs_jap=imgs_jpo[Object.keys(imgs_jpo)[jj]];}
}





	
	
let eng_ocr={};

let jp_ocr={};


$:{
if(imgs_jpo[Object.keys(imgs_jpo)[0]]!=undefined && jj>=0)
	{	
	let cid=imgs_jap[0].split('/');

	let seljs=3;
	if(`${cid[(cid.length-seljs)]}`==='ipfs')
	{
		seljs=2;
	}


	fetch(`${cdncdn1}/ocr/${cid[(cid.length-seljs)]}.json`)
	.then(response => response.json())
	.then((data)=>jp_ocr=data)
	.catch(err => {jp_ocr={};
	fetch(`${cdncdn}/ocr/${cid[(cid.length-seljs)]}.json`)
	.then(response => response.json())
	.then((data)=>jp_ocr=data)
	.catch(err => {jp_ocr={};})

})


	
	}
}




$:{
	
	if(i!=iii)
	{
		i=iii;
		enp[0]=0;
	
}

	
	if(jj!=jjj)
{
		jj=jjj;
		jpp[0]=0;

		


	
}


	

}













	
	


</script>
<Reader delayml={delayml} prel={prel} bind:imgs_jap={imgs_jap} bind:imgs_eng={imgs_eng} bind:eng_ocr={eng_ocr} bind:jp_ocr={jp_ocr} bind:lang={lang} bind:enp={enp} bind:jpp={jpp} bind:indicator={indicator} bind:chaptersen={chaptersen} bind:iii={iii} bind:chaptersjp={chaptersjp} bind:jjj={jjj} 
bind:volumesen={volumesen} bind:volumesjp={volumesjp} bind:vi={vi} bind:vj={vj} bind:check={check}></Reader>
<style>

</style>