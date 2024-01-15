import db from "$lib/db"
import ip from "ip"
/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) 
{

    let xreq=await event.request.headers.get('x-requested-with')

  
    let m=db['manga_metadata']


     let jsonc = JSON.stringify(m);
     jsonc=JSON.parse(jsonc)

    jsonc[0].cdn1=jsonc[0].cdn1.replace("localhost",ip.address())
    jsonc[0].ipfsgate1=jsonc[0].ipfsgate1.replace("localhost",ip.address())
     if(true)
     {
      jsonc[0].inhtml["ad-sp"]=""
      jsonc[0].inhtml["ad-up"]=""
      jsonc[0].inhtml["ad-down"]=""
      jsonc[0].inhtml["tracker"]="" 
    }

     return jsonc;       
     
   }
   

