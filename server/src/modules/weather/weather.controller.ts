import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { WeatherService } from "./weather.service";

@Controller('weather')
export class WeatherController {
    constructor(
        private weatherService:WeatherService,
    ){}
    
    @Get('/weather/getweather')
    async getweather(){
        return await this.weatherService.getWeather();
    }
}