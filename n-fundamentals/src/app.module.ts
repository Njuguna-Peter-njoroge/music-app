/* eslint-disable no-irregular-whitespace */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerNoSpecModule } from './common/middleware/logger--no-spec/logger--no-spec.module';
import { LoggerMiddleware } from './common/middleware/logger--no-spec/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/entities/create-song.entity';

@Module({
  imports: [
    SongsModule,
    LoggerNoSpecModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'post123',
      database: 'spofity_backend',
      entities: [Song],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1​
    // .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2​
    // consumer​
    // .apply(LoggerMiddleware)​
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3​
  }
}
