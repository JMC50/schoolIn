<script lang="ts">
    import { useAuth } from "../store/auth";
    export let hash:string;

    const get_devnotices = async () => {

    return ["아직 개발중", "ㅇㅅㅇ", "asasd"];
    }

    let notices = new Promise<string[]>(res => {});
    notices = get_devnotices();


    let services = [["lunch", "급식"], ["notice", "공지"], ["schedule", "시간표"], ["weather", "날씨"], ["studentID", "학생증"]];
    let selected:HTMLDivElement;

    const changeService = (e) => {
        const target = e.target as HTMLElement;
        let parent:HTMLDivElement;
        if(target.nodeName == "DIV" && target.classList.contains("icon_con")){
            parent = target as HTMLDivElement;
        }else{
            if(target.parentElement.nodeName == "DIV" && target.parentElement.classList.contains("icon_con")){
                parent = target.parentElement as HTMLDivElement;
            }
        }
        if(!parent){
            return;
        }
        if(parent.classList.contains("selected")){
            return;
        }
        const service = parent.dataset.name;
        const hashes = hash.match(/\#\w+/g);
        hash = hashes[0] + `#${service}`;
        if(selected){
            selected.classList.remove("selected");
            selected.classList.add("icon_con");
        }
        parent.classList.remove("icon_con");
        parent.classList.add("selected");
        selected = parent;
    }
</script>

<div style="display: none;" class="selected">
    <div class="text icon"></div>
</div>
<main id="container">
    <main class="container" id="left">
        <div class="font text_littlebig title">서비스</div>
    
        {#each services as value}
            <div class="icon_con con" data-name="{value[0]}" on:click={changeService}>
                <img src="/img/{value[0]}.png" alt="" class="icon">
                <div class="font text white">{value[1]}</div>
            </div>
        {/each}
    </main>
    <main class="container" style="margin-left: 30px;">
        <div class="font text_littlebig title">개발자 공지</div>
    
        {#await notices}
            Fetching...
        {:then notices} 
            {#each notices as text}
                <div class="font text_middle">● {text}</div>
            {/each}
        {/await}
    </main>
</main>

<style lang="scss">
    $backgroundColor: rgb(105, 133, 226);

    @font-face {
        font-family: 'KCC-Ganpan';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCC-Ganpan.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }

    .con{
        transition: all 0.2s ease;
    }
    #container{
        display: flex;
    }
    .container{
        font-size: 1.5vw;
        background-color: white;
        padding: 20px 30px 35px 40px;
        border-radius: 3vw;
        box-shadow: 0px 0px 10px 0px #dbdbdb;
        display: inline-block;
    }
    .selected{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: white;
        border: 2px solid $backgroundColor;
        width: 4em;
        height: 4em;
        border-radius: 1.5em;
        margin-right: 10px;
    }
    .selected > .text{
        color: black;
    }
    .selected > .icon{
        filter: invert(0%);
    }
    .icon_con{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: $backgroundColor;
        border: 2px solid $backgroundColor;
        width: 4em;
        height: 4em;
        border-radius: 1.5em;
        margin-right: 10px;
    }
    .icon_con:hover{
        cursor: pointer;
    }
    .icon{
        width: 2em;
        filter: invert(100%);
    }
    .text{
        font-size: 1em;
    }
    .white{
        color: white;
    }
    .font{
        font-family: 'KCC-Ganpan';
    }
    .title{
        margin-bottom: 10px;
    }
    .text_littlebig{
        font-size: 2em;
    }
    .text_big{
        font-size: 3em;
    }
    .text_middle{
        font-size: 1em;
    }
    .inline{
        display: inline-block;
    }
</style>