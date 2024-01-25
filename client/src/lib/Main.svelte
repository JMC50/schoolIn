<script lang="ts">
    export let hash:string;
    import { useAuth } from "../store/auth";
    import Lunch from "./Lunch.svelte";
    import Notice from "./Notice.svelte";
    import Schedule from "./Schedule.svelte";
    import ScheduleRight from "./ScheduleRight.svelte";
    import Services from "./Services.svelte";
    import Side from "./Side.svelte";
    import StudentId from "./StudentID.svelte";
    import Weather from "./Weather.svelte";

    $: {
        hash = hash;
        hashes = hash.match(/\#\w+/g);
    }

    function getUserInfo(token:string){
        return fetch(`http://112.170.225.201:3000/oauth/check`, {
            headers: {'Authorization': `Bearer ${token}`}
        }).then(res => res.json() )

        // return fetch(`/server/oauth/check`, {
        //     headers: {'Authorization': `Bearer ${token}`}
        // }).then(res => res.json() )
    }

    const get_token = async () => {
        if(location.hash.indexOf('?token') !== -1){
            const token = location.hash.slice(location.hash.indexOf('?token')).split('=')[1]
            const {data} = await getUserInfo(token);
            console.log("asdasdasd");

            const res = await fetch(`/server/user/user/getuserbyEmail/${data.email}`);
            const userInfo = await res.json();
            console.log(userInfo);

            useAuth.set({
                token,
                email: data.email,
                id: data.id,
                name: userInfo.name,
                class: userInfo.class,
                picture: data.picture,
                age: userInfo.age,
                barcode: null,
                gid: data.name,
                number: userInfo.number
            })
        }
        hash = "#main#weather";
        return null;
    }


    let getuser:Promise<null> = new Promise(res => {});
    let hashes = hash.match(/\#\w+/g);
    getuser = get_token();
</script>

{#await getuser}
    Fetching...
{:then value}
    <main id="container">
        <main id="side_con">
            <div id="side"><Side /></div>
        </main>
        <main id="main_container">
            <div id="left">
                <div id="services"><Services bind:hash={hash} /></div>
                <div id="util">
                    {#if hashes.includes("#lunch")}
                        <Lunch />
                    {:else if hashes.includes("#notice")}
                        <Notice />
                    {:else if hashes.includes("#schedule")}
                        <Schedule />
                    {:else if hashes.includes("#weather")}
                        <Weather />
                    {:else if hashes.includes("#studentID")}
                        <StudentId />
                    {/if}
                </div>
            </div>
        </main>
    </main>
{/await}

<style lang="scss">
    #container{
        display: flex;
        flex-direction: row;
        background-color: #f5f5f5;
    }
    .container{
        font-size: 1.5vw;
        background-color: white;
        padding: 20px 30px 35px 40px;
        border-radius: 3vw;
        box-shadow: 0px 0px 10px 0px #dbdbdb;
        display: inline-block;
    }
    #left{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 30px;
    }
    #util{
        width: 100%;
    }
    #schedule{
        margin-top: 30px;
    }
    #right{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #side_con{
        margin-right: 30px;
        width: 18vw;
    }
    #main_container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 82vw;
    }
    #util{
        margin-top: 30px;
    }
</style>