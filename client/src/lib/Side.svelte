<script lang="ts">
    import { useAuth } from "../store/auth";

    let hello_words = ["안녕하세요!", "반가워요!", "안녕하세요.", "반가워요.", "환영해요.", "환영해요!", "잘 지내시나요?", "잘 지내시나요!"];
    let hello_word = hello_words[Math.floor(Math.random() * hello_words.length)];

    let date:Date;
    let dayofWeek:string;


    $:{
        date = date;
    }

    setInterval(() => {
        date = new Date();

        const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        dayofWeek = week[new Date(date).getDay()];
    }, 100)
</script>
<div class="schedule" style="display: none;"></div>

<main id="container">
    <div id="top">
        <img src="/img/Ansanhs_logo.jpg" alt="" class="logo">
        <div class="font text_big inline title">안산In</div>
    </div>
    <div id="profile" class="inline">
        <div class="font text_littlebig white">프로필</div>
        <div class="white font text">{$useAuth.age} 학년 {$useAuth.class} 반 {$useAuth.number} 번<br>{$useAuth.name} 님 {hello_word}</div>
        <div class="btns">
            <div class="inline font btn text">설정</div><div class="inline font btn text">로그아웃</div>
        </div>
    </div>
    <div class="bottom">
        <div>2023 안산In / Beta 1.0</div>
        <div id="developed">Developed by JMC50</div>
    </div>
</main>

<style lang="scss">
    $backgroundColor: rgb(105, 133, 226);

    @font-face {
        font-family: 'KCC-Ganpan';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCC-Ganpan.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    .bottom{
        position: absolute;
        bottom: 10px;
        font-weight: bolder;
    }
    #container{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 20vw;
        background-color: white;
        box-shadow: 3px 0px 5px 0px #d6d6d6;
        position: relative;
        font-size: 1vw;
    }
    #developed{
        font-size: 1em;
    }
    .text{
        font-size: 1em;
    }
    .item{
        background-color: white;
        padding: 20px;
        width: 75%;
        border-radius: 50px;
        margin-top: 20px;
        box-shadow: 0px 0px 10px 0px #dbdbdb;
    }
    .white{
        color: white;
    }
    .btns{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .btn{
        background-color: white;
        border-radius: 30px;
        padding: 5px 13px 5px 13px;
        margin-top: 10px;
        margin-right: 10px;
        transition: all 0.2s ease;
    }
    .btn:hover{
        cursor: pointer;
        transform: scale(1.05);
    }
    #profile{
        background-color: $backgroundColor;
        padding: 20px 20px 20px 25px;
        width: 75%;
        border-radius: 50px;
        margin-top: 20px;
    }
    #top{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .font{
        font-family: 'KCC-Ganpan';
    }
    .title{
        font-weight: bolder;
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
    .logo{
        width: 7vw;
    }
</style>