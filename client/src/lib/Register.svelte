<script lang="ts">
    export let hash:string;
    import { useAuth } from "../store/auth";

    function getUserInfo(token:string){
        return fetch(`/server/oauth/check`, {
            headers: {'Authorization': `Bearer ${token}`}
        }).then(res => res.json() )
    }
    // https://cors-anywhere.herokuapp.com/
    const get_token = async () => {
        if(location.hash.indexOf('?token') !== -1){
            const token = location.hash.slice(location.hash.indexOf('?token')).split('=')[1]
            const {data} = await getUserInfo(token);
            console.log(data);
            useAuth.set({
                token,
                email: data.email,
                id: data.id,
                name: null,
                class: null,
                number,
                picture: data.picture,
                age: null,
                barcode: null,
                gid: data.name
            })
            name = data.name;
        }
        return null;
    }

    const register = async () => {
        console.log(name, age, class_);
        if(name !== "" && class_ !== 0 && number !== 0){
            const token = location.hash.slice(location.hash.indexOf('?token')).split('=')[1]
            const {data} = await getUserInfo(token);
            useAuth.set({
                token,
                email: data.email,
                id: data.id,
                name,
                class: class_,
                picture: data.picture,
                age,
                barcode: null,
                gid: data.name,
                number
            })

            console.log($useAuth);

            const res = await fetch(`/server/user/user/update/${data.email}`, {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify($useAuth)
            })

            alert("회원가입 완료");
            hash = "#main";
        }else{
            return alert('위 항목들을 모두 작성해주세요!');
        }
    }

    $: {
        name = name;
        age = age;
        class_ = class_;
    }

    let name = "";
    let getinfo:Promise<null> = new Promise(res => {});
    getinfo = get_token();

    let age:1|2|3 = 1;
    let class_ = 0;
    let number = 0;
</script>

{#await getinfo}
    Loading...
{:then temp} 
    <main id="main_con">
        <div id="inner_con">
            <div id="top_con">
                <img src="/img/Ansanhs_logo.jpg" alt="" class="logo">
                <div class="font inline text_big title">안산In</div>
            </div>
            <br>
            <div class="title font text_middle">안녕하세요 <div class="name font text_middle inline">{name}</div>님! <br>안산In의 더 좋은 서비스 이용을 위해 회원가입을 진행해주세요.</div>
            <div class="qna">
                <div class="question">
                    <div class="font text_middle">이름이 뭔가요? (<div class="name font text_middle inline">실명</div>을 입력해주세요!)</div>
                    <input type="text" placeholder="이름을 입력해주세요" bind:value={name} class="input">
                </div>
                <div class="question">
                    <div class="font text_middle">몇학년 몇반 몇번인가요?</div>
                    <select name="학년" id="" bind:value={age}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select> 학년 <input type="number" class="number" bind:value={class_}> 반 <input type="number" class="number" bind:value={number}> 번
                </div>
                <div class="question">
                    <div class="font text_middle">온라인 학생증 - 준비중</div>
                </div>
            </div>
            <br>
            <div id="btn_con">
                <div class="font text_middle btn inline" on:click={register}>회원가입</div>
            </div>
        </div>
    </main>
{/await}

<style lang="scss">
    @font-face {
        font-family: 'KCC-Ganpan';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCC-Ganpan.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    .btn{
        background-color: #f5f5f5;
        border-radius: 10px;
        padding: 7px 12px 7px 12px;
        background-color: #f5f5f5;
        transition: all 0.2s ease;
    }
    .btn:hover{
        cursor: pointer;
        transform: scale(1.05);
    }
    .input{
        padding: 5px;
        width: 30%;
        font-size: 15px;
        border-radius: 10px;
    }
    .number{
        width: 20px;
    }
    .number::-webkit-outer-spin-button,
    .number::-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
    .question{
        margin-top: 20px;
    }
    .font{
        font-family: 'KCC-Ganpan';
    }
    .text_big{
        font-size: 50px;
    }
    .text_middle{
        font-size: 25px;
    }
    #inner_con{
        width: 50vw;
    }
    #top_con{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .inline{
        display: inline-block;
    }
    .logo{
        width: 100px;
    }
    .title{
        font-weight: bolder;
    }
    #main_con{
        display: flex;
        justify-content: center;
    }
    .name{
        color: blue;
    }
</style>