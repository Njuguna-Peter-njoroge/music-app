import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  controllers: [SongsController], // added right after runing the commnd nest g controller songs
  providers: [SongsService], // added right after runing the commnd nest g service songs
})
export class SongsModule {}
