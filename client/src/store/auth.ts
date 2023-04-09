import {writable} from 'svelte/store'
export class UserDetail {
    id: string;
    gid: string;
    name: string;
    age: 1|2|3|null;
    class: number|null;
    number: number|null;
    barcode: number|null;
    email: string;
    picture: string;
    token:string;
}

export class Iweather{
    coord: {
        lon: number;
        lat: number;
    };
    weather: [{
        id: number;
        main: string;
        description: string;
        icon: string;
    }];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

const userDetail:UserDetail = {
    email: '',
    id: '',
    gid: '',
    name: '',
    age: null,
    class: null,
    number: null,
    barcode: null,
    picture: '',
    token: ''
}

const weather_Info:Iweather = {
    coord: {
        lon: 0,
        lat: 0,
    },
    weather: [{
        id: 0,
        main: "",
        description: "",
        icon: "",
    }],
    base: "",
    main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0,
    },
    visibility: 0,
    wind: {
        speed: 0,
        deg: 0,
        gust: 0,
    },
    clouds: {
        all: 0,
    },
    dt: 0,
    sys: {
        type: 0,
        id: 0,
        country: "",
        sunrise: 0,
        sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: "",
    cod: 0
}

export const useAuth = writable(userDetail)
export const weatherInfo = writable(weather_Info)
export const scheduleInfo = writable();
export const today_schedule:any = writable();
export const lunchInfo = writable();