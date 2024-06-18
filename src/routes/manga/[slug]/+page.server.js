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

    if(ObjectId. isValid(id)){ 
        let o_id = new ObjectId(id);
        await db.collection('manga_data').find(ObjectId(o_id)).forEach(m_id => arr.push(m_id));
        if(arr.length!=0)
        {   let jsonc;
            const ref = url.searchParams.get('lang');
            const chen = url.searchParams.get('chen');
            const chjp = url.searchParams.get('chjp');
            const enp = url.searchParams.get('enp');
            const jpp = url.searchParams.get('jpp');
    
    

    
            let jsona={"p":id,"l":ref,"chen":chen,"chjp":chjp,"enp":enp,"jpp":jpp,"manga_data":arr[0],"ipfs":meta['0'].ipfsgate};
            jsonc = JSON.stringify(jsona);
            jsonc=JSON.parse(jsonc)

            return jsonc;     
            
        }}
        throw error(404, 'Not found');
    }
