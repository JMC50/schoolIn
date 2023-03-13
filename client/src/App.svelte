<script lang="ts">
  import Login from "./lib/Login.svelte";
    import Main from "./lib/Main.svelte";
    import Register from "./lib/Register.svelte";
    import Weather from "./lib/Weather.svelte";


  let hash = location.hash
    if(!hash) {
        hash = '#login'
    }
    let hashes:string[] = [];
    const pages = ["#login"];

    $:{
        location.hash = hash;
        hashes = hash.match(/\#\w+/g);
        // console.log(hash, hashes);
    }

    const hashChangeFun = () => {
        const arr:string[] = hash.match(/\#\w+/g);
        for(let i of arr){
            if(pages.includes(i)){
                if(arr.indexOf(i) == arr.length){
                  hash = location.hash;
                }
                continue
            }
        }
    }
</script>
<svelte:window on:hashchange={hashChangeFun}></svelte:window>
<main>
  {#if hashes.includes("#login")}
    <Login bind:hash={hash} />
  {:else if hashes.includes("#register")}
    <Register bind:hash={hash} />
  {:else if hashes.includes("#main")}
    <Main bind:hash={hash} />
  {/if}
</main>

<style lang="scss">

</style>