<script>

import { createEventDispatcher } from "svelte";

let dispatch = createEventDispatcher();

export let sort_criteria_list;
export let sort_criteria;
export let sort_reverse;

let sort_criteria_by_values = ['Rating','Release'];
let omit_subheading = ['A-Z','Newly added'];

const onChanged = () => {
    dispatch("SortCriteriaChanged");
};

</script>

<div>
Sort by
<select id='sort_criteria' bind:value={sort_criteria} on:change={onChanged}  >
    <!--{#each Object.keys(sort_criteria_list) as c}-->
    {#each sort_criteria_list as c}
    <option value="{c}">{c}</option>
    {/each}
</select>
Reverse
<input type=checkbox bind:checked={sort_reverse} > 
</div>

<style>

select{
    text-align: left;
    color: whitesmoke;
    font-size: 1.15rem;
    border:0;

    text-decoration: none;
    padding:5px;
    margin: 5px;
    background:#333;
    border-radius:5px;
    font-size: 0.9rem;
    font-weight:bold;
}

select:hover{
    cursor: pointer;
    background:rgb(125, 125, 125)
}

div {
    width: 300px;
    text-decoration: none;
    color: whitesmoke;
    font-size: 1.1 rem;
    padding: 0px;
    border-radius: 5px;
    background:#444;
}

</style>