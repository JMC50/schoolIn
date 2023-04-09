<script lang="ts">
    import { useAuth, today_schedule } from "../store/auth";



    $: {
        date = date;
        hours = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
    }

    let date = new Date();
    let hours:number;
    let minutes:number;
    let seconds:number;
    let FullTime:number;

    setInterval(() => {
        date = new Date();
        minutes = date.getMinutes();
        hours = date.getHours();
        seconds = date.getSeconds();

        FullTime = (hours * 60 * 60) + (minutes * 60) + seconds;
    }, 100)

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
        return year+month+day;
    }

    const get_nowSchedule = (TimeNumber:number) => {
        if(TimeNumber >= 31800 && TimeNumber < 33000){
            return [`1교시 ${$today_schedule[0]}`, `조회시간`];
        }else if(TimeNumber >= 33000 && TimeNumber < 36000){
            return [`쉬는시간`, `1교시 ${$today_schedule[0]}`];
        }else if(TimeNumber >= 36000 && TimeNumber < 36600){
            return [`2교시 ${$today_schedule[1]}`, `쉬는시간`];
        }else if(TimeNumber >= 36600 && TimeNumber < 39600){
            return [`쉬는시간`, `2교시 ${$today_schedule[1]}`];
        }else if(TimeNumber >= 36600 && TimeNumber < 39600){
            return [`3교시 ${$today_schedule[2]}`, `쉬는시간`];
        }else if(TimeNumber >= 39600 && TimeNumber < 40200){
            return [`쉬는시간`, `3교시 ${$today_schedule[2]}`];
        }else if(TimeNumber >= 40200 && TimeNumber < 43200){
            return [`4교시 ${$today_schedule[3]}`, `쉬는시간`];
        }else if(TimeNumber >= 43200 && TimeNumber < 43800){
            return [`점심시간`, `4교시 ${$today_schedule[3]}`];
        }else if(TimeNumber >= 43800 && TimeNumber < 50400){
            return [`5교시 ${$today_schedule[4]}`, `점심시간`];
        }else if(TimeNumber >= 50400 && TimeNumber < 53400){
            return [`쉬는시간`, `5교시 ${$today_schedule[4]}`];
        }else if(TimeNumber >= 53400 && TimeNumber < 54000){
            return [`6교시 ${$today_schedule[5]}`, `점심시간`];
        }else if(TimeNumber >= 54000 && TimeNumber < 57000){
            return [`쉬는시간`, `6교시 ${$today_schedule[5]}`];
        }else{
            if($today_schedule.length == 7){
                if(TimeNumber >= 57000 && TimeNumber < 57600){
                    return [`7교시 ${$today_schedule[6]}`, `쉬는시간`];
                }else if(TimeNumber >= 57600 && TimeNumber < 60600){
                    return [`수업끝`, `7교시 ${today_schedule[7]}`];
                }else{
                    return [`없음!`, `수업끝`];
                }
            }else{
                return [`없음!`, `수업끝`];
            }
        }
    }

    let schedule = new Promise(res => {});
    setTimeout(() => {
        schedule = $today_schedule;
        console.log($today_schedule);
    }, 1000);

</script>

{#await schedule}
    Fetching...
{:then value} 
    <div class="font text_littlebig">현재 시간</div>
    <div class="font text_middle">
        {get_nowSchedule(FullTime)[1]}
    </div>
    <div class="font text_littlebig">다음 시간</div>
    <div class="font text_middle">
        {get_nowSchedule(FullTime)[0]}
    </div>
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