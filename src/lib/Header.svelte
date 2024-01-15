<script>
import Search from "./Search.svelte";
export let datav;
let se=false;
const search=()=>{se=true;}

</script>

<Search bind:blurring={se} bind:datav={datav}/>
<div class="topnav">
  <a href="/" data-sveltekit:prefetch id="logoimg" target="_top" rel="noopener noreferrer" class="logoa"><img src="/L.png" alt="logo" style="max-height:50px"/></a>
  <div class="options">
  <button on:click={search}><img src="/search.svg" alt="search" style="max-width:90% ;"/></button>
  <a href="https://twitter.com/BilingualManga" target="_top" rel="noopener noreferrer"><img src="/twitter.svg" alt="twitter" style="max-height:20px;"/></a>
  <a href="/about" data-sveltekit:prefetch target="_top" rel="noopener noreferrer"><img src="/info.svg" alt="about" style="max-height:20px;"/></a>
  <a href="/advanced" data-sveltekit:prefetch target="_top" rel="noopener noreferrer"><img src="/advsearch.svg" alt="advanced search" style="max-height:20px;"/></a>

  </div>
</div>


<style>
  .logoa{
    float: left;
  }
    button{
      background-color: rgba(255,255,255,0);
      border: 0px;
      margin-top:10px;
      padding: auto;
      border-radius:10px ;
    }
    button:hover{
      background-color:rgba(255,255,255,0.3) ;
    }
    .topnav{
    overflow: hidden;
    background:#303030;

    height: 50px;
    border-bottom:2px solid green;
    display:flex;
    justify-content: flex-end;
    text-align: right;
    margin-bottom: 2px;
    width: 100vw;

    }
    

.topnav>div a {
  float: right;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 10px;
  text-decoration: none;
  font-size: 17px;

}

.topnav>div a:hover {
  background-color:rgba(255,255,255,0.3);
  
}

.options{
  margin: 0;
  margin-right: 2vw;
  

}


#logoimg{
position:absolute;
padding:0 0;
margin: 0;
margin-left:1vw;
margin-right:1vw;
left: 0px;

}


</style>