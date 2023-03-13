import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { WeatherEntity } from '@/entity'
import { Iweather } from '@/interface/weather'

@Injectable()
export class WeatherService {
    constructor(
        @InjectRepository(WeatherEntity) private weatherRepository: Repository<WeatherEntity>,
    ){}

    async updateInfo(){
        const res = await fetch("http://api.openweathermap.org/data/2.5/weather?q=ansan&appid=1eb1d18602c0e2dde562cdc2005a4495&units=metric");
        const data:Iweather = await res.json();

        const weather = new WeatherEntity();
        weather.temp = data.main.temp;
        weather.temp_max = data.main.temp_max;
        weather.temp_min = data.main.temp_min;
        weather.humidity = data.main.humidity;
        weather.feels_like = data.main.feels_like;
        weather.icon = data.weather[0].icon;
        weather.last_get_info = new Date().getMinutes();

        await this.weatherRepository.update({}, weather);
    }

    async getWeather(){
        const find = await this.weatherRepository.find();
        if(find.length == 0){
            const res = await fetch("http://api.openweathermap.org/data/2.5/weather?q=ansan&appid=1eb1d18602c0e2dde562cdc2005a4495&units=metric");
            const data:Iweather = await res.json();

            const weather = new WeatherEntity();
            weather.temp = data.main.temp;
            weather.temp_max = data.main.temp_max;
            weather.temp_min = data.main.temp_min;
            weather.humidity = data.main.humidity;
            weather.feels_like = data.main.feels_like;
            weather.icon = data.weather[0].icon;
            weather.last_get_info = new Date().getMinutes();

            this.weatherRepository.save(weather);
        }else{
            const find = await this.weatherRepository.find();

            const before = find[0].last_get_info;
            const now = new Date();

            if(before !== now.getMinutes()){
                await this.updateInfo();
                const find = await this.weatherRepository.find();
                return find[0];
            }else{
                return find[0];
            }
        }
    }
}