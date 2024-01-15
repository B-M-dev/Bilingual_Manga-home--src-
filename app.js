
import fs from "fs"
import cors from "cors"
import fetch from "node-fetch"

import express from "express"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
var app = express();
let manob={}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let ipfsgate="http://localhost:3300/ipfs/%@cid@%"



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
    // console.log(ximg);
    return ximg;
}

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use('/mypost',(req, res) => {

  res.send("ok")

});

function removeele(arrOriginal, elementToRemove){
  return arrOriginal.filter(function(el){return el !== elementToRemove});
}


function reverseArray(arr){
  let newArr = [];
  
  for(let i = arr.length - 1; i >= 0; i--){
      newArr.push(arr[i]);
  }
  
  return newArr;
}



app.use('/check',(req,res)=>{imgdl("pm")});


app.use('/remove',(req, res) => {
  let ob=req.body
  let x11=manob["meta"].manga_titles
  let x12=reverseArray(x11)
    //namarr={}
  fs.readFile('./json/dw.json', 'utf8', function(err, contents) {
    if (err) {
      throw err;
    } else {
      let data = JSON.parse(contents);
      for(let el in ob)
      {
        if(ob[`${el}`])
        {
          if(!data["rm"].includes(x12[el].enid))
         {data["rm"].push(x12[el].enid)}
        }
      }
      fs.writeFile ("./json/dw.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        });

    }
});

  imgdl("rm")
  res.send("ok")

});



app.use('/download',(req, res) => {

  let ob=req.body
  let x11=manob["meta"].manga_titles
  let x12=reverseArray(x11)

  fs.readFile('./json/dw.json', 'utf8', function(err, contents) {
    if (err) {
      throw err;
    } else {
      let data = JSON.parse(contents);
      for(let el in ob)
      {
        if(ob[`${el}`])
        {
          if(!data["dw"].includes(x12[el].enid))
         {data["dw"].push(x12[el].enid);}
        }
      }
      fs.writeFile ("./json/dw.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        });

    }
});

  imgdl("dw")
  res.send("ok")
  

});

app.use("/", express.static(__dirname));
app.listen(3300, function () {
    console.log('Listening on http://localhost:3300/');
    
});
async function fetc(){
  let xx=await fetch("http://localhost:3300/json/admin.manga_metadata.json")
  let res = await xx.json()
  let re1=res[0]
  manob["meta"]=re1
  let cdn=re1["cdn"]
  let manga_tit = re1.manga_titles

  for(let i in manga_tit)
  {
    let pat=manga_tit[i].coveren
    let pat1 = pat.split("/");
    let pat2 = pat1.slice(0, pat1.length-1).join("/");
    if (!fs.existsSync(pat2)){
      fs.mkdirSync(pat2, { recursive: true });}
    if(!fs.existsSync(pat)){
      const temp1=await fetch(`${cdn}/${pat}`)
      pat=decodeURIComponent(decodeURIComponent(pat))
      //console.log(pat)
      const temp2=await temp1.body.pipe(fs.createWriteStream(pat))
    }


    pat=manga_tit[i].coverjp
    pat1 = pat.split("/");
    pat2 = pat1.slice(0, pat1.length-1).join("/");
    if (!fs.existsSync(pat2)){
      fs.mkdirSync(pat2, { recursive: true });}
    if(!fs.existsSync(pat)){
      const temp1=await fetch(`${cdn}/${pat}`)
      pat=decodeURIComponent(decodeURIComponent(pat))
      //console.log(pat)
      const temp2=await temp1.body.pipe(fs.createWriteStream(pat))
    }

  
  
  
  }
}

function imgdl(sel){
  fs.readFile('./json/admin.manga_data.json', 'utf8', function(err1, contents1) {
    if (err1) {throw err1;}else{
      let mdata=JSON.parse(contents1)
     
  fs.readFile('./json/dw.json', 'utf8', function(err, contents) {
    if (err) {
      throw err;
    } else {
      
      let data = JSON.parse(contents);
      let dw=data["dw"]
      let pm=data["pm"]
      let rm=data["rm"]
      if(sel==="rm")
      {
        dw = dw.filter( ( el ) => !rm.includes( el ) );
        pm = pm.filter( ( el ) => !rm.includes( el ) );
      }
      for(let ii in mdata)
      {
        if(sel==="dw"){
        if(dw.includes(mdata[ii]._id.$oid))
        { let idd=mdata[ii]._id.$oid
          if(!(pm.includes(idd)))
          {
            
            pm.push(idd)
            let xxx122=mdata[ii].en_data["ch_en"]
            let xxx122h=mdata[ii].en_data["ch_enh"]
            let imgs_engo=imgscon(xxx122,xxx122h);
            let imgs_jpo=imgscon(mdata[ii].jp_data.ch_jp,mdata[ii].jp_data.ch_jph);
            imgox(imgs_engo)
            imgox(imgs_jpo,true)
            async function fetc1(patt,patt1,ocrtt=false){
              for(let ii in patt)
              {
              let pat2 = patt1[ii].split("/");
              let pat3 = pat2.slice(0, pat2.length-1).join("/");

              let cid=patt[ii].split('/');
              let seljs=3;
              if(`${cid[(cid.length-seljs)]}`==='ipfs')
              {
                seljs=2;
              }

              if(ocrtt){
              let ocr=`${manob["meta"].cdn}/ocr/${cid[(cid.length-seljs)]}.json`
              let ocrp=`./ocr/${cid[(cid.length-seljs)]}.json`
              if(!fs.existsSync('./ocr/'))
              {fs.mkdirSync('./ocr/', { recursive: true });}

              if(!fs.existsSync(ocrp))
              {const temp1=await fetch(ocr)
                ocrp=decodeURIComponent(decodeURIComponent(ocrp))
                //console.log(ocrp)
              const temp2=await temp1.body.pipe(fs.createWriteStream(ocrp))
             }}

              if (!fs.existsSync(pat3)){
                fs.mkdirSync(pat3, { recursive: true });
                
               }
               if(!fs.existsSync(patt1[ii]))
              {const temp1=await fetch(patt[ii])
                patt1[ii]=decodeURIComponent(decodeURIComponent(patt1[ii]))
                //console.log(patt1[ii])
              const temp2=await temp1.body.pipe(fs.createWriteStream(patt1[ii]))
             }
            }
            
            }

          function imgox(imgs_engo,ocrtt=false){
            let patt=[]
            let patt1=[]
            let patt3=[]
            for(let eliix in imgs_engo)
            {
              let vol=imgs_engo[eliix]
              for(let xnnn in vol)
              {

                let pat0=vol[xnnn]
                let pat1=`.${pat0.replace("http://localhost:3300","")}`
                let pat2 = pat1.split("/");
                let pat3 = pat2.slice(0, pat2.length-1).join("/");
                while(!(manob["meta"].ipfsgate.length>0))
                {}
                let ipfsgatemm=manob["meta"].ipfsgate.replace("%@cid@%","")
                let pat4=`${ipfsgatemm}${pat1.replace("./ipfs/","")}`
                //console.log(pat4)


                if(!fs.existsSync(pat1)){
                  patt1.push(pat1)
                  patt.push(pat4)
                  
                }

              }
              
            }
            fetc1(patt,patt1,ocrtt)}
            

          
          }
          dw=removeele(dw,idd)

        }
      }

      if(sel==="rm")
      {

        
        if(rm.includes(mdata[ii]._id.$oid))
        { 
         // console.log("remove")
          let idd=mdata[ii]._id.$oid
          let xxxen=mdata[ii].en_data["ch_enh"]
          let xxxjp=mdata[ii].jp_data["ch_jph"]
            for(let icc in xxxen)
            {
              let xxxx=xxxen[icc].split('/')
              let rmdd=`./ipfs/${xxxx[0]}`
              //console.log(rmdd)
              if(fs.existsSync(rmdd))
              {fs.rmSync(rmdd, { recursive: true, force: true });}
            }

            for(let icc in xxxjp)
              {
                let xxxx=xxxjp[icc].split('/')
                let rmdd=`./ipfs/${xxxx[0]}`
                if(fs.existsSync(rmdd))
                {fs.rmSync(rmdd, { recursive: true, force: true });}
              }

          
          rm=removeele(rm,idd)
        }
      }

      if(sel==="pm")
      {}



      }
      fs.writeFile ("./json/dw.json", JSON.stringify({"dw":dw,"pm":pm,"rm":rm}), function(err) {
        if (err) throw err;

        });


    }})}})




}
  fetc()
  imgdl()
