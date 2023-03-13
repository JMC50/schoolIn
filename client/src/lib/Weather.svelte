<script lang="ts">
    import { weatherInfo } from "../store/auth";
    import ScheduleRight from "./ScheduleRight.svelte";
    
    interface Iweather{
        id: string;
        temp: number;
        temp_max: number;
        temp_min: number;
        humidity: number;
        feels_like: number;
        icon: string;
        last_get_info: Date;
    }

    const getweather = async () => {
        const res = await fetch('/server/weather/weather/getweather');
        const data = await res.json();

        return data;
    }
    
    let weather:Promise<Iweather> = new Promise(res => {});
    weather = getweather();
    setInterval(async () => {
        await getweather();
    }, 60000)

</script>

<main id="container">
    <main class="container" id="left">
        <div class="font title text_littlebig">날씨</div>
        {#await weather}
            Fetching....
        {:then value}
            <div class="weather_con">
                <div>
                    <img src="/img/{value.icon}.png" alt="" class="icon">
                </div>
                <div class="temp_con">
                    <div class="font text_littlebig">{value.temp}°C</div>
                    <div class="font text_middle">체감온도 {value.feels_like}°C</div>
                </div>
            </div>
            <div class="weather_con">
                <div>
                    <img src="/img/waterdrop.png" alt="" class="icon">
                </div>
                <div class="temp_con">
                    <div class="font text_littlebig">{value.humidity}%</div>
                </div>
            </div>
            <div class="bottom">
                <div class="font text_middle inline">최고기온 : {value.temp_max}°C</div>
                <div class="font text_middle inline">최저기온 : {value.temp_min}°C</div>
            </div>
        {/await}
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
        display: inline-block;
        position: relative;
    }
    .bottom{
        position: absolute;
        bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 87%;
    }
    .weather_con{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .temp_con{
        display: flex;
        flex-direction: column;
        justify-content: right;
        align-items: center;
    }
    .icon{
        width: 5em;
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