import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'

import {AuthModule} from '@/modules/auth/auth.module'
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';

@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: () => ({
          type: 'better-sqlite3',
          database: 'db/project.db',
          entities: [
            __dirname + "../../entity/**/*.entity{.ts,.js}",
          ],
          statementCacheSize: 100,
          synchronize: true,
          logging: false,
          autoLoadEntities: true
        })
      }),
      AuthModule,
      UserModule,
      WeatherModule
    ],
    controllers: [],
    providers: [],
  })
  export class AppModule {}
  