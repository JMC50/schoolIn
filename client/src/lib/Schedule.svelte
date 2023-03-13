<script lang="ts">
    import { useAuth, scheduleInfo } from "../store/auth";


    const key = "900d1b87508f4e61b481ee35923e6241";
    const school_code = "7530183";
    const region = "J10";
    const url = `https://open.neis.go.kr/hub/hisTimetable?ATPT_OFCDC_SC_CODE=${region}&SD_SCHUL_CODE=${school_code}&type=json&key=${key}&GRADE=${$useAuth.age}&CLASS_NM=${$useAuth.class}`;
    const date = new Date();
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const week_kr = ["월요일", "화요일", "수요일", "목요일", "금요일"];
    const dayofWeek = week[new Date(date).getDay()];
    let start = 1 - week.indexOf(dayofWeek);

    const getday = (move) => {
        let d = new Date();
        let sel_day = move; //일자를 조절하시면 됩니다. -1이면 하루전/ +1이면 내일
        d.setDate(d.getDate() + sel_day );
    
    
        let year    = d.getFullYear();
        let month   = ('0' + (d.getMonth() +  1 )).slice(-2);
        let day     = ('0' + d.getDate()).slice(-2);
        return year+month+day
    }

    const getSchedule = async () => {
        if($scheduleInfo){
            return $scheduleInfo
        }else{
            const lists:any[] = [];
            for(let i = 0; i < 5; i++){
                const date = getday(start+i);
                const res = await fetch(`${url}&ALL_TI_YMD=${date}`);
                const data = await res.json();
                console.log(data);
                lists.push(data.hisTimetable[1].row);
            }
            scheduleInfo.set(lists);
            return lists;
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

<main id="container">
    <div class="font title text_littlebig">시간표</div>
    {#await schedule}
        Fetching...
    {:then value}
        <table>
            <tr>
                <td></td>
                <td>1교시</td>
                <td>2교시</td>
                <td>3교시</td>
                <td>4교시</td>
                <td>5교시</td>
                <td>6교시</td>
                <td>7교시</td>
            </tr>
            {#each value as name}
                <tr class="day_incon">
                    <td class="day font">{week_kr[value.indexOf(name)]}</td>
                    {#each name as subject}
                        <td>{changeSubjectName(subject.ITRT_CNTNT)}</td>
                    {/each}
                </tr>
            {/each}
        </table>
    {/await}
</main>

<style lang="scss">
    $backgroundColor: rgb(105, 133, 226);

    @font-face {
        font-family: 'KCC-Ganpan';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCC-Ganpan.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }

    table{
        border-collapse: collapse;
    }

    td{
        text-align: center;
        border: 2px solid $backgroundColor;
        border-collapse: collapse;
        font-size: 1.3em;
        font-family: 'KCC-Ganpan';
        padding: 4px 8px 4px 8px;
    }

    tr{
        border: 2px solid $backgroundColor;
    }

    #container{
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