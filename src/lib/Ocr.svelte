<script>


export let ocr1={};
export let src={};
export let ocrbor=false;
export let ocroff=false;
export let ocron=false;

function hoverm(e)
{
    let a = e.srcElement.children[0];
    let l = a.children;
	for(let i=0;i<l.length;i++)
	{
		l[i].style.display='table';
	}



    
}


function hovero(e)
{   
    let a = e.srcElement.children[0];
    let l = a.children;
	for(let i=0;i<l.length;i++)
	{
        if(!ocron)
		    {l[i].style.display='none';}
	}
    
}


$:na=src.src;
$:ocrpage={}
$: tocr=[]
$:{
    let ocrnon="none"
    if(ocron && !ocroff)
    {
        ocrnon="table"
    }
    else
    {
        ocrnon="none"
    }
    if(na!=undefined)
    {
        let nam=`${na.split('/').pop()}`
        nam = `${nam.substring(0, nam.lastIndexOf('.'))}`;
        nam=decodeURI(nam);

        if( (`${nam}`in ocr1) && ocr1[`${nam}`]!=undefined && !ocroff)
        {ocrpage=ocr1[`${nam}`];
        let oc;
        let temp=[]
    for(let i=0;i<ocrpage.length;i++)
            {   
            oc=ocrpage[i];
            let ratioh=src.height/oc.img_h
            let ratiow=src.width/oc.img_w
            let lines="";
            oc["lines"].forEach(line => {lines=lines+`<p class="ocrtext1"style="margin : 0;background-color:white;text-align:center;display:${ocrnon};vertical-align: top;white-space: nowrap;letter-spacing: 0.1em;line-height: 1.1em;">${line}</p>`;});
            
            let styledd=`"font-size:${oc["font-size"]*ratiow}px;writing-mode:${oc["writing-mode"]};position:absolute;top:${(oc.top*ratioh)+src.offsetTop}px;left:${(oc.left*ratiow)+src.offsetLeft}px;width:${oc.width*ratiow}px;height:${oc.height*ratioh}px;border:solid ${2*ratiow}px #41FF00;display:block;white-space: nowrap;z-index:${1000-oc["font-size"]};"`;
            
            
            let stylebor=`"font-size:${oc["font-size"]*ratiow}px;writing-mode:${oc["writing-mode"]};position:absolute;top:${(oc.top*ratioh)+src.offsetTop}px;left:${(oc.left*ratiow)+src.offsetLeft}px;width:${oc.width*ratiow}px;height:${oc.height*ratioh}px;display:block;white-space: nowrap;z-index:${1000-oc["font-size"]};"`;
            
            let styleh=""

 
            if(ocrbor)
            {
                styleh=stylebor;
            }
            else
            {
                styleh=styledd;
            }

            let hoc = `<div class="ocrtext" style=${styleh}>${lines}</div>`
            
            temp.push(hoc);
            }
            tocr=temp;
    
        
        
            const boxes = document.querySelectorAll('.ocrtext');

            boxes.forEach(box => {
            box.style.display="block";
            });
        }
        else
    {

        const boxes = document.querySelectorAll('.ocrtext');

        boxes.forEach(box => {
        
            box.style.display="none";
        });
    }

   
    }

}






</script>

{#each tocr as tdi}

<div class="ocrsp" on:mouseenter={hoverm} on:mouseleave={hovero}>{@html tdi}</div>
{/each}



<style>
    .ocrsp{
        cursor: auto;
        color: black;
    }

</style>