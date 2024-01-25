<script lang="ts">
    export let hash:string;

    const login = async () => {
        const a = document.createElement("a");
        // a.href = "http://localhost:3000/oauth/login";
        // a.href = "http://112.170.225.201:3000/oauth/login";
        a.href = "http://ansaninserver.kro.kr:3000/oauth/login";
        a.click();
    }
</script>

<main id="container">
    <div id="title_con">
        <img src="/img/Ansanhs_logo.jpg" alt="" class="logo">
        <div class="font title">안산In</div>
    </div>
    <div id="btn_con">
        <div id="login" on:click={login}>로그인</div>
    </div>
</main>

<style lang="scss">
    @font-face {
        font-family: 'KCC-Ganpan';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCC-Ganpan.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    #container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    #title_con{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #btn_con{
        margin-top: 10px;
    }
    #login{
        font-family: 'KCC-Ganpan';
        font-size: 25px;
        border-radius: 10px;
        padding: 7px 12px 7px 12px;
        background-color: #f5f5f5;
        transition: all 0.2s ease;
    }
    #login:hover{
        cursor: pointer;
        transform: scale(1.05);
    }
    .logo{
        width: 100px;
    }
    .title{
        display: inline-block;
        font-family: 'KCC-Ganpan';
        font-size: 50px;
        font-weight: bolder;
    }
</style>