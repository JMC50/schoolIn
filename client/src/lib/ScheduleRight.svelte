<script lang="ts">
    import { useAuth, today_schedule } from "../store/auth";


    const key = "900d1b87508f4e61b481ee35923e6241";
    const school_code = "7530183";
    const region = "J10";
    const url = `https://open.neis.go.kr/hub/hisTimetable?ATPT_OFCDC_SC_CODE=${region}&SD_SCHUL_CODE=${school_code}&type=json&key=${key}&GRADE=${$useAuth.age}&CLASS_NM=${$useAuth.class}`;

    const getday = (move) => {
        let d = new Date();
        let sel_day = move; //일자를 조절하시면 됩니다. -1이면 하루전/ +1이면 내일
        d.setDate(d.getDate() + sel_day );


        let year    = d.getFullYear();
        let month   = ('0' + (d.getMonth() +  1 )).slice(-2);
        let day     = ('0' + d.getDate()).slice(-2);
        // return year+month+day;
        return '20231221';
    }

    const getSchedule = async () => {
        if($today_schedule){
            return $today_schedule;
        }else{
            try{
                const lists:any[] = [];
                const date = getday(0);
                const res = await fetch(`${url}&ALL_TI_YMD=${date}`);
                const data = await res.json();
                for(let i of data.hisTimetable[1].row){
                    lists.push(i.ITRT_CNTNT);
                }
                today_schedule.set(lists);
                return lists;
            }catch(e){
                today_schedule.set([]);
                return [];
            }
        }
    }

    const changeList = ["기술·가정", "통합사회", "과학탐구실험", "통합과학", "자율활동"]
    const changeName = {
        "기술·가정": "기가",
        "통합사회": "통사",
        "과학탐구실험": "과탐",
        "통합과학": "통과",
        "자율활동": "자율",
    }

    const changeSubjectName = (name) => {
        if(changeList.includes(name)){
            return changeName[`${name}`];
        }else{
            return name;
        }
    }

    let schedule:any = new Promise(res => {});
    schedule = getSchedule();
</script>

<div class="font text_littlebig title">시간표</div>
{#await schedule}
    Fetching...
{:then schedules} 
    <div class="schedule_con">
        {#each schedules as schedule}
            <div class="schedule font text_middle">{schedules.indexOf(schedule) + 1}교시 {changeSubjectName(schedule)}</div>
        {/each}
    </div>
    {#if schedules.length == 0}
        <div class="font text_middle">오늘은 수업이 없어요!<br>이예에!</div>
    {/if}
{/await}

<style lang="scss">
    $backgroundColor: rgb(105, 133, 226);

    @font-face {
        font-family: 'KCC-Ganpan';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCC-Ganpan.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    #container{
        font-size: 1.5vw;
        background-color: white;
        padding: 20px 30px 35px 40px;
        border-radius: 3vw;
        box-shadow: 0px 0px 10px 0px #dbdbdb;
        height: 70%;
    }
    .white{
        color: white;
    }
    .schedule{
        padding: 5px 10px 5px 15px;
        border-radius: 50px;
        margin-bottom: 10px;
        background-color: white;
        box-shadow: 0px 0px 10px 0px #dbdbdb;
        transition: all 0.2s ease;
    }
    .schedule_con{
        margin-top: 10px;
    }
    .item{
        background-color: white;
        padding: 20px;
        border-radius: 50px;
        box-shadow: 0px 0px 10px 0px #dbdbdb;
    }
    .font{
        font-family: 'KCC-Ganpan';
    }
    .title{
        margin-bottom: 15px;
    }
    .text_littlebig{
        font-size: 2em;
    }
    .text_big{
        font-size: 3em;
    }
    .text_middle{
        font-size: 0.88em;
    }
    .inline{
        display: inline-block;
    }
    .logo{
        width: 7vw;
    }
</style>