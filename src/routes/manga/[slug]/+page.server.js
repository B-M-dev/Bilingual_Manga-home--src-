import { error } from '@sveltejs/kit';
import db from "$lib/db"
import {obj} from '$lib/store.js';
import {ObjectId} from 'mongodb'
/** @type {import('./$types').PageServerLoad} */



const slugswap=()=>{    let meta;
    obj.subscribe(value => { meta=value;});
    let metarr = meta['0'].manga_titles;

    metarr.forEach(element => {
        if(("enslug" in element)&&("jpslug" in element))
        {
        if(element.enslug===id)
        {
            id=element.enid;
    
        }
        else if(element.jpslug===id)
        {
            id=element.enid;
    
        }
    
        }
        
    });}

export async function load({params,url}) 
{   let id=params["slug"]
    

    let meta;

    obj.subscribe(value => { meta=value;});
    let metarr = meta['0'].manga_titles;
    
    metarr.forEach(element => {
         if(("enslug" in element)&&("jpslug" in element))
         {
            
            let tempe=decodeURI(element['enslug'])
            let tempej=decodeURI(element['jpslug'])


        if(tempe===id)
        {
            id=`${element.enid}`;

            url.searchParams.set('lang',"en");

         }
        else if(tempej===id)
        {
            id=`${element.enid}`;
            url.searchParams.set('lang',"jp");
        }

     }


});




    let arr =[];
    let man=db['manga_data']
    let ratings=db['ratings']
    
    if(ObjectId. isValid(id)){ 

    for(let m_id in man)
    { 
      let m_idel=man[m_id]
      let x111=m_idel['_id'];
      let x112=x111['$oid'];
    if(x112==id){arr.push(m_idel);break;}
        
        }
    
    if(arr.length!=0)
    {   let jsonc;
        const ref = url.searchParams.get('lang');
        const chen = url.searchParams.get('chen');
        const chjp = url.searchParams.get('chjp');
        const enp = url.searchParams.get('enp');
        const jpp = url.searchParams.get('jpp');



        let ipfsss=""
        let aa1=await fetch(`${meta['0'].cdn1}/json/dw.json`)
        let aa2 = await aa1.json()
        let pm = aa2["pm"]

        if(pm.includes(id))
        {
            ipfsss=meta['0'].ipfsgate1
        }
        else
        {
            ipfsss=meta['0'].ipfsgate
        }

        
        let jsona={"p":id,"l":ref,"chen":chen,"chjp":chjp,"enp":enp,"jpp":jpp,"manga_data":arr[0],"ipfs":ipfsss};
        if (id in ratings) {
            jsona["rating_data"] = ratings[id]
        } else {
            jsona["rating_data"] = { "url":"http://mangaupdates.com", "rating":"N/A", "votes": 0, "last_updated":"N/A"}
        }
        jsonc = JSON.stringify(jsona);
        jsonc=JSON.parse(jsonc)

        return jsonc;     
        
    }}
    throw error(404, 'Not found');
}
