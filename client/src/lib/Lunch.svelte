<script lang="ts">
    import ScheduleRight from "./ScheduleRight.svelte";
    import { lunchInfo } from "../store/auth";

    const key = "900d1b87508f4e61b481ee35923e6241";
    const school_code = "7530183";
    const region = "J10";

    const date = new Date();
    let month;
    if(date.getMonth() + 1 < 10){
        month = `0${date.getMonth() + 1}`;
    }
    const YMD = `${date.getFullYear()}${month}${date.getDate()}`;
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=${region}&SD_SCHUL_CODE=${school_code}&key=${key}&type=json&MLSV_YMD=${YMD}`;
    let meals;

    const getMealInfo = async () => {
        if($lunchInfo){
            meals = $lunchInfo;
            return true;
        }else{
            const res = await fetch(url);
            const data = await res.json();
            try{
                const mealInfo:string = data.mealServiceDietInfo[1].row[0].DDISH_NM.replaceAll("<br/>", "");
                meals = mealInfo.match(/[가-힣]+/g);
                lunchInfo.set(meals);
                return true;
            }catch(e){
                return false;
            }
        }
    }

    let meal = new Promise(res => {});
    meal = getMealInfo();

</script>

<main id="container">
    <main class="container" id="left">
        <div class="font title text_littlebig">급식</div>
        <div class="font title text_middle">{YMD} 급식 정보</div>
        <div class="meals">
            {#await meal}
                Fetching...
            {:then value}
                {#if value}
                    {#each meals as foodname}
                        <div class="font text_middle">
                            {foodname}
                        </div>
                    {/each}
                {:else}
                    <div class="font text_middle">
                        오늘은 급식이 없어요
                    </div>
                {/if}
            {/await}
        </div>
    </main>
    <main class="container" id="right" style="margin-left: 30px;">
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
    }
    .meals{
        display: flex;
        flex-direction: column;
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