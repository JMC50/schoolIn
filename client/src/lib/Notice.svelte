<script lang="ts">
    import ScheduleRight from "./ScheduleRight.svelte";


</script>

<main id="container">
    <main class="container" id="left">
        <div class="font title text_littlebig">공지</div>
    </main>
    <main class="container" id="right">
        <ScheduleRight />
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

    #container{
        display: flex;
    }
    #left{
        width: 70%;
    }
    #right{
        width: 30%;
        margin-left: 30px;
    }
    .container{
        font-size: 1.5vw;
        background-color: white;
        padding: 20px 30px 35px 40px;
        border-radius: 3vw;
        box-shadow: 0px 0px 10px 0px #dbdbdb;
        height: 50vh;
    }

    .icon{
        width: 2em;
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