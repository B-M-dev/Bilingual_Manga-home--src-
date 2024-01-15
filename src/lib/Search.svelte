<script>
import SearchLoader from "./SearchLoader.svelte";
export let datav
export let blurring=false
const backdrop=(e)=>{

    if(e.srcElement.id==="backdrop")
    {blurring=false;}
};
$:val="";

</script>
{#if blurring}
<div id="backdrop" on:click={backdrop}>
    <div id="search-box">
    <label>
        <input placeholder="Search" bind:value={val}>
    </label>
    <SearchLoader bind:datav={datav} bind:val={val} bind:blurring={blurring}/>
    </div>
</div>
{/if}
<style>
#backdrop{

    background: rgba(255,255,255,0) ;
    backdrop-filter: blur(3px);
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    
    }
#search-box{
    display: block;
    width: 90vw;

    max-height: 70vh;
    background:#303030;
    border-radius: 5px;
    position: fixed;
    top:10vh;
    left:5vw;
    justify-content: center;
    overflow: scroll;
    overflow-x: hidden;
}


label {
  position: relative;
}

label:before {
  content: "";
  position: absolute;
  left: 0px;
  top: 0;
  bottom: 0;
  min-width: 50px;
  width:10vh;
  background:  url("/search.svg") center / contain no-repeat;

}

input{
    margin: 2vh;
    height: 5vh ;
    min-height: 30px;
    width:70vw;
    padding-left:40px ;

    background-color:#484848;
    border-radius:5px ;
    border:0;
    color:whitesmoke;


}

input:focus{
    border: 2px solid green;
    outline: 0;
}


*::-webkit-input-placeholder {
    color: whitesmoke;
}
*:-moz-placeholder {

    color: whitesmoke;
    opacity: 1;
}
*::-moz-placeholder {

    color: whitesmoke;
    opacity: 1;
}
*:-ms-input-placeholder {

    color: whitesmoke;
}
*::-ms-input-placeholder {

    color:  whitesmoke;
}
*::placeholder {

    color: whitesmoke;
}

</style>