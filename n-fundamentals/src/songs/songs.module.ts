import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/create-song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController], // added right after runing the commnd nest g controller songs
  providers: [SongsService], // added right after runing the commnd nest g service songs
})
export class SongsModule {}
