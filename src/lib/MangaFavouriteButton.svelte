<script>
import { deserialize } from '$app/forms'; // Import the enhance action
export let meta;

async function handleToggleFavourite(event) {

    const response = await fetch( "/user_data", {
        headers: {"Content-Type" : "application/json" },
        method: 'POST',
        body: JSON.stringify({'func' : 'toggle_favourite', 'manga_id' : meta.enid })
    });

    const result = deserialize(await response.text());

    if (result.success) {
        meta.favourite = result.favourite;
    }
}
</script>

<button class:favourite={meta.favourite} on:click={handleToggleFavourite}>{#if !meta.favourite}Add to favourites{:else}Remove from favourites{/if}</button>

<style>
button{
    display: inline-block;
    text-decoration: none;
    padding:7px;
    margin: 5px 5px;
    color: whitesmoke;
    background: rgba(0,120,0,0.5);
    border-radius:5px;
    border: 2px solid black;
    font-family: Arial, Helvetica,'Noto Sans Symbols 2',sans-serif;
}

button:hover {
   background: rgba(0,210,0,0.5);
}

.favourite:hover {
  background-color:rgba(210,0,0,0.5);
}

.favourite {
    background: rgba(120,0,0,0.5);
}
</style>
