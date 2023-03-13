import {Module} from '@nestjs/common'
import {WeatherController} from './weather.controller'
import {WeatherService} from './weather.service'
import {WeatherEntity} from '@/entity'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([WeatherEntity])],
    controllers: [WeatherController],
    providers: [WeatherService],
    exports: [WeatherService],
})
export class WeatherModule {}